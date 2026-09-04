import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/animations/MotionProvider";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/sections/Footer";
import CookieConsent from "@/components/ui/CookieConsent";
import MetaPixel from "@/components/analytics/MetaPixel";
import MetaPixelHead from "@/components/analytics/MetaPixelHead";
import SiteAnalytics from "@/components/analytics/SiteAnalytics";

// Heading typeface — Inter. Only Inter and Roboto are used site-wide.
// `opsz` is pulled in so `font-optical-sizing: auto` works on display sizes.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

// Body typeface — Roboto
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

const SITE_TITLE = "Randall Fryer for Oregon House District 28";
const SITE_DESCRIPTION =
  "Randall Fryer is running for the Oregon House to restore educational excellence, reduce the burden on working families, strengthen Oregon's business climate, support safer communities, and bring greater accountability to Salem.";

export const metadata = {
  // Canonical origin. MUST be the live public domain: Meta (and every other
  // crawler) reads og:url from here, and a mismatch breaks the domain-to-pixel
  // association in Events Manager — the Event Setup Tool reports "a pixel
  // wasn't detected on this website" even though the pixel is present.
  // www, not apex: the apex has no valid TLS certificate yet.
  metadataBase: new URL("https://www.randallfororegon.com"),
  title: {
    default: SITE_TITLE,
    template: "%s · Randall Fryer",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} h-full antialiased`}
    >
      {/* Meta Pixel base code must be in <head>: it is where Meta's install
          instructions put it and where the Pixel Helper / Pixel Validator
          extensions look for it. Everything else about metadata still goes
          through the Metadata API above, not here. */}
      <head>
        <MetaPixelHead />
      </head>
      <body className="relative min-h-full flex flex-col">
        <MetaPixel />
        <SiteAnalytics />
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
          <CookieConsent />
        </MotionProvider>
      </body>
    </html>
  );
}
