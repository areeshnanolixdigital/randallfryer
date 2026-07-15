import { Inter, Roboto, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/animations/MotionProvider";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/sections/Footer";

// Heading typeface — Randall Fryer brand (Op1776 CI-0216)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Body typeface — Randall Fryer brand (Op1776 CI-0216)
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://randallfryer.example"),
  title: {
    default: "Randall Fryer for Oregon House District 28",
    template: "%s · Randall Fryer",
  },
  description:
    "Randall Fryer is running for the Oregon House to restore educational excellence, reduce the burden on working families, strengthen Oregon's business climate, support safer communities, and bring greater accountability to Salem.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
