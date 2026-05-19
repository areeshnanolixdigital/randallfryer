"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Button from "@/components/ui/Button";

const ELECTION = new Date("2026-05-19T07:00:00-07:00");

function getDelta() {
  const ms = ELECTION.getTime() - Date.now();
  const clamped = Math.max(0, ms);
  const sec = Math.floor(clamped / 1000);
  return {
    d: Math.floor(sec / 86400),
    h: Math.floor((sec % 86400) / 3600),
    m: Math.floor((sec % 3600) / 60),
    s: sec % 60,
  };
}

export default function Countdown() {
  const [delta, setDelta] = useState(() => getDelta());
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yBackdrop = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setDelta(getDelta()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={sectionRef} className="relative">
    <SectionFrame
      id="events"
      label="04 — Primary Day"
      number="Countdown / IV"
      tone="dark"
      backdrop={
        <>
          <m.div style={{ y: yBackdrop }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=1800&h=1100&fit=crop&q=80"
              alt=""
              fill
              priority={false}
              aria-hidden
              className="object-cover opacity-[0.18]"
              sizes="100vw"
              style={{ filter: "grayscale(100%)" }}
            />
          </m.div>
          <div aria-hidden className="duotone-radial absolute inset-0" />
        </>
      }
    >
      <div className="grid grid-cols-12 items-end gap-y-12 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-7">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-bone/60">
            Tuesday · May 19, 2026 · Polls open 7am – 8pm
          </span>
          <SplitReveal
            as="h2"
            className="display-serif mt-5 block text-balance text-[clamp(2.25rem,6.5vw,5.75rem)] font-medium leading-[0.98] tracking-[-0.03em] text-bone"
          >
            Turnout decides this. Mark the date.
          </SplitReveal>
          <m.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-bone/75"
          >
            District 14 primaries are won by less than a thousand votes.
            Your single ballot — and the neighbors you bring — change
            this race.
          </m.p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button as={Link} href="/events" variant="signal" withArrow>
              Find your Polling Place
            </Button>
            <Button
              as={Link}
              href="/contact"
              variant="outline"
              withArrow
              className="!border-bone/40 !text-bone hover:!bg-bone hover:!text-ink"
            >
              Request Mail Ballot
            </Button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:pl-6">
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {[
              { k: "d", l: "Days" },
              { k: "h", l: "Hrs" },
              { k: "m", l: "Min" },
              { k: "s", l: "Sec" },
            ].map((u, i) => (
              <m.div
                key={u.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative aspect-[3/4] overflow-hidden rounded-soft border border-bone/15 bg-ink-soft/60"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="display-serif text-[clamp(2.2rem,6vw,4.5rem)] font-medium tabular-nums text-bone"
                    aria-live="polite"
                  >
                    {mounted ? String(delta[u.k]).padStart(2, "0") : "--"}
                  </span>
                </div>
                <div className="absolute bottom-2 left-0 right-0 text-center font-mono text-[9px] uppercase tracking-[0.28em] text-bone/55 sm:text-[10px]">
                  {u.l}
                </div>
                <div className="absolute left-2 top-2 font-mono text-[8px] uppercase tracking-[0.32em] text-bone/40">
                  0{i + 1}
                </div>
              </m.div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-bone/55">
            <span>Until the polls open</span>
            <span className="flex items-center gap-2">
              <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
              Live
            </span>
          </div>
        </div>
      </div>
    </SectionFrame>
    </div>
  );
}
