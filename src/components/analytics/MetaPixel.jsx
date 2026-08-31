"use client";

// Meta Pixel loader + SPA PageView tracker.
// Mounted once from src/app/layout.js. Follows Nanolix Meta Tracking SOP §5.
//
// Behaviour:
//   • Loads the Meta base script once (via next/script, afterInteractive).
//     `fbq('init', PIXEL_ID)` runs inside the injected snippet — no PageView
//     is fired there, so the useEffect below owns every PageView (initial +
//     each App Router client navigation) and Meta receives exactly one per
//     view.
//   • On every pathname/search change, fires `fbq('track', 'PageView')`.
//   • Kill switch: NEXT_PUBLIC_META_PIXEL_ENABLED=true is required. This lets
//     Preview deployments run without polluting the production dataset.
//
// useSearchParams() requires a Suspense boundary in the App Router, hence the
// two-layer split (MetaPixel wraps <PixelRoute /> in Suspense).

import Script from "next/script";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ENABLED = process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === "true";

export default function MetaPixel() {
  if (!PIXEL_ID || !ENABLED) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');
          `,
        }}
      />
      {/* <noscript> fallback pixel for users with JS disabled. Uses a raw
          <img> because next/image renders through JS and cannot run inside
          <noscript>. */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      <Suspense fallback={null}>
        <PixelRoute />
      </Suspense>
    </>
  );
}

function PixelRoute() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || !window.fbq) return;
    window.fbq("track", "PageView");
    // pathname + search are the only inputs that matter — a route change is
    // the only signal we want a fresh PageView for.
  }, [pathname, search]);

  return null;
}
