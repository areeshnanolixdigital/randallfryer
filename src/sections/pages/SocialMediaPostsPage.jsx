"use client";

import { useMemo, useState } from "react";
import PageHero from "@/components/ui/PageHero";
import PostCard from "@/components/ui/PostCard";
import Button from "@/components/ui/Button";
import SectionFrame from "@/animations/SectionFrame";
import Reveal from "@/animations/Reveal";
import { GALLERY_ITEMS, CAROUSELS } from "@/data/socialPosts";
import { cn } from "@/lib/cn";

const FEED_COUNT = GALLERY_ITEMS.filter((p) => p.format === "feed").length;
const STORY_COUNT = GALLERY_ITEMS.filter((p) => p.format === "story").length;
const CAROUSEL_COUNT = CAROUSELS.length;

const FILTERS = [
  { key: "all", label: "All", sub: `${GALLERY_ITEMS.length} designs` },
  { key: "feed", label: "Feed", sub: "1080 × 1080" },
  { key: "story", label: "Story", sub: "1080 × 1920" },
  { key: "carousel", label: "Carousel", sub: "1080 × 1350" },
];

// Poster thumbnails are lazy-loaded, but ~100 full-bleed JPEGs is still a lot
// to hand the browser at once, so the grid pages in on demand.
const PAGE_SIZE = 24;

export default function SocialMediaPostsPage() {
  const [filter, setFilter] = useState("all");
  const [shown, setShown] = useState(PAGE_SIZE);

  const visible = useMemo(
    () =>
      filter === "all"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((p) => p.format === filter),
    [filter]
  );

  // Switching format starts the grid over, otherwise you land mid-way down a
  // list that just got shorter. Done in the handler rather than an effect so
  // the reset happens in the same render pass as the filter change.
  const selectFilter = (key) => {
    setFilter(key);
    setShown(PAGE_SIZE);
  };

  const shownItems = visible.slice(0, shown);
  const remaining = visible.length - shownItems.length;

  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        title="Social media posts."
        intro="The full visual campaign — editorial creatives across Instagram feed posts, stories, and multi-slide carousels. Every artboard renders live, exactly as designed."
      >
        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-mute">
          <span className="flex items-baseline gap-2">
            <span className="display-serif text-2xl font-medium tracking-tight text-ink">
              {FEED_COUNT}
            </span>
            Feed posts
          </span>
          <span className="hairline h-px w-8" />
          <span className="flex items-baseline gap-2">
            <span className="display-serif text-2xl font-medium tracking-tight text-ink">
              {STORY_COUNT}
            </span>
            Story creatives
          </span>
          <span className="hairline h-px w-8" />
          <span className="flex items-baseline gap-2">
            <span className="display-serif text-2xl font-medium tracking-tight text-ink">
              {CAROUSEL_COUNT}
            </span>
            Carousels
          </span>
        </div>
      </PageHero>

      <SectionFrame id="gallery">
        {/* FORMAT TABS */}
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => selectFilter(f.key)}
                aria-pressed={active}
                className={cn(
                  "group inline-flex items-center gap-3 rounded-pill border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] transition-colors duration-300",
                  active
                    ? "border-ink bg-ink text-bone"
                    : "border-ink/25 text-ink/80 hover:border-ink hover:text-ink"
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "block h-1.5 w-1.5 rounded-full transition-colors",
                    active ? "bg-signal" : "bg-ink/35 group-hover:bg-signal"
                  )}
                />
                {f.label}
                <span
                  className={cn(
                    "text-[10px] tracking-[0.2em] transition-colors",
                    active ? "text-bone/70" : "text-ink-mute"
                  )}
                >
                  {f.sub}
                </span>
              </button>
            );
          })}
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shownItems.map((post, i) => (
            <Reveal as="li" key={post.slug} duration={0.55} delay={(i % 4) * 0.04}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </ul>

        {remaining > 0 && (
          <div className="mt-14 flex flex-col items-center gap-3">
            <Button
              as="button"
              type="button"
              onClick={() => setShown((s) => s + PAGE_SIZE)}
              variant="outline-inverse"
              size="sm"
            >
              <span className="inline-flex items-center gap-3">
                Show more creatives
                <span className="text-bone/70 transition-colors group-hover:text-ink-mute">
                  {remaining} left
                </span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M7 1v12M1 7h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </span>
            </Button>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">
              Showing {shownItems.length} of {visible.length}
            </span>
          </div>
        )}
      </SectionFrame>
    </main>
  );
}
