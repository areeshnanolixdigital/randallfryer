// Server-only GHL (GoHighLevel) webhook configuration.
//
// Forms POST to a local API route; the route forwards a flat payload to a GHL
// workflow webhook trigger URL. See the campaign rule guide
// (ghl-forms-webhooks.md) for the full field/payload contract.
//
// ⚠️ LAUNCH BLOCKER: the default location hook + workflow UUIDs below come from
// the shared Op1776 rule guide and currently point at a DIFFERENT campaign's GHL
// account. Override them with Randall Fryer's own workflow webhook URLs via the
// env vars noted per helper before any form goes live, or submissions land in
// the wrong CRM.

const GHL_LOCATION_HOOK = process.env.GHL_LOCATION_HOOK || "HK7KWJYbw33yisOBMGEO";

const WEBHOOK_BASE = `https://services.leadconnectorhq.com/hooks/${GHL_LOCATION_HOOK}/webhook-trigger`;

/**
 * Issue Report ("Ask Randall") workflow webhook.
 * Override with GHL_HOOK_ISSUE (full URL) or GHL_ISSUE_UUID (workflow UUID only).
 */
export function getIssueWebhookUrl() {
  if (process.env.GHL_HOOK_ISSUE) return process.env.GHL_HOOK_ISSUE;
  const uuid =
    process.env.GHL_ISSUE_UUID || "3c2d23be-00aa-49d5-9d14-6597d2e93123";
  return `${WEBHOOK_BASE}/${uuid}`;
}

/** POST a JSON payload to a GHL webhook trigger URL. Returns the fetch Response. */
export async function forwardToGhl(url, payload) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
