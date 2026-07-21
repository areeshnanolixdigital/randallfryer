// A2P-compliant SMS consent text, per the Op1776 A2P Website Compliance SOP
// (Step 6) and ghl-forms-webhooks.md §2. Every form that collects a phone
// number must render BOTH consent checkboxes, each using active opt-in phrasing
// ("I agree to receive…") and naming the legal business name.

// Legal business name — single source of truth in constants/site.js so the
// Privacy Policy, Terms of Service, footer copyright, Contact page, and A2P
// registration all stay in sync.
import { LEGAL_BUSINESS_NAME } from "@/constants/site";

export { LEGAL_BUSINESS_NAME };

// Checkbox 1 — Informational / Updates
export const SMS_UPDATES_CONSENT = `I agree to receive SMS updates from ${LEGAL_BUSINESS_NAME} regarding campaign updates, event reminders, and volunteer coordination. Message frequency varies. Message & data rates may apply. Reply STOP to unsubscribe or HELP for help.`;

// Checkbox 2 — Promotional / Fundraising
export const SMS_PROMO_CONSENT = `I agree to receive promotional SMS messages from ${LEGAL_BUSINESS_NAME}, including fundraising requests, donation drives, and special promotions. Message frequency varies. Message & data rates may apply. Reply STOP to unsubscribe or HELP for help.`;
