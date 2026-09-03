// Meta Pixel browser helper.
// Wraps window.fbq so call sites don't need to check for feature-flag, consent,
// or script readiness. Follows Nanolix Meta Tracking SOP §4.
//
// Two primitives:
//   trackStandard(event, params, eventId?)  — Meta standard events (PageView,
//                                              Lead, ViewContent, ...)
//   trackMeta(event, params, eventId?)      — custom events (CTA_Click,
//                                              DonateClick, FormStart, ...)
//
// Call sites use the NAMED HELPERS at the bottom of this file, never the
// primitives directly and never window.fbq. Keeping the enabled-check, the
// consent gate, and the site_name/page-context tagging in one place is the
// whole point. The only sanctioned exception is MetaPixel, which *creates* fbq.
//
// eventId is only needed when the same event is also sent server-side via CAPI
// so Meta can deduplicate — see newEventId().
//
// Consent: this site's Privacy Policy ("Cookies and analytics") promises that
// optional analytics and advertising technologies stay disabled until the
// visitor opts in through the cookie banner. metaEnabled() therefore requires
// getCookieConsent() === "analytics" on top of the two env vars. Declining, or
// never answering the banner, leaves every helper a no-op and the Meta script
// unloaded.

import { getCookieConsent } from "@/lib/cookieConsent";

// site_name is fixed per-project; every event carries it so cross-property
// reports remain readable.
export const SITE_NAME = "randall_fryer";

export function metaEnabled() {
  return (
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === "true" &&
    Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID) &&
    getCookieConsent() === "analytics"
  );
}

/**
 * Page context stamped onto every event. Meta reports are far easier to read
 * when each event knows which page produced it, and it costs nothing.
 * Browser-only — every caller is already inside a handler or an effect.
 */
export function standardParams(extra = {}) {
  return {
    site_name: SITE_NAME,
    page_path: window.location.pathname,
    page_title: document.title,
    ...extra,
  };
}

/**
 * Fresh id for a conversion, passed to Meta as `eventID`. A conversion's paired
 * standard event (`Lead`) and custom completion event share ONE id on purpose —
 * that is how Meta dedupes the browser event against a future Conversions API
 * event for the same submission.
 *
 * The existence check is required: crypto.randomUUID is undefined on
 * non-secure origins.
 */
export function newEventId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : undefined;
}

export function trackStandard(event, params = {}, eventId) {
  if (!metaEnabled() || !window.fbq) return;
  const opts = eventId ? { eventID: eventId } : undefined;
  window.fbq("track", event, standardParams(params), opts);
}

export function trackMeta(event, params = {}, eventId) {
  if (!metaEnabled() || !window.fbq) return;
  const opts = eventId ? { eventID: eventId } : undefined;
  window.fbq("trackCustom", event, standardParams(params), opts);
}

/* ── Standard events ─────────────────────────────────────────────────────── */

export const trackPageView = () => trackStandard("PageView");

export const trackViewContent = (params = {}, eventId) =>
  trackStandard("ViewContent", params, eventId);

export const trackLead = (params = {}, eventId) =>
  trackStandard("Lead", params, eventId);

/* ── Custom events ───────────────────────────────────────────────────────── */

export const trackCTA = (params = {}) => trackMeta("CTA_Click", params);

export const trackDonateClick = (params = {}) =>
  trackMeta("DonateClick", params);

export const trackFormStart = (params = {}) => trackMeta("FormStart", params);

export const trackFormError = (params = {}) => trackMeta("FormError", params);

export const trackOutbound = (params = {}) =>
  trackMeta("OutboundLinkClick", params);

export const trackSocial = (params = {}) => trackMeta("SocialLinkClick", params);

export const trackEmail = (params = {}) => trackMeta("EmailClick", params);

export const trackPhone = (params = {}) => trackMeta("PhoneClick", params);

export const trackVolunteerComplete = (params = {}, eventId) =>
  trackMeta("VolunteerComplete", params, eventId);

export const trackEventRSVPComplete = (params = {}, eventId) =>
  trackMeta("EventRSVPComplete", params, eventId);

export const trackNewsletterSignup = (params = {}, eventId) =>
  trackMeta("NewsletterSignup", params, eventId);

export const trackLeadMagnetComplete = (params = {}, eventId) =>
  trackMeta("LeadMagnetComplete", params, eventId);
