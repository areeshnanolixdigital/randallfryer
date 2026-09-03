This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment variables

Meta Pixel (see `src/components/analytics/MetaPixel.jsx` and Nanolix Meta
Tracking SOP §3). Set in Vercel Project Settings → Environment Variables, or
in `.env.local` for local development:

```
NEXT_PUBLIC_META_PIXEL_ID=2217312695500017
NEXT_PUBLIC_META_PIXEL_ENABLED=true
```

Keep `NEXT_PUBLIC_META_PIXEL_ENABLED` unset (or `false`) in Preview
environments so preview traffic never lands in the production dataset. If
Conversions API is enabled later, `META_DATASET_ID` and `META_ACCESS_TOKEN`
belong in the server-only scope — never `NEXT_PUBLIC_*`.

Both vars are `NEXT_PUBLIC_*`, so they are inlined at build time: after adding
or changing them, **restart the dev server** (a hot reload is not enough) and
**redeploy** on Vercel. With either missing, `MetaPixel` renders `null` and
every helper is a silent no-op — the correct disabled state, not a bug.

### Cookie consent gates the pixel

The Privacy Policy ("Cookies and analytics") promises optional analytics and
advertising technologies stay disabled until the visitor consents, so the pixel
does not load and no request reaches Meta until the visitor chooses **Accept
analytics** in the cookie banner. Declining, or dismissing the banner without
choosing, leaves every event a no-op.

When verifying with the Meta Pixel Helper extension, accept the banner first —
otherwise the correct behaviour looks like a broken pixel. Consent is stored in
`localStorage` under `rf-cookie-consent`; clear it (or use a fresh private
window) to re-test the banner.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
