export const POSTS = [
  {
    slug: "the-budget-audit-we-have-been-waiting-for",
    title: "The budget audit we have been waiting for",
    date: "2026-04-08",
    dateLabel: "April 8, 2026",
    author: "Adrian Vale",
    category: "Policy",
    readMin: 6,
    cover:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1800&h=1100&fit=crop&q=80",
    excerpt:
      "What an independent inspector general would actually do — and what it would cost.",
    body: [
      "When voters ask why the budget keeps growing while services keep shrinking, the answer they usually get back is 'it's complicated.' The truth is the opposite — most of it is hiding in plain sight inside a 412-page PDF nobody outside the building reads.",
      "An inspector general with subpoena power, two staff auditors, and a public-facing dashboard would cost the district roughly $640,000 a year. We will recover that on day one by finding the existing four-figure invoices nobody is checking.",
      "This piece walks through three line items pulled from the 2025 supplemental budget that an auditor would have caught — and where the dashboard would have surfaced them in real time.",
    ],
  },
  {
    slug: "what-we-heard-on-pier-7",
    title: "What we heard on Pier 7",
    date: "2026-03-25",
    dateLabel: "March 25, 2026",
    author: "Mira Chen, Field Director",
    category: "From the field",
    readMin: 4,
    cover:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1800&h=1100&fit=crop&q=80",
    excerpt:
      "Sixty doors, two hours, and the question that came up at every single one.",
    body: [
      "We walked the south side of Pier 7 on Sunday morning with eleven volunteers. Forty-eight conversations longer than thirty seconds. Sixteen new yard signs requested.",
      "The thing that came up at every door — every single one — was the price of childcare. We are pulling together a town hall on it for May.",
    ],
  },
  {
    slug: "why-we-do-not-take-corporate-pac-money",
    title: "Why we do not take corporate PAC money",
    date: "2026-03-12",
    dateLabel: "March 12, 2026",
    author: "Adrian Vale",
    category: "Policy",
    readMin: 5,
    cover:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1800&h=1100&fit=crop&q=80",
    excerpt:
      "Money buys access. Access buys agenda. The shortest path to honest governance is to break the loop.",
    body: [
      "It is not complicated. A campaign that takes money from the industries it will regulate is structurally compromised before the first vote is cast.",
      "We have turned away $86,400 in PAC and lobbyist contributions since March. Every refusal is documented in the FEC report.",
    ],
  },
  {
    slug: "the-shot-clock-on-permits",
    title: "The shot-clock on permits — a working draft",
    date: "2026-02-28",
    dateLabel: "February 28, 2026",
    author: "Adrian Vale",
    category: "Policy",
    readMin: 8,
    cover:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1800&h=1100&fit=crop&q=80",
    excerpt:
      "A 60-day deadline on every state license, with a default-approval mechanism and a published exception log.",
    body: [
      "Most permits in the state are decided in two weeks. The bad ones sit in a queue for nine months. The fix is structural: a 60-day shot-clock, default approval if the agency misses it, and a public exception log when they invoke an extension.",
      "This post is a working draft. Read it. Mark it up. Send back what you see wrong.",
    ],
  },
  {
    slug: "first-week-on-the-trail",
    title: "First week on the trail",
    date: "2026-02-15",
    dateLabel: "February 15, 2026",
    author: "Adrian Vale",
    category: "Campaign",
    readMin: 3,
    cover:
      "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=1800&h=1100&fit=crop&q=80",
    excerpt:
      "Filed Tuesday. Knocked the first door Thursday. Here is what surprised me.",
    body: [
      "The first thing you notice on the doors is that nobody wants to argue. They want to be heard, get a real answer, and go back inside.",
      "Eight hundred doors, four small surprises, one big idea we are folding into the platform. The full debrief is here.",
    ],
  },
];

export function getPost(slug) {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug, limit = 3) {
  const idx = POSTS.findIndex((p) => p.slug === slug);
  if (idx === -1) return POSTS.slice(0, limit);
  const rest = [...POSTS.slice(idx + 1), ...POSTS.slice(0, idx)];
  return rest.slice(0, limit);
}
