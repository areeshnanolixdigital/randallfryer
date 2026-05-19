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
  FormCheckbox,
  FormFieldset,
} from "@/components/ui/Form";

const PRESETS = [10, 25, 50, 100, 250, 500];

const BREAKDOWN = [
  { pct: "42%", label: "Field operations — door-knock packets, gas reimbursements, training" },
  { pct: "23%", label: "Digital outreach — voter contact, ads, accessibility tooling" },
  { pct: "18%", label: "Office & event hosting — town halls, venue rentals, refreshments" },
  { pct: "12%", label: "Legal & compliance — FEC reporting, ballot access, security" },
  { pct: "5%", label: "Reserve fund — for the closing two-week sprint" },
];

const TRUST = [
  "No corporate PAC dollars accepted, ever.",
  "Every contributor and amount published in the FEC public ledger.",
  "Refundable within 30 days, no questions.",
  "Encrypted payment processing via independent processor.",
];

export default function DonatePage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №07 — Donate"
        number="Support / VII"
        title="Every dollar lands on the curb."
        intro="CapitalWatch is funded entirely by neighbors. No PACs, no corporate money, no out-of-state mega-donors. Your contribution moves directly into the next door-knock packet."
      />

      {/* DONATION FORM */}
      <SectionFrame label="02 — Make a contribution" number="Form / II">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.875rem,4.25vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.02em]"
            >
              Pick an amount that fits.
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink/80"
            >
              The average gift is $34. We mean it — pick what works for
              your household. A $5 gift signals as much support as a
              $500 one.
            </m.p>

            <m.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="mt-8 flex flex-col gap-3"
            >
              {TRUST.map((line) => (
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

          <div className="col-span-12 lg:col-span-7">
            <DonateForm />
          </div>
        </div>
      </SectionFrame>

      {/* BREAKDOWN — where money goes */}
      <SectionFrame label="03 — Where the money goes" number="Ledger / III">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.02em]"
            >
              Every line item, public.
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink/80"
            >
              This is the planned allocation for Q2 2026 — the home
              stretch before the primary. Quarterly reports go up the
              week they&rsquo;re filed.
            </m.p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <ul className="flex flex-col gap-4">
              {BREAKDOWN.map((row, i) => (
                <m.li
                  key={row.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.07,
                  }}
                  className="grid grid-cols-[80px_1fr] items-baseline gap-5 border-b border-ink/15 pb-4 last:border-b-0"
                >
                  <span className="display-serif text-3xl font-medium text-ink sm:text-4xl">
                    {row.pct}
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink/80">
                    {row.label}
                  </span>
                </m.li>
              ))}
            </ul>
          </div>
        </div>
      </SectionFrame>

      {/* OTHER WAYS */}
      <SectionFrame label="04 — Other ways to give" number="Alternatives / IV">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              t: "Mail a check",
              b: "Made out to 'Friends of Adrian Vale' · 412 Harbor Ave, Suite 4, Harborlight, OR 97206",
            },
            {
              t: "Recurring gift",
              b: "Set up a monthly contribution from $5 and up — toggle 'Repeat monthly' in the form.",
            },
            {
              t: "Host a coffee",
              b: "Invite ten neighbors. Adrian visits in person. Email host@capitalwatch.vote.",
            },
          ].map((c, i) => (
            <m.div
              key={c.t}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
              className="flex flex-col gap-3 rounded-card border border-ink/15 bg-bone-soft/50 p-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-signal">
                0{i + 1}
              </span>
              <h3 className="display-serif text-xl font-medium leading-tight">
                {c.t}
              </h3>
              <p className="text-[14px] leading-relaxed text-ink/75">{c.b}</p>
            </m.div>
          ))}
        </div>
      </SectionFrame>
    </main>
  );
}

function DonateForm() {
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState("");
  const [monthly, setMonthly] = useState(false);
  const [sent, setSent] = useState(false);

  const effective = custom ? Number(custom) : amount;

  if (sent) {
    return (
      <div className="rounded-card border border-ink bg-ink p-10 text-bone sm:p-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ochre-soft">
          Received
        </span>
        <h3 className="display-serif mt-3 text-3xl font-medium sm:text-4xl">
          ${effective || 0}
          {monthly ? " / month" : ""} — thank you.
        </h3>
        <p className="mt-4 max-w-md leading-relaxed text-bone/80">
          A receipt is on the way to your email. Your gift will be
          listed in the next FEC report.
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
      className="flex flex-col gap-7 rounded-card border border-ink/15 bg-bone-soft/40 p-7 sm:p-8"
    >
      <div>
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/80">
          Amount
        </span>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {PRESETS.map((p) => {
            const active = amount === p && !custom;
            return (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setAmount(p);
                  setCustom("");
                }}
                className={
                  "rounded-pill border px-3 py-3 font-mono text-[12px] uppercase tracking-[0.16em] transition-all duration-300 " +
                  (active
                    ? "border-ink bg-ink text-bone"
                    : "border-ink/25 bg-bone text-ink hover:border-ink")
                }
              >
                ${p}
              </button>
            );
          })}
        </div>

        <label
          htmlFor="d-custom"
          className="mt-4 flex items-center gap-3 rounded-pill border border-ink/25 bg-bone px-5 focus-within:border-ink"
        >
          <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-mute">
            Other
          </span>
          <span className="text-ink-mute">$</span>
          <input
            id="d-custom"
            type="number"
            min="1"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            placeholder="Custom amount"
            className="flex-1 bg-transparent py-3 text-base text-ink placeholder:text-ink-mute focus:outline-none"
          />
        </label>
      </div>

      <FormCheckbox
        id="d-monthly"
        name="monthly"
        label="Repeat this gift monthly — cancel any time."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="d-first" name="firstName" label="First name" required />
        <FormField id="d-last" name="lastName" label="Last name" required />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="d-email" name="email" label="Email" type="email" required />
        <FormField id="d-zip" name="zip" label="Zip code" required />
      </div>
      <FormField
        id="d-employer"
        name="employer"
        label="Employer + occupation (required by law)"
        required
      />

      <FormFieldset legend="Confirmations">
        <FormCheckbox
          id="d-citizen"
          name="citizen"
          label="I am a U.S. citizen or lawfully admitted permanent resident."
          defaultChecked={true}
        />
        <FormCheckbox
          id="d-own-funds"
          name="ownFunds"
          label="This contribution is made from my own funds, not reimbursed by anyone."
          defaultChecked={true}
        />
        <FormCheckbox
          id="d-not-corp"
          name="notCorp"
          label="I am not a federal contractor or foreign national."
          defaultChecked={true}
        />
      </FormFieldset>

      <div className="flex flex-wrap items-center gap-4">
        <Button as="button" type="submit" variant="signal" withArrow>
          Give ${custom || amount}{monthly ? " / mo" : ""}
        </Button>
        <Link
          href="/privacy"
          className="link-underline font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute hover:text-ink"
        >
          Privacy notice
        </Link>
      </div>

      <input type="hidden" name="amount" value={custom || amount} />
      <input type="hidden" name="monthly" value={monthly ? "yes" : "no"} />
      {/* hidden setter for monthly toggled by checkbox above — wired via React state below */}
      <SyncMonthly setMonthly={setMonthly} />
    </form>
  );
}

function SyncMonthly({ setMonthly }) {
  // mirrors the checkbox state for the visible amount label
  return (
    <span
      aria-hidden
      onChange={() => {}}
      ref={(node) => {
        if (!node) return;
        const cb = document.getElementById("d-monthly");
        if (!cb) return;
        const handler = () => setMonthly(cb.checked);
        cb.addEventListener("change", handler);
      }}
    />
  );
}
