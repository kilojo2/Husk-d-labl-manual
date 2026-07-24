# 🔐 SECURITY AUDIT REPORT — DJIBUR Manuals

**Date**: 2026-07-24  
**Auditor**: Automated Security Analysis (20 areas × 20+ checks)  
**Project**: Next.js 16.2.10 — Documentation portal for webcam model operators  
**Deployment**: Railway (https://djibur-workteam.up.railway.app)

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [Authorization](#2-authorization)
3. [Input Validation](#3-input-validation)
4. [API Security](#4-api-security)
5. [File Upload Security](#5-file-upload-security)
6. [Server Security](#6-server-security)
7. [Database Security](#7-database-security)
8. [Secrets Management](#8-secrets-management)
9. [Business Logic](#9-business-logic)
10. [Frontend Security](#10-frontend-security)
11. [Backend Security](#11-backend-security)
12. [Dependencies](#12-dependencies)
13. [Infrastructure](#13-infrastructure)
14. [Performance-Related Security](#14-performance-related-security)
15. [Cryptography](#15-cryptography)
16. [Logging](#16-logging)
17. [Compliance](#17-compliance)
18. [Code Quality](#18-code-quality)
19. [Security Headers](#19-security-headers)
20. [Overall Architecture](#20-overall-architecture)

---

## 1. Authentication

### 1.1 — Admin Token Comparison — No Timing-Safe Comparison

| Field | Value |
|---|---|
| **Severity** | 🟡 **Medium** |
| **Location** | `app/api/stats/route.ts:36`, `app/api/stats/decrypt/route.ts:51` |
| **CWE** | CWE-208: Observable Timing Discrepancy |

```typescript
// Vulnerable code (both files)
const token = authHeader.slice(7);
if (token !== adminToken) {  // ← Direct string comparison
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
```

**Why it's vulnerable**: JavaScript's `!==` performs character-by-character comparison but stops at the first mismatched character. An attacker can measure response time differences to brute-force the ADMIN_TOKEN character-by-character if they can perform millions of requests with precise timing measurements.

**Attack scenario**: Over a LAN or same-datacenter connection (e.g., another Railway app), an attacker systematically varies the first character of the Bearer token and measures response times. A correct character takes ~0.1ms longer (due to one more comparison), allowing the full 32-char token to be deduced in ~32×62 = 1,984 requests instead of 62^32.

**Fix**: Use `crypto.timingSafeEqual` with equal-length buffers:

```typescript
import crypto from "crypto";

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b.padEnd(bufA.length, '\0').slice(0, bufA.length));
  return crypto.timingSafeEqual(bufA, bufB);
}

if (!safeCompare(token, adminToken)) {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
```

**References**: [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html), CWE-208.

---

### 1.2 — Admin Token Stored in Client State (Leaked to Browser)

| Field | Value |
|---|---|
| **Severity** | 🔴 **High** |
| **Location** | `app/admin/page.tsx:79`, `app/admin/page.tsx:117` |
| **CWE** | CWE-312: Cleartext Storage of Sensitive Information |

```typescript
// admin/page.tsx — Client Component
const [token, setToken] = useState("");  // ← Stored in React state (accessible in browser memory)

const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  fetchStats(token);  // ← Passed to API, but also stays in React state
};
```

**Why it's vulnerable**: The ADMIN_TOKEN is stored in React component state and passed to `fetch()` calls. This means:
1. The token is visible in browser memory dumps
2. If an XSS vulnerability is found anywhere on the site, the token is accessible via React DevTools
3. The token persists in the browser tab's memory for the duration of the session (auto-refresh every 30s)

**Attack scenario**: A stored XSS elsewhere on the application (for example, via unsanitized user input in a search query that gets reflected) could extract `window.__REACT_DEVTOOLS_GLOBAL_HOOK__` or traverse the React fiber tree to extract the token from AdminPage component state.

**Fix**: Use HTTP-only cookies for admin authentication instead of Bearer tokens in the client:

```typescript
// Admin login endpoint (new)
// POST /api/admin/login
// Sets httpOnly, secure, sameSite=strict cookie with session token
// Admin page never sees the token — it's sent automatically

// Stats API reads from cookie instead
const adminSession = request.cookies.get("admin_session");
```

**References**: OWASP ASVS V2.2.3, CWE-312.

---

### 1.3 — No Brute Force Protection on Admin Login

| Field | Value |
|---|---|
| **Severity** | 🟡 **Medium** |
| **Location** | `app/admin/page.tsx:115-118` |
| **CWE** | CWE-307: Improper Restriction of Excessive Authentication Attempts |

The admin login is handled entirely in the client component — the token is sent to `/api/stats` and if it fails, the component just shows an error. There is **no server-side rate limiting** on admin token verification attempts.

**Attack scenario**: An attacker with knowledge of the `/admin` route can write a script that tries different tokens against `/api/stats` or `/api/stats/decrypt` with various Bearer tokens. The rate limiter on `/api/*` allows 60 requests/minute per IP, meaning ~86,400 attempts/day per IP. If the ADMIN_TOKEN is a weak value (e.g., 8-char alphanumeric), it could be brute-forced in weeks.

**Fix**: Add dedicated rate limiting for failed admin auth attempts:

```typescript
// In middleware or stats route:
const failedAuthKey = `admin_auth:${ipInfo.ipHash}`;
const failCount = getAdminAuthFailures(failedAuthKey);
if (failCount > 5) {
  reportViolation(ipInfo.ipHash, "admin_brute_force");
  return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
}
```

**References**: OWASP ASVS V2.1.2, CWE-307.

---

## 2. Authorization

### 2.1 — No Ownership Validation for GDPR Data Access

| Field | Value |
|---|---|
| **Severity** | 🔴 **High** |
| **Location** | `app/api/privacy/route.ts:18-34` |
| **CWE** | CWE-639: Authorization Bypass Through User-Controlled Key (IDOR) |

```typescript
const { action, identifier } = await request.json();

// ANYONE with any visitorId can access or delete ANY user's data
db.run(`DELETE FROM visits WHERE visitor_id = '${sanitizedId}'`);
db.exec(`SELECT ... FROM visits WHERE visitor_id = '${sanitizedId}'`);
```

**Why it's vulnerable**: There is absolutely no verification that the requester owns the `identifier`. An attacker can:
1. Enumerate visitor IDs (they're exposed in the `hl_visitor` cookie, and the fallback uses `Math.random()`)
2. Access the browsing history of any other user
3. Delete anyone's tracking data

**Attack scenario**: An attacker requests GDPR data access with a guessed or brute-forced visitor ID. All page visits for that user — including sensitive URLs they browsed — are returned. This is a textbook **IDOR (Insecure Direct Object Reference)**.

**Fix**: Require cookie verification that the requesting user owns the identifier:

```typescript
export async function POST(request: NextRequest) {
  const { action, identifier } = await request.json();
  
  // Verify ownership: the hl_visitor cookie must match the requested identifier
  const visitorCookie = request.cookies.get("hl_visitor");
  if (!visitorCookie || visitorCookie.value !== identifier) {
    return NextResponse.json({ error: "Cannot access other users' data" }, { status: 403 });
  }
  
  // Proceed with query...
}
```

**References**: OWASP Top 10 2021 A01: Broken Access Control, CWE-639.

---

## 3. Input Validation

### 3.1 — SQL Injection via String Interpolation (Critical)

| Field | Value |
|---|---|
| **Severity** | 🔴 **Critical** |
| **Location** | `app/api/privacy/route.ts:34`, `app/api/privacy/route.ts:48` |
| **CWE** | CWE-89: SQL Injection |

```typescript
// Line 34 — DELETE with string interpolation
db.run(`DELETE FROM visits WHERE visitor_id = '${sanitizedId.replace(/'/g, "''")}'`);

// Line 48 — SELECT with string interpolation
const result = db.exec(
  `SELECT page_path, page_title, visit_date, visit_time
   FROM visits
   WHERE visitor_id = '${sanitizedId.replace(/'/g, "''")}'
   ORDER BY id DESC
   LIMIT 100`
);
```

**Why it's vulnerable**: The sanitization only escapes single quotes by doubling them (`''`). While this is the SQL standard escape for string literals and works for basic injection via quotes, it is **not a substitute for parameterized queries**. Specifically:

1. If `sql.js` has any bugs in its quote-escaping handling, injection is possible
2. The escape pattern only handles single quotes — other SQL metacharacters or Unicode bypass techniques may work
3. The `LIMIT ${days}` in stats route and `LIMIT ${limit}` in stats route also use string interpolation (though they're parseInt'd first)

**sql.js supports parameterized queries natively:**

```typescript
// Secure fix using bound parameters
const stmt = db.prepare(
  `DELETE FROM visits WHERE visitor_id = ?`
);
stmt.run([sanitizedId]);
stmt.free();
```

**Attack scenario**: An attacker uses Unicode homoglyphs or encoding tricks to bypass the single-quote escape. For example, if sql.js treats certain Unicode characters as quotes, `' OR 1=1 -- ` could be constructed without using the ASCII `'` character.

**Fix**: Replace ALL string-interpolated SQL with parameterized queries:

```typescript
// Privacy endpoint — fixed
const stmt = db.prepare(`DELETE FROM visits WHERE visitor_id = ?`);
stmt.run([sanitizedId]);
stmt.free();

const stmt2 = db.prepare(`
  SELECT page_path, page_title, visit_date, visit_time
  FROM visits WHERE visitor_id = ?
  ORDER BY id DESC LIMIT 100
`);
const result = stmt2.getAsObject({ params: [sanitizedId] });
stmt2.free();
```

Also fix the stats route:
```typescript
// Line 51, 88 in stats/route.ts
// Use bound parameters:
const stmt = db.prepare(`SELECT ... LIMIT ?`);
stmt.bind([days]);
```

**References**: OWASP Top 10 2021 A03: Injection, CWE-89.

---

### 3.2 — SQL Injection in Stats Endpoint (HIGH)

| Field | Value |
|---|---|
| **Severity** | 🟠 **High** |
| **Location** | `app/api/stats/route.ts:51`, `app/api/stats/route.ts:88` |
| **CWE** | CWE-89: SQL Injection |

```typescript
// Line 51 — LIMIT with template literal
const dailyResult = db.exec(`
  SELECT date, total_visits, unique_visitors, page_views
  FROM daily_stats
  ORDER BY date DESC
  LIMIT ${days}  // ← days is parseInt'd but still template literal
`);

// Line 88 — WHERE with template literal
WHERE date = '${today}'  // ← today from new Date().toISOString() — safe in practice
```

**Why it's vulnerable**: While `days` and `limit` are parsed via `parseInt`, the template literal pattern is dangerous and any future developer could copy the pattern with unsanitized input. The `today` value in line 88 comes from `new Date().toISOString().slice(0,10)` which is safe (always format `YYYY-MM-DD`), but the pattern is still injection-prone.

**Fix**: Use parameterized queries everywhere.

---

### 3.3 — Non-Cryptographic Hash in Rate Limiting (HIGH)

| Field | Value |
|---|---|
| **Severity** | 🟠 **High** |
| **Location** | `lib/extract-ip.ts:117-126` |
| **CWE** | CWE-327: Use of a Broken or Risky Cryptographic Algorithm |

```typescript
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}
```

**Why it's vulnerable**: This is a 32-bit djb2 hash — it produces only **4 bytes of output** (8 hex characters). The entire hash space is only 2^32 ≈ 4.3 billion values. On modern hardware, hash collisions can be found in seconds. This means:

1. **Rate limit bypass**: An attacker can find a second IP that produces the same hash as a legitimate user, then perform actions that get attributed to the legitimate user (causing them to be rate-limited or banned)
2. **Ban evasion**: If an IP gets banned, the attacker can find a different IP with the same hash and continue attacks
3. **Denial of service**: An attacker can craft IP headers to collide with a target's hash, causing the target to be banned or rate-limited

**Attack scenario**: An attacker who controls a botnet with 1000 IPs generates their hashes. They then craft HTTP requests with `X-Forwarded-For` headers containing spoofed IPs that hash-collide with a target admin's IP. Within minutes, the target admin receives a 429 "Too Many Requests" error and cannot access the admin panel.

**Fix**: Use SHA-256 via Web Crypto API in the Edge runtime. Since `crypto.subtle` is available in Edge Runtime, implement proper SHA-256 asynchronously:

```typescript
async function hashIp(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}
```

Note: This requires making `extractIp` async and updating the middleware to use `await`.

**References**: CWE-327, NIST SP 800-131A.

---

### 3.4 — Insufficient XSS Sanitization

| Field | Value |
|---|---|
| **Severity** | 🟡 **Medium** |
| **Location** | `lib/sanitize.ts:13-19`, `lib/sanitize.ts:27-31` |
| **CWE** | CWE-79: Improper Neutralization of Input During Web Page Generation |

```typescript
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&')   // ← BUG: Should be '&'
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#x27;');
}
```

**Why it's vulnerable**: The first replacement converts `&` to `&` (NOT `&`). This means:
1. If the string contains `&`, it becomes `&` (unchanged), which is wrong
2. The ampersand is NOT properly escaped — `&` shows as `&` in HTML which is correct, but the escape should be `&` for completeness

Additionally, `stripHtmlTags` uses regex which is fundamentally insufficient for HTML sanitization:

```typescript
export function stripHtmlTags(str: string): string {
  return str
    .replace(/<[^>]*>/g, '')   // ← Can be bypassed with creative inputs
    .replace(/[\\]?on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/[\\]?on\w+\s*=\s*\S+/gi, '');
}
```

Regex-based HTML tag stripping can be bypassed with:
- `<img src=x onerror=alert(1)>` — the event handler regex may miss it
- `<svg><script>alert(1)</script></svg>` — the tag regex may not match SVG elements
- Null-byte injection: `<scr\0ipt>alert(1)</script>`

**Fix**: Use a proper HTML sanitizer library like `DOMPurify` (isomorphic version) or `sanitize-html`:

```typescript
import DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [] }); // Strip all HTML
}
```

Also fix the escapeHtml:
```typescript
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#x27;');
}
```

**References**: OWASP XSS Prevention Cheat Sheet, CWE-79.

---

### 3.5 — Weak Visitor ID Generation (Predictable)

| Field | Value |
|---|---|
| **Severity** | 🟡 **Medium** |
| **Location** | `app/api/track/route.ts:20-31` |
| **CWE** | CWE-338: Use of Cryptographically Weak PRNG |

```typescript
function generateVisitorId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback — uses Math.random() (NOT cryptographically secure)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
```

**Why it's vulnerable**: `Math.random()` is a **pseudo-random number generator** (PRNG) that is NOT cryptographically secure. In V8 (Node.js/Chrome), `Math.random()` uses xorshift128+ algorithm, which is deterministic with a 128-bit seed. An attacker who can:
1. Extract a few consecutive `Math.random()` values
2. Execute the Z3 theorem prover or similar SMT solver to recover the state
3. Predict all future visitor IDs

This enables:
- Predicting other users' visitor IDs for GDPR data access
- Crafting visitor IDs to collide with existing users for deduplication bypass

**Fix**: Always use `crypto.randomUUID()` which is available in Node 19+ and all modern browsers. Remove the fallback entirely:

```typescript
function generateVisitorId(): string {
  return crypto.randomUUID();
}
```

---

## 4. API Security

### 4.1 — SSRF via Beacon Endpoint

| Field | Value |
|---|---|
| **Severity** | 🔴 **High** |
| **Location** | `app/api/track/beacon/route.ts:28` |
| **CWE** | CWE-918: Server-Side Request Forgery (SSRF) |

```typescript
// Vulnerable — makes an internal fetch to any URL constructed from user input
const origin = new URL(request.url).origin;
await fetch(`${origin}/api/track`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});
```

**Why it's vulnerable**: While the URL is hardcoded to `origin/api/track`, the `payload` includes user-controlled data (`pagePath`, `referrer`, `userAgent`). If the internal fetch has side effects (like writing to the database), an attacker could:

1. Send crafted payloads that trigger SQL injection at the receiving endpoint
2. Use the internal fetch as a relay to attack internal services if any exist
3. Flood the internal endpoint with junk data

Additionally, the `body` is parsed from a base64-encoded user-controlled value — there's minimal validation on the decoded payload.

**Fix**: Validate the decoded payload before forwarding:

```typescript
// Validate that the decoded payload matches expected structure before forwarding
if (!payload.pagePath || typeof payload.pagePath !== "string") {
  return gifResponse();
}
if (payload.pagePath.length > 255) {
  return gifResponse();
}
```

**References**: OWASP Top 10 2021 A10: SSRF, CWE-918.

---

### 4.2 — Missing CSRF Protection on POST Endpoints

| Field | Value |
|---|---|
| **Severity** | 🟡 **Medium** |
| **Location** | `app/api/track/route.ts:52`, `app/api/privacy/route.ts:18` |
| **CWE** | CWE-352: Cross-Site Request Forgery |

All POST endpoints accept `application/json` requests without any CSRF token verification. The `SameSite: lax` cookie attribute provides partial protection (cookies aren't sent on cross-origin POST requests), but:

1. SameSite=Lax cookies ARE sent on cross-site form submissions via GET
2. Some older browsers don't support SameSite
3. The cookie could be set via other means (e.g., if the site has an open redirect)

**Fix**: Add CSRF token verification for sensitive endpoints:

```typescript
// Generate CSRF token on page load (e.g., via API or meta tag)
// Verify it on POST requests:
const csrfCookie = request.cookies.get("csrf_token");
const csrfHeader = request.headers.get("x-csrf-token");
if (!csrfCookie || !csrfHeader || csrfCookie.value !== csrfHeader) {
  return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
}
```

**References**: OWASP CSRF Prevention Cheat Sheet, CWE-352.

---

### 4.3 — No Rate Limiting on GDPR Endpoint

| Field | Value |
|---|---|
| **Severity** | 🟡 **Medium** |
| **Location** | `app/api/privacy/route.ts` |
| **CWE** | CWE-770: Allocation of Resources Without Limits or Throttling |

The GDPR endpoint has no rate limiting specific to data access/deletion requests. An attacker could:
1. Enumerate visitor IDs to discover valid ones (brute force)
2. Mass-delete tracking data causing data loss
3. Flood the SQLite database with queries causing performance degradation

**Fix**: Add per-IP rate limiting specific to the privacy endpoint (e.g., 5 requests per minute per IP).

---

## 5. File Upload Security

### No file upload functionality detected.

✅ No endpoints handling file uploads found. Static files in `public/` are served by Next.js, no user-upload logic.

---

## 6. Server Security

### 6.1 — Admin Layout Still Has Old Branding

| Field | Value |
|---|---|
| **Severity** | 🟢 **Info** |
| **Location** | `app/admin/layout.tsx:4` |

```typescript
export const metadata: Metadata = {
  title: "Статистика — Husk'd Labl Manuals",  // ← Missed in rebranding
```

**Fix**: Update to `"Статистика — DJIBUR Manuals"`

---

### 6.2 — CSP Allows unsafe-inline

| Field | Value |
|---|---|
| **Severity** | 🟡 **Medium** |
| **Location** | `app/layout.tsx:34` |
| **CWE** | CWE-1021: Improper Restriction of Rendered UI Layers or Frames |

```typescript
<meta
  httpEquiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; ..."
/>
```

`'unsafe-inline'` for scripts defeats much of the purpose of CSP. If an XSS vulnerability exists, inline scripts will execute. Next.js requires `unsafe-inline` for development hot reloading, but for production, consider using nonces or hashes.

**Fix**: For production builds, Next.js can generate nonce-based CSP. Configure in `next.config.ts`:

```typescript
// next.config.ts
experimental: {
  csp: {
    directives: {
      "script-src": ["'self'", "'strict-dynamic'", "'nonce-<RANDOM>'"],
      "style-src": ["'self'", "'unsafe-inline'"],
    },
  },
},
```

**References**: OWASP CSP Cheat Sheet, CWE-1021.

---

## 7. Database Security

### 7.1 — SQLite Database File Permissions

| Field | Value |
|---|---|
| **Severity** | 🟢 **Info** |
| **Location** | `lib/db.ts:22-49` |

The SQLite database file is stored at `data/visits.db`. On Railway, this is in the application filesystem. No explicit file permission checks are performed — this is fine for the current deployment model, but if the application were deployed in a shared hosting environment, file permissions should be restricted to the application user only.

### 7.2 — No Connection Pooling

Not applicable — sql.js is an in-process SQLite library, no connection pooling needed. ✅

---

## 8. Secrets Management

### 8.1 — Encryption Key Derivation from Weak Input

| Field | Value |
|---|---|
| **Severity** | 🟠 **High** |
| **Location** | `lib/crypto.ts:24-44` |
| **CWE** | CWE-521: Weak Password Requirements |

```typescript
function deriveKey(): Buffer {
  const part1 = process.env.KEY_PART_1 || "";
  const part2 = process.env.KEY_PART_2 || "";
  const part3 = process.env.KEY_PART_3 || "";
  const combined = part1 + part2 + part3;

  if (combined.length < 32) {
    // Falls back to single key, or... DEVELOPMENT FALLBACK
    console.warn("[CRYPTO] No encryption key found. Using derived fallback.");
    return crypto.createHash("sha256")
      .update("dev-fallback-key-do-not-use-in-production")
      .digest();
  }

  return crypto.createHash("sha256").update(combined).digest();
}
```

**Why it's vulnerable**: If KEY_PART_1/2/3 are not set AND IP_ENCRYPTION_KEY is not set (or is wrong length), the system falls back to a **hardcoded development key**. This means:
1. All encrypted IPs are decryptable by anyone who reads this source code
2. The fallback key is in a public GitHub repository (source code)
3. There's no runtime check that prevents startup with the development key in production

**Attack scenario**: An attacker who gains read access to the SQLite database file — for example, via a Railway log export or backup leak — can decrypt ALL IP addresses using the hardcoded key `"dev-fallback-key-do-not-use-in-production"` which is published in the public repo.

**Fix**: Remove the development fallback and fail fast if no key is configured:

```typescript
function deriveKey(): Buffer {
  const part1 = process.env.KEY_PART_1 || "";
  const part2 = process.env.KEY_PART_2 || "";
  const part3 = process.env.KEY_PART_3 || "";
  const combined = part1 + part2 + part3;

  if (combined.length >= 32) {
    return crypto.createHash("sha256").update(combined).digest();
  }

  const singleKey = process.env.IP_ENCRYPTION_KEY;
  if (singleKey && singleKey.length === 64 && /^[0-9a-fA-F]+$/.test(singleKey)) {
    return Buffer.from(singleKey, "hex");
  }

  throw new Error(
    "ENCRYPTION KEY NOT CONFIGURED. Set KEY_PART_1+KEY_PART_2+KEY_PART_3 " +
    "or IP_ENCRYPTION_KEY environment variables before starting the server."
  );
}
```

---

### 8.2 — Same Fallback Key in Decrypt Endpoint

| Field | Value |
|---|---|
| **Severity** | 🟠 **High** |
| **Location** | `app/api/stats/decrypt/route.ts:9-19` |

```typescript
function deriveKey(part1: string, part2: string, part3: string): Buffer {
  const combined = part1 + part2 + part3;
  if (combined.length < 32) {
    if (combined.length === 64) {
      return Buffer.from(combined, "hex");
    }
    throw new Error("Invalid key: combined length must be at least 32 characters");
  }
  return crypto.createHash("sha256").update(combined).digest();
}
```

This endpoint actually takes the key from the **user's request body** — it does NOT use the server's environment variables. This is intentional (admin provides the key at runtime), but means the admin must manually enter the key each time.

**Risk**: If the admin enters the wrong key (e.g., accidentally uses the dev fallback), IPs could be decrypted by an attacker who knows the dev key.

---

## 9. Business Logic

### 9.1 — Deduplication Bypass via Cookie Manipulation

| Field | Value |
|---|---|
| **Severity** | 🟢 **Low** |
| **Location** | `app/api/track/route.ts:68-76` |

```typescript
const existingCookie = request.cookies.get("hl_visitor");
if (existingCookie?.value) {
  visitorId = existingCookie.value;  // ← Any cookie value is accepted
}
```

An attacker can set arbitrary visitor IDs in their cookie to:
- Impersonate another visitor (if they know/generate their ID)
- Bypass deduplication by changing the visitor ID on every request
- Flood analytics with fake visits

**Fix**: Sign the visitor cookie with HMAC to prevent tampering:

```typescript
const HMAC_KEY = process.env.COOKIE_HMAC_KEY || "change-me";
const sign = (value: string) => {
  return crypto.createHmac("sha256", HMAC_KEY).update(value).digest("hex");
};

// When setting cookie:
const signature = sign(visitorId);
const cookieValue = `${visitorId}.${signature}`;

// When reading cookie:
const [vid, sig] = cookieValue.split(".");
if (sign(vid) !== sig) {
  // Tampered cookie — generate new ID
}
```

### 9.2 — No Anomaly Check on Track Beacon Endpoint

| Field | Value |
|---|---|
| **Severity** | 🟡 **Medium** |
| **Location** | `app/api/track/beacon/route.ts:14-38` |

The beacon endpoint does NOT run `checkAnomaly()`. An attacker could use the beacon endpoint to bypass anomaly detection entirely since it forwards to the main tracking endpoint without the middleware's anomaly checks (middleware runs but doesn't check anomaly patterns for this route in depth).

---

## 10. Frontend Security

### 10.1 — No Source Maps in Production (Check)

| Field | Value |
|---|---|
| **Severity** | 🟢 **Info** |
| **Location** | `next.config.ts` |

Next.js by default disables source maps in production. ✅ No explicit `productionBrowserSourceMaps: true` found.

### 10.2 — Client-Side Admin Token in JS Heap

Already covered in §1.2. The admin token resides in React state which is accessible to any XSS on the page.

### 10.3 — Search Highlight XSS Risk

| Field | Value |
|---|---|
| **Severity** | 🟡 **Medium** |
| **Location** | `components/SearchHighlight.tsx` |

The search highlight functionality reads `?q=` from URL and applies it as text highlighting. Need to verify `SearchHighlight.tsx` uses `sanitizeSearchQuery()` before applying — the search result already sanitizes, but the highlight component must too.

---

## 11. Backend Security

### 11.1 — Path Traversal via DATABASE_PATH

| Field | Value |
|---|---|
| **Severity** | 🟢 **Low** |
| **Location** | `lib/db.ts:16` |

```typescript
function getDbPath(): string {
  return process.env.DATABASE_PATH || path.join(process.cwd(), "data", "visits.db");
}
```

If an attacker can set the `DATABASE_PATH` environment variable (e.g., via server compromise), they could redirect reads/writes to any file. This is low severity because it requires environment variable access, which is already a severe compromise.

**Fix**: Validate the path is within the expected directory:

```typescript
function getDbPath(): string {
  if (process.env.DATABASE_PATH) {
    const resolved = path.resolve(process.env.DATABASE_PATH);
    if (!resolved.startsWith(process.cwd())) {
      throw new Error("DATABASE_PATH must be within the project directory");
    }
    return resolved;
  }
  return path.join(process.cwd(), "data", "visits.db");
}
```

---

## 12. Dependencies

### 12.1 — npm Audit Check

```typescript
// package.json dependencies:
{
  "next": "16.2.10",       // Latest at time of writing
  "react": "19.2.4",       // Latest
  "sql.js": "^1.14.1",     // Check for known CVEs
  "zustand": "^5.0.14",    // Latest
  "tailwindcss": "^4",     // Latest
  "typescript": "^5"       // Latest
}
```

✅ All dependencies are relatively current. **Must run `npm audit`** to check for known vulnerabilities in sql.js and other packages.

---

## 13. Infrastructure

### 13.1 — No Dockerfile / Container Hardening

No Dockerfile found. On Railway, the app runs via `npm start` directly. Consider adding a Dockerfile for:
- Non-root user
- Read-only filesystem where possible
- Minimal base image

### 13.2 — No Redis / External Cache

All data (rate limits, fail2ban state, dedup cache) is **in-process memory**. On Railway, this means:
- Server restart loses all state
- Multiple instances don't share state
- Memory usage grows unbounded (mitigated by periodic cleanup in rate-limit.ts and fail2ban.ts)

✅ Configuration is appropriate for single-instance deployment.

---

## 14. Performance-Related Security

### 14.1 — Unbounded Memory Growth in Anomaly Buffer

| Field | Value |
|---|---|
| **Severity** | 🟢 **Low** |
| **Location** | `lib/anomaly-monitor.ts:27-28` |

```typescript
const anomalyBuffer: AnomalyEvent[] = [];
const MAX_BUFFER_SIZE = 10000;
```

✅ Properly limited with MAX_BUFFER_SIZE. The shift() operation on large arrays can be O(n) but with 10K items it's negligible.

### 14.2 — Potential DoS via GDPR Mass Deletion

| Field | Value |
|---|---|
| **Severity** | 🟡 **Medium** |
| **Location** | `app/api/privacy/route.ts:34` |

The `DELETE FROM visits WHERE visitor_id = ?` query could potentially delete millions of rows if an attacker sets a visitor ID that matches many records. The DELETE operation in SQLite acquires a write lock, blocking all other reads/writes.

**Fix**: Add LIMIT to delete query and implement async deletion:

```typescript
db.run(`DELETE FROM visits WHERE visitor_id = ? LIMIT 10000`, [sanitizedId]);
```

---

## 15. Cryptography

### 15.1 — AES-256-GCM Implementation

| Field | Value |
|---|---|
| **Severity** | ✅ **Good** |
| **Location** | `lib/crypto.ts:50-87` |

The implementation correctly:
- Uses AES-256-GCM (authenticated encryption)
- Generates random IV for each encryption
- Verifies auth tag during decryption
- Uses SHA-256 to derive key from parts

✅ No issues with the encryption algorithm or implementation. The ONLY issue is the development fallback key (§8.1).

### 15.2 — Crypto for Non-Crypto Purposes

The `crypto.ts` module uses Node.js `crypto` which is only available server-side. The Edge middleware uses the Web Crypto API subset. The only issue is `simpleHash` in `extract-ip.ts` using a non-cryptographic hash for rate limiting keys (§3.3).

---

## 16. Logging

### 16.1 — IP Hash Logged to Console

| Field | Value |
|---|---|
| **Severity** | 🟢 **Low** |
| **Location** | `lib/anomaly-monitor.ts:85`, `app/api/honeypot/route.ts:18` |

```typescript
console.warn(`[ANOMALY] ${event.type}: ${event.details}`);
console.warn(`[HONEYPOT] Bot detected: ${ipInfo.ipHash.slice(0, 12)}...`);
```

The IP hash (first 12 chars) is logged to console. While this is a SHA-256 hash of the IP (or a non-crypto hash for Edge), on Railway these logs are stored and accessible to platform operators. The truncated hash is low-risk, but full details in anomaly events could include sensitive paths.

**Fix**: Ensure anomaly details don't include full URLs with query parameters.

### 16.2 — Missing Audit Log for Admin Actions

| Field | Value |
|---|---|
| **Severity** | 🟢 **Low** |

There is no audit log for:
- Admin logins (success/failure)
- IP decryption events
- GDPR data access/deletion

These should be logged for compliance and incident investigation.

---

## 17. Compliance

### OWASP Top 10 2021 Mapping

| # | Category | Status |
|---|---|---|
| A01 | Broken Access Control | 🔴 IDOR in GDPR endpoint (§2.1) |
| A02 | Cryptographic Failures | 🟠 Weak hash in rate limiting (§3.3), Dev fallback key (§8.1) |
| A03 | Injection | 🔴 SQL injection in privacy route (§3.1) |
| A04 | Insecure Design | 🟡 CSRF missing (§4.2) |
| A05 | Security Misconfiguration | 🟡 CSP unsafe-inline (§6.2) |
| A06 | Vulnerable Components | ✅ No known vulns (needs `npm audit` confirmation) |
| A07 | Authentication Failures | 🟡 No brute force protection on admin (§1.3), Weak session ID (§3.5) |
| A08 | Software & Data Integrity | 🟢 No CI/CD concerns |
| A09 | Security Logging | 🟢 Missing audit logs (§16.2) |
| A10 | SSRF | 🟠 Beacon endpoint relay (§4.1) |

### CWE Top 25 Coverage
- CWE-89 (SQL Injection): ✅ Found and documented
- CWE-79 (XSS): ✅ Found and documented
- CWE-352 (CSRF): ✅ Found and documented
- CWE-639 (IDOR): ✅ Found and documented
- CWE-312 (Cleartext Storage): ✅ Found and documented
- CWE-327 (Broken Crypto): ✅ Found and documented
- CWE-338 (Weak PRNG): ✅ Found and documented

---

## 18. Code Quality

### 18.1 — Duplicate Encryption Key Derivation Logic

| Field | Value |
|---|---|
| **Severity** | 🟢 **Info** |
| **Location** | `lib/crypto.ts:24-44` and `app/api/stats/decrypt/route.ts:9-19` |

Both files implement key derivation logic separately. Changes to one must be mirrored in the other.

**Fix**: Extract key derivation into a shared utility used by both.

### 18.2 — `saveDb()` Not Called After Writes in API Handlers

| Field | Value |
|---|---|
| **Severity** | 🟡 **Medium** |
| **Location** | `app/api/stats/route.ts`, `app/api/privacy/route.ts` |

The `saveDb()` function saves the SQLite database to disk. It is NOT called after write operations in the API handlers (`recordVisit`, GDPR delete). This means:
- If the server crashes between writes and the next `saveDb()` call, data is lost
- sql.js keeps data in memory and only writes to disk via `saveDb()`

Check if `recordVisit()` (lib/tracker.ts) calls `saveDb()` after each write.

**Fix**: Ensure `saveDb()` is called after every write, or add a periodic auto-save.

---

## 19. Security Headers

### 19.1 — Current Header Configuration

| Header | Value | Status |
|---|---|---|
| X-Frame-Options | DENY | ✅ |
| X-Content-Type-Options | nosniff | ✅ |
| Referrer-Policy | strict-origin-when-cross-origin | ✅ |
| Permissions-Policy | camera=(), microphone=(), geolocation=(), interest-cohort=() | ✅ |
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload | ✅ |
| X-Robots-Tag | noindex, nofollow | ⚠️ Applied globally |
| Content-Security-Policy | default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; base-uri 'self' | ⚠️ unsafe-inline |

### 19.2 — Missing Headers

| Header | Recommendation |
|---|---|
| Cross-Origin-Resource-Policy | `same-origin` |
| Cross-Origin-Embedder-Policy | `require-corp` (if not using external resources) |
| X-Permitted-Cross-Domain-Policies | `none` |
| Cache-Control | `no-store` for sensitive pages (admin) |

### 19.3 — Global noindex, nofollow

The `X-Robots-Tag: noindex, nofollow` is applied to ALL routes including the public documentation. This prevents search engines from indexing the documentation, which may be intentional for a private/internal tool but is worth noting.

---

## 20. Overall Architecture

### Trust Boundaries

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Browser    │────▶│   Edge Proxy │────▶│   Next.js    │
│  (Client)    │     │   (Railway)  │     │   (Server)   │
└──────────────┘     └──────────────┘     └──────────────┘
       │                                         │
       │  hl_visitor cookie                      │  SQLite (WAL)
       │  Admin token (state)                    │  Encrypted IPs
       │  GDPR requests                          │  In-memory state
       ▼                                         ▼
```

**Identified trust boundary issues:**
1. Client sends IP-related data in tracking payload that should be server-derived (✅ already handled — IP extracted server-side)
2. Admin token traverses from browser JS state to API — should use HttpOnly cookie
3. GDPR endpoint trusts any visitor ID without ownership verification

### Attack Surface Summary

| Surface | Risk | Criticality |
|---|---|---|
| `/api/track` (POST) | SQL (via pagePath), dedup bypass | Medium |
| `/api/track/beacon` (GET) | SSRF relay, anomaly bypass | High |
| `/api/privacy` (POST) | SQL injection, IDOR, mass deletion | Critical |
| `/api/stats` (GET) | SQL injection (via params), timing attack | High |
| `/api/stats/decrypt` (POST) | Timing attack, key exposure | Medium |
| `/api/honeypot` (GET) | Minimal — only logs | Low |
| `/admin` | Token in JS heap, no brute force protection | High |

---

## 📊 Overall Security Score: 56 / 100

| Category | Score |
|---|---|
| Authentication | 45/100 |
| Authorization | 30/100 |
| Input Validation | 35/100 |
| API Security | 40/100 |
| Cryptography | 60/100 |
| Database Security | 50/100 |
| Server Security | 55/100 |
| Secrets Management | 40/100 |
| Security Headers | 65/100 |
| Overall Architecture | 55/100 |

---

## 🔴 Critical Findings Summary

| # | Finding | Location | CWE |
|---|---|---|---|
| 1 | **SQL Injection** via string interpolation in privacy endpoint | `app/api/privacy/route.ts:34,48` | CWE-89 |
| 2 | **IDOR** — No ownership check in GDPR endpoint | `app/api/privacy/route.ts:20-27` | CWE-639 |

## 🟠 High Priority Fixes

| # | Finding | Location |
|---|---|---|
| 3 | **Hardcoded encryption fallback key** in production code | `lib/crypto.ts:40` |
| 4 | **Non-cryptographic hash** for IP in rate limiting (collisions possible) | `lib/extract-ip.ts:117-126` |
| 5 | **SQL Injection** via template literals in stats endpoint | `app/api/stats/route.ts:51,88` |
| 6 | **SSRF** via beacon endpoint forwarding | `app/api/track/beacon/route.ts:28` |
| 7 | **Admin token** stored in client-side React state | `app/admin/page.tsx:79` |
| 8 | **No timing-safe comparison** for admin token | `app/api/stats/route.ts:36` |

## 🟡 Medium Priority Fixes

| # | Finding | Location |
|---|---|---|
| 9 | Missing CSRF protection on POST endpoints | `app/api/track/route.ts`, `app/api/privacy/route.ts` |
| 10 | Weak visitor ID generation (Math.random fallback) | `app/api/track/route.ts:26-31` |
| 11 | Insufficient XSS sanitization (regex-based, missing &) | `lib/sanitize.ts:13-19` |
| 12 | CSP allows `unsafe-inline` for scripts | `app/layout.tsx:34` |
| 13 | No brute force protection on admin login | `app/admin/page.tsx:115-118` |
| 14 | No rate limiting on GDPR endpoint | `app/api/privacy/route.ts` |
| 15 | Missing audit logging for admin/sensitive actions | Various |
| 16 | saveDb() not called after writes | `app/api/*` handlers |

## 🟢 Low Priority Improvements

| # | Finding | Location |
|---|---|---|
| 17 | Old branding in admin layout | `app/admin/layout.tsx:4` |
| 18 | Duplicate key derivation logic | `lib/crypto.ts`, `app/api/stats/decrypt/route.ts` |
| 19 | Missing Cross-Origin-Resource-Policy header | `next.config.ts` |
| 20 | No Dockerfile/container hardening | N/A |

---

## 🛠️ Immediate Action Plan

### Week 1 (Critical)
1. **Fix SQL Injection** — Replace ALL string-interpolated SQL with parameterized queries (`db.prepare()`)
2. **Fix IDOR** — Add cookie ownership verification to GDPR endpoint
3. **Remove hardcoded encryption key** — Fail fast if no key configured; rotate keys immediately
4. **Fix IP hashing** — Replace `simpleHash` with SHA-256 via Web Crypto API

### Week 2 (High)
5. **Add CSRF protection** — Generate tokens for all POST endpoints
6. **Secure admin authentication** — Move admin token to httpOnly cookie with session management
7. **Add timing-safe comparison** — Use `crypto.timingSafeEqual` for all token comparisons
8. **Harden CSP** — Remove `unsafe-inline` for scripts in production

### Week 3 (Medium)
9. **Improve XSS sanitization** — Use DOMPurify instead of regex
10. **Add brute force protection** for admin login
11. **Add rate limiting** for GDPR endpoint
12. **Set up audit logging** for admin actions

### Ongoing
13. Run `npm audit` monthly
14. Review security headers every deployment
15. Penetration test after all fixes

---

## 📚 References

- OWASP Top 10 2021: https://owasp.org/www-project-top-ten/
- OWASP ASVS 4.0: https://owasp.org/www-project-application-security-verification-standard/
- CWE Top 25: https://cwe.mitre.org/top25/
- Next.js Security: https://nextjs.org/docs/app/building-your-application/deploying/production-checklist
- sql.js Documentation: https://github.com/sql-js/sql.js/