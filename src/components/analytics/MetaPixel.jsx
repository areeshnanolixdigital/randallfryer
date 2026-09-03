// Meta Pixel mount point. Server component, rendered once from
// src/app/layout.js. Follows Nanolix Meta Tracking SOP §5.
//
// Kill switch: both NEXT_PUBLIC_META_PIXEL_ID and
// NEXT_PUBLIC_META_PIXEL_ENABLED=true are required, so Preview deployments can
// run without polluting the production dataset. NEXT_PUBLIC_ values are inlined
// at build time — changing them needs a dev-server restart, not a hot reload.
//
// Why there is no <Script strategy="beforeInteractive"> here any more:
// in Next 16 an *inline* beforeInteractive script is not written into <head>.
// It is pushed onto the `self.__next_s` queue and run by the Next runtime
// around hydration, so the snippet was not reliably defined by the time the
// route tracker's effect looked for it — the pixel could silently never load.
// MetaPixelRoute now owns the loader directly (see the comment there), which
// removes that race entirely. Verified against the built HTML.
//
// No <noscript> fallback pixel either: a visitor with JS disabled can never see
// or answer the cookie banner, so firing that beacon would be tracking without
// the consent the Privacy Policy promises.
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
    <Suspense fallback={null}>
      <MetaPixelRoute />
    </Suspense>
  );
}
