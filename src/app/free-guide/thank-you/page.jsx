import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Button from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/Socials";
import { THANK_YOU } from "@/constants/funnel-content";

// Funnel step 2 — delivery / thank-you page. Noindexed: this page only makes
// sense after an opt-in and must not appear in search results. ALL copy comes
// from src/constants/funnel-content.js.
export const metadata = {
  title: THANK_YOU.meta.title,
  description: THANK_YOU.meta.description,
  robots: {
    index: false,
  },
};

const { eyebrow, headline, body, download, nextSteps, social } = THANK_YOU;

export default function Page() {
  return (
    <main className="relative flex flex-1 flex-col">
      {/* CONFIRMATION */}
      <section className="relative isolate overflow-hidden">
        <div className="container-padded relative pb-16 pt-14 sm:pb-24 sm:pt-20">
          <div className="flex flex-wrap items-center gap-y-3 text-ink/65">
            <span className="inline-flex items-center gap-2 rounded-pill bg-signal px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.28em] text-bone shadow-[0_10px_30px_-12px_rgba(190,30,45,0.6)]">
              <CheckIcon />
              {eyebrow}
            </span>
          </div>

          <div className="hairline mt-6 h-px w-full" />

          <div className="mt-12 max-w-3xl lg:mt-16">
            <SplitReveal
              as="h1"
              className="display-serif block text-balance text-[clamp(2.2rem,5vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.025em] text-ink"
            >
              {headline}
            </SplitReveal>

            <div className="mt-8 flex max-w-xl flex-col gap-5 text-lg leading-relaxed text-ink/80">
              {body.map((paragraph, i) => (
                <p key={i} className={i === 0 ? "text-balance sm:text-xl" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Instant-access download — no need to wait for the email */}
            <div className="mt-12 flex flex-col gap-4 rounded-card border border-ink/15 bg-bone-soft/60 p-8">
              <h2 className="display-serif text-2xl font-medium leading-tight">
                {download.heading}
              </h2>
              <p className="max-w-lg text-[15px] leading-relaxed text-ink/75">
                {download.body}
              </p>
              <div>
                <Button
                  as="a"
                  href={download.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="signal"
                  withArrow
                >
                  {download.buttonLabel}
                </Button>
              </div>
            </div>

            {/* Next steps — internal links deeper into the campaign site */}
            <div className="mt-12 flex flex-col gap-5 rounded-card border border-ink/15 bg-bone-soft/60 p-8">
              <h2 className="display-serif text-2xl font-medium leading-tight">
                {nextSteps.heading}
              </h2>
              <p className="max-w-lg text-[15px] leading-relaxed text-ink/75">
                {nextSteps.body}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {nextSteps.links.map((link, i) => (
                  <Button
                    key={link.href}
                    href={link.href}
                    variant={i === 0 ? "signal" : "outline"}
                    withArrow
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAY CONNECTED */}
      <SectionFrame label={social.label}>
        <div className="flex flex-col items-start gap-6">
          <SplitReveal
            as="h2"
            className="display-serif block max-w-2xl text-balance text-[clamp(1.9rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em]"
          >
            {social.heading}
          </SplitReveal>
          <div className="flex max-w-xl flex-col gap-4 text-lg leading-relaxed text-ink/80">
            {social.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <SocialLinks className="mt-2" />
        </div>
      </SectionFrame>
    </main>
  );
}

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="-ml-0.5 flex-shrink-0"
    >
      <path
        d="M1.5 6.2l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
