import {
  getRsvpWebhookUrl,
  getComplianceWebhookUrl,
  forwardToGhl,
  createRsvpAppointment,
} from "@/lib/ghl";
import { normalizePhoneForSubmit } from "@/lib/phone";

// POST /api/events/rsvp — Event RSVP (GHL Event_RSVP workflow).
// Fans out to the primary workflow webhook + shared compliance webhook
// (forms-compliance-pattern.md §1). Payload per ghl-forms-webhooks.md §4, plus
// optional SMS-consent fields required by the compliance pattern. After the
// webhooks, best-effort creates a GHL calendar appointment (if REST creds set).
const WEBHOOK_URLS = [getRsvpWebhookUrl(), getComplianceWebhookUrl()];

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

  // Server-side validation: firstName, email required. Phone stays optional.
  if (!firstName || !email) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Event context comes from event data, not user input.
  const eventName = (body.eventName || "").toString();
  const eventDate = (body.eventDate || "").toString();
  const eventTime = (body.eventTime || "").toString();
  const eventCategory = (body.eventCategory || "").toString();

  const payload = {
    type: "Event_RSVP",
    firstName,
    lastName,
    email,
    phone: normalizePhoneForSubmit(body.phone),
    eventName,
    eventDate,
    eventTime,
    eventCategory,
    sms_updates: body.sms_updates ? "Yes" : "No",
    sms_promo: body.sms_promo ? "Yes" : "No",
    source: "src_event",
    submitted_at: new Date().toISOString(),
  };

  try {
    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        forwardToGhl(url, payload).catch((err) => {
          console.error("[RSVP API] webhook error:", err);
          return { ok: false };
        })
      )
    );
    if (!results.some((r) => r.ok)) {
      return Response.json({ error: "Webhook delivery failed" }, { status: 502 });
    }

    // Extended flow — create a calendar appointment for the RSVP (best-effort).
    let contactId = null;
    const startISO = (body.eventStartISO || "").toString();
    if (startISO) {
      const start = new Date(startISO);
      if (!Number.isNaN(start.getTime())) {
        const end = new Date(start.getTime() + 60 * 60 * 1000);
        contactId = await createRsvpAppointment({
          email,
          eventName,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
        });
      }
    }

    return Response.json({ success: true, contactId }, { status: 200 });
  } catch (err) {
    console.error("RSVP submission failed:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
