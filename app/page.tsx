import React from "react";
import type { Metadata } from "next";
import IndexClient from "./page.client";

export default function Home() {
  return <IndexClient />;
}

//==================
//
//==================
export const metadata: Metadata = {
  title: "VideoMax - Download YouTube Videos Easily",
  manifest: "https://www.videomax.com/manifest.json",
  themeColor: "#1d3557", // A blueish theme color for the app
  description:
    "VideoMax is the ultimate tool for downloading videos from YouTube and other platforms in high quality. Fast, secure, and free to use!",
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_DOMAIN,
    siteName: process.env.NEXT_PUBLIC_APP_NAME,
    title: "VideoMax - Download YouTube Videos Easily",
    description:
      "Easily download videos from YouTube and other platforms with VideoMax. Choose your resolution and format, all for free!",
    images: [
      {
        width: 1200,
        height: 630,
        alt: "VideoMax - Free YouTube Video Downloader",
        url: `${process.env.NEXT_PUBLIC_APP_NAME}/og-image.jpg`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: process.env.NEXT_PUBLIC_APP_SOCIAL_HANDLE,
    title: "VideoMax - Download YouTube Videos in HD",
    creator: process.env.NEXT_PUBLIC_APP_SOCIAL_HANDLE,
    images: [`${process.env.NEXT_PUBLIC_APP_NAME}/twitter-image.jpg`],
    description:
      "The best online tool to download videos from YouTube and other platforms quickly and easily.",
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  other: {
    pinterest: "nopin", // Optional to disable pinning
    "msapplication-TileColor": "#1d3557",
    "msapplication-TileImage": "/mstile-144x144.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};
