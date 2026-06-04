/** p2p.gifts site branding (this app) */
export const SITE_NAME = "p2p.gifts";
export const SITE_URL = "https://p2p.gifts";
export const SITE_TAGLINE = "Create. Fund. Share.";
export const SITE_DESCRIPTION =
  "Create a disposable crypto gift wallet, fund it, and share a branded gift card with QR. Browser-only — no signup, no app install.";

/** Receiver claim flow (mybucks wallet app) */
export const CLAIM_APP_ORIGIN = "https://app.mybucks.online";

/** Wallet stack credit on gift cards and footer */
export const POWERED_BY = Object.freeze({
  label: "mybucks.online",
  url: "https://mybucks.online?utm_source=p2p.gifts",
});

/** Top-of-page promo banner (set enabled: false to hide) */
export const PROMO_BANNER = Object.freeze({
  enabled: true,
  message:
    "🎨 Gift Card Design Contest is Live! Share your nice gift card to win 5 USDC.",
  ctaLabel: "Enter now!",
  ctaUrl: "https://t.me/mybucks_online",
});
