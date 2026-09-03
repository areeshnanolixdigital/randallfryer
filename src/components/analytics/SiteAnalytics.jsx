"use client";

// Passive, site-wide tracking. Mounted once in src/app/layout.js.
//
// Adds three behaviours with zero markup changes anywhere else in the app:
//   • scroll depth  → ScrollDepth at 25 / 50 / 75 / 90 %
//   • dwell time    → EngagedVisit at 30 / 60 / 120 s of *visible* time
//   • link clicks   → EmailClick · PhoneClick · Download · SocialLinkClick ·
//                     OutboundLinkClick, from one delegated listener
//
// Because the click listener matches `closest("a[href]")`, it covers every
// anchor on the site automatically, including the ones <Button href="…">
// renders. Nothing should hand-roll these five events at a call site — that is
// how you get duplicates.

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

import { SOCIALS } from "@/components/ui/Socials";
import {
  metaEnabled,
  trackDownload,
  trackEmail,
  trackEngagedVisit,
  trackOutbound,
  trackPhone,
  trackScrollDepth,
  trackSocial,
} from "@/lib/analytics/meta";

const SCROLL_THRESHOLDS = [25, 50, 75, 90];
const ENGAGEMENT_MILESTONES = [30, 60, 120];

// Derived from SOCIALS in components/ui/Socials.jsx at module load, `www.`
// stripped. Adding a platform there is all that is needed — never hardcode a
// hostname here.
const SOCIAL_HOSTS = new Set(
  SOCIALS.map((s) => {
    try {
      return new URL(s.href).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  }).filter(Boolean)
);

// A link counts as a download if it is marked as one, ends in a document
// extension, or lives under /downloads/. Put new lead-magnet PDFs in
// public/downloads/ and they are tracked with no code change.
const isDownloadHref = (href, anchor) => {
  if (anchor?.hasAttribute("download")) return true;
  const path = href.split("?")[0].split("#")[0];
  if (/\.(pdf|zip|doc|docx|xls|xlsx|ppt|pptx|csv)$/i.test(path)) return true;
  if (path.startsWith("/downloads/")) return true;
  return false;
};

const Tracker = () => {
  const pathname = usePathname();
  const search = useSearchParams();
  const firedScrolls = useRef(new Set());
  const engagedSeconds = useRef(0);
  const firedEngagement = useRef(new Set());

  // Milestones are per-page, not per-session.
  useEffect(() => {
    firedScrolls.current = new Set();
    engagedSeconds.current = 0;
    firedEngagement.current = new Set();
  }, [pathname, search]);

  useEffect(() => {
    if (!metaEnabled()) return;

    // Scroll handling is throttled through requestAnimationFrame — never add an
    // unthrottled scroll listener.
    let scrollScheduled = false;
    const onScroll = () => {
      if (scrollScheduled) return;
      scrollScheduled = true;
      window.requestAnimationFrame(() => {
        scrollScheduled = false;
        const doc = document.documentElement;
        const scrollTop = window.scrollY || doc.scrollTop;
        const viewport = window.innerHeight || doc.clientHeight;
        const total = doc.scrollHeight - viewport;
        if (total <= 0) return;
        const percent = Math.min(100, Math.round((scrollTop / total) * 100));
        SCROLL_THRESHOLDS.forEach((threshold) => {
          if (percent >= threshold && !firedScrolls.current.has(threshold)) {
            firedScrolls.current.add(threshold);
            trackScrollDepth(threshold);
          }
        });
      });
    };

    // Ticks once a second and skips ticks while the tab is hidden, so a
    // backgrounded tab does not inflate engagement.
    const engagementInterval = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      engagedSeconds.current += 1;
      ENGAGEMENT_MILESTONES.forEach((milestone) => {
        if (
          engagedSeconds.current === milestone &&
          !firedEngagement.current.has(milestone)
        ) {
          firedEngagement.current.add(milestone);
          trackEngagedVisit(milestone);
        }
      });
    }, 1000);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(engagementInterval);
    };
  }, [pathname, search]);

  useEffect(() => {
    if (!metaEnabled()) return;

    // Registered in the capture phase on document so it still sees clicks whose
    // handlers stop propagation.
    const onClick = (event) => {
      const anchor = event.target?.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (!href) return;

      // Classification order is fixed — first match wins.
      if (href.startsWith("mailto:")) {
        trackEmail({ destination_url: href });
        return;
      }
      if (href.startsWith("tel:")) {
        trackPhone({ destination_url: href });
        return;
      }

      let url;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }

      const isExternal = url.origin !== window.location.origin;
      const host = url.hostname.replace(/^www\./, "");

      if (isDownloadHref(href, anchor)) {
        trackDownload({
          destination_url: url.href,
          destination_domain: host,
          file_name: url.pathname.split("/").pop() || "",
        });
        return;
      }

      // Internal navigation is already covered by the route tracker.
      if (!isExternal) return;

      if (SOCIAL_HOSTS.has(host)) {
        trackSocial({ destination_url: url.href, destination_domain: host });
        return;
      }

      trackOutbound({ destination_url: url.href, destination_domain: host });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
};

// useSearchParams() needs a Suspense boundary — see MetaPixel.jsx.
const SiteAnalytics = () => (
  <Suspense fallback={null}>
    <Tracker />
  </Suspense>
);

export default SiteAnalytics;
