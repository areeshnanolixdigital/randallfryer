// Body half of the Meta Pixel: the <noscript> fallback beacon and the SPA route
// tracker. The base code lives in MetaPixelHead, rendered inside <head> — see
// the comment there for why the split exists.
//
// Mounted once from src/app/layout.js.
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
