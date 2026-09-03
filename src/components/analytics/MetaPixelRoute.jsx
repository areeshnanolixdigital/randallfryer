"use client";

// SPA PageView tracker for Meta Pixel. Mounted inside a <Suspense> boundary by
// MetaPixel because useSearchParams() requires one in the App Router.
//
// The base snippet (rendered inline by MetaPixel) calls fbq('init', PIXEL_ID)
// but intentionally does NOT fire a PageView, so this component owns every
// PageView — the initial one and each App Router client navigation — and Meta
// receives exactly one per view. PageView cannot live in the snippet because
// App Router client navigations never re-run it.

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView, trackViewContent } from "@/lib/analytics/meta";

export default function MetaPixelRoute() {
  const pathname = usePathname();
  const search = useSearchParams();

  // A query-string-only change counts as a new page view — intentional, so
  // UTM-tagged ad traffic landing on the same path is not collapsed.
  useEffect(() => {
    trackPageView();
    trackViewContent();
  }, [pathname, search]);

  return null;
}
