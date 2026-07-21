import LegalPage from "@/sections/pages/LegalPage";

export const metadata = {
  title: "Privacy",
  description: "How Randall Fryer For Representative handles your information.",
};

const SECTIONS = [
  {
    id: "what-we-collect",
    title: "What we collect",
    body: [
      "When you submit a form on randallfororegon.com — volunteering, donating, asking a question, or signing up for the briefing — we collect only what the form asks for. Common fields include your name, email, zip code, phone number, and the message you sent us.",
      "Donation forms additionally collect employer and occupation as required by federal law.",
      "Like most websites, our hosting provider logs the IP address, browser, and pages requested for security and analytics. These logs are retained for 30 days, then deleted.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    body: [
      "To respond to you, to coordinate volunteer shifts, to send the weekly briefing if you opted in, and to process donations.",
      "We never sell, rent, or trade your information with any outside party for marketing purposes. The Federal Election Commission requires that donor names, addresses, and employers above the disclosure threshold be reported publicly — that legal disclosure is the only place your details appear outside of our staff.",
    ],
  },
  {
    id: "sms-and-email",
    title: "SMS, email, and your choices",
    body: [
      "We send text messages only to people who opt in. Two separate opt-ins are offered — one for campaign updates, one for fundraising deadlines — and either can be cancelled by replying STOP.",
      "Email newsletters use an unsubscribe link at the bottom of every send. We honor unsubscribe requests within 24 hours.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: [
      "We use first-party cookies to remember your session and a privacy-focused analytics tool to count page views. We do not use cross-site tracking pixels or behavioral advertising.",
      "You can disable cookies in your browser settings without affecting your ability to use the site, except for the donation form which requires session storage to prevent duplicate submissions.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: [
      "You can request a copy of any information we hold about you, ask us to delete it, or correct anything that is wrong. Email [PLACEHOLDER — privacy contact email] and we will respond within 30 days.",
      "If your donation is publicly disclosed under FEC rules, we cannot remove the public disclosure — but we can confirm exactly what was reported and when.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "Questions about this notice can be sent to [PLACEHOLDER — privacy contact email] or to: Randall Fryer For Representative, [PLACEHOLDER — mailing address].",
    ],
  },
];

export default function Page() {
  return (
    <LegalPage
      eyebrow="File №11 — Privacy"
      number="Legal / XI"
      title="Privacy notice."
      updated="April 12, 2026"
      intro="Randall Fryer For Representative collects the minimum information needed to run a campaign, never sells what we collect, and follows federal disclosure rules for donations only where required by law."
      sections={SECTIONS}
    />
  );
}
