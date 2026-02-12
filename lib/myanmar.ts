/**
 * Detects if text contains Myanmar (Burmese) script.
 * Unicode ranges: Myanmar (U+1000–U+109F), Myanmar Extended-A (U+AA60–U+AA7F), Myanmar Extended-B (U+A9E0–U+A9FF).
 */
export function hasMyanmarScript(text: string): boolean {
  if (!text || typeof text !== "string") return false;
  return /[\u1000-\u109F\uAA60-\uAA7F\uA9E0-\uA9FF]/.test(text);
}
