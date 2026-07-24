"use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import PostCard from "@/components/ui/PostCard";
import Button from "@/components/ui/Button";
import SectionFrame from "@/animations/SectionFrame";
import Reveal from "@/animations/Reveal";
import { ARCHIVE_ITEMS } from "@/data/socialPosts";

const FEED_COUNT = ARCHIVE_ITEMS.filter((p) => p.format === "feed").length;
const STORY_COUNT = ARCHIVE_ITEMS.filter((p) => p.format === "story").length;
const CAROUSEL_COUNT = ARCHIVE_ITEMS.filter((p) => p.format === "carousel").length;

// Poster thumbnails are lazy-loaded, but ~90 full-bleed JPEGs is still a lot to
// hand the browser at once, so the grid pages in on demand.
const PAGE_SIZE = 24;

export default function SocialPosts2Page() {
  const [shown, setShown] = useState(PAGE_SIZE);

  const shownItems = ARCHIVE_ITEMS.slice(0, shown);
  const remaining = ARCHIVE_ITEMS.length - shownItems.length;

  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        number="Creatives / IX·II"
        title="Social posts 2."
        intro="The extended library — the remaining feed creatives, every story artboard, and the multi-slide carousels. Every artboard renders live, exactly as designed."
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
        <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
              Showing {shownItems.length} of {ARCHIVE_ITEMS.length}
            </span>
          </div>
        )}
      </SectionFrame>
    </main>
  );
}
