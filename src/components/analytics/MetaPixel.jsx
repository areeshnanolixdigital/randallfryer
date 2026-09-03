// Meta Pixel loader. Server component, rendered once from src/app/layout.js.
// Follows Nanolix Meta Tracking SOP §5.
//
// The base snippet is rendered as a plain inline <script> in the RSC tree, not
// via next/script. In Next 16 an *inline* <Script strategy="beforeInteractive">
// is NOT written into <head> — it is pushed onto the `self.__next_s` queue and
// run by the Next runtime around hydration, which delayed the pixel and made it
// race with the route tracker. A plain inline <script> is parsed and executed by
// the browser as it reads the document, before hydration, which is the earliest
// the pixel can load. Verified against the served HTML.
//
// The snippet body is Meta's own loader, verbatim from Events Manager — do not
// reformat or "modernize" it. This is the one sanctioned use of
// dangerouslySetInnerHTML in this codebase, and the one place outside
// lib/analytics/meta.js allowed to touch fbq, because it is what *creates* fbq.
//
// It calls fbq('init', PIXEL_ID) only. It deliberately does NOT fire a
// PageView — MetaPixelRoute owns every PageView (the initial one and each App
// Router client navigation), so Meta receives exactly one per view.
//
// Kill switch: both NEXT_PUBLIC_META_PIXEL_ID and
// NEXT_PUBLIC_META_PIXEL_ENABLED=true are required, so Preview deployments can
// run without polluting the production dataset. NEXT_PUBLIC_ values are inlined
// at build time — changing them needs a dev-server restart, not a hot reload.
//
// MetaPixelRoute uses useSearchParams(), which requires a Suspense boundary in
// the App Router — without it the whole route de-opts to client rendering.

import { Suspense } from "react";
import MetaPixelRoute from "./MetaPixelRoute";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ENABLED = process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === "true";

export default function MetaPixel() {
  if (!PIXEL_ID || !ENABLED) return null;

  return (
    <>
      <script
        id="meta-pixel"
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
      {/* <noscript> fallback pixel for visitors with JS disabled. Uses a raw
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
