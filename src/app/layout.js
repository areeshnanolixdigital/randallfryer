import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/animations/MotionProvider";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/sections/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://capitalwatch.example"),
  title: {
    default: "CapitalWatch — Adrian Vale for State Senate",
    template: "%s · CapitalWatch",
  },
  description:
    "CapitalWatch is the campaign of Adrian Vale for State Senate — a movement to restore fiscal honesty, cut red tape, and put citizens back at the center of the Capitol.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
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
