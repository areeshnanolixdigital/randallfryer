"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import { gsap, useGSAP } from "@/animations/gsap";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

const BIO_BLOCKS = [
  {
    eyebrow: "Beginnings",
    heading: "A neighbor, not a career politician.",
    body: "Adrian grew up two blocks from the marina in Harborlight, paid her way through community college, and spent the next twelve years building Marín-Vale Logistics — a 22-person small business that still ships out of Pier 7. She has never held elected office. She knocked her first door because her own zoning case was sitting on a desk in Salem for nineteen months.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&h=600&fit=crop&q=80",
    imageAlt: "A community meeting around a long table",
  },
  {
    eyebrow: "In the trenches",
    heading: "Twelve years running a real business.",
    body: "Running payroll in a 30% margin industry teaches you something the lobby never learns: every line item matters. Adrian built Marín-Vale from one truck to twenty-two employees while paying full benefits and union wages. That ledger discipline — and the patience to listen to drivers, dispatchers, and customers — is the same operating model she will bring to District 14.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=600&fit=crop&q=80",
    imageAlt: "Volunteers organising at a campaign field office",
  },
  {
    eyebrow: "On the doors",
    heading: "Eleven thousand conversations and counting.",
    body: "Since announcing in March, Adrian and the team have knocked more than 12,000 doors. The line that keeps coming up is the same on every porch: 'We pay more every year and get less every year.' CapitalWatch is the answer that came out of those conversations — a campaign written from the curb up, not handed down from a consultant's slide deck.",
    image:
      "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=900&h=600&fit=crop&q=80",
    imageAlt: "Neighbors talking on a front porch",
  },
];

const VALUES = [
  {
    no: "01",
    title: "Fiscal honesty",
    body: "Every line item, in public, every ninety days. No more midnight earmarks or last-minute riders for politically connected vendors.",
  },
  {
    no: "02",
    title: "Common-sense leadership",
    body: "Read the bill. Talk to the people it affects. Then vote — and explain the vote in plain English the same week.",
  },
  {
    no: "03",
    title: "Community first",
    body: "District 14 sets the agenda, not the lobbyist class in Salem. Office hours stay open, town halls stay un-staged.",
  },
];

const JOURNEY = [
  {
    year: "1994",
    title: "Born in Harborlight",
    body: "Daughter of a coastal fisherman and a public school teacher.",
  },
  {
    year: "2012",
    title: "First full-time job",
    body: "Dispatcher at a regional freight line — first paycheck in Pier 7.",
  },
  {
    year: "2017",
    title: "Marín-Vale Logistics founded",
    body: "Started with one truck and a $14k SBA loan. Grew to 22 employees.",
  },
  {
    year: "2022",
    title: "Community advocate",
    body: "Led the petition that reopened Harborlight Senior Center after budget cuts.",
  },
  {
    year: "2024",
    title: "Local civic board",
    body: "Elected to the District 14 Small Business Council. Authored the cost-of-living audit.",
  },
  {
    year: "2026",
    title: "Candidate for State Senate",
    body: "Filed February 14. Primary May 19, 2026.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №02 — About"
        number="Meet the candidate"
        title="Leadership built from the ground up."
        intro="Adrian Vale is a small-business owner, mother, and lifelong Harborlight resident running for State Senate to restore the Capitol to the people who actually pay for it."
        image="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=900&h=1125&fit=crop&q=80"
        imageAlt="Adrian Vale, candidate for State Senate"
      />

      {/* Long-form bio blocks */}
      {BIO_BLOCKS.map((b, i) => (
        <BioBlock key={b.heading} block={b} reverse={i % 2 === 1} index={i} />
      ))}

      {/* Core values */}
      <SectionFrame
        label="03 — Core Values"
        number="Principles / III"
      >
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(2rem,5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              Three principles. Non-negotiable.
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-8 max-w-md text-lg leading-relaxed text-ink/75"
            >
              Every position, every vote, and every line item in
              Adrian&rsquo;s schedule traces back to these three.
            </m.p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {VALUES.map((v, i) => (
                <m.div
                  key={v.no}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.1,
                  }}
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col gap-4 rounded-card border border-ink/15 bg-bone-soft/60 p-7 transition-colors duration-500 hover:border-ink"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                    {v.no}
                  </span>
                  <h3 className="display-serif text-2xl font-medium leading-tight">
                    {v.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-ink/75">
                    {v.body}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </SectionFrame>

      {/* Journey timeline */}
      <Journey />

      {/* Closing CTA */}
      <SectionFrame
        label="05 — Get involved"
        number="Together / V"
        withBottomLine={false}
      >
        <div className="grid grid-cols-12 items-end gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(2rem,5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              Join Adrian on the trail.
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75"
            >
              Whether it&rsquo;s an hour of phone banking, a shift on the
              doors, or a small-dollar pledge — every contribution lands
              on the curb in District 14.
            </m.p>
          </div>
          <div className="col-span-12 flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <Button as={Link} href="/volunteer" variant="primary" withArrow>
              Volunteer
            </Button>
            <Button as={Link} href="/donate" variant="signal" withArrow>
              Donate
            </Button>
          </div>
        </div>
      </SectionFrame>
    </main>
  );
}

function BioBlock({ block, reverse, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref}>
      <SectionFrame
        label={`0${index + 2} — ${block.eyebrow}`}
        number={`Chapter / ${["II", "III", "IV"][index] || "I"}`}
      >
        <div
          className={`grid grid-cols-12 gap-y-10 lg:gap-x-12 ${
            reverse ? "lg:[&>div:first-child]:order-2" : ""
          }`}
        >
          <m.div
            style={{ y }}
            className="col-span-12 lg:col-span-5"
          >
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[5/4] w-full overflow-hidden rounded-card border border-ink/15 bg-ink"
            >
              <Image
                src={block.image}
                alt={block.imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover opacity-90"
                style={{ filter: "grayscale(100%) contrast(1.05) brightness(0.9)" }}
              />
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-multiply"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,19,38,0.15) 0%, rgba(10,19,38,0.6) 100%)",
                }}
              />
            </m.div>
          </m.div>

          <div className="col-span-12 lg:col-span-7 lg:pl-6">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.875rem,4.25vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em]"
            >
              {block.heading}
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-ink/80"
            >
              {block.body}
            </m.p>
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}

function Journey() {
  const wrap = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
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

      gsap.utils.toArray(".journey-node").forEach((node) => {
        gsap.from(node, {
          scale: 0,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(2)",
          scrollTrigger: { trigger: node, start: "top 80%" },
        });
      });
    },
    { scope: wrap }
  );

  return (
    <div ref={wrap}>
      <SectionFrame label="04 — The Journey" number="Timeline / IV">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(2rem,5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              From neighbor to candidate.
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-8 max-w-md text-lg leading-relaxed text-ink/75"
            >
              Six checkpoints between a quiet pier in Harborlight and a
              filing date in Salem.
            </m.p>
          </div>

          <div className="relative col-span-12 mt-2 lg:col-span-7">
            <span
              ref={lineRef}
              aria-hidden
              className="absolute left-[14px] top-5 bottom-3 w-px origin-top bg-ink/30 sm:left-[19px]"
            />
            <div className="flex flex-col gap-12 sm:gap-14">
              {JOURNEY.map((j, i) => (
                <m.div
                  key={j.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.06,
                  }}
                  className="relative pl-12 sm:pl-16"
                >
                  <span
                    aria-hidden
                    className="journey-node absolute left-0 top-1 grid h-[30px] w-[30px] place-items-center rounded-full bg-ink text-bone shadow-[0_0_0_4px_var(--color-bone)] sm:h-[40px] sm:w-[40px]"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] sm:text-[10px]">
                      {j.year}
                    </span>
                  </span>
                  <h3 className="display-serif text-2xl font-medium leading-tight">
                    {j.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink/75">
                    {j.body}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}
