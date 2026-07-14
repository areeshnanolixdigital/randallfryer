"use client";

import { useRef } from "react";
import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/animations/gsap";
import Button from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";

const HEADLINE_LINES = ["Restore the", "Capitol.", "Renew the Trust."];

export default function Hero() {
  const container = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yPattern = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yPlate = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacityFade = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.4 });

      // Eyebrow + meta rows
      tl.from(".hero-eyebrow", {
        yPercent: 100,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
      });

      // Headline split per line (animates after fonts ready)
      const animateHeadline = () => {
        const lines = gsap.utils.toArray(".hero-line");
        lines.forEach((el) => {
          const split = SplitText.create(el, {
            type: "words, chars",
            mask: "words",
          });
          gsap.from(split.chars, {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.018,
            delay: 0.6,
          });
        });
      };
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(animateHeadline);
      } else {
        animateHeadline();
      }

      tl.from(
        ".hero-sub",
        {
          opacity: 0,
          y: 24,
          duration: 1,
          ease: "expo.out",
        },
        "+=0.9"
      )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 18,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.08,
          },
          "-=0.6"
        )
        .from(
          ".hero-meta",
          {
            opacity: 0,
            y: 12,
            duration: 0.7,
            ease: "expo.out",
            stagger: 0.06,
          },
          "-=0.5"
        )
        .from(
          ".hero-corner",
          {
            scaleX: 0,
            duration: 1,
            ease: "expo.out",
          },
          0.2
        )
        .from(
          ".hero-corner-v",
          {
            scaleY: 0,
            duration: 1,
            ease: "expo.out",
          },
          0.3
        );

      // Subtle continuous float for the dome plate
      gsap.to(".hero-plate", {
        y: 14,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: container }
  );

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative isolate overflow-hidden pt-[88px]"
    >
      <div ref={container} className="container-padded relative pb-24 pt-12 sm:pb-32 sm:pt-20 lg:pt-28">
        {/* Decorative corner frame */}
        <div className="pointer-events-none absolute inset-0">
          <span className="hero-corner absolute left-0 right-0 top-0 h-px origin-left bg-ink/15" />
          <span className="hero-corner absolute bottom-0 left-0 right-0 h-px origin-right bg-ink/15" />
          <span className="hero-corner-v absolute left-0 top-0 bottom-0 w-px origin-top bg-ink/10" />
          <span className="hero-corner-v absolute right-0 top-0 bottom-0 w-px origin-bottom bg-ink/10" />
        </div>

        {/* Decorative background pattern */}
        <m.div
          aria-hidden
          style={{ y: yPattern, opacity: opacityFade }}
          className="pointer-events-none absolute inset-x-0 top-0 -z-10"
        >
          <PatternRings />
        </m.div>

        {/* Top meta row */}
        <div className="hero-eyebrow mb-12 flex flex-wrap items-baseline justify-between gap-y-3 text-ink/70 sm:mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
            Capitol District 14 · Primary May 19, 2026
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
            File №01 / Manifesto
          </span>
        </div>

        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-10">
          {/* LEFT: Headline */}
          <div className="col-span-12 lg:col-span-8">
            <h1 className="display-serif text-[clamp(2.75rem,9vw,8.5rem)] font-medium leading-[0.95] tracking-[-0.03em] text-ink">
              {HEADLINE_LINES.map((line) => (
                <span key={line} className="hero-line block overflow-hidden">
                  <span className="inline-block">{line}</span>
                </span>
              ))}
            </h1>

            <div className="mt-10 flex flex-wrap items-center gap-4 sm:mt-12">
              <div className="hero-cta">
                <Button as={Link} href="/volunteer" variant="signal" withArrow>
                  Pledge your Vote
                </Button>
              </div>
              <div className="hero-cta">
                <Button as={Link} href="/platform" variant="outline" withArrow>
                  Read the Plan
                </Button>
              </div>
              <Link
                href="/about"
                className="hero-cta link-underline ml-1 cursor-pointer font-mono text-[11px] uppercase tracking-[0.24em] text-ink/70 hover:text-ink"
              >
                Meet Adrian →
              </Link>
            </div>
          </div>

          {/* RIGHT: Sub-copy + key stats */}
          <div className="col-span-12 flex flex-col gap-12 lg:col-span-4 lg:pl-6 lg:pt-4">
            <p className="hero-sub max-w-md text-balance text-lg leading-relaxed text-ink/80 sm:text-xl">
              CapitalWatch is the campaign to stop runaway spending,
              dismantle bureaucratic gridlock, and put working families
              back at the center of the state Capitol.
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/15 pt-8">
              {[
                { value: 12, suffix: "k+", label: "Households visited" },
                { value: 47, suffix: "", label: "Town halls held" },
                { value: 0, prefix: "$", label: "Corporate PAC dollars" },
                { value: 100, suffix: "%", label: "Volunteer driven" },
              ].map((stat) => (
                <div key={stat.label} className="hero-meta">
                  <div className="display-serif text-3xl font-medium tracking-tight sm:text-4xl">
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix || ""}
                      suffix={stat.suffix || ""}
                    />
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating capitol plate */}
        <m.div
          style={{ y: yPlate }}
          className="hero-plate pointer-events-none absolute right-6 top-6 hidden h-[88px] w-[88px] rotate-3 items-center justify-center rounded-full border border-ink/20 bg-bone-soft/60 text-ink lg:flex"
        >
          <svg viewBox="0 0 64 64" className="h-12 w-12">
            <text
              x="32"
              y="9"
              textAnchor="middle"
              fontSize="6"
              letterSpacing="2.4"
              fill="currentColor"
              fontFamily="var(--font-jetbrains-mono)"
            >
              EST · 2026
            </text>
            <circle
              cx="32"
              cy="34"
              r="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M32 22v24M18 34h28"
              stroke="currentColor"
              strokeWidth="1"
            />
            <text
              x="32"
              y="62"
              textAnchor="middle"
              fontSize="6"
              letterSpacing="2"
              fill="currentColor"
              fontFamily="var(--font-jetbrains-mono)"
            >
              CAPITALWATCH
            </text>
          </svg>
        </m.div>
      </div>

      {/* Edge-to-edge marquee */}
      <Marquee />
    </section>
  );
}

function PatternRings() {
  return (
    <svg
      className="ml-auto h-[700px] w-[700px] max-w-full opacity-[0.18] sm:h-[820px] sm:w-[820px]"
      viewBox="0 0 800 800"
      fill="none"
    >
      <defs>
        <radialGradient id="rg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0d1528" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0d1528" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[...Array(14)].map((_, i) => (
        <circle
          key={i}
          cx="600"
          cy="200"
          r={60 + i * 32}
          stroke="url(#rg)"
          strokeWidth="0.8"
        />
      ))}
    </svg>
  );
}

function Marquee() {
  const words = [
    "Fiscal Honesty",
    "Open Government",
    "Safer Communities",
    "Lower Costs",
    "Real Accountability",
    "Smaller Bureaucracy",
  ];
  // Duplicate for seamless loop
  const items = [...words, ...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-ink/15 bg-bone-soft/50 py-5">
      <m.div
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        className="flex w-max items-center gap-12 whitespace-nowrap"
      >
        {items.map((w, i) => (
          <span
            key={i}
            className="display-serif text-3xl font-medium italic tracking-tight text-ink sm:text-4xl"
          >
            {w}
            <span className="ml-12 inline-block h-2 w-2 -translate-y-1.5 rounded-full bg-signal align-middle" />
          </span>
        ))}
      </m.div>
    </div>
  );
}
