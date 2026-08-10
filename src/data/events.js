// Events are the campaign's GHL custom-object records (see src/lib/ghl.js and
// .claude/Rule/ghl-events-integration.md). GHL is the source of truth; the
// helpers below bridge a normalized GHL event into the shape the presentational
// Events components (EventsPage / EventDetailPage) consume, so those components
// stay unchanged. The URL slug IS the GHL record id.

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const FULL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// "YYYY-MM-DD" → "Saturday, April 12, 2026". T00:00:00 avoids UTC/local drift.
function dateLabelFromRaw(raw) {
  if (!raw) return "";
  const d = new Date(`${raw}T00:00:00`);
  if (Number.isNaN(d.getTime())) return "";
  return `${WEEKDAYS[d.getDay()]}, ${FULL_MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/**
 * Convert one normalized GHL event (from fetchGHLEvents/fetchGHLEvent) into the
 * shape the Events UI expects. Returns null for falsy input.
 */
export function adaptGhlEvent(e) {
  if (!e) return null;

  const timeLabel = e.endTime ? `${e.time} – ${e.endTime}` : e.time || "";

  // Split description on blank lines into body paragraphs; keep a single
  // paragraph when there are no blank-line breaks.
  const paras = (e.description || "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  const body = paras.length ? paras : e.description ? [e.description] : [];

  // GHL has no per-event schedule; derive a minimal one from start/end time.
  const schedule = [];
  if (e.time) schedule.push({ time: e.time, title: "Event begins" });
  if (e.endTime) schedule.push({ time: e.endTime, title: "Event ends" });

  return {
    slug: e.id, // GHL record id — used in /events/[slug]
    title: e.title || "",
    summary: e.description || "",
    body,
    cover: e.image || "/placeholder-event.svg",
    category: e.type || "Event",
    tag: "Open to the public",
    date: e.date?.raw || "", // "YYYY-MM-DD" — safe for new Date()
    endDate: e.endDate?.raw || "", // "YYYY-MM-DD" or "" — for upcoming/past bucketing
    dateLabel: dateLabelFromRaw(e.date?.raw),
    timeLabel,
    locationName: e.location || "",
    // GHL stores one location value; only surface a separate address line if
    // the alias actually differs, otherwise leave it blank to avoid duplication.
    locationAddress: e.address && e.address !== e.location ? e.address : "",
    schedule,
    source: "ghl",
  };
}

/** Map + adapt a list of normalized GHL events, dropping any that fail. */
export function adaptGhlEvents(list) {
  return (list || []).map(adaptGhlEvent).filter(Boolean);
}

/**
 * Split adapted events into { upcoming, past } relative to now. Lives here (a
 * plain data module, not a component) so the time read stays out of React
 * render — keeps the Events components pure.
 */
export function splitEventsByDate(events) {
  const now = Date.now();
  const upcoming = [];
  const past = [];
  for (const e of events || []) {
    // An event stays "upcoming" through the END of its final day: bucket by the
    // end date when present, else the start date, at 23:59:59 so an event does
    // not drop into "past" at midnight while it is still happening today.
    const lastDay = e.endDate || e.date;
    const cutoff = lastDay ? new Date(`${lastDay}T23:59:59`).getTime() : 0;
    (cutoff >= now ? upcoming : past).push(e);
  }
  return { upcoming, past };
}
