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

const VALUE_CARDS = [
  {
    no: "01",
    title: "Make a real difference",
    body: "District 14 primaries decide on under a thousand votes. The hour you put in is decisive — not symbolic.",
  },
  {
    no: "02",
    title: "No experience needed",
    body: "We pair every first-timer with a veteran. The training is 20 minutes and the script fits on an index card.",
  },
  {
    no: "03",
    title: "Flexible commitment",
    body: "One Saturday a month or four shifts a week. Whatever you have, we will use well.",
  },
];

const COUNTIES = [
  "Washington",
  "Multnomah",
  "Clackamas",
  "Marion",
  "Polk",
  "Yamhill",
  "Tillamook",
  "Columbia",
  "Lincoln",
  "Other (out of district)",
];

const HELP_OPTIONS = [
  { id: "help-doors", label: "Door knocking" },
  { id: "help-phones", label: "Phone banking" },
  { id: "help-fund", label: "Fundraising / call time" },
  { id: "help-digital", label: "Digital / social media" },
  { id: "help-events", label: "Events & logistics" },
  { id: "help-host", label: "Host a coffee or house party" },
];

export default function VolunteerPage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №05 — Volunteer"
        number="Join the team / V"
        title="The campaign is built by neighbors."
        intro="Knock a few doors. Make a few calls. Pick up the phone on a Sunday morning to help a stranger find their polling place. CapitalWatch is what shows up when you do."
      />

      {/* VALUE CARDS */}
      <SectionFrame label="02 — Why it matters" number="Impact / II">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUE_CARDS.map((v, i) => (
            <m.div
              key={v.no}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.1,
              }}
              whileHover={{ y: -4 }}
              className="group flex flex-col gap-4 rounded-card border border-ink/15 bg-bone-soft/60 p-7 transition-colors duration-500 hover:border-ink"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                {v.no}
              </span>
              <h3 className="display-serif text-2xl font-medium leading-tight">
                {v.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-ink/75">
                {v.body}
              </p>
            </m.div>
          ))}
        </div>
      </SectionFrame>

      {/* SIGNUP FORM */}
      <SectionFrame label="03 — Sign up" number="Form / III">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.875rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.02em]"
            >
              Join the team.
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-ink/80"
            >
              Fill out as much as you can. The coordinator for your
              county will reach out within 48 hours with the next
              available shift.
            </m.p>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <VolunteerForm />
          </div>
        </div>
      </SectionFrame>

      {/* EXPECTATIONS */}
      <SectionFrame label="04 — What happens next" number="Process / IV">
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: "01",
              t: "Quick reply",
              d: "A coordinator emails or texts within 48 hours.",
            },
            {
              n: "02",
              t: "20-min onboarding",
              d: "Short video call or in-person at the Harborlight HQ.",
            },
            {
              n: "03",
              t: "First shift",
              d: "Paired with a veteran for door knocking or phones.",
            },
            {
              n: "04",
              t: "Ongoing",
              d: "Sign up for shifts that fit your week.",
            },
          ].map((s, i) => (
            <m.li
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
              className="flex flex-col gap-3 border-t border-ink/15 pt-5"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-signal">
                {s.n}
              </span>
              <h3 className="display-serif text-xl font-medium leading-tight">
                {s.t}
              </h3>
              <p className="text-[14px] leading-relaxed text-ink/75">{s.d}</p>
            </m.li>
          ))}
        </ol>
      </SectionFrame>

      {/* CONTACT BLOCK */}
      <SectionFrame label="05 — Talk to a coordinator" number="Contact / V">
        <div className="grid grid-cols-12 items-end gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.875rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.02em]"
            >
              Prefer to talk to a human first?
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/80"
            >
              Our volunteer coordinator answers personally. Call, text,
              or email — whichever is easiest.
            </m.p>
          </div>
          <div className="col-span-12 flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <Button as="a" href="tel:+15035550142" variant="outline" withArrow>
              (503) 555-0142
            </Button>
            <Button
              as="a"
              href="mailto:volunteer@capitalwatch.vote"
              variant="primary"
              withArrow
            >
              Email Mira
            </Button>
          </div>
        </div>
      </SectionFrame>
    </main>
  );
}

function VolunteerForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-card border border-ink bg-ink p-10 text-bone sm:p-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ochre-soft">
          Welcome to the team
        </span>
        <h3 className="display-serif mt-3 text-3xl font-medium sm:text-4xl">
          Got it — we&rsquo;ll be in touch.
        </h3>
        <p className="mt-4 max-w-md leading-relaxed text-bone/80">
          A coordinator from your county will reach out within 48 hours.
          Until then, the doors keep getting knocked.
        </p>
        <div className="mt-6">
          <Button as={Link} href="/" variant="signal" withArrow>
            Back to home
          </Button>
        </div>
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
        <FormField id="v-first" name="firstName" label="First name" required />
        <FormField id="v-last" name="lastName" label="Last name" required />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="v-email" name="email" label="Email" type="email" required />
        <FormField id="v-phone" name="phone" label="Phone" type="tel" optional />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="v-zip" name="zip" label="Zip code" required />
        <FormSelect
          id="v-county"
          name="county"
          label="County"
          required
          options={COUNTIES}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormSelect
          id="v-voter"
          name="registered"
          label="Registered to vote in OR?"
          required
          options={["Yes", "No", "Not sure"]}
        />
        <FormSelect
          id="v-exp"
          name="experience"
          label="Prior campaign experience?"
          optional
          options={[
            "First time volunteering",
            "Volunteered once or twice",
            "Several campaigns",
            "Staff / professional",
          ]}
        />
      </div>

      <FormFieldset
        legend="How would you like to help?"
        hint="Pick as many as apply — we&rsquo;ll match you with the best fit."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {HELP_OPTIONS.map((o) => (
            <FormCheckbox key={o.id} id={o.id} name={o.id} label={o.label} />
          ))}
        </div>
      </FormFieldset>

      <FormSelect
        id="v-availability"
        name="availability"
        label="Availability"
        required
        options={[
          "1 hour a week",
          "A few hours a week",
          "Most weekends",
          "Most evenings",
          "Multiple shifts a week",
          "Whenever you need me",
        ]}
      />

      <FormTextarea
        id="v-issues"
        name="issues"
        label="What issues matter most to you?"
        required
        rows={4}
        placeholder="One sentence is fine."
      />

      <FormTextarea
        id="v-notes"
        name="notes"
        label="Anything else?"
        optional
        rows={3}
        placeholder="Skills, languages spoken, scheduling notes…"
      />

      <FormFieldset legend="Stay in touch">
        <FormCheckbox
          id="v-sms-updates"
          name="smsUpdates"
          label="It&rsquo;s OK to text me campaign updates."
        />
        <FormCheckbox
          id="v-sms-fund"
          name="smsFund"
          label="It&rsquo;s OK to text me about fundraising deadlines."
        />
      </FormFieldset>

      <div className="flex flex-wrap items-center gap-4">
        <Button as="button" type="submit" variant="signal" withArrow>
          Join the team
        </Button>
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">
          We never sell your info.
        </span>
      </div>
    </form>
  );
}
