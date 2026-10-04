import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Providers } from "@/components/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-face" });

export const metadata: Metadata = {
  title: "Cliprail: get paid for every verified view",
  description:
    "Brands fund clipping campaigns in escrow on Monad. Clippers are paid in USDC per verified YouTube Shorts view.",
};

export const viewport: Viewport = { themeColor: "#0b0a10" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
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
