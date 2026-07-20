"use client";

import { m } from "motion/react";
import PageHero from "@/components/ui/PageHero";
import CreativeFrame from "@/components/ui/CreativeFrame";
import SectionFrame from "@/animations/SectionFrame";
import { SOCIAL_POSTS, FORMATS } from "@/data/socialPosts";
import { cn } from "@/lib/cn";

export default function SocialMediaPostsPage() {
  const feedPosts = SOCIAL_POSTS.filter((p) => p.format === "feed");
  const storyPosts = SOCIAL_POSTS.filter((p) => p.format === "story");
  const inProduction = SOCIAL_POSTS.filter((p) => !p.image).length;

  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №09 — Press Kit"
        number="Creatives / IX"
        title="Social posts."
        intro="The campaign's social creative, previewed in place — square cuts for the feed, vertical cuts for stories."
      >
        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-mute">
          <span className="flex items-baseline gap-2">
            <span className="display-serif text-2xl font-medium tracking-tight text-ink">
              {feedPosts.length}
            </span>
            Feed posts
          </span>
          <span className="hairline h-px w-8" />
          <span className="flex items-baseline gap-2">
            <span className="display-serif text-2xl font-medium tracking-tight text-ink">
              {storyPosts.length}
            </span>
            Story posts
          </span>
          <span className="hairline h-px w-8" />
          <span className="flex items-baseline gap-2">
            <span className="display-serif text-2xl font-medium tracking-tight text-signal">
              {inProduction}
            </span>
            In production
          </span>
        </div>
      </PageHero>

      {/* FEED POSTS — 1080 × 1080 */}
      <SectionFrame id="feed" label="01 — Feed posts" number={FORMATS.feed.sub}>
        <GallerySection
          title="Feed"
          description="Square creatives for the Instagram and Facebook feed — one per plank of the platform, plus the introduction and election-day cards."
          posts={feedPosts}
          gridClassName="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          columns={4}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </SectionFrame>

      {/* STORY POSTS — 1080 × 1920 */}
      <SectionFrame id="story" label="02 — Story posts" number={FORMATS.story.sub}>
        <GallerySection
          title="Story"
          description="Vertical cuts of the same ten concepts, framed for Instagram stories and Reels covers."
          posts={storyPosts}
          gridClassName="sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
          columns={5}
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
      </SectionFrame>

      {/* Usage block */}
      <SectionFrame label="03 — Usage" number="Press notes / III">
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="display-serif text-balance text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em]">
              For press, partners, and{" "}
              <span className="italic text-signal-deep">supporters.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/75">
              Every slot below the fold is reserved for a finished creative.
              Until one ships, an in-brand plate holds its place — same
              palette, same type, same proportions as the final artwork.
            </p>
          </div>
          <ul className="col-span-12 grid gap-6 lg:col-span-5">
            {[
              {
                t: "Placeholder plates",
                d: "Cards marked “In production” are reserved slots — final artwork drops in without the layout moving.",
              },
              {
                t: "Native formats",
                d: "Feed creatives run 1080 × 1080 and stories 1080 × 1920 — sized to Instagram's spec.",
              },
              {
                t: "Brand consistent",
                d: "Palette and typography match the rest of the campaign — navy, crimson, and gold on paper.",
              },
            ].map((item) => (
              <li key={item.t} className="border-t border-ink/15 pt-5">
                <span className="eyebrow">{item.t}</span>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/80">
                  {item.d}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </SectionFrame>
    </main>
  );
}

function GallerySection({ title, description, posts, gridClassName, columns, sizes }) {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <h2 className="display-serif text-balance text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em]">
          {title}
          <span className="italic text-signal-deep"> posts.</span>
        </h2>
        <p className="max-w-sm text-[0.95rem] leading-relaxed text-ink/70">
          {description}
        </p>
      </div>

      <ul className={cn("mt-12 grid grid-cols-1 gap-x-6 gap-y-12", gridClassName)}>
        {posts.map((post, i) => (
          <m.li
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: (i % columns) * 0.05,
            }}
          >
            <PostCard post={post} sizes={sizes} />
          </m.li>
        ))}
      </ul>
    </>
  );
}

function PostCard({ post, sizes }) {
  const fmt = FORMATS[post.format];

  return (
    <article className="group flex flex-col gap-4">
      {/* Creative frame */}
      <div className="relative overflow-hidden rounded-card border border-ink/15 bg-ink shadow-[0_30px_60px_-30px_rgba(10,19,38,0.4)]">
        <CreativeFrame
          post={post}
          format={fmt}
          sizes={sizes}
          className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </div>

      {/* Caption */}
      <div>
        <div className="flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">
          <span>
            {fmt.label} · №{post.no}
          </span>
          <span>{fmt.sub}</span>
        </div>
        <h3 className="display-serif mt-2 text-lg font-medium leading-tight tracking-tight transition-colors duration-300 group-hover:text-signal">
          {post.title}
        </h3>
        <p className="mt-1 text-[13px] leading-relaxed text-ink/70">
          {post.concept}
        </p>
      </div>
    </article>
  );
}
