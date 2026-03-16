"use client";

import Script from "next/script";

const GA_TRACKING_ID = "G-JN5C3WSSLK";

export function GoogleAnalytics() {
  return (
    <>
      {/* Google Analytics - Load and check consent from localStorage */}
      <Script
        id="gtag-init"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Check consent from localStorage directly
            var savedConsent = null;
            try {
              var stored = localStorage.getItem('neofidu_cookie_consent');
              if (stored) {
                savedConsent = JSON.parse(stored);
              }
            } catch(e) {}

            var analyticsGranted = savedConsent && savedConsent.analytics === true;

            // Set consent based on stored preference
            gtag('consent', 'default', {
              'analytics_storage': analyticsGranted ? 'granted' : 'denied',
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
