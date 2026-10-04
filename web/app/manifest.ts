import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cliprail",
    short_name: "Cliprail",
    description: "Get paid in USDC for every verified view on your clips.",
    start_url: "/me",
    display: "standalone",
    background_color: "#0b0a10",
    theme_color: "#0b0a10",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
