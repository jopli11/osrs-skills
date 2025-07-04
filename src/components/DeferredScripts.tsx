"use client";

import { useEffect } from "react";

export default function DeferredScripts() {
  useEffect(() => {
    // Handler fires on first user interaction (scroll/tap)
    const loadScripts = () => {
      const doc = document as Document & { _scriptsLoaded?: boolean };
      if (doc._scriptsLoaded) return;
      doc._scriptsLoaded = true;

      // Google Tag Manager
      const gtm = document.createElement("script");
      gtm.src = "https://www.googletagmanager.com/gtm.js?id=GTM-NNZPR8WP";
      gtm.async = true;
      document.head.appendChild(gtm);

      // CookieYes banner (optional; comment out if not used)
      const cookie = document.createElement("script");
      cookie.src = "https://cdn-cookieyes.com/client_data/your_id/banner.js"; // TODO: replace with real ID
      cookie.async = true;
      document.head.appendChild(cookie);
    };

    window.addEventListener("scroll", loadScripts, { once: true, passive: true });
    window.addEventListener("pointerdown", loadScripts, { once: true });

    return () => {
      window.removeEventListener("scroll", loadScripts);
      window.removeEventListener("pointerdown", loadScripts);
    };
  }, []);

  return null;
} 