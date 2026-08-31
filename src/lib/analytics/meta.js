// Meta Pixel browser helper.
// Wraps window.fbq so call sites don't need to check for feature-flag or
// script readiness. Follows Nanolix Meta Tracking SOP §4.
//
// Two entry points:
//   trackStandard(event, params, eventId?)  — Meta standard events (PageView,
//                                              Lead, ViewContent, ...)
//   trackMeta(event, params, eventId?)      — custom events (CTA_Click,
//                                              DonateClick, FormStart, ...)
//
// eventId is only needed when the same event is also sent server-side via CAPI
// so Meta can deduplicate.

// site_name is fixed per-project; every event carries it so cross-property
// reports remain readable.
export const SITE_NAME = "randall_fryer";

export function metaEnabled() {
  return (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === "true" &&
    Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID)
  );
}

export function trackStandard(event, params = {}, eventId) {
  if (!metaEnabled() || !window.fbq) return;
  const opts = eventId ? { eventID: eventId } : undefined;
  window.fbq("track", event, { site_name: SITE_NAME, ...params }, opts);
}

export function trackMeta(event, params = {}, eventId) {
  if (!metaEnabled() || !window.fbq) return;
  const opts = eventId ? { eventID: eventId } : undefined;
  window.fbq("trackCustom", event, { site_name: SITE_NAME, ...params }, opts);
}
