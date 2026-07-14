import { getIssueWebhookUrl, forwardToGhl } from "@/lib/ghl";

// POST /api/ask — "Ask Randall" submissions (GHL Issue_Report workflow).
// Payload contract per ghl-forms-webhooks.md §3 (Issue Report Form).
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

  // Server-side validation mirrors the rule guide: name, email, subject,
  // description are required.
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
    issue_category: category,
    issue_location: location,
    issue_subject: subject,
    issue_description: description,
    issue_image: "", // no upload yet — empty string placeholder
    source: "src_issue",
    submitted_at: new Date().toISOString(),
  };

  try {
    const res = await forwardToGhl(getIssueWebhookUrl(), payload);
    if (!res.ok) {
      return Response.json(
        { error: "Upstream webhook error" },
        { status: 502 }
      );
    }
    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Ask Randall submission failed:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
