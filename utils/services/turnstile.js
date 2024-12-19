"use client";

export default function RenderTurnstile(receivedToken) {
  turnstile.render("#turnstile-container", {
    size: "compact",
    sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    callback: function (token) {
        receivedToken(token);
    },
  });
}
