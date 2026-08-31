"use client";

import { cn } from "@/lib/cn";
import { trackMeta } from "@/lib/analytics/meta";

// Shared social links — single source of truth for the campaign's live social
// handles and their icons. Used by the site Footer and the funnel thank-you
// page. Add a handle here and it appears everywhere <SocialLinks /> (or the
// SOCIALS array) is rendered. Live handles only — others stay hidden until
// they exist.
export const SOCIALS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1EHvaKg7i5/",
    Icon: FacebookIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/randallfryerfororegon",
    Icon: InstagramIcon,
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/FryerRandall",
    Icon: XIcon,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/randall-fryer-6215bb3b8",
    Icon: LinkedInIcon,
  },
];

/** Row of pill social icons. Styled for light (bone) surfaces. */
export function SocialLinks({ className }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {SOCIALS.map(({ name, href, Icon }) => (
        <li key={name}>
          <SocialIcon href={href} ariaLabel={name}>
            <Icon />
          </SocialIcon>
        </li>
      ))}
    </ul>
  );
}

export function SocialIcon({ href, ariaLabel, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={() => {
        let destination_domain;
        try {
          destination_domain = new URL(href).hostname;
        } catch {}
        trackMeta("SocialLinkClick", {
          platform: ariaLabel,
          destination_domain,
        });
      }}
      className="group/soc relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-ink/15 text-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-ink"
    >
      {/* fill that grows from center on hover */}
      <span
        aria-hidden
        className="absolute inset-0 scale-0 rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/soc:scale-100"
      />
      <span className="relative z-10 flex h-4 w-4 items-center justify-center transition-colors duration-500 group-hover/soc:text-bone">
        {children}
      </span>
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5H16.7V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.45-4 4.1v2.3H7.6V14h2.7v8h3.2z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v1.9h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v7.46h-4.55V15.4c0-1.7-.03-3.88-2.37-3.88-2.37 0-2.73 1.85-2.73 3.76v6.72H7.62V8z" />
    </svg>
  );
}
