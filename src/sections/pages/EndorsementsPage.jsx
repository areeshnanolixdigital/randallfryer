"use client";

import Link from "next/link";
import { m } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

const FEATURED = [
  {
    quote:
      "Adrian is the rarest thing in politics — someone who reads the budget cover to cover and then explains it to the rest of us.",
    name: "Margaret Ellsworth",
    role: "Former County Auditor",
    avatar: "https://i.pravatar.cc/200?img=47",
  },
  {
    quote:
      "I have endorsed maybe four candidates in my career. Adrian Vale is one of them. CapitalWatch is exactly what District 14 needs right now.",
    name: "Diego Marín",
    role: "Owner, Marín Family Hardware (Harborlight)",
    avatar: "https://i.pravatar.cc/200?img=12",
  },
  {
    quote:
      "She listens first, then she fixes things. That is a complete reversal of how the Capitol has operated for a decade.",
    name: "Officer Renee Tobias",
    role: "Retired, Harborlight PD",
    avatar: "https://i.pravatar.cc/200?img=32",
  },
  {
    quote:
      "A real plan, not a pamphlet. CapitalWatch is the most thoughtful campaign on the ballot.",
    name: "Dr. Hollis Brandt",
    role: "Pediatrician, District 14 Resident",
    avatar: "https://i.pravatar.cc/200?img=68",
  },
];

const COMMUNITY = [
  { name: "Mayor Kayla Reeves", role: "City of Pier Harbor", img: 14 },
  { name: "James Okafor", role: "President, OR Small Business Alliance", img: 33 },
  { name: "Sara Whitlock", role: "Principal, Harborlight HS", img: 25 },
  { name: "Capt. Mateo Bellamy", role: "Coast Guard, Ret.", img: 60 },
  { name: "Yusra Khalid", role: "Founder, NeighborWorks Coastal", img: 41 },
  { name: "Tomás Reyes", role: "Carpenters Local 614", img: 11 },
  { name: "Aimee Stanton", role: "Past Co-Chair, OR Teachers Alliance", img: 23 },
  { name: "Pastor Lionel Pace", role: "First Baptist Harborlight", img: 52 },
  { name: "Sgt. Carla Mendez", role: "Sheriff's Patrol Division", img: 38 },
  { name: "Phillip Crane", role: "Owner, Crane Boatworks", img: 7 },
  { name: "Naveen Patel", role: "MD, Coastal Pediatrics", img: 65 },
  { name: "Rachel Solovieva", role: "Restaurant Owner, Pier 7", img: 16 },
];

const ORGS = [
  "Harborlight Chamber of Commerce",
  "OR Small Business Alliance",
  "Fraternal Order №227",
  "Working Families Caucus",
  "Coastal Educators Coalition",
  "Veterans for Reform PAC",
  "Harborlight Marina Association",
  "NeighborWorks Coastal",
];

export default function EndorsementsPage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №03 — Endorsements"
        number="Community / III"
        title="A coalition built block by block."
        intro="Doctors, deputies, shop owners, teachers, parents — real neighbors backing Adrian Vale because District 14 deserves an honest ledger and a Capitol that answers."
      />

      {/* FEATURED VOICES */}
      <SectionFrame label="02 — Featured voices" number="Quotes / II">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-7">
          {FEATURED.map((v, i) => (
            <m.figure
              key={v.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.1,
              }}
              whileHover={{ y: -6 }}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-card border border-ink/12 bg-bone-soft/60 p-8 transition-colors duration-500 hover:bg-ink hover:text-bone sm:p-9"
            >
              <span
                aria-hidden
                className="display-serif pointer-events-none absolute -right-1 -top-8 text-[9rem] leading-none text-ink/[0.06] transition-colors duration-500 group-hover:text-bone/[0.08]"
              >
                ”
              </span>
              <blockquote className="relative">
                <p className="display-serif text-balance text-[clamp(1.25rem,1.9vw,1.75rem)] font-medium leading-[1.25] tracking-[-0.01em]">
                  &ldquo;{v.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-12 flex items-center gap-4">
                <span className="relative block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-current/20">
                  <img
                    src={v.avatar}
                    alt={v.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    style={{ filter: "grayscale(70%) contrast(1.02)" }}
                  />
                </span>
                <div className="min-w-0">
                  <div className="display-serif truncate text-lg font-medium leading-tight">
                    {v.name}
                  </div>
                  <div className="mt-1 truncate font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute group-hover:text-bone/60">
                    {v.role}
                  </div>
                </div>
              </figcaption>
            </m.figure>
          ))}
        </div>
      </SectionFrame>

      {/* COMMUNITY ROLL */}
      <SectionFrame label="03 — The full roll" number="Endorsers / III">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(2rem,5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              Two hundred and counting.
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-8 max-w-md text-lg leading-relaxed text-ink/75"
            >
              Every endorser below took the time to sit down with Adrian
              in person. No paid endorsements. No quid pro quo.
            </m.p>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {COMMUNITY.map((c, i) => (
                <m.li
                  key={c.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: (i % 6) * 0.05,
                  }}
                  className="group flex flex-col gap-3"
                >
                  <span className="relative block aspect-square w-full overflow-hidden rounded-full border border-ink/15 bg-bone-soft transition-transform duration-500 group-hover:-translate-y-0.5">
                    <img
                      src={`https://i.pravatar.cc/240?img=${c.img}`}
                      alt={c.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      style={{ filter: "grayscale(80%) contrast(1.05)" }}
                    />
                  </span>
                  <div className="leading-tight">
                    <div className="display-serif text-base font-medium">
                      {c.name}
                    </div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-mute">
                      {c.role}
                    </div>
                  </div>
                </m.li>
              ))}
            </ul>
          </div>
        </div>
      </SectionFrame>

      {/* ORG ROW */}
      <SectionFrame label="04 — Organizations" number="Coalition / IV">
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em]"
            >
              Organizations on the record.
            </SplitReveal>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ORGS.map((label, i) => (
                <m.li
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: (i % 4) * 0.06,
                  }}
                  className="flex items-center gap-3 border-b border-ink/10 pb-3 font-mono text-[12px] uppercase tracking-[0.22em] text-ink/85"
                >
                  <span className="block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-signal" />
                  {label}
                </m.li>
              ))}
            </ul>
          </div>
        </div>
      </SectionFrame>

      {/* ADD YOUR VOICE CTA */}
      <SectionFrame
        label="05 — Add your voice"
        number="Endorse / V"
        withBottomLine={false}
      >
        <div className="grid grid-cols-12 items-end gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(2rem,5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              Want your name on the list?
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75"
            >
              Send a note and we&rsquo;ll set up a coffee — Adrian
              personally meets every endorser before adding them.
            </m.p>
          </div>
          <div className="col-span-12 flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <Button as={Link} href="/contact" variant="primary" withArrow>
              Endorse Adrian
            </Button>
            <Button as={Link} href="/volunteer" variant="outline" withArrow>
              Volunteer instead
            </Button>
          </div>
        </div>
      </SectionFrame>
    </main>
  );
}
