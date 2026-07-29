// ---------------------------------------------------------------------------
// FUNNEL CONTENT — SINGLE SOURCE OF TRUTH
//
// ⚠️ EVERYTHING in this file is [DUMMY] placeholder copy. Swapping in the real
// lead-magnet content should require editing ONLY this file (plus renaming the
// src/app/free-guide/ folder if the slug changes — then also update
// FUNNEL_PATH_PREFIXES in src/components/ui/SiteChrome.jsx).
//
// Current dummy routes:
//   /free-guide             → lead magnet squeeze page
//   /free-guide/thank-you   → delivery / thank-you page
// ---------------------------------------------------------------------------

/** Route paths — keep in sync with the folder names under src/app/free-guide/. */
export const FUNNEL_ROUTES = {
  leadMagnet: "/free-guide",
  thankYou: "/free-guide/thank-you",
};

// ---------------------------------------------------------------------------
// 1. LEAD MAGNET (squeeze page)
// ---------------------------------------------------------------------------

export const LEAD_MAGNET = {
  // Internal name — travels in the webhook payload so the CRM knows which
  // lead magnet was requested.
  name: "Looking Ahead: House District 28",

  meta: {
    title: "Free Guide — Looking Ahead: House District 28",
    description:
      "Get the complimentary guide to the issues shaping House District 28 and Randall Fryer's priorities for moving our community forward — delivered straight to your inbox.",
  },

  hero: {
    eyebrow: "Looking Ahead: House District 28",
    headline: "A Guide to a New Candidate and the Future of Our Community",
    subheadline:
      "If you're concerned about rising taxes, educational outcomes, Oregon's business climate, and the future of our community, this complimentary guide will help you understand the issues shaping our community, explore the facts behind today's challenges, and learn about Randall Fryer's priorities for moving House District 28 forward.",
    // Replace with the real cover / mockup image path (e.g. "/lead-magnet-cover.jpg").
    // Leave "" to render the built-in placeholder frame.
    coverImage: "/randall-fryer-portrait.jpg",
    coverImageAlt: "Randall Fryer, candidate for Oregon House District 28",
    ctaLabel: "Get the Free Guide",
  },

  benefits: {
    label: "02 — What's inside",
    number: "Benefits / II",
    heading: "What You'll Learn Inside the Guide",
    items: [
      {
        title: "Understand the Issues Shaping District 28",
        body: "Learn why affordability, educational outcomes, business growth, and government accountability have become top concerns for many Southwest Portland families.",
      },
      {
        title: "See the Facts Behind Today's Challenges",
        body: "Explore research, public information, and easy-to-understand visuals that explain how current policies affect schools, taxpayers, businesses, and local communities.",
      },
      {
        title: "Learn Randall Fryer's Priorities",
        body: "Discover Randall's approach to strengthening educational excellence, lowering unnecessary tax burdens, reducing barriers to business growth, and improving government accountability.",
      },
      {
        title: "Make a More Informed Decision",
        body: "Before you vote, gain a clearer understanding of the issues, the choices facing District 28, and the direction Randall believes will help Oregon move forward.",
      },
    ],
  },

  form: {
    label: "03 — Get the guide",
    number: "Opt-in / III",
    heading: "Tell Us Where to Send Your Complimentary Guide",
    body: "Enter your information below and we'll email your complimentary copy of Looking Ahead: House District 28. Your guide will arrive in just a few minutes. We respect your privacy, never sell your information, and you may unsubscribe from emails or text messages at any time.",
    submitLabel: "Send Me the Free Guide",
    submittingLabel: "Sending…",
    errorMessage:
      "Something went wrong sending your request. Please try again in a moment.",
    validationMessage: "Please add your first name and a valid email.",
    consent: {
      helper: "Enter a phone number above to opt in to SMS messages.",
      smsLabel:
        "I agree to receive informational SMS updates related to my guide request, campaign events, and important election information. Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe or HELP for assistance.",
      promoLabel:
        "I agree to receive promotional SMS messages, including campaign announcements, volunteer opportunities, and donation requests. Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe or HELP for assistance.",
    },
  },

  finalCta: {
    label: "04 — Last call",
    number: "CTA / IV",
    heading: "Make an Informed Decision Before You Vote",
    body: "The future of House District 28 depends on informed voters. Download your complimentary copy of Looking Ahead: House District 28 and learn about the issues, the challenges facing our community, and Randall Fryer's priorities for moving Oregon forward.",
    buttonLabel: "Get the Free Guide",
  },
};

// ---------------------------------------------------------------------------
// 2. THANK-YOU / DELIVERY PAGE
// ---------------------------------------------------------------------------

export const THANK_YOU = {
  meta: {
    title: "Thank You — Your Guide Is On Its Way",
    description:
      "Your complimentary copy of Looking Ahead: House District 28 is on its way to your inbox.",
  },

  eyebrow: "Thank You!",
  headline: "Your Guide Is On Its Way",
  // Rendered as sequential paragraphs.
  body: [
    "Your complimentary copy of Looking Ahead: House District 28 has been sent to the email address you provided.",
    "Inside, you'll find a clear overview of the issues shaping House District 28, the challenges facing Southwest Portland, and Randall Fryer's priorities for strengthening our community.",
    "The guide brings together publicly available research, community concerns, and Randall Fryer's priorities to help you make a more informed decision before Election Day.",
    "If you don't see the email within a few minutes, please check your spam or promotions folder.",
  ],

  download: {
    heading: "Prefer to grab it now?",
    body: "Your complimentary guide is also ready to download right here — no need to wait for the email.",
    buttonLabel: "Download the Guide",
    // Hosted in /public — served from the site root once deployed.
    url: "/looking-ahead-house-district-28.pdf",
  },

  nextSteps: {
    heading: "While You're Here…",
    body: "Learn more about Randall's campaign and how you can get involved.",
    links: [
      { label: "Volunteer", href: "/volunteer" },
      { label: "Meet Randall", href: "/about" },
      { label: "View Priorities", href: "/platform" },
    ],
  },

  social: {
    label: "02 — Stay connected",
    number: "Connect / II",
    heading: "Stay Connected",
    // Rendered as sequential paragraphs above the social icons.
    body: [
      "This campaign is built on conversations with the people of Southwest Portland.",
      "Follow along for campaign updates, upcoming events, and opportunities to get involved.",
    ],
  },
};
