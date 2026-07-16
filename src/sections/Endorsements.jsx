"use client";

import { useRef } from "react";
import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Button from "@/components/ui/Button";

const APPROACH = [
  {
    no: "01",
    icon: PulseIcon,
    title: "A Physician's Discipline",
    body: "Randall earned his Doctor of Osteopathic Medicine degree and completed a Family Medicine residency before beginning a career that included primary care, immediate care, and emergency medicine. That experience taught him to assess evidence carefully, communicate clearly, and keep the person affected by the decision at the center of the process.",
  },
  {
    no: "02",
    icon: CrossIcon,
    title: "Service in Rural Emergency Medicine",
    body: "Randall worked in rural emergency departments serving communities across Oregon and the broader region. In those settings, resources were not unlimited, delays carried consequences, and every decision required judgment, preparation, and accountability.",
  },
  {
    no: "03",
    icon: NodesIcon,
    title: "A Systems-Based Mindset",
    body: "Randall's earlier professional experience in software development taught him to understand how complicated systems work — and why they fail. He will bring that same analytical mindset to budgets, agencies, regulations, and legislation in Salem.",
  },
];

export default function Endorsements() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref} className="relative">
      <SectionFrame
        id="approach"
        label="03 — The Approach"
        number="Evidence / III"
        tone="light"
      >
        <div className="flex flex-col gap-14">
          <div className="grid grid-cols-12 items-start gap-y-8 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-7">
              <SplitReveal
                as="h2"
                className="display-serif block text-balance text-[clamp(1.8rem,4.1vw,3.55rem)] font-medium leading-[1.02] tracking-[-0.025em]"
              >
                Decisions based on evidence, not slogans.
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
                Randall&rsquo;s approach comes from decades spent solving
                difficult problems and accepting responsibility for the
                outcome.
              </p>
              <div className="mt-8">
                <Button as={Link} href="/about" variant="primary" withArrow>
                  Meet Randall
                </Button>
              </div>
            </m.div>
          </div>

          {/* Approach cards */}
          <m.div
            style={{ y }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          >
            {APPROACH.map((a, i) => (
              <m.article
                key={a.no}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.1,
                }}
                whileHover={{ y: -6 }}
                className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-card border border-ink/15 bg-bone-soft/60 p-8 transition-colors duration-500 hover:border-ink sm:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-signal transition-colors duration-500 group-hover:border-signal/50 group-hover:text-signal-deep">
                    <a.icon />
                  </span>
                </div>
                <h3 className="display-serif text-[clamp(1.35rem,2vw,1.75rem)] font-medium leading-tight tracking-[-0.01em]">
                  {a.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink/75">
                  {a.body}
                </p>
              </m.article>
            ))}
          </m.div>
        </div>
      </SectionFrame>
    </div>
  );
}

/* Card icons — hand-drawn line style matching the Button arrow
   (1.5 stroke, square caps, currentColor). */

function PulseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polyline
        points="2 12.5 7 12.5 9.5 5.5 14 18.5 16.5 10.5 18 12.5 22 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9.25 3.5h5.5v5.75h5.75v5.5h-5.75v5.75h-5.5v-5.75H3.5v-5.5h5.75V3.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

function NodesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="2.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="6" r="2.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="18" r="2.75" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8.75 6h6.5M7.2 8.4l3.6 7.2M16.8 8.4l-3.6 7.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
