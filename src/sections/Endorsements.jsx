"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";

const VOICES = [
  {
    quote:
      "Adrian is the rarest thing in politics — someone who reads the budget cover to cover and then explains it to the rest of us.",
    name: "Margaret Ellsworth",
    role: "Former County Auditor",
    avatar: "https://i.pravatar.cc/160?img=47",
  },
  {
    quote:
      "I have endorsed maybe four candidates in my life. Adrian Vale is one of them. CapitalWatch is exactly what District 14 needs.",
    name: "Diego Marín",
    role: "Owner, Marín Family Hardware (Harborlight)",
    avatar: "https://i.pravatar.cc/160?img=12",
  },
  {
    quote:
      "She listens first, then she fixes things. That is a complete reversal of how the Capitol has operated for a decade.",
    name: "Officer Renee Tobias",
    role: "Retired, Harborlight PD",
    avatar: "https://i.pravatar.cc/160?img=32",
  },
  {
    quote:
      "A real plan, not a pamphlet. CapitalWatch is the most thoughtful campaign on the ballot.",
    name: "Dr. Hollis Brandt",
    role: "Pediatrician, District 14 Resident",
    avatar: "https://i.pravatar.cc/160?img=68",
  },
];

const LOGOS = [
  "Harborlight Chamber",
  "OR Small Business Alliance",
  "Fraternal Order №227",
  "Working Families Caucus",
  "Coastal Educators",
  "Veterans for Reform",
];

export default function Endorsements() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const xTicker = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

  return (
    <div ref={ref} className="relative">
      <SectionFrame
        id="endorsements"
        label="03 — The Coalition"
        number="Voices / III"
      >
        <div className="flex flex-col gap-14">
          <div className="grid grid-cols-12 items-end gap-y-8 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-7">
              <SplitReveal
                as="h2"
                className="display-serif block text-balance text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.025em]"
              >
                A coalition built block by block — not bought.
              </SplitReveal>
            </div>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="col-span-12 lg:col-span-5 lg:pl-6"
            >
              <p className="max-w-md text-lg leading-relaxed text-ink/75">
                Doctors, deputies, shop owners, teachers, parents.
                CapitalWatch belongs to anyone who wants the Capitol
                to belong to the people again.
              </p>
            </m.div>
          </div>

          {/* Quotes grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-7">
            {VOICES.map((v, i) => (
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
                {/* Decorative quote mark */}
                <span
                  aria-hidden
                  className="display-serif pointer-events-none absolute -right-1 -top-8 text-[9rem] leading-none text-ink/[0.06] transition-colors duration-500 group-hover:text-bone/[0.08]"
                >
                  ”
                </span>

                <blockquote className="relative">
                  <p className="display-serif text-balance text-[clamp(1.25rem,1.9vw,1.75rem)] font-medium leading-[1.25] tracking-[-0.01em]">
                    “{v.quote}”
                  </p>
                </blockquote>

                <figcaption className="mt-12 flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
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
                  </div>
                  <span
                    aria-hidden
                    className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-current/30 transition-transform duration-500 group-hover:rotate-45"
                  >
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M1 13L13 1M13 1H4M13 1V10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </figcaption>
              </m.figure>
            ))}
          </div>

          {/* Logo ticker */}
          <div className="relative overflow-hidden border-y border-ink/15 py-8">
            <span className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-bone pr-4 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
              Supported by →
            </span>
            <m.div
              style={{ x: xTicker }}
              className="flex items-center gap-12 pl-44 whitespace-nowrap"
            >
              {[...LOGOS, ...LOGOS].map((label, i) => (
                <span
                  key={i}
                  className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.22em] text-ink/75"
                >
                  <span className="block h-1.5 w-1.5 rounded-full bg-signal" />
                  {label}
                </span>
              ))}
            </m.div>
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}
