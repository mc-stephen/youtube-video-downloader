"use client";

interface TurnstileOptions {
  size: string;
  sitekey: string;
  callback: (token: string) => void;
}

// Ensure turnstile is declared as it may be part of a third-party library
declare const turnstile: {
  render: (containerId: string, options: TurnstileOptions) => void;
};

type TokenCallback = (token: string) => void;

export default function RenderTurnstile(receivedToken: TokenCallback): void {
  turnstile.render("#turnstile-container", {
    size: "compact",
    sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string, // Ensure type assertion as env vars are typically string or undefined
    callback: (token: string) => {
      receivedToken(token);
    },
  });
}
