"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import SplitReveal from "@/animations/SplitReveal";
import Reveal from "@/animations/Reveal";
import Button from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/Socials";
import { openCookieSettings } from "@/lib/cookieConsent";
import {
  DONATE_URL,
  LEGAL_BUSINESS_NAME,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  CONTACT_EMAIL,
  CONTACT_ADDRESS,
} from "@/constants/site";

const NAV_GROUPS = [
  {
    title: "Campaign",
    links: [
      { label: "Home", href: "/" },
      { label: "Meet Randall", href: "/about" },
      { label: "Priorities", href: "/platform" },
      // { label: "Social posts", href: "/social-media-posts" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Volunteer", href: "/volunteer" },
      { label: "Donate", href: DONATE_URL },
      { label: "Events", href: "/events" },
      { label: "Ask Randall", href: "/ask" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Send a message", href: "/contact", external: false },
    ],
  },
];

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative overflow-hidden bg-bone-soft text-ink"
    >
      {/* Top padding is deliberately lighter than the section rhythm: the last
          section already contributes its own pb-20/pb-28, so a matching pt here
          stacked to ~224px of dead space above the footer. */}
      <div className="container-padded pb-10 pt-12 sm:pt-16">
        {/* CTA HERO BAND */}
        <m.div style={{ y }} className="grid grid-cols-12 items-end gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <span className="eyebrow">Be part of the change</span>
            <SplitReveal
              as="h2"
              className="display-serif mt-4 block text-balance text-[clamp(1.95rem,4.6vw,3.9rem)] font-medium leading-[1] tracking-[-0.025em] text-ink"
            >
              Be part of the change.
            </SplitReveal>
            <Reveal
              as="p"
              y={20}
              duration={0.8}
              delay={0.2}
              className="mt-6 max-w-xl text-balance text-base leading-relaxed text-ink/75 sm:text-lg"
            >
              Randall Fryer is running to strengthen educational excellence,
              advocate for lower taxes on families and employers, reduce
              unnecessary government micromanagement of businesses, support
              safer communities, and bring greater accountability to Salem.
            </Reveal>
          </div>
          <Reveal
            y={20}
            duration={0.8}
            delay={0.2}
            className="col-span-12 lg:col-span-5"
          >
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <Button as={Link} href="/volunteer" variant="primary" withArrow>
                Volunteer
              </Button>
              <Button
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="signal"
                withArrow
              >
                Donate
              </Button>
            </div>
          </Reveal>
        </m.div>

        {/* NEWSLETTER ROW */}
        <div
          id="newsletter"
          className="mt-16 grid scroll-mt-24 grid-cols-12 items-end gap-y-8 border-t border-ink/15 pt-12 lg:gap-x-12"
        >
          <div className="col-span-12 lg:col-span-5">
            <span className="eyebrow">Join our campaign</span>
            <p className="mt-3 max-w-md text-balance text-xl leading-tight text-ink/85 sm:text-2xl">
              Stay updated on the latest news, events, and ways to make a
              difference.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <SignupForm />
          </div>
        </div>

        {/* NAV COLUMNS */}
        <div className="mt-16 grid grid-cols-12 gap-y-12 border-t border-ink/15 pt-12 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-3">
            <Link
              href="/"
              aria-label="Randall Fryer — for State Representative"
              className="group inline-flex items-center"
            >
              <Image
                src="/randall-fryer-logo.png"
                alt="Randall Fryer for State Representative"
                width={3546}
                height={647}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink/70">
              Disciplined leadership. Responsible government. Accountable
              service.
            </p>
          </div>

          {NAV_GROUPS.map((group) => (
            <div
              key={group.title}
              className="col-span-6 sm:col-span-4 lg:col-span-3"
            >
              <h3 className="eyebrow">{group.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SOCIALS + COPYRIGHT */}
        <div className="mt-14 grid grid-cols-12 items-center gap-y-6 border-t border-ink/15 pt-8 lg:gap-x-8">
          <div className="col-span-12 lg:col-span-6">
            <SocialLinks />
          </div>
          <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute lg:col-span-6 lg:text-right">
            © 2026 {LEGAL_BUSINESS_NAME}
          </p>
        </div>

        {/* CONTACT INFO — required on every page footer for A2P/TCR compliance.
            The address is omitted while CONTACT_ADDRESS is blank (the intake
            address is residential; a PO box will replace it). */}
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-ink/15 pt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">
          {CONTACT_ADDRESS && (
            <>
              <span>{CONTACT_ADDRESS}</span>
              <span aria-hidden className="text-ink-mute/40">·</span>
            </>
          )}
          {CONTACT_PHONE_HREF ? (
            <a href={CONTACT_PHONE_HREF} className="link-underline hover:text-ink">
              {CONTACT_PHONE}
            </a>
          ) : (
            <span>{CONTACT_PHONE}</span>
          )}
          <span aria-hidden className="text-ink-mute/40">·</span>
          <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline hover:text-ink">
            {CONTACT_EMAIL}
          </a>
        </div>

        {/* LEGAL */}
        <div className="mt-6 grid grid-cols-12 items-center gap-y-2 lg:gap-x-8">
          <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute lg:col-span-6">
            Paid for by {LEGAL_BUSINESS_NAME}
          </p>
          <div className="col-span-12 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute lg:col-span-6 lg:justify-end">
            <Link href="/privacy-policy" className="link-underline hover:text-ink">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="link-underline hover:text-ink">
              Terms of Service
            </Link>
            <button
              type="button"
              onClick={openCookieSettings}
              className="link-underline uppercase tracking-[0.28em] hover:text-ink"
            >
              Cookie Settings
            </button>
          </div>
        </div>

        {/* AI DISCLOSURE — sentence case, not the uppercase wide-tracked
            treatment used elsewhere in the fine print: at this length it would
            be a wall of letterspaced caps. */}
        <p className="mt-5 max-w-3xl font-mono text-[10px] leading-relaxed tracking-[0.06em] text-ink-mute/85">
          Some images, audio, video, or written content may be created or
          enhanced using artificial intelligence (AI) tools.
        </p>

        {/* Refined watermark — giant outline marquee, drifts continuously */}
        <div
          aria-hidden
          className="pointer-events-none mt-12 select-none overflow-hidden"
        >
          <m.div
            className="flex w-max whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          >
            {/* Two identical copies → seamless infinite loop at -50% */}
            {[0, 1].map((copy) => (
              <span
                key={copy}
                className="display-serif pr-[6vw] text-[11vw] font-medium leading-none tracking-[-0.04em] text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(13, 21, 40, 0.55)" }}
              >
                RANDALL FRYER<span className="px-[3vw] text-signal/60">·</span>
                FOR OREGON<span className="px-[3vw] text-signal/60">·</span>
              </span>
            ))}
          </m.div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  const isHttp = /^https?:/.test(href);
  const isExternal = /^(mailto:|tel:|https?:)/.test(href);
  const Comp = isExternal ? "a" : Link;
  return (
    <Comp
      href={href}
      {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group/link relative inline-block text-[15px] leading-snug text-ink/80 transition-colors duration-300 hover:text-ink"
    >
      <span className="relative inline-block overflow-hidden align-top">
        <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 block translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-y-0"
        >
          {children}
        </span>
      </span>
    </Comp>
  );
}

function SignupForm() {
  const [val, setVal] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const sent = status === "success";
  const submitting = status === "submitting";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!val || submitting) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: val.trim() }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="group relative flex w-full flex-col gap-3 sm:flex-row sm:items-stretch"
    >
      <label htmlFor="signup-email" className="sr-only">
        Email address
      </label>
      <div className="relative flex-1">
        <input
          id="signup-email"
          type="email"
          required
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            if (status === "error" || status === "success") setStatus("idle");
          }}
          placeholder="you@email.com"
          className="w-full rounded-pill border border-ink/25 bg-bone px-6 py-4 font-sans text-base text-ink focus:border-ink focus:outline-none"
        />
        {status === "error" && (
          <p
            role="alert"
            className="mt-2 pl-6 font-mono text-[10px] uppercase tracking-[0.22em] text-signal-deep"
          >
            Something went wrong — please try again.
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="group/btn relative inline-flex items-center justify-center overflow-hidden rounded-pill bg-ink px-7 py-4 font-mono text-[12px] uppercase tracking-[0.22em] text-bone transition-colors duration-500 hover:bg-signal disabled:opacity-70"
      >
        <span className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:-translate-y-[200%]">
          {sent ? "Subscribed" : submitting ? "Sending…" : "Subscribe"}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-y-0"
        >
          {sent ? "Subscribed" : submitting ? "Sending…" : "Subscribe"}
        </span>
      </button>
    </form>
  );
}
