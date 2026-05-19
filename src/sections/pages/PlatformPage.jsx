"use client";

import Link from "next/link";
import { m } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";

const PILLARS = [
  {
    no: "01",
    accent: "signal",
    title: "Stop overspending",
    intro:
      "Audit waste, freeze non-essential hiring, and refuse new taxes or fees until the budget balances without accounting tricks.",
    detail:
      "We will line-item audit every agency in the first six months. The audit will be public, and the findings will be tracked against the next four budget cycles.",
    bullets: [
      "Independent inspector general with subpoena power",
      "Public-facing spend dashboard, refreshed weekly",
      "Hard cap on year-over-year general-fund growth",
      "Quarterly veto of any non-essential earmark over $50k",
      "Sunset clauses on every spending program over five years",
    ],
  },
  {
    no: "02",
    accent: "ochre",
    title: "Cut the red tape",
    intro:
      "Faster permits, sensible zoning, and a 60-day shot-clock on every state license decision.",
    detail:
      "Small businesses and young families are drowning in approvals. We will gut duplicative permitting, restore by-right zoning for starter homes, and publish the exception log every Friday.",
    bullets: [
      "60-day statutory shot-clock with default approval",
      "Sunset review of every regulation older than 7 years",
      "By-right zoning for missing-middle housing",
      "One-stop online portal for state licenses",
      "Plain-English summaries on every new rule",
    ],
  },
  {
    no: "03",
    accent: "ink",
    title: "Public safety, restored",
    intro:
      "Fully fund and train local law enforcement, oppose unsupervised siting in residential neighborhoods, and prosecute repeat offenders.",
    detail:
      "Safety is the foundation of every other freedom. We will publish annual budgets for patrol, detective units, and victim services — and tie them to clear neighborhood outcomes.",
    bullets: [
      "Fully funded patrol and detective units district-wide",
      "Mandatory community input on transitional siting",
      "Real consequences for repeat retail-theft offenders",
      "Victim-services line item published quarterly",
      "Mental-health co-response on every 911 dispatch",
    ],
  },
];

const STATS = [
  { num: 640, prefix: "$", suffix: "k", label: "Annual inspector general budget" },
  { num: 60, suffix: "", label: "Day shot-clock on every permit" },
  { num: 0, prefix: "$", suffix: "", label: "Corporate PAC dollars accepted" },
  { num: 100, suffix: "%", label: "Vote record published in plain English" },
];

export default function PlatformPage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №10 — Platform"
        number="Manifesto / X"
        title="Three commitments. Written down. Signed."
        intro="The platform is a contract. Every position below is a concrete legislative agenda we will pursue from day one — and report on, in public, every ninety days."
      />

      {/* HEADLINE STATS */}
      <SectionFrame label="02 — At a glance" number="Numbers / II">
        <div className="grid grid-cols-2 gap-y-10 sm:gap-x-10 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <m.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.07,
              }}
              className="flex flex-col border-t border-ink/15 pt-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                0{i + 1}
              </span>
              <span className="display-serif mt-3 text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-none">
                <Counter
                  value={s.num}
                  prefix={s.prefix || ""}
                  suffix={s.suffix || ""}
                />
              </span>
              <span className="mt-3 text-[13px] leading-relaxed text-ink/75">
                {s.label}
              </span>
            </m.div>
          ))}
        </div>
      </SectionFrame>

      {/* DETAILED PILLARS */}
      {PILLARS.map((p, i) => {
        const accentBg =
          p.accent === "signal"
            ? "bg-signal"
            : p.accent === "ochre"
            ? "bg-ochre"
            : "bg-ink";
        return (
          <SectionFrame
            key={p.no}
            label={`0${i + 3} — Pillar ${p.no}`}
            number={`Detail / ${["III", "IV", "V"][i]}`}
          >
            <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
              <div className="col-span-12 lg:col-span-5">
                <m.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
                  className={`inline-grid h-14 w-14 place-items-center rounded-full text-bone ${accentBg}`}
                >
                  <span className="font-mono text-[12px] uppercase tracking-[0.2em]">
                    {p.no}
                  </span>
                </m.span>
                <SplitReveal
                  as="h2"
                  className="display-serif mt-6 block text-balance text-[clamp(2rem,5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.025em]"
                >
                  {p.title}.
                </SplitReveal>
                <m.p
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, delay: 0.2 }}
                  className="mt-6 max-w-md text-lg leading-relaxed text-ink/80"
                >
                  {p.intro}
                </m.p>
              </div>

              <div className="col-span-12 lg:col-span-7">
                <m.p
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-2xl text-[1.05rem] leading-relaxed text-ink/80"
                >
                  {p.detail}
                </m.p>
                <ul className="mt-8 grid gap-3">
                  {p.bullets.map((b, j) => (
                    <m.li
                      key={b}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.15 + j * 0.06,
                      }}
                      className="flex items-start gap-3 border-b border-ink/10 pb-3 text-[15px] text-ink/85 last:border-b-0"
                    >
                      <span className={`mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full ${accentBg}`} />
                      {b}
                    </m.li>
                  ))}
                </ul>
              </div>
            </div>
          </SectionFrame>
        );
      })}

      {/* CTA */}
      <SectionFrame label="06 — Read the receipts" number="Briefs / VI">
        <div className="grid grid-cols-12 items-end gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(2rem,5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              Each pillar has a brief behind it.
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75"
            >
              The full math on the inspector general, the shot-clock,
              and the public-safety budget — all in the news room.
            </m.p>
          </div>
          <div className="col-span-12 flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <Button as={Link} href="/news" variant="primary" withArrow>
              Read the briefs
            </Button>
            <Button as={Link} href="/contact" variant="outline" withArrow>
              Ask a question
            </Button>
          </div>
        </div>
      </SectionFrame>
    </main>
  );
}
