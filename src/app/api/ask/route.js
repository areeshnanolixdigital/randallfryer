import {
  getIssueWebhookUrl,
  getComplianceWebhookUrl,
  forwardToGhl,
} from "@/lib/ghl";
import { normalizePhoneForSubmit } from "@/lib/phone";

// POST /api/ask — "Ask Randall" submissions (GHL Issue_Report workflow).
// Fans out to the primary workflow webhook + shared compliance webhook
// (forms-compliance-pattern.md §1). Payload per ghl-forms-webhooks.md §3, plus
// the optional phone + SMS-consent fields required by the compliance pattern.

const WEBHOOK_URLS = [getIssueWebhookUrl(), getComplianceWebhookUrl()];
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const category = (body.category || "").trim();
  const location = (body.location || "").trim();
  const subject = (body.subject || "").trim();
  const description = (body.description || "").trim();

  // Server-side validation: name, email, subject, description required.
  // Phone stays optional.
  if (!name || !email || !subject || !description) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Single "Full Name" field is split for GHL (first word / remaining words).
  const nameParts = name.split(" ").filter(Boolean);
  const firstName = nameParts[0] || name;
  const lastName = nameParts.slice(1).join(" ") || "";

  const payload = {
    type: "Issue_Report",
    firstName,
    lastName,
    email,
    phone: normalizePhoneForSubmit(body.phone),
    issue_category: category,
    issue_location: location,
    issue_subject: subject,
    issue_description: description,
    issue_image: "", // no upload yet — empty string placeholder
    sms_updates: body.sms_updates ? "Yes" : "No",
    sms_promo: body.sms_promo ? "Yes" : "No",
    source: "src_issue",
    submitted_at: new Date().toISOString(),
  };

  try {
    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        forwardToGhl(url, payload).catch((err) => {
          console.error("[Ask API] webhook error:", err);
          return { ok: false };
        })
      )
    );
    if (!results.some((r) => r.ok)) {
      return Response.json({ error: "Webhook delivery failed" }, { status: 502 });
    }
    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Ask Randall submission failed:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
