import Script from "next/script";

const GA_ID = "G-04RE1P3HRY";

/** Google tag (gtag.js) — site-wide pageview tracking. */
export function GoogleAnalytics() {
  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
