"use client";

import { useEffect, useState, useRef } from "react";

export default function AdComponent() {
  const [adLoaded, setAdLoaded] = useState(false);
  const adContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!adContainerRef.current) return;

    const container = adContainerRef.current;

    const scriptConfig = document.createElement("script");
    scriptConfig.type = "text/javascript";
    scriptConfig.innerHTML = `
      atOptions = {
        'key': '4945fed10e731eb25ae3f7817d2b095d',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };
    `;

    const scriptInvoke = document.createElement("script");
    scriptInvoke.type = "text/javascript";
    const adsDomain = "https://www.highperformanceformat.com";
    scriptInvoke.src = `${adsDomain}/4945fed10e731eb25ae3f7817d2b095d/invoke.js`;
    scriptInvoke.onload = () => setAdLoaded(true);

    container.appendChild(scriptConfig);
    container.appendChild(scriptInvoke);
  }, []);

  return (
    <div ref={adContainerRef} style={{ textAlign: "center" }}>
      {!adLoaded && (
        <div style={{ height: 90, width: 728, backgroundColor: "#f0f0f0" }}>
          Loading ad...
        </div>
      )}
    </div>
  );
}
