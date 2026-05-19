"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import PageHero from "@/components/ui/PageHero";
import { POSTS } from "@/data/news";

export default function NewsPage() {
  const [featured, ...rest] = POSTS;

  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №08 — News"
        number="Briefings / VIII"
        title="From the field & the file."
        intro="Policy briefs, weekly debriefs from the doors, and the receipts behind every CapitalWatch claim."
      />

      {/* FEATURED */}
      <SectionFrame label="02 — Featured" number="Top story / II">
        <Link
          href={`/news/${featured.slug}`}
          className="group grid grid-cols-12 gap-y-8 lg:gap-x-12"
        >
          <div className="col-span-12 lg:col-span-7">
            <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-ink/15 bg-ink">
              <Image
                src={featured.cover}
                alt={featured.title}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ filter: "grayscale(80%) contrast(1.05) brightness(0.92)" }}
              />
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-multiply"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,19,38,0.1) 0%, rgba(10,19,38,0.45) 100%)",
                }}
              />
              <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-pill border border-bone/30 bg-bone/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-bone/95 backdrop-blur">
                <span className="block h-1.5 w-1.5 rounded-full bg-signal" />
                {featured.category}
              </span>
            </div>
          </div>
          <div className="col-span-12 flex flex-col justify-end lg:col-span-5">
            <div className="flex items-baseline gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
              <span>{featured.dateLabel}</span>
              <span>{featured.readMin} min read</span>
            </div>
            <h2 className="display-serif mt-4 text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em]">
              {featured.title}
            </h2>
            <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink/80">
              {featured.excerpt}
            </p>
            <div className="mt-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-ink/80">
              <span className="link-underline">Read the brief</span>
              <span
                aria-hidden
                className="grid h-9 w-9 place-items-center rounded-full border border-ink/30 transition-transform duration-500 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-bone"
              >
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1.5 12.5L12.5 1.5M12.5 1.5H4.5M12.5 1.5V9.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </SectionFrame>

      {/* RECENT GRID */}
      <SectionFrame
        label="03 — More from the brief"
        number={`${rest.length} posts`}
        withBottomLine={false}
      >
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <m.li
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: (i % 3) * 0.08,
              }}
            >
              <Link href={`/news/${p.slug}`} className="group flex flex-col gap-4">
                <div className="relative aspect-[5/4] overflow-hidden rounded-card border border-ink/15 bg-ink">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 28vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    style={{ filter: "grayscale(90%) contrast(1.05) brightness(0.92)" }}
                  />
                </div>
                <div className="flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                  <span>{p.dateLabel}</span>
                  <span>{p.category}</span>
                </div>
                <h3 className="display-serif text-xl font-medium leading-tight">
                  {p.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-ink/75">
                  {p.excerpt}
                </p>
              </Link>
            </m.li>
          ))}
        </ul>
      </SectionFrame>
    </main>
  );
}
