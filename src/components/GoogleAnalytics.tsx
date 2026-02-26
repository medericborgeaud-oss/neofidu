"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_TRACKING_ID = "G-JN5C3WSSLK";

export function GoogleAnalytics() {
  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    // Check consent status on mount and when it changes
    const checkConsent = () => {
      const savedConsent = localStorage.getItem("neofidu_cookie_consent");
      if (savedConsent) {
        try {
          const parsed = JSON.parse(savedConsent);
          setConsentGranted(parsed.analytics === true);
        } catch {
          setConsentGranted(false);
        }
      }
    };

    checkConsent();

    // Listen for storage changes (in case consent is updated in another tab)
    window.addEventListener("storage", checkConsent);

    // Also listen for custom consent event
    const handleConsentChange = () => checkConsent();
    window.addEventListener("cookieConsentChanged", handleConsentChange);

    return () => {
      window.removeEventListener("storage", checkConsent);
      window.removeEventListener("cookieConsentChanged", handleConsentChange);
    };
  }, []);

  return (
    <>
      {/* Google Analytics - Always load but respect consent mode */}
      <Script
        id="gtag-init"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="lazyOnload"
      />
      <Script
        id="gtag-config"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Default to denied - will be updated when consent is given
            gtag('consent', 'default', {
              'analytics_storage': '${consentGranted ? "granted" : "denied"}',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });

            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true
            });

            // Listen for consent updates
            window.addEventListener('cookieConsentChanged', function() {
              var consent = localStorage.getItem('neofidu_cookie_consent');
              if (consent) {
                try {
                  var parsed = JSON.parse(consent);
                  gtag('consent', 'update', {
                    'analytics_storage': parsed.analytics ? 'granted' : 'denied'
                  });
                } catch(e) {}
              }
            });
          `,
        }}
      />
    </>
  );
}

// GTM noscript fallback (to be used in body)
export function GoogleTagManagerNoScript() {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

  if (!GTM_ID) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
