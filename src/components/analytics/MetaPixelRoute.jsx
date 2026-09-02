"use client";

// SPA PageView tracker for Meta Pixel. Mounted inside a <Suspense> boundary
// by MetaPixel because useSearchParams() requires one in the App Router.
//
// The base pixel script (loaded in MetaPixel via `beforeInteractive`) calls
// `fbq('init', PIXEL_ID)` but intentionally does NOT fire a PageView, so
// this component owns every PageView (initial + each App Router client
// navigation) and Meta receives exactly one per view.

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function MetaPixelRoute() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || !window.fbq) return;
    window.fbq("track", "PageView");
  }, [pathname, search]);

  return null;
}
