"use client";

import { useRef, useState } from "react";
import Link from "next/link";
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
 * Button — magnetic pill with a vertical word-wipe on hover.
 *
 * Routing:
 *   • Provide `href="/path"` for an internal route — renders Next/Link.
 *   • Provide `href="https://…"` / `mailto:` / `tel:` — renders a plain anchor.
 *   • Omit `href` — renders a native <button>.
 *   • `as="a"` forces a plain anchor (use for `download`, etc).
 */
export default function Button({
  variant = "primary",
  className,
  children,
  withArrow = false,
  as,
  href,
  type,
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

  // Decide what element to render
  const isExternal =
    typeof href === "string" && /^(mailto:|tel:|https?:|data:)/.test(href);
  let Component;
  if (as === "a") Component = "a";
  else if (href && !isExternal) Component = Link;
  else if (href) Component = "a";
  else Component = "button";

  const isButton = Component === "button";

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
        type={isButton ? type || "button" : undefined}
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-pill px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          variants[variant],
          className
        )}
        {...props}
      >
        <span className="block transition-transform duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[200%]">
          <Label />
        </span>
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
