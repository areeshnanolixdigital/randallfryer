"use client";

import { useState } from "react";
import Link from "next/link";
import { m } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import {
  FormField,
  FormSelect,
  FormTextarea,
  FormCheckbox,
  FormFieldset,
} from "@/components/ui/Form";

const TOPICS = [
  {
    title: "County spending",
    body: "Where money goes, what gets cut, and how the dashboard works.",
  },
  {
    title: "Public safety",
    body: "Patrol staffing, repeat-offender policy, transitional housing siting.",
  },
  {
    title: "Housing & permits",
    body: "Permitting timelines, by-right zoning, missing-middle housing.",
  },
  {
    title: "Small business",
    body: "Licensing, payroll taxes, and the regulatory shot-clock proposal.",
  },
];

const CATEGORIES = [
  "County spending",
  "Public safety",
  "Housing & permits",
  "Roads & infrastructure",
  "Small business",
  "Parks & recreation",
  "Neighborhood concerns",
  "Government transparency",
  "Other",
];

export default function ContactPage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №06 — Ask Adrian"
        number="Contact / VI"
        title="Your question gets answered."
        intro="Adrian reads every submission personally. We reply within five business days — usually faster. No form letters."
      />

      {/* TOPIC TILES */}
      <SectionFrame label="02 — Common topics" number="Categories / II">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((t, i) => (
            <m.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
              whileHover={{ y: -4 }}
              className="group flex flex-col gap-3 rounded-card border border-ink/15 bg-bone-soft/60 p-6 transition-colors duration-500 hover:border-ink"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                0{i + 1}
              </span>
              <h3 className="display-serif text-xl font-medium leading-tight">
                {t.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-ink/75">
                {t.body}
              </p>
            </m.div>
          ))}
        </div>
      </SectionFrame>

      {/* FORM */}
      <SectionFrame label="03 — Send it" number="Form / III">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.875rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.02em]"
            >
              Write Adrian a note.
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-ink/80"
            >
              The shorter, the better. One specific question gets a
              better answer than a five-paragraph essay.
            </m.p>

            <m.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="mt-8 flex flex-col gap-3"
            >
              {[
                "Personal reply within 5 business days",
                "Anonymous submission available",
                "Followed up by Adrian or the policy lead",
                "Never shared, never sold",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 text-[14px] leading-relaxed text-ink/75"
                >
                  <span className="mt-2 block h-1 w-1 flex-shrink-0 rounded-full bg-signal" />
                  {line}
                </li>
              ))}
            </m.ul>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <AskForm />
          </div>
        </div>
      </SectionFrame>

      {/* DIRECT CONTACT */}
      <SectionFrame
        label="04 — Or reach out directly"
        number="Direct / IV"
        withBottomLine={false}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              label: "Email",
              value: "hello@capitalwatch.vote",
              href: "mailto:hello@capitalwatch.vote",
            },
            {
              label: "Phone",
              value: "+1 (503) 555-0142",
              href: "tel:+15035550142",
            },
            {
              label: "Office",
              value: "412 Harbor Ave, Suite 4 — Harborlight, OR 97206",
              href: null,
            },
          ].map((c, i) => (
            <m.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
              className="flex flex-col gap-2 border-t border-ink/15 pt-5"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                {c.label}
              </span>
              {c.href ? (
                <a
                  href={c.href}
                  className="link-underline display-serif text-xl font-medium leading-tight text-ink hover:text-signal"
                >
                  {c.value}
                </a>
              ) : (
                <span className="display-serif text-xl font-medium leading-tight">
                  {c.value}
                </span>
              )}
            </m.div>
          ))}
        </div>
      </SectionFrame>
    </main>
  );
}

function AskForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-card border border-ink bg-ink p-10 text-bone sm:p-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ochre-soft">
          Received
        </span>
        <h3 className="display-serif mt-3 text-3xl font-medium sm:text-4xl">
          Thanks — Adrian will see this.
        </h3>
        <p className="mt-4 max-w-md leading-relaxed text-bone/80">
          You&rsquo;ll get a reply within five business days. If
          it&rsquo;s urgent, call (503) 555-0142.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-7"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="c-name" name="name" label="Full name" required />
        <FormField id="c-email" name="email" label="Email" type="email" required />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="c-phone" name="phone" label="Phone" type="tel" optional />
        <FormSelect
          id="c-category"
          name="category"
          label="Category"
          required
          options={CATEGORIES}
        />
      </div>
      <FormField id="c-location" name="location" label="Town / neighborhood" optional />
      <FormField id="c-subject" name="subject" label="Subject" required />
      <FormTextarea
        id="c-description"
        name="description"
        label="Your question or message"
        required
        rows={6}
      />
      <FormFieldset legend="Stay in touch">
        <FormCheckbox
          id="c-sms-updates"
          name="smsUpdates"
          label="It&rsquo;s OK to text me campaign updates."
        />
        <FormCheckbox
          id="c-sms-fund"
          name="smsFund"
          label="It&rsquo;s OK to text me about fundraising deadlines."
        />
        <FormCheckbox
          id="c-terms"
          name="terms"
          label="I&rsquo;ve read the privacy notice and accept how this submission will be handled."
        />
      </FormFieldset>

      <div className="flex flex-wrap items-center gap-4">
        <Button as="button" type="submit" variant="signal" withArrow>
          Send to Adrian
        </Button>
        <Link
          href="/privacy"
          className="link-underline font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute hover:text-ink"
        >
          Privacy notice
        </Link>
      </div>
    </form>
  );
}
