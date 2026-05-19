"use client";

import { useRef, useState } from "react";
import { m } from "motion/react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-ink text-bone hover:bg-signal",
  signal: "bg-signal text-bone hover:bg-ink",
  outline:
    "bg-transparent text-ink border border-ink/30 hover:border-ink hover:bg-ink hover:text-bone",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
};

/**
 * Button — magnetic, inertia-driven, with a vertical word-wipe on hover.
 *
 * Layout:
 *   • Primary label sits as a normal flex child inside the pill — it inherits
 *     the pill's `items-center` so it's perfectly centered vertically.
 *   • On hover, that label slides up by its own height (-translate-y-full)
 *     while a duplicate label, anchored absolutely just below the pill
 *     (translate-y-full), slides up into view.
 *   • The pill's `overflow-hidden` clips both during the transition.
 *
 * No absolute-positioning math, no leading hacks, no clipping of the SVG icon.
 */
export default function Button({
  variant = "primary",
  className,
  children,
  withArrow = false,
  as: Tag = "button",
  href,
  ...props
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.2, y: y * 0.35 });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  const Component = href ? "a" : Tag;

  const Label = () => (
    <span className="flex items-center gap-2">
      <span>{children}</span>
      {withArrow && <Arrow />}
    </span>
  );

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.6 }}
      className="inline-block"
    >
      <Component
        href={href}
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-pill px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          variants[variant],
          className
        )}
        {...props}
      >
        {/* primary label — natural flex child, perfectly centered */}
        <span className="block transition-transform duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[200%]">
          <Label />
        </span>

        {/* hover duplicate — slides up from below */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
        >
          <Label />
        </span>
      </Component>
    </m.div>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="-mr-0.5 flex-shrink-0"
      aria-hidden="true"
    >
      <path
        d="M1.5 12.5L12.5 1.5M12.5 1.5H4.5M12.5 1.5V9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
