"use client";

import { useRef, useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { gsap, useGSAP, ScrollTrigger } from "@/animations/gsap";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";

const PILLARS = [
  {
    id: "spending",
    no: "01",
    title: "Stop Overspending",
    short: "Audit waste. Live within means.",
    body: "We will line-item audit every agency, freeze non-essential hiring, and refuse any new tax or fee until the budget is balanced without accounting tricks. No more midnight earmarks for connected vendors.",
    bullets: [
      "Independent inspector general with subpoena power",
      "Public-facing spend dashboard, updated weekly",
      "Hard cap on year-over-year general fund growth",
    ],
    accent: "signal",
  },
  {
    id: "redtape",
    no: "02",
    title: "Cut the Red Tape",
    short: "Faster permits. Real housing. Real jobs.",
    body: "Small businesses and young families are drowning in approvals. We will gut duplicative permitting, restore by-right zoning for starter homes, and put a 60-day shot-clock on every state license decision.",
    bullets: [
      "60-day shot-clock on permits and licenses",
      "Sunset reviews on every regulation older than 7 years",
      "By-right zoning for missing-middle housing",
    ],
    accent: "ochre",
  },
  {
    id: "safety",
    no: "03",
    title: "Public Safety, Restored",
    short: "Back the badge. Protect every neighborhood.",
    body: "Safety is the foundation of every freedom. We will properly fund and train local law enforcement, oppose siting of unsupervised transitional housing in residential neighborhoods, and prosecute repeat offenders.",
    bullets: [
      "Fully funded patrol & detective units district-wide",
      "Mandatory community input on transitional siting",
      "Real consequences for repeat retail-theft offenders",
    ],
    accent: "ink",
  },
];

export default function Platform() {
  const wrap = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      // Vertical timeline draws as you scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );

      // Nodes pop in
      gsap.utils.toArray(".pillar-node").forEach((node) => {
        gsap.from(node, {
          scale: 0,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: node,
            start: "top 80%",
          },
        });
      });
    },
    { scope: wrap }
  );

  return (
    <div ref={wrap}>
      <SectionFrame
        id="platform"
        label="02 — The Platform"
        number="Manifesto / II"
      >
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(2rem,5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              Three commitments. Written down. Signed.
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="mt-8 max-w-md text-lg leading-relaxed text-ink/75"
            >
              Voters deserve more than vibes. Each commitment below is a
              concrete legislative agenda we will pursue from day one — and
              report on, in public, every ninety days.
            </m.p>
          </div>

          {/* Timeline column */}
          <div className="relative col-span-12 mt-4 lg:col-span-7 lg:mt-2">
            {/* Vertical line */}
            <span
              ref={lineRef}
              aria-hidden
              className="absolute left-[14px] top-5 bottom-3 w-px origin-top bg-ink/30 sm:left-[19px]"
            />

            <div className="flex flex-col gap-14 sm:gap-16">
              {PILLARS.map((p, i) => (
                <PillarCard key={p.id} p={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}

function PillarCard({ p, index }) {
  const [open, setOpen] = useState(false);
  const accentBg =
    p.accent === "signal"
      ? "bg-signal"
      : p.accent === "ochre"
      ? "bg-ochre"
      : "bg-ink";

  return (
    <m.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
      className="relative pl-12 sm:pl-16"
    >
      {/* Timeline node */}
      <span
        aria-hidden
        className={`pillar-node absolute left-0 top-2 grid h-[30px] w-[30px] place-items-center rounded-full ${accentBg} text-bone shadow-[0_0_0_4px_var(--color-bone)] sm:h-[40px] sm:w-[40px]`}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] sm:text-[10px]">
          {p.no}
        </span>
      </span>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group block w-full text-left"
      >
        <div className="flex items-baseline justify-between gap-6">
          <h3 className="display-serif text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-signal">
            {p.title}
          </h3>
          <m.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-ink/30 text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bone"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1v10M1 6h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </m.span>
        </div>
        <p className="mt-2 max-w-md font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute">
          {p.short}
        </p>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-2 pt-6">
              <p className="max-w-2xl text-[1.05rem] leading-relaxed text-ink/80">
                {p.body}
              </p>
              <ul className="mt-6 grid gap-3">
                {p.bullets.map((b, i) => (
                  <m.li
                    key={b}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-start gap-3 text-[0.95rem] text-ink/85"
                  >
                    <span
                      className={`mt-2 block h-1.5 w-1.5 rounded-full ${accentBg}`}
                    />
                    {b}
                  </m.li>
                ))}
              </ul>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Hairline below */}
      <span className="mt-8 block h-px w-full bg-ink/10" />
    </m.article>
  );
}
