"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Button from "@/components/ui/Button";

export default function WhyRunning() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={ref} className="relative">
      <SectionFrame
        id="meet"
        label="01 — Why I'm Running"
        number="Manifesto / I"
      >
        <div className="grid grid-cols-12 gap-y-14 lg:gap-x-12">
          {/* Portrait card */}
          <m.div
            style={{ y: yPortrait }}
            className="col-span-12 md:col-span-5 lg:col-span-5"
          >
            <PortraitCard />
          </m.div>

          {/* Editorial copy */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:pl-6">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(2rem,5.5vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              The Capitol forgot whose money it spends. I am running to remind it.
            </SplitReveal>

            <m.div
              style={{ y }}
              className="mt-10 grid gap-7 text-lg leading-relaxed text-ink/85 sm:text-[1.075rem]"
            >
              <m.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                For eight years I watched leaders in District 14 treat
                taxpayers as a limitless wallet — funding pet projects,
                inflating agencies, and then claiming they need more.
                Families pay the bill in property taxes, grocery
                receipts, and dwindling services.
              </m.p>
              <m.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.12,
                }}
              >
                CapitalWatch is the work of restoring a simple idea:
                public money belongs to the public. We will audit waste,
                publish every line item, and rebuild a Capitol that
                answers when we knock.
              </m.p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <Button as={Link} href="/about" variant="primary" withArrow>
                Read Adrian&rsquo;s Story
              </Button>
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
                A 4-minute read
              </span>
            </m.div>

            {/* Signature */}
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="mt-14 flex items-center gap-5"
            >
              <SignatureSVG />
              <div className="leading-tight">
                <div className="display-serif text-lg italic">Adrian Vale</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                  Candidate · State Senate · District 14
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}

function PortraitCard() {
  return (
    <div className="relative">
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-ink/15 bg-ink"
      >
        {/* Portrait photo (duotoned via blend modes) */}
        <Image
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&h=1125&fit=crop&q=80"
          alt="Adrian Vale portrait"
          width={900}
          height={1125}
          priority
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          style={{ filter: "grayscale(100%) contrast(1.05) brightness(0.85)" }}
        />
        {/* Duotone overlay */}
        <div aria-hidden className="duotone-strong absolute inset-0 mix-blend-multiply" />
        <div aria-hidden className="duotone-tint absolute inset-0 mix-blend-color" />

        {/* Bottom caption */}
        <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-bone">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/65">
              State Senate · District 14
            </div>
            <div className="display-serif mt-1 text-3xl font-medium">
              Adrian Vale
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/65">
              Primary
            </div>
            <div className="display-serif text-2xl font-medium">5/19/26</div>
          </div>
        </div>

        {/* Signal corner accent */}
        <div className="absolute right-5 top-5 flex items-center gap-2 rounded-pill border border-bone/30 bg-bone/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-bone/85 backdrop-blur">
          <span className="block h-1.5 w-1.5 rounded-full bg-ochre" />
          On the Ballot
        </div>

        {/* Vertical caption */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 font-mono text-[10px] uppercase tracking-[0.32em] text-bone/45">
          CAPITALWATCH · 2026
        </div>
      </m.div>

      {/* Bottom caption strip */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute"
      >
        <span>Photographed in Harborlight, OR</span>
        <span>Frame 02 · 4×5</span>
      </m.div>
    </div>
  );
}

function SignatureSVG() {
  return (
    <svg viewBox="0 0 170 60" className="h-12 w-auto text-ink">
      <path
        d="M5 38 C18 8, 30 8, 38 38 M22 30 H40 M48 42 C56 18, 70 18, 70 38 C70 50, 60 50, 60 40 C60 28, 78 26, 88 38 M88 16 C92 12, 100 14, 96 26 M98 36 C108 30, 120 30, 124 42 M132 18 C124 32, 140 38, 138 50 M148 36 C158 30, 165 36, 162 44"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
