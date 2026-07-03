/**
 * Sanitization utilities for XSS prevention.
 *
 * These functions escape HTML special characters to prevent
 * Cross-Site Scripting (XSS) attacks via user-supplied input.
 */

/**
 * HTML-encode special characters: < > " ' &
 *
 * Use this before inserting any user-supplied string into HTML context.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#x27;');
}

/**
 * Strip HTML tags from a string entirely.
 * Also removes event handler attributes like onclick=.
 */
export function stripHtmlTags(str: string): string {
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/[\\]?on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/[\\]?on\w+\s*=\s*\S+/gi, '');
}

/**
 * Sanitize a search query: strip HTML, trim whitespace,
 * and limit length to prevent abuse.
 */
export function sanitizeSearchQuery(input: string, maxLength = 200): string {
  return stripHtmlTags(input).trim().slice(0, maxLength);
}
