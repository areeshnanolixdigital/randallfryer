"use client";

import { useRef } from "react";
import { m, useInView } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * SectionFrame — shared shell for every section.
 *
 * Build order on enter:
 *   1. top hairline draws left → right
 *   2. eyebrow label + number fade up
 *   3. children fade in
 *   4. bottom hairline draws
 *
 * `tone="light"` (default) renders on bone with ink lines.
 * `tone="dark"` renders on ink with bone lines.
 */
export default function SectionFrame({
  id,
  label,
  number,
  children,
  className,
  innerClassName,
  withBottomLine = true,
  tone = "light",
  backdrop = null,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const isDark = tone === "dark";
  const surface = isDark ? "bg-ink text-bone" : "";
  const lineClass = isDark ? "bg-bone/20" : "hairline";
  const labelClass = isDark ? "text-bone/55" : "text-ink-mute";

  return (
    <section
      ref={ref}
      id={id}
      className={cn("relative overflow-hidden", surface, className)}
    >
      {backdrop && (
        <div className="pointer-events-none absolute inset-0 z-0">{backdrop}</div>
      )}
      <div className="container-padded relative z-10">
        <div className="relative pt-10 sm:pt-14">
          <m.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className={cn("h-px w-full origin-left build-line", lineClass)}
          />

          {(label || number) && (
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.55,
              }}
              className={cn("mt-4 flex items-center justify-between", labelClass)}
            >
              <span
                className={cn(
                  "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em]"
                )}
              >
                {label}
              </span>
              {number && (
                <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                  {number}
                </span>
              )}
            </m.div>
          )}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.75 }}
          className={cn("pt-10 sm:pt-14", innerClassName)}
        >
          {children}
        </m.div>

        {withBottomLine && (
          <m.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2,
            }}
            className={cn(
              "mt-20 h-px w-full origin-left build-line sm:mt-28",
              lineClass
            )}
          />
        )}
      </div>
    </section>
  );
}
