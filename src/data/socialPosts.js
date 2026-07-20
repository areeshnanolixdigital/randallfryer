// Manifest of every social-media creative in the campaign press kit.
// Each entry is one slot in the /social-media-posts gallery.
//
// `image` is null while a creative is in production — the gallery renders an
// in-brand placeholder plate for the slot. When the final export ships, drop
// the file in /public/social-media-posts/{feed,story}/ and set `image` to its
// public path (e.g. "/social-media-posts/feed/01-meet-randall.png"); the
// placeholder swaps out automatically everywhere.

export const SOCIAL_POSTS = [
  // ────────────────────────────────────────────────────────────────
  // Instagram feed — 1080×1080
  // ────────────────────────────────────────────────────────────────
  {
    slug: "feed-01-meet-randall",
    no: "01",
    format: "feed",
    title: "Meet Randall",
    concept: "Introduction card — portrait, nameplate, district lockup",
    image: null,
  },
  {
    slug: "feed-02-stronger-oregon",
    no: "02",
    format: "feed",
    title: "A Stronger Oregon",
    concept: "Tagline manifesto over a midnight navy field",
    image: null,
  },
  {
    slug: "feed-03-educational-excellence",
    no: "03",
    format: "feed",
    title: "Educational Excellence",
    concept: "Priority plank №1 — numbered chapter card",
    image: null,
  },
  {
    slug: "feed-04-working-families",
    no: "04",
    format: "feed",
    title: "Working Families",
    concept: "Priority plank №2 — lower-the-burden ledger",
    image: null,
  },
  {
    slug: "feed-05-business-climate",
    no: "05",
    format: "feed",
    title: "Business Climate",
    concept: "Priority plank №3 — open-for-business split",
    image: null,
  },
  {
    slug: "feed-06-safer-communities",
    no: "06",
    format: "feed",
    title: "Safer Communities",
    concept: "Priority plank №4 — crimson signal card",
    image: null,
  },
  {
    slug: "feed-07-accountability",
    no: "07",
    format: "feed",
    title: "Accountability",
    concept: "Priority plank №5 — Salem watch seal",
    image: null,
  },
  {
    slug: "feed-08-the-doctor-is-in",
    no: "08",
    format: "feed",
    title: "The Doctor Is In",
    concept: "Career card — family & rural emergency medicine",
    image: null,
  },
  {
    slug: "feed-09-service-record",
    no: "09",
    format: "feed",
    title: "Service Record",
    concept: "Army Medical Corps timeline strip",
    image: null,
  },
  {
    slug: "feed-10-election-day",
    no: "10",
    format: "feed",
    title: "Election Day",
    concept: "Tuesday, November 3, 2026 — extruded date card",
    image: null,
  },

  // ────────────────────────────────────────────────────────────────
  // Instagram story — 1080×1920
  // ────────────────────────────────────────────────────────────────
  {
    slug: "story-01-meet-randall",
    no: "01",
    format: "story",
    title: "Meet Randall",
    concept: "Vertical introduction — full-bleed portrait cut",
    image: null,
  },
  {
    slug: "story-02-stronger-oregon",
    no: "02",
    format: "story",
    title: "A Stronger Oregon",
    concept: "Tagline tower with gold rules",
    image: null,
  },
  {
    slug: "story-03-educational-excellence",
    no: "03",
    format: "story",
    title: "Educational Excellence",
    concept: "Plank №1 — vertical chapter stack",
    image: null,
  },
  {
    slug: "story-04-working-families",
    no: "04",
    format: "story",
    title: "Working Families",
    concept: "Plank №2 — household ledger, tall cut",
    image: null,
  },
  {
    slug: "story-05-business-climate",
    no: "05",
    format: "story",
    title: "Business Climate",
    concept: "Plank №3 — main-street marquee",
    image: null,
  },
  {
    slug: "story-06-safer-communities",
    no: "06",
    format: "story",
    title: "Safer Communities",
    concept: "Plank №4 — beacon gradient stage",
    image: null,
  },
  {
    slug: "story-07-accountability",
    no: "07",
    format: "story",
    title: "Accountability",
    concept: "Plank №5 — capitol watch column",
    image: null,
  },
  {
    slug: "story-08-the-doctor-is-in",
    no: "08",
    format: "story",
    title: "The Doctor Is In",
    concept: "Career story — clinic-to-capitol path",
    image: null,
  },
  {
    slug: "story-09-service-record",
    no: "09",
    format: "story",
    title: "Service Record",
    concept: "Service stripes with medallion",
    image: null,
  },
  {
    slug: "story-10-election-day",
    no: "10",
    format: "story",
    title: "Election Day",
    concept: "Countdown story — polls-close reminder",
    image: null,
  },
];

export const FORMATS = {
  feed: {
    key: "feed",
    label: "Feed",
    sub: "1080 × 1080",
    ratio: "1 / 1",
    width: 1080,
    height: 1080,
  },
  story: {
    key: "story",
    label: "Story",
    sub: "1080 × 1920",
    ratio: "9 / 16",
    width: 1080,
    height: 1920,
  },
};
