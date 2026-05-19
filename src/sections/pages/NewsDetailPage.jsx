"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Button from "@/components/ui/Button";
import { getRelatedPosts } from "@/data/news";

export default function NewsDetailPage({ post }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yCover = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const related = getRelatedPosts(post.slug, 3);

  return (
    <main className="relative flex flex-1 flex-col">
      {/* HEADER */}
      <section className="relative isolate overflow-hidden pt-[88px]">
        <div className="container-padded relative pb-12 pt-12 sm:pt-20 lg:pt-24">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-baseline justify-between gap-y-3 text-ink/65"
          >
            <Link
              href="/news"
              className="link-underline font-mono text-[11px] uppercase tracking-[0.28em] hover:text-ink"
            >
              ← All briefings
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
              {post.category} · {post.readMin} min read
            </span>
          </m.div>

          <m.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
            className="hairline mt-6 h-px w-full origin-left"
          />

          <div className="mx-auto mt-12 max-w-3xl">
            <SplitReveal
              as="h1"
              className="display-serif block text-balance text-[clamp(2.25rem,6vw,5rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              {post.title}
            </SplitReveal>
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute"
            >
              <span>By {post.author}</span>
              <span>{post.dateLabel}</span>
            </m.div>
          </div>
        </div>

        {/* COVER */}
        <m.div
          ref={heroRef}
          style={{ y: yCover }}
          className="container-padded relative"
        >
          <m.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-card border border-ink/15 bg-ink"
          >
            <Image
              src={post.cover}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover opacity-95"
              style={{ filter: "grayscale(75%) contrast(1.05) brightness(0.92)" }}
            />
          </m.div>
        </m.div>
      </section>

      {/* BODY */}
      <SectionFrame label="02 — The brief" number="Body / II">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-6 text-[1.125rem] leading-relaxed text-ink/85 sm:text-[1.2rem]">
            {post.body.map((p, i) => (
              <m.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.06,
                }}
                className={i === 0 ? "display-serif text-[1.45rem] leading-snug text-ink sm:text-[1.65rem]" : ""}
              >
                {p}
              </m.p>
            ))}
          </div>

          {/* Share row */}
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-14 flex flex-wrap items-center justify-between gap-y-4 border-t border-ink/15 pt-6"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
              Share this
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {["Email", "X", "Facebook", "Copy link"].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="rounded-pill border border-ink/25 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/85 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-bone"
                >
                  {label}
                </button>
              ))}
            </div>
          </m.div>
        </div>
      </SectionFrame>

      {/* RELATED */}
      {related.length > 0 && (
        <SectionFrame
          label="03 — Keep reading"
          number="Related / III"
          withBottomLine={false}
        >
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <m.li
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.08,
                }}
              >
                <Link href={`/news/${p.slug}`} className="group flex flex-col gap-4">
                  <div className="relative aspect-[5/4] overflow-hidden rounded-card border border-ink/15 bg-ink">
                    <Image
                      src={p.cover}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      style={{ filter: "grayscale(90%) contrast(1.05) brightness(0.9)" }}
                    />
                  </div>
                  <div className="flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                    <span>{p.dateLabel}</span>
                    <span>{p.category}</span>
                  </div>
                  <h3 className="display-serif text-lg font-medium leading-tight">
                    {p.title}
                  </h3>
                </Link>
              </m.li>
            ))}
          </ul>
        </SectionFrame>
      )}
    </main>
  );
}
