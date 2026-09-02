// Meta Pixel loader — server component so the base script is server-rendered
// and Next.js can promote a `beforeInteractive` <Script> into the document
// <head> (per next/script docs, beforeInteractive scripts are always injected
// into <head> regardless of where they're placed in the tree).
//
// Mounted once from src/app/layout.js. Follows Nanolix Meta Tracking SOP §5.
//
// Behaviour:
//   - Loads the Meta base script once, before hydration, injected into <head>.
//     `fbq('init', PIXEL_ID)` runs inside the injected snippet — no PageView
//     is fired there, so MetaPixelRoute owns every PageView (initial + each
//     App Router client navigation) and Meta receives exactly one per view.
//   - Kill switch: NEXT_PUBLIC_META_PIXEL_ENABLED=true is required. This lets
//     Preview deployments run without polluting the production dataset.
//
// MetaPixelRoute uses useSearchParams(), which requires a Suspense boundary
// in the App Router.

import Script from "next/script";
import { Suspense } from "react";
import MetaPixelRoute from "./MetaPixelRoute";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ENABLED = process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === "true";

export default function MetaPixel() {
  if (!PIXEL_ID || !ENABLED) return null;

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="beforeInteractive"
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
        <MetaPixelRoute />
      </Suspense>
    </>
  );
}
