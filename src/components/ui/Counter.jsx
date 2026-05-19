"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/**
 * Counter — counts a numeric value up from 0 once the element enters viewport.
 *
 *   value     final number (e.g., 12000)
 *   prefix    string before the number ("$")
 *   suffix    string after the number ("k+", "%", "yrs")
 *   duration  ms (default 1800)
 *   format    optional (n) => string, defaults to n.toLocaleString()
 */
export default function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1800,
  format,
  className,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const startVal = 0;
    const endVal = value;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // ease out expo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const current = Math.round(startVal + (endVal - startVal) * eased);
      setN(current);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const formatted = format ? format(n) : n.toLocaleString();
  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
