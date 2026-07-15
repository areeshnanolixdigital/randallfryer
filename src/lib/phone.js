// Canonical phone formatting, per forms-compliance-pattern.md §2.
//
// All in-scope forms store and submit phone as "+1 (xxx) xxx-xxxx". We own the
// +1 country code: any leading 1 / +1 the user types or pastes is stripped and
// replaced by our pre-set +1. Partial entries normalize to an empty string
// server-side (phone stays optional).

/** Digits only, with a single leading country-code 1 removed. Capped at 10. */
function nationalDigits(raw) {
  let digits = (raw || "").replace(/\D/g, "");
  if (digits.startsWith("1")) digits = digits.slice(1); // we own the +1
  return digits.slice(0, 10);
}

/**
 * Live client-side formatter — bind to the phone input's onChange.
 * Returns "" for empty/`+1`-only input so the field can be cleared.
 */
export function formatPhoneInput(raw) {
  const digits = nationalDigits(raw);
  if (digits.length === 0) return "";
  let out = `+1 (${digits.slice(0, 3)}`;
  if (digits.length > 3) out += `) ${digits.slice(3, 6)}`;
  if (digits.length > 6) out += `-${digits.slice(6, 10)}`;
  return out;
}

/**
 * Server-side canonical producer — use in API route payloads.
 * A complete 10-digit number becomes "+1 (xxx) xxx-xxxx"; anything shorter
 * (partial entry) becomes "" so we never ship a half phone number.
 */
export function normalizePhoneForSubmit(raw) {
  const digits = nationalDigits(raw);
  if (digits.length !== 10) return "";
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}
