import { getNewsletterWebhookUrl, forwardToGhl } from "@/lib/ghl";

// POST /api/newsletter — Newsletter / email-signup form (footer).
// Forwards a flat payload to the GHL Newsletter workflow webhook.
const WEBHOOK_URLS = [getNewsletterWebhookUrl()];

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = (body.email || "").trim();
  const firstName = (body.firstName || "").trim();
  const lastName = (body.lastName || "").trim();

  // Email is the only required field for a newsletter signup.
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return Response.json({ error: "A valid email is required" }, { status: 400 });
  }

  const name = [firstName, lastName].filter(Boolean).join(" ");
  const payload = {
    type: "Newsletter_Signup",
    firstName,
    lastName,
    name,
    email,
    source: "src_newsletter",
    submitted_at: new Date().toISOString(),
  };

  try {
    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        forwardToGhl(url, payload).catch((err) => {
          console.error("[Newsletter API] webhook error:", err);
          return { ok: false };
        })
      )
    );
    if (!results.some((r) => r.ok)) {
      return Response.json({ error: "Webhook delivery failed" }, { status: 502 });
    }
    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Newsletter submission failed:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
