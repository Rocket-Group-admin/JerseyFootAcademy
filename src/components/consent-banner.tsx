import Script from "next/script";

/** Secure Privacy cookie consent banner. */
export function ConsentBanner() {
  return (
    <Script
      src="https://app.secureprivacy.ai/script/6a5edc25c77c65fa57dc4a1d.js"
      strategy="beforeInteractive"
    />
  );
}
