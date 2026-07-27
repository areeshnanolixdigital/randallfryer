// Site-wide identity, contact, and external-link constants.
// Single source of truth for A2P / TCR compliance-critical values — the SAME
// legal business name and contact details must appear in the footer, Contact
// page, Privacy Policy, Terms of Service, and SMS consent language.

// Legal business name — must match the committee's CP 575 (IRS EIN letter) and
// the A2P 10DLC registration EXACTLY. Verify before submitting registration.
export const LEGAL_BUSINESS_NAME = "Randall Fryer For Representative";

// Contact details from the CI-0216 campaign intake — must match what is
// submitted during A2P 10DLC registration exactly.
export const CONTACT_PHONE = "(971) 404-6743";
export const CONTACT_PHONE_HREF = "tel:+19714046743";
// Business email assigned by Op1776.
export const CONTACT_EMAIL = "Randall@randallfororegon.com";

// Public mailing address — intentionally EMPTY.
//
// The address supplied at intake is residential and must not be published: it
// is a family-safety risk. A PO box is being arranged to replace it. Every
// consumer of this constant (footer, Privacy Policy, Terms of Service) omits
// the address gracefully while it is blank, so setting the PO box here is the
// only change needed to publish it site-wide.
//
// NOTE: A2P 10DLC / TCR registration expects a public business address. Until
// the PO box is in place the site does not display one.
export const CONTACT_ADDRESS = "";

// Donations are handled off-site by WinRed — there is no on-site donate page.
export const DONATE_URL =
  "https://secure.winred.com/randall-fryer-for-representative/donate-today";
