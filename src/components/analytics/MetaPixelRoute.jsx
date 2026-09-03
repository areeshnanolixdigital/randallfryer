"use client";

// Meta Pixel loader + SPA PageView tracker. Mounted inside a <Suspense>
// boundary by MetaPixel because useSearchParams() requires one in the App
// Router.
//
// This component owns three things:
//
//   1. The loader. Meta's base snippet runs here, from the client, rather than
//      from an inline <Script strategy="beforeInteractive">: in Next 16 an
//      inline beforeInteractive script is queued onto `self.__next_s` instead
//      of being written into <head>, so it was not reliably defined when this
//      effect ran and the pixel could silently never load.
//
//      Loading from the client is safe here because the pixel must not load
//      before consent anyway (see 2), and because the snippet installs fbq as a
//      queueing stub the moment it runs — calls made while fbevents.js is still
//      downloading are queued, not dropped.
//
//      This is the one sanctioned place outside lib/analytics/meta.js that
//      touches window.fbq, because it is what *creates* fbq. Every event goes
//      through a named helper in meta.js. Do not add a second exception.
//
//   2. The consent gate. This site's Privacy Policy ("Cookies and analytics")
//      promises optional analytics and advertising technologies stay disabled
//      until the visitor opts in through the cookie banner, so nothing loads
//      and no request reaches Meta until they choose "Accept analytics".
//
//   3. Every PageView. The loader calls fbq('init', ID) but deliberately does
//      NOT fire a PageView, so this component owns the initial view and each
//      App Router client navigation, and Meta receives exactly one per view.

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { CONSENT_CHANGE_EVENT, getCookieConsent } from "@/lib/cookieConsent";
import { trackPageView, trackViewContent } from "@/lib/analytics/meta";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Meta's own loader, verbatim from Events Manager apart from being expressed as
 * a function body. Idempotent: it returns early if fbq already exists, so a
 * visitor who reopens Cookie Settings and re-accepts does not double-init.
 */
function loadMetaPixel(pixelId) {
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );
  /* eslint-enable */
  window.fbq("init", pixelId);
}

/**
 * Tracks the visitor's analytics-consent choice, live.
 *
 * Starts false on the server and on the first client render so the markup
 * matches and nothing fires before the banner is answered. Flips when the
 * visitor accepts — on this mount, or later via CONSENT_CHANGE_EVENT when they
 * accept from the banner or the footer's Cookie Settings link.
 */
function useAnalyticsConsent() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const read = () => setGranted(getCookieConsent() === "analytics");
    read();
    window.addEventListener(CONSENT_CHANGE_EVENT, read);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, read);
  }, []);

  return granted;
}

export default function MetaPixelRoute() {
  const pathname = usePathname();
  const search = useSearchParams();
  const granted = useAnalyticsConsent();

  useEffect(() => {
    if (!granted || !PIXEL_ID) return;
    loadMetaPixel(PIXEL_ID);
  }, [granted]);

  // A query-string-only change counts as a new page view — intentional, so
  // UTM-tagged ad traffic landing on the same path is not collapsed.
  //
  // `granted` is in the dependency list so a visitor who accepts the banner
  // mid-visit still gets a PageView for the page they are standing on.
  useEffect(() => {
    if (!granted) return;
    trackPageView();
    trackViewContent();
  }, [pathname, search, granted]);

  return null;
}
