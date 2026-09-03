// Meta Pixel base code. Server component, rendered inside <head> in
// src/app/layout.js. Follows Nanolix Meta Tracking SOP §5.
//
// Why an explicit <head> in the root layout, and not next/script:
//   - <Script strategy="beforeInteractive"> does NOT put an *inline* script in
//     <head> in Next 16. It pushes it onto the `self.__next_s` queue to be run
//     by the Next runtime around hydration.
//   - A plain inline <script> rendered in the body tree runs at parse time, but
//     lands in <body>, and Meta's own install instructions (and the Pixel
//     Helper / Pixel Validator extensions, which scan document.head) expect the
//     base code in <head>.
// Rendering it inside <head> here satisfies both: it executes as the browser
// parses the head, before anything else on the page, and the extensions find
// it. Verified against the served HTML.
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

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ENABLED = process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === "true";

export default function MetaPixelHead() {
  if (!PIXEL_ID || !ENABLED) return null;

  return (
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
  );
}
