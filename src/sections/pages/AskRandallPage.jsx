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
import { ISSUE_CATEGORIES } from "@/constants/issues";

const TOPICS = [
  {
    title: "Schools & students",
    body: "Classroom funding, literacy, and how tax dollars reach the district.",
  },
  {
    title: "Public safety",
    body: "Patrol staffing, repeat-offender policy, and safe neighborhoods.",
  },
  {
    title: "Cost of living",
    body: "Taxes, housing, and the everyday squeeze on District 28 families.",
  },
  {
    title: "Accountability",
    body: "Where the money goes and how Salem answers for the results.",
  },
];

export default function AskRandallPage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №06 — Ask Randall"
        number="Ask / VI"
        title="Ask Randall directly."
        intro="Randall reads every submission personally. Send a question, flag a problem in the district, or tell him what Salem is getting wrong — you&rsquo;ll hear back within five business days."
      />

      {/* TOPIC TILES */}
      <SectionFrame label="02 — What&rsquo;s on your mind" number="Topics / II">
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
              <p className="text-[14px] leading-relaxed text-ink/75">{t.body}</p>
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
              Write Randall a note.
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-ink/80"
            >
              The shorter, the better. One specific question gets a better answer
              than a five-paragraph essay.
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
                "Every note reaches the campaign directly",
                "Followed up by Randall or the policy lead",
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
    </main>
  );
}

function AskForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: (data.get("name") || "").toString().trim(),
      email: (data.get("email") || "").toString().trim(),
      category: (data.get("category") || "").toString(),
      location: (data.get("location") || "").toString().trim(),
      subject: (data.get("subject") || "").toString().trim(),
      description: (data.get("description") || "").toString().trim(),
    };

    // Client-side validation before submission
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
    if (!payload.name || !emailOk || !payload.subject || !payload.description) {
      setStatus("error");
      setErrorMsg(
        "Please add your name, a valid email, a subject, and your message."
      );
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "Something went wrong sending your message. Please try again, or email hello@randallfryer.vote."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-card border border-ink bg-ink p-10 text-bone sm:p-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ochre-soft">
          Received
        </span>
        <h3 className="display-serif mt-3 text-3xl font-medium sm:text-4xl">
          Thanks — Randall will see this.
        </h3>
        <p className="mt-4 max-w-md leading-relaxed text-bone/80">
          You&rsquo;ll get a reply within five business days. Thanks for taking
          the time to reach out.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="a-name" name="name" label="Full name" required />
        <FormField
          id="a-email"
          name="email"
          label="Email"
          type="email"
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormSelect
          id="a-category"
          name="category"
          label="Category"
          required
          options={ISSUE_CATEGORIES}
        />
        <FormField
          id="a-location"
          name="location"
          label="Town / neighborhood"
          optional
        />
      </div>
      <FormField id="a-subject" name="subject" label="Subject" required />
      <FormTextarea
        id="a-description"
        name="description"
        label="Your question or message"
        required
        rows={6}
      />
      <FormFieldset legend="Before you send">
        <FormCheckbox
          id="a-terms"
          name="terms"
          label="I&rsquo;ve read the privacy notice and accept how this submission will be handled."
        />
      </FormFieldset>

      {status === "error" && errorMsg && (
        <p
          role="alert"
          className="rounded-soft border border-signal/30 bg-signal/5 px-4 py-3 text-sm leading-relaxed text-signal-deep"
        >
          {errorMsg}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button
          as="button"
          type="submit"
          variant="signal"
          withArrow
          disabled={submitting}
          aria-busy={submitting}
          className={submitting ? "pointer-events-none opacity-70" : ""}
        >
          {submitting ? "Sending…" : "Send to Randall"}
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
