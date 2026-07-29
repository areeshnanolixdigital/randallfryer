"use client";

import { useRef } from "react";
import Link from "next/link";
import { m } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Reveal from "@/animations/Reveal";
import { useReveal } from "@/animations/useReveal";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

// Three priorities, each with its own focus areas. Copy is verbatim from the
// campaign's PRIORITIES document — every claim here is a stated commitment,
// not a quantified pledge, so nothing on this page invents figures.
const PRIORITIES = [
  {
    no: "01",
    title: "Strengthen Educational Excellence",
    intro:
      "Education is the foundation of opportunity. Oregon's students deserve schools where learning comes first, teachers are supported, parents have a meaningful voice, and classrooms prepare students for success in college, careers, military service, and civic life.",
    focusAreas: [
      {
        title: "Strong Academic Standards",
        body: "Support high expectations that prepare students to read, write, reason, solve problems, and graduate ready for life after high school.",
      },
      {
        title: "Focus on Core Subjects",
        body: "Prioritize reading, writing, mathematics, history, and civics so students develop the knowledge and critical-thinking skills they need to succeed.",
      },
      {
        title: "Support Teachers",
        body: "Ensure professional teachers have the authority, resources, and classroom environments needed to teach effectively.",
      },
      {
        title: "Parent & Local Involvement",
        body: "Encourage meaningful parental involvement and strengthen the role of locally elected school boards in education decisions.",
      },
      {
        title: "Measure Success by Student Learning",
        body: "Education policy should be evaluated by student achievement and long-term outcomes, not simply by the amount of money spent.",
      },
    ],
  },
  {
    no: "02",
    title: "Lower Taxes for Families & Employers",
    intro:
      "Families and employers work hard for every dollar they earn. Government has a responsibility to spend taxpayer dollars wisely, avoid unnecessary costs, and remain accountable to the people it serves.",
    focusAreas: [
      {
        title: "Oppose Unnecessary Taxes & Fees",
        body: "Advocate for policies that avoid placing additional financial burdens on Oregon families and businesses.",
      },
      {
        title: "Responsible Budgeting",
        body: "Carefully review state spending and prioritize programs that deliver meaningful value to taxpayers.",
      },
      {
        title: "Transparency & Accountability",
        body: "Support clear reporting so Oregonians understand how public funds are used and whether government programs are achieving their intended purpose.",
      },
      {
        title: "Protect Essential Services",
        body: "Support responsible budgeting that maintains essential public services while improving efficiency and reducing waste where possible.",
      },
    ],
  },
  {
    no: "03",
    title: "Reduce Barriers to Business Growth",
    intro:
      "A healthy economy depends on businesses that can invest, hire, innovate, and grow. Oregon should encourage entrepreneurship while maintaining reasonable protections for workers, consumers, and the environment.",
    focusAreas: [
      {
        title: "Reduce Unnecessary Regulation",
        body: "Support efforts to reduce unnecessary government micromanagement while preserving appropriate public safeguards.",
      },
      {
        title: "Simpler Tax Compliance",
        body: "Encourage policies that make Oregon's tax system easier for employers to understand and comply with.",
      },
      {
        title: "Improve Permitting",
        body: "Support more timely and predictable permitting so businesses can invest with greater certainty.",
      },
      {
        title: "Encourage Investment",
        body: "Promote policies that encourage entrepreneurship, attract investment, and help employers create better jobs throughout Oregon.",
      },
      {
        title: "Support Local Employers",
        body: "Recognize that small businesses and local employers are essential to thriving communities and economic opportunity.",
      },
    ],
  },
];

const PRINCIPLES = [
  {
    title: "Public Safety",
    body: "Support policies that help keep Oregon communities safe while respecting individual rights and strengthening partnerships between local communities and law enforcement.",
  },
  {
    title: "Local Decision-Making",
    body: "Communities understand their own needs. Parents, educators, local officials, and residents should have meaningful input into decisions that affect their schools and neighborhoods.",
  },
  {
    title: "Accountable Government",
    body: "Government should be transparent, fiscally responsible, and accountable to taxpayers. Public service is a responsibility that requires careful stewardship of public resources.",
  },
];

export default function PlatformPage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №10 Priorities"
        number="Priorities / X"
        title="Priorities for District 28."
        intro="Oregon deserves thoughtful leadership focused on practical solutions. Randall Fryer's priorities reflect the concerns he's heard from educators, employers, and community members across District 28. His commitment is to strengthen education, lower taxes, reduce unnecessary barriers to business growth, and bring greater accountability to state government."
      />

      {/* THE THREE PRIORITIES */}
      {PRIORITIES.map((p, i) => (
        <PrioritySection key={p.no} p={p} index={i} />
      ))}

      {/* GUIDING PRINCIPLES */}
      <SectionFrame label="05 Guiding principles" number="Principles / V">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.75rem,3.9vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              Leadership Principles
            </SplitReveal>
            <Reveal
              as="p"
              duration={0.9}
              delay={0.2}
              className="mt-6 max-w-md text-lg leading-relaxed text-ink/80"
            >
              Every decision should reflect the values that guide responsible
              public service.
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <ul className="grid gap-6 sm:grid-cols-3">
              {PRINCIPLES.map((v, i) => (
                <Reveal
                  as="li"
                  key={v.title}
                  duration={0.8}
                  delay={i * 0.08}
                  className="flex flex-col gap-3 border-t border-ink/15 pt-5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-signal">
                    0{i + 1}
                  </span>
                  <h3 className="display-serif text-xl font-medium leading-tight">
                    {v.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-ink/75">
                    {v.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </SectionFrame>

      {/* CTA */}
      <SectionFrame label="06 Get involved" number="Next / VI">
        <div className="grid grid-cols-12 items-end gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.75rem,3.9vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              Building a Better Oregon Takes All of Us
            </SplitReveal>
            <Reveal
              as="p"
              duration={0.9}
              delay={0.2}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75"
            >
              Strong communities are built through participation. Whether
              you&rsquo;d like to volunteer, attend an event, ask a question, or
              support the campaign, your involvement helps shape the future of
              District 28.
            </Reveal>
          </div>
          <div className="col-span-12 flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <Button as={Link} href="/volunteer" variant="primary" withArrow>
              Volunteer
            </Button>
            <Button as={Link} href="/ask" variant="outline" withArrow>
              Ask Randall a Question
            </Button>
          </div>
        </div>
      </SectionFrame>
    </main>
  );
}

function PrioritySection({ p, index }) {
  // Single, consistent accent for every priority — the circle, the number,
  // and the focus-area markers all read as one system.
  const accentBg = "bg-ink";
  const numRef = useRef(null);
  const numInView = useReveal(numRef);
  return (
    <SectionFrame
      label={`Priority ${p.no}`}
      number={`Detail / ${["II", "III", "IV"][index]}`}
    >
      <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-5">
          {/* Block wrapper keeps the number circle on its own row, above
              the heading, on every priority — SplitReveal renders the H2 as
              inline-block, so an inline circle would otherwise sit beside it. */}
          <div>
            <m.span
              ref={numRef}
              initial={{ scale: 0, opacity: 0 }}
              animate={numInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
              className={`inline-grid h-14 w-14 place-items-center rounded-full text-bone ${accentBg}`}
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.2em]">
                {p.no}
              </span>
            </m.span>
          </div>
          <SplitReveal
            as="h2"
            className="display-serif mt-6 block text-balance text-[clamp(1.75rem,3.9vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.025em]"
          >
            {p.title}
          </SplitReveal>
          <Reveal
            as="p"
            duration={0.9}
            delay={0.2}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink/80"
          >
            {p.intro}
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <Reveal
            duration={0.9}
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute"
          >
            Focus areas
          </Reveal>
          <ul className="mt-6 grid gap-5">
            {p.focusAreas.map((f, j) => (
              <FocusArea key={f.title} area={f} index={j} accentBg={accentBg} />
            ))}
          </ul>
        </div>
      </div>
    </SectionFrame>
  );
}

function FocusArea({ area, index, accentBg }) {
  const ref = useRef(null);
  const inView = useReveal(ref);
  return (
    <m.li
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.15 + index * 0.06,
      }}
      className="flex items-start gap-3 border-b border-ink/10 pb-5 last:border-b-0 last:pb-0"
    >
      <span
        className={`mt-[9px] block h-1.5 w-1.5 flex-shrink-0 rounded-full ${accentBg}`}
      />
      <div>
        <h3 className="display-serif text-[1.15rem] font-medium leading-snug text-ink">
          {area.title}
        </h3>
        <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-ink/75">
          {area.body}
        </p>
      </div>
    </m.li>
  );
}
