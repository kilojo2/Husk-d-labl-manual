/**
 * Server-side IP extraction from HTTP request headers.
 *
 * Extracts the real client IP address from a chain of headers,
 * validates it, masks the last octet for GDPR compliance,
 * and computes a SHA-256 hash for deduplication.
 *
 * Header priority (most reliable first):
 * 1. CF-Connecting-IP (Cloudflare)
 * 2. X-Real-IP (NGINX / Railway edge)
 * 3. X-Forwarded-For (first public IP in chain)
 * 4. req.socket.remoteAddress (fallback)
 */

import crypto from "crypto";
import { NextRequest } from "next/server";

export interface IpInfo {
  /** Masked IP address (last octet zeroed) for GDPR compliance */
  ip: string;
  /** SHA-256 hash of the full IP for deduplication */
  ipHash: string;
  /** Whether the request appears to come from a proxy / VPN */
  isProxy: boolean;
  /** The raw X-Forwarded-For chain (for analysis) */
  forwardedChain: string[];
}

/**
 * Extract the real client IP from request headers.
 */
export function extractIp(request: NextRequest): IpInfo {
  const headers = request.headers;

  // 1. Cloudflare
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp && isValidIp(cfIp)) {
    return buildIpInfo(cfIp, []);
  }

  // 2. X-Real-IP
  const realIp = headers.get("x-real-ip");
  if (realIp && isValidIp(realIp)) {
    return buildIpInfo(realIp, []);
  }

  // 3. X-Forwarded-For chain
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const chain = forwardedFor
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    // Find the first public (non-private) IP in the chain
    const publicIp = chain.find((ip) => isValidIp(ip) && !isPrivateIp(ip));
    if (publicIp) {
      return buildIpInfo(publicIp, chain);
    }
    // Fall back to last IP in chain (closest to origin)
    const lastIp = chain[chain.length - 1];
    if (lastIp && isValidIp(lastIp)) {
      return buildIpInfo(lastIp, chain);
    }
  }

  // 4. Socket fallback (Next.js request.ip)
  const socketIp = (request as any).ip || "0.0.0.0";
  return buildIpInfo(socketIp, []);
}

function buildIpInfo(ip: string, chain: string[]): IpInfo {
  return {
    ip: maskIp(ip),
    ipHash: hashIp(ip),
    isProxy: detectProxy(chain),
    forwardedChain: chain,
  };
}

/**
 * Mask the last octet for GDPR compliance.
 * IPv4: 192.168.1.100 → 192.168.1.0
 * IPv6: 2001:db8::1 → 2001:db8::
 */
function maskIp(ip: string): string {
  if (ip.includes(":")) {
    // IPv6 — mask last 80 bits (keep network prefix only)
    return ip.replace(/([0-9a-fA-F]+)(:[0-9a-fA-F]+){4}$/, "0:0:0:0");
  }
  // IPv4 — mask last octet
  return ip.replace(/\.\d+$/, ".0");
}

/**
 * SHA-256 hash of the full IP (for unique visitor counting).
 */
function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

/**
 * Detect if the request went through a known proxy / VPN.
 * Multiple hops in X-Forwarded-For is a strong indicator.
 */
function detectProxy(chain: string[]): boolean {
  if (chain.length > 2) return true; // Multiple hops = likely proxy
  return false;
}

/**
 * Validate an IP address string (IPv4 or IPv6).
 */
function isValidIp(ip: string): boolean {
  const ipv4Regex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  const ipv6Regex = /^[0-9a-fA-F:]+$/;
  if (ipv4Regex.test(ip)) {
    return ip.split(".").every((octet) => parseInt(octet, 10) <= 255);
  }
  return ipv6Regex.test(ip);
}

/**
 * Check if IP is in private / reserved ranges.
 */
function isPrivateIp(ip: string): boolean {
  if (ip.includes(":")) {
    return ip.startsWith("fc") || ip.startsWith("fd") || ip === "::1";
  }
  const parts = ip.split(".").map(Number);
  return (
    parts[0] === 10 ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168) ||
    parts[0] === 127 ||
    parts[0] === 0
  );
}
