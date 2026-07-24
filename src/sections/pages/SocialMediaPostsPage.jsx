import PageHero from "@/components/ui/PageHero";
import PostCard from "@/components/ui/PostCard";
import SectionFrame from "@/animations/SectionFrame";
import Reveal from "@/animations/Reveal";
import { FEATURED_ITEMS } from "@/data/socialPosts";

// The approved shortlist only. No format filters, search, or paging here —
// with a single screenful of feed creatives there is nothing to narrow down.
// The remaining creatives live on /social-posts-2.
export default function SocialMediaPostsPage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        number="Creatives / IX"
        title="Social media posts."
        intro="The campaign's editorial Instagram creatives. Every artboard renders live, exactly as designed."
      >
        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-mute">
          <span className="flex items-baseline gap-2">
            <span className="display-serif text-2xl font-medium tracking-tight text-ink">
              {FEATURED_ITEMS.length}
            </span>
            Creatives
          </span>
          <span className="hairline h-px w-8" />
          <span>1080 × 1080</span>
        </div>
      </PageHero>

      <SectionFrame id="gallery">
        <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FEATURED_ITEMS.map((post, i) => (
            <Reveal as="li" key={post.slug} duration={0.55} delay={(i % 4) * 0.04}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </ul>
      </SectionFrame>
    </main>
  );
}
