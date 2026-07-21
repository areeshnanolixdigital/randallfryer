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

const hook = (uuid) => `${WEBHOOK_BASE}/${uuid}`;

/**
 * Contact form workflow webhook — Randall Fryer's own GHL location.
 * Override with GHL_HOOK_CONTACT (full URL).
 */
export function getContactWebhookUrl() {
  if (process.env.GHL_HOOK_CONTACT) return process.env.GHL_HOOK_CONTACT;
  return "https://services.leadconnectorhq.com/hooks/YUHTArRDeS9UlcCEkopg/webhook-trigger/3LDpchKhcb4yxJ53eBNE";
}

/**
 * Volunteer signup workflow webhook(s) — Randall Fryer's own GHL location.
 * Returns an array (the route appends the compliance webhook to it).
 * Override with GHL_HOOK_VOLUNTEER (comma-separated full URLs) or
 * GHL_HOOK_VOLUNTEER_1 for the single primary URL.
 */
export function getVolunteerWebhookUrls() {
  if (process.env.GHL_HOOK_VOLUNTEER) {
    return process.env.GHL_HOOK_VOLUNTEER.split(",").map((u) => u.trim()).filter(Boolean);
  }
  return [
    process.env.GHL_HOOK_VOLUNTEER_1 ||
      "https://services.leadconnectorhq.com/hooks/YUHTArRDeS9UlcCEkopg/webhook-trigger/1Uhhq1q20u5jdWVVE1cz",
  ];
}

/**
 * Issue Report ("Ask Randall") workflow webhook — Randall Fryer's own GHL location.
 * Override with GHL_HOOK_ISSUE (full URL).
 */
export function getIssueWebhookUrl() {
  if (process.env.GHL_HOOK_ISSUE) return process.env.GHL_HOOK_ISSUE;
  return "https://services.leadconnectorhq.com/hooks/YUHTArRDeS9UlcCEkopg/webhook-trigger/783yLGoM8WwIe0fXqWxe";
}

/**
 * Event RSVP workflow webhook — Randall Fryer's own GHL location.
 * Override with GHL_HOOK_RSVP (full URL).
 */
export function getRsvpWebhookUrl() {
  if (process.env.GHL_HOOK_RSVP) return process.env.GHL_HOOK_RSVP;
  return "https://services.leadconnectorhq.com/hooks/YUHTArRDeS9UlcCEkopg/webhook-trigger/eIU3zn8pDSRGn0BVNmzE";
}

/**
 * A2P compliance / consent webhook — a single URL shared across ALL four forms
 * (Contact, Volunteer, RSVP, Ask). Appended to each route's WEBHOOK_URLS array
 * so every submission also drives the consent/subscription workflow.
 * Randall Fryer's own GHL location. See forms-compliance-pattern.md §1.
 * Override with GHL_HOOK_COMPLIANCE (full URL).
 */
export function getComplianceWebhookUrl() {
  if (process.env.GHL_HOOK_COMPLIANCE) return process.env.GHL_HOOK_COMPLIANCE;
  return "https://services.leadconnectorhq.com/hooks/YUHTArRDeS9UlcCEkopg/webhook-trigger/JBKPbCUsyHCQmzKFHTcG";
}

/**
 * Newsletter / email-signup workflow webhook — Randall Fryer's own GHL location.
 * Drives the newsletter subscribe form in the site footer.
 * Override with GHL_HOOK_NEWSLETTER (full URL).
 */
export function getNewsletterWebhookUrl() {
  if (process.env.GHL_HOOK_NEWSLETTER) return process.env.GHL_HOOK_NEWSLETTER;
  return "https://services.leadconnectorhq.com/hooks/YUHTArRDeS9UlcCEkopg/webhook-trigger/2e3a4413-ffd6-4f94-bdb9-d2f650337574";
}

/** POST a JSON payload to a GHL webhook trigger URL. Returns the fetch Response. */
export async function forwardToGhl(url, payload) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// ---------------------------------------------------------------------------
// RSVP extended flow — GHL REST API (contact search + calendar appointment).
//
// This runs AFTER the RSVP webhook. It is best-effort: if the REST credentials
// (GHL_API_KEY + GHL_LOCATION_ID) are not configured, it is skipped and the
// RSVP still succeeds via the webhook. See ghl-forms-webhooks.md §4.

const GHL_REST_BASE = "https://services.leadconnectorhq.com";
// LeadConnector v2 pins the API version per resource family.
const GHL_CONTACTS_VERSION = "2021-07-28";
const GHL_CALENDARS_VERSION = "2021-04-15";
// Campaign events calendar in GHL — do not change unless the calendar is recreated.
const RSVP_CALENDAR_ID = process.env.GHL_RSVP_CALENDAR_ID || "UTM5EkrGwiZjQyc19WGN";

function restHeaders(version) {
  return {
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    Version: version,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

/** True when REST credentials are present, so the appointment flow can run. */
export function ghlRestConfigured() {
  return Boolean(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID);
}

/**
 * Best-effort: after an RSVP webhook, look up the (upserted) contact by email
 * and create a confirmed calendar appointment for the event. Returns the GHL
 * contactId on success, or null if the flow could not complete.
 */
export async function createRsvpAppointment({ email, eventName, startTime, endTime }) {
  if (!ghlRestConfigured()) return null;
  const locationId = process.env.GHL_LOCATION_ID;

  try {
    // 1. Give the GHL workflow a moment to create/upsert the contact.
    await new Promise((r) => setTimeout(r, 2000));

    // 2. Search for the contact by email.
    const searchUrl = `${GHL_REST_BASE}/contacts/search/duplicate?locationId=${encodeURIComponent(
      locationId
    )}&email=${encodeURIComponent(email)}`;
    const searchRes = await fetch(searchUrl, {
      headers: restHeaders(GHL_CONTACTS_VERSION),
    });
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    const contactId = searchData?.contact?.id || searchData?.id || null;
    if (!contactId) return null;

    // 3. Create the appointment.
    const apptRes = await fetch(`${GHL_REST_BASE}/calendars/events/appointments`, {
      method: "POST",
      headers: restHeaders(GHL_CALENDARS_VERSION),
      body: JSON.stringify({
        calendarId: RSVP_CALENDAR_ID,
        locationId,
        contactId,
        title: `RSVP: ${eventName}`,
        appointmentStatus: "confirmed",
        startTime,
        endTime,
        timezone: "America/Los_Angeles",
        notes: "RSVP submitted via campaign website",
      }),
    });
    if (!apptRes.ok) return contactId; // contact found even if appt failed
    return contactId;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Campaign events — GHL Custom Object records (custom_objects.events).
// Per ghl-events-integration.md. Events are NOT in the native Calendars API;
// they are records on a custom object, fetched via the object search endpoint.

const EVENTS_SCHEMA_KEY = "custom_objects.events";
const GHL_EVENTS_VERSION = "2021-07-28";

function eventsHeaders() {
  return {
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    Version: GHL_EVENTS_VERSION,
    Accept: "application/json",
  };
}

// Slug → label maps. GHL stores time + category as slugs; the UI wants labels.
// TIME_LABELS: 6:00 AM → 9:00 PM in 30-min steps. Slug = {h}{mm}_{am|pm}
// (12-hour hour NOT zero-padded, minutes zero-padded), e.g. "800_am", "100_pm".
const TIME_LABELS = (() => {
  const out = {};
  for (let mins = 6 * 60; mins <= 21 * 60; mins += 30) {
    const h24 = Math.floor(mins / 60);
    const min = mins % 60;
    const ap = h24 < 12 ? "am" : "pm";
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    const mm = String(min).padStart(2, "0");
    out[`${h12}${mm}_${ap}`] = `${h12}:${mm} ${ap.toUpperCase()}`;
  }
  return out;
})();

const CATEGORY_LABELS = {
  rally: "Rally",
  town_hall: "Town Hall",
  fundraiser: "Fundraiser",
  debate: "Debate",
  press_conference: "Press Conference",
  community_meetup: "Community Meetup",
  volunteer_drive: "Volunteer Drive",
  doortodoor_campaign: "Door-to-Door Campaign",
  victory_celebration: "Victory Celebration",
  protest__march: "Protest / March", // double underscore — GHL slugifies '/' this way
  other: "Other",
};

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/** "YYYY-MM-DD" → { month:'Apr', day:'12', year:'2026', raw } or null. */
function parseDate(dateStr) {
  if (!dateStr) return null;
  // T00:00:00 avoids UTC/local drift that would shift the day.
  const d = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return {
    month: MONTHS[d.getMonth()],
    day: String(d.getDate()).padStart(2, "0"),
    year: String(d.getFullYear()),
    raw: dateStr,
  };
}

const EMPTY_DATE = { month: "", day: "", year: "", raw: "" };

/** Raw GHL custom-object record → stable UI event shape. Never returns undefined. */
export function normalizeEvent(record) {
  const p = record?.properties ?? {};
  // Actual schema keys are event_start_date/event_start_time/event_end_time;
  // the rule's canonical names (event_date/select_time/end_time) are fallbacks.
  const startSlug = p.event_start_time ?? p.select_time ?? "";
  const endSlug = p.event_end_time ?? p.end_time ?? "";
  const category = p.event_category ?? "";
  const img = Array.isArray(p.event_image) ? p.event_image[0]?.url : undefined;

  return {
    id: record?.id,
    title: p.event_name ?? "",
    description: p.event_description ?? "",
    date: parseDate(p.event_start_date ?? p.event_date) ?? EMPTY_DATE,
    endDate: parseDate(p.event_end_date),
    time: TIME_LABELS[startSlug] ?? startSlug ?? "",
    endTime: TIME_LABELS[endSlug] ?? endSlug ?? "",
    location: p.event_location ?? "",
    address: p.event_location ?? "", // alias — some consumers read `address`
    image: img || "/placeholder-event.svg",
    type: CATEGORY_LABELS[category] ?? category ?? "",
    source: "ghl",
  };
}

/** List all campaign events, normalized and sorted by start date ascending. */
export async function fetchGHLEvents() {
  if (!ghlRestConfigured()) return [];
  try {
    const res = await fetch(
      `${GHL_REST_BASE}/objects/${EVENTS_SCHEMA_KEY}/records/search`,
      {
        method: "POST",
        headers: { ...eventsHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({
          locationId: process.env.GHL_LOCATION_ID,
          page: 1,
          pageLimit: 50,
          query: "",
          searchAfter: [],
        }),
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const records = data.records ?? [];
    return records.map(normalizeEvent).sort((a, b) => {
      const da = a.date.raw ? new Date(a.date.raw) : new Date(0);
      const db = b.date.raw ? new Date(b.date.raw) : new Date(0);
      return da - db;
    });
  } catch {
    return [];
  }
}

/** Fetch a single campaign event by record id, normalized. null if not found. */
export async function fetchGHLEvent(eventId) {
  if (!ghlRestConfigured() || !eventId) return null;
  try {
    const res = await fetch(
      `${GHL_REST_BASE}/objects/${EVENTS_SCHEMA_KEY}/records/${eventId}`,
      { headers: eventsHeaders(), next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const record = data.record ?? data;
    if (!record?.id && !record?.properties) return null;
    return normalizeEvent(record);
  } catch {
    return null;
  }
}
