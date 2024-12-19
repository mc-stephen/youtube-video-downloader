"use client";

import { useEffect, useState } from "react";

export default function AdComponent() {
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
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
    document.getElementById("ad-container")!.appendChild(scriptConfig);

    const scriptInvoke = document.createElement("script");
    scriptInvoke.type = "text/javascript";
    scriptInvoke.src =
      "//www.highperformanceformat.com/4945fed10e731eb25ae3f7817d2b095d/invoke.js";

    // Detect when the script finishes loading
    scriptInvoke.onload = () => {
      setAdLoaded(true); // Mark the ad as loaded
    };

    document.getElementById("ad-container")!.appendChild(scriptInvoke);
  }, []);

  return (
    <div id="ad-container" style={{ textAlign: "center" }}>
      {!adLoaded && (
        <div style={{ height: 90, width: 728, backgroundColor: "#f0f0f0" }}>
          Loading ad...
        </div>
      )}
    </div>
  );
}
