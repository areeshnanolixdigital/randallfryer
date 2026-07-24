"use client";

import Link from "next/link";
import LivePreview from "@/components/ui/LivePreview";
import { FORMATS, posterFor } from "@/data/socialPosts";

/**
 * PostCard — a single creative tile for the social galleries.
 *
 * Shared by /social-media-posts (approved shortlist) and /social-posts-2
 * (everything else) so both grids stay visually identical.
 */
export default function PostCard({ post }) {
  const fmt = FORMATS[post.format];
  const isCarousel = post.format === "carousel";

  return (
    <Link
      href={`/social-media-posts/${post.slug}`}
      className="group flex flex-col gap-4"
    >
      {/* Live preview frame — carousels get a stacked-card edge */}
      <div className="relative">
        {isCarousel && (
          <>
            <span
              aria-hidden
              className="absolute -right-2 top-2 bottom-2 left-2 -z-10 rounded-card border border-ink/15 bg-ink/70"
            />
            <span
              aria-hidden
              className="absolute -right-1 top-1 bottom-1 left-1 -z-10 rounded-card border border-ink/15 bg-ink/85"
            />
          </>
        )}
        <div className="relative overflow-hidden rounded-card border border-ink/15 bg-ink shadow-[0_30px_60px_-30px_rgba(10,19,38,0.4)] transition-shadow duration-500 group-hover:shadow-[0_40px_80px_-30px_rgba(10,19,38,0.55)]">
          <LivePreview
            file={post.file}
            poster={posterFor(post.file)}
            width={fmt.width}
            height={fmt.height}
            title={`${post.title} preview`}
          />

          {/* Format chip */}
          <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-pill border border-bone/30 bg-bone/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.26em] text-bone/95 backdrop-blur">
            <span className="block h-1.5 w-1.5 rounded-full bg-signal" />
            {fmt.label}
          </span>

          {/* Number plate — or slide count for carousels */}
          <span className="absolute right-3 top-3 z-10 rounded-pill border border-bone/30 bg-bone/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.26em] text-bone/95 backdrop-blur">
            {isCarousel ? `${post.count} slides` : `№${post.no}`}
          </span>

          {/* Hover overlay with View action */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/90">
              {fmt.sub}
            </span>
            <span className="inline-flex items-center gap-2 rounded-pill border border-bone/60 bg-bone/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.26em] text-bone backdrop-blur">
              Open
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
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
      </div>
    </Link>
  );
}
