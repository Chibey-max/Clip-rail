import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Providers } from "@/components/Providers";
import "./globals.css";

// Fonts are bundled (SIL OFL, from Fontsource) so dev and builds never download from Google at runtime.
const inter = localFont({ src: "./fonts/Inter.woff2", variable: "--font-inter", weight: "100 900", display: "swap" });
const display = localFont({ src: "./fonts/SpaceGrotesk.woff2", variable: "--font-display-face", weight: "300 700", display: "swap" });
const mono = localFont({ src: "./fonts/JetBrainsMono.woff2", variable: "--font-mono-face", weight: "100 800", display: "swap" });

export const metadata: Metadata = {
  title: "Cliprail: get paid for every verified view",
  description:
    "Brands fund clipping campaigns in escrow on Monad. Clippers are paid in USDC per verified YouTube Shorts view.",
};

export const viewport: Viewport = { themeColor: "#f6f6f2" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
