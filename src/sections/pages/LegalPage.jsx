"use client";

import { useState } from "react";
import { m } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";

/**
 * LegalPage — generic shell for Privacy / Terms style content.
 *
 *   title           Top headline
 *   updated         "Last updated: 2026-04-12"
 *   intro           One paragraph summary
 *   sections        [{ id, title, body: [string|JSX] }]
 */
export default function LegalPage({ eyebrow, number, title, updated, intro, sections }) {
  return (
    <main className="relative flex flex-1 flex-col">
      <section className="relative isolate overflow-hidden pt-[88px]">
        <div className="container-padded relative pb-16 pt-12 sm:pt-20 lg:pt-24">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-baseline justify-between gap-y-3 text-ink/65"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
              {eyebrow}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
              {number}
            </span>
          </m.div>

          <m.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
            className="hairline mt-6 h-px w-full origin-left"
          />

          <div className="mt-12 grid grid-cols-12 gap-y-10 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-8">
              <SplitReveal
                as="h1"
                className="display-serif block text-balance text-[clamp(2.25rem,5.5vw,5rem)] font-medium leading-[1.02] tracking-[-0.025em]"
              >
                {title}
              </SplitReveal>
              {intro && (
                <m.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 max-w-2xl text-balance text-[1.05rem] leading-relaxed text-ink/80 sm:text-lg"
                >
                  {intro}
                </m.p>
              )}
            </div>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 lg:col-span-4"
            >
              <div className="rounded-card border border-ink/15 bg-bone-soft/50 p-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                  Last updated
                </span>
                <div className="display-serif mt-2 text-lg">{updated}</div>
                <p className="mt-3 text-[13px] leading-relaxed text-ink/70">
                  Material changes are emailed to subscribers and posted
                  here. Older versions are archived on request.
                </p>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      <SectionFrame label="02 — In this document" number="Index / II">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <aside className="col-span-12 lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
            <span className="eyebrow">Sections</span>
            <ol className="mt-5 flex flex-col gap-2.5 text-[14px] text-ink/80">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="link-underline flex items-baseline gap-3"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                      0{i + 1}
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="col-span-12 lg:col-span-8">
            <div className="flex flex-col gap-14">
              {sections.map((s, i) => (
                <LegalSection key={s.id} s={s} index={i} />
              ))}
            </div>
          </div>
        </div>
      </SectionFrame>
    </main>
  );
}

function LegalSection({ s, index }) {
  return (
    <m.section
      id={s.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
      className="scroll-mt-32"
    >
      <div className="flex items-baseline gap-4 border-t border-ink/15 pt-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
          0{index + 1}
        </span>
        <h2 className="display-serif text-[clamp(1.5rem,2.5vw,2.25rem)] font-medium leading-tight">
          {s.title}
        </h2>
      </div>
      <div className="mt-5 flex max-w-2xl flex-col gap-4 text-[1rem] leading-relaxed text-ink/80">
        {s.body.map((p, i) =>
          typeof p === "string" ? <p key={i}>{p}</p> : <div key={i}>{p}</div>
        )}
      </div>
    </m.section>
  );
}
