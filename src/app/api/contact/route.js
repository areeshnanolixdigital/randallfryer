import {
  getContactWebhookUrl,
  getComplianceWebhookUrl,
  forwardToGhl,
} from "@/lib/ghl";
import { normalizePhoneForSubmit } from "@/lib/phone";

// POST /api/contact — Contact form (GHL Contact_Form workflow).
// Fans out to the primary workflow webhook + the shared compliance webhook
// (forms-compliance-pattern.md §1). Payload per ghl-forms-webhooks.md §1.
const WEBHOOK_URLS = [getContactWebhookUrl(), getComplianceWebhookUrl()];

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const firstName = (body.firstName || "").trim();
  const lastName = (body.lastName || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();

  // Server-side validation: firstName, lastName, email, message required.
  // Phone stays optional and is never required.
  if (!firstName || !lastName || !email || !message) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const payload = {
    type: "Contact_Form",
    firstName,
    lastName,
    email,
    phone: normalizePhoneForSubmit(body.phone),
    message,
    sms_updates: body.sms_updates ? "Yes" : "No",
    sms_promo: body.sms_promo ? "Yes" : "No",
    source: "src_contact",
    submitted_at: new Date().toISOString(),
  };

  try {
    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        forwardToGhl(url, payload).catch((err) => {
          console.error("[Contact API] webhook error:", err);
          return { ok: false };
        })
      )
    );
    if (!results.some((r) => r.ok)) {
      return Response.json({ error: "Webhook delivery failed" }, { status: 502 });
    }
    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contact submission failed:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
