import { Plus_Jakarta_Sans, Figtree } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import MotionProvider from "@/animations/MotionProvider";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/sections/Footer";
import CookieConsent from "@/components/ui/CookieConsent";

// Heading typeface — Randall Fryer brand (Op1776 CI-0216)
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Body typeface — Randall Fryer brand (Op1776 CI-0216)
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

// Micro-label / eyebrow typeface — Switzer (Fontshare, self-hosted variable font)
const switzer = localFont({
  src: [
    {
      path: "../assets/fonts/Switzer-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../assets/fonts/Switzer-VariableItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-switzer",
  display: "swap",
});

const SITE_TITLE = "Randall Fryer for Oregon House District 28";
const SITE_DESCRIPTION =
  "Randall Fryer is running for the Oregon House to restore educational excellence, reduce the burden on working families, strengthen Oregon's business climate, support safer communities, and bring greater accountability to Salem.";

export const metadata = {
  metadataBase: new URL("https://randallfryer.vercel.app"),
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
      className={`${plusJakarta.variable} ${figtree.variable} ${switzer.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
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
