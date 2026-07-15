// A2P-compliant SMS consent text, per ghl-forms-webhooks.md §2.
// Every form that collects a phone number must render both consent checkboxes.
// (Adapted from the shared Op1776 guide to name the Randall Fryer campaign.)

const CAMPAIGN = "Randall Fryer for Oregon House District 28";

export const SMS_UPDATES_CONSENT = `By checking this box, I consent to receive campaign updates from ${CAMPAIGN} via automated text messages at the phone number provided. Message frequency may vary. Message and data rates may apply. Text STOP to opt out or HELP for help. View our Privacy Policy and Terms of Service.`;

export const SMS_PROMO_CONSENT = `By checking this box, I consent to receive promotional messages, event invitations, and fundraising communications from ${CAMPAIGN} via automated text messages. Message frequency may vary. Message and data rates may apply. Text STOP to opt out or HELP for help.`;
