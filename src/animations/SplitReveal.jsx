"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/animations/gsap";
import { cn } from "@/utils/cn";

/**
 * SplitReveal — splits children text into lines/words/chars and animates them in.
 *
 * Props:
 *   as           HTML tag for the wrapper (default "div")
 *   type         "lines" | "words" | "chars" (default "lines, words")
 *   stagger      number (default 0.08)
 *   duration     number (default 1.1)
 *   y            initial y offset in px (default "110%")
 *   delay        number (default 0)
 *   trigger      "viewport" (default) | "immediate"
 *   start        ScrollTrigger start (default "top 80%")
 *   className    extra classes
 */
export default function SplitReveal({
  as: Tag = "div",
  type = "lines, words",
  stagger = 0.08,
  duration = 1.1,
  y = "110%",
  delay = 0,
  trigger = "viewport",
  start = "top 85%",
  className,
  children,
  ...rest
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      let split;
      let tween;

      const run = () => {
        split = SplitText.create(el, {
          type,
          mask: "lines",
          autoSplit: true,
          linesClass: "split-line",
          wordsClass: "split-word",
          charsClass: "split-char",
        });

        const targets =
          type.includes("chars")
            ? split.chars
            : type.includes("words")
            ? split.words
            : split.lines;

        gsap.set(targets, { yPercent: 100, opacity: 1 });

        tween = gsap.to(targets, {
          yPercent: 0,
          duration,
          ease: "expo.out",
          stagger,
          delay,
          scrollTrigger:
            trigger === "viewport"
              ? {
                  trigger: el,
                  start,
                  toggleActions: "play none none none",
                }
              : undefined,
        });
      };

      // Ensure fonts loaded before splitting for accurate line breaks
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(run);
      } else {
        run();
      }

      return () => {
        tween?.kill();
        split?.revert();
      };
    },
    { scope: ref, dependencies: [children] }
  );

  return (
    <Tag ref={ref} className={cn("inline-block", className)} {...rest}>
      {children}
    </Tag>
  );
}
