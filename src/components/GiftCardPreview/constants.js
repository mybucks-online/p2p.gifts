/** Canonical preview size (3:2) — used for on-screen scale and future image export */
export const GIFT_CARD_WIDTH_REM = 28;
export const GIFT_CARD_ASPECT_RATIO = 3 / 2;
export const GIFT_CARD_QR_SIZE = 168;
export const GIFT_CARD_BOX_SHADOW = "0 25px 50px -12px rgba(15, 23, 42, 0.25)";

export function getGiftCardCanonicalWidthPx() {
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );
  return GIFT_CARD_WIDTH_REM * rootFontSize;
}
