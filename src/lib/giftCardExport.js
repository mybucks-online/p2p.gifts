import { toPng } from "html-to-image";

import {
  getGiftCardCanonicalWidthPx,
  GIFT_CARD_ASPECT_RATIO,
  GIFT_CARD_BOX_SHADOW,
} from "@p2p-gifts/components/GiftCardPreview/constants";
import { injectPngMetadata } from "@p2p-gifts/lib/pngMetadata";
import { SITE_NAME, SITE_URL } from "@p2p-gifts/lib/site";

const EXPORT_PIXEL_RATIO = 2;
const INTER_FONT_FAMILY = "Inter";
const INTER_STYLESHEET_URL =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";

let interFontEmbedCssCache = null;

async function readBlobAsDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/** Fetch Inter CSS + font files directly — avoids cross-origin cssRules SecurityError. */
async function getGiftCardFontEmbedCSS() {
  if (interFontEmbedCssCache) {
    return interFontEmbedCssCache;
  }

  const response = await fetch(INTER_STYLESHEET_URL);
  if (!response.ok) {
    throw new Error("Could not fetch Inter stylesheet");
  }

  let cssText = await response.text();
  const urlPattern = /url\(([^)]+)\)/g;
  const rawUrls = [...cssText.matchAll(urlPattern)].map((match) =>
    match[1].replace(/["']/g, ""),
  );

  await Promise.all(
    [...new Set(rawUrls)].map(async (rawUrl) => {
      const fontUrl = rawUrl.startsWith("http")
        ? rawUrl
        : new URL(rawUrl, INTER_STYLESHEET_URL).href;
      const fontResponse = await fetch(fontUrl);
      if (!fontResponse.ok) {
        throw new Error(`Could not fetch font: ${fontUrl}`);
      }
      const dataUrl = await readBlobAsDataUrl(await fontResponse.blob());
      cssText = cssText.split(rawUrl).join(dataUrl);
    }),
  );

  interFontEmbedCssCache = cssText;
  return cssText;
}

function waitForImages(root) {
  const images = [...root.querySelectorAll("img")];
  return Promise.all(
    images.map(
      (image) =>
        new Promise((resolve) => {
          if (image.complete) {
            resolve();
            return;
          }

          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        }),
    ),
  );
}

async function waitForFonts(cardElement) {
  if (!document.fonts) return;

  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );
  const cardStyle = getComputedStyle(cardElement);
  const fontFamily = cardStyle.fontFamily || INTER_FONT_FAMILY;
  const fontSize = cardStyle.fontSize || `${rootFontSize}px`;

  await document.fonts.ready;
  await Promise.allSettled([
    document.fonts.load(`400 ${fontSize} ${fontFamily}`),
    document.fonts.load(`500 ${fontSize} ${fontFamily}`),
    document.fonts.load(`700 ${fontSize} ${fontFamily}`),
    document.fonts.load(`500 0.875rem ${INTER_FONT_FAMILY}`),
    document.fonts.load(`700 1.125rem ${INTER_FONT_FAMILY}`),
  ]);
}

export async function renderGiftCardPng(cardElement) {
  if (!cardElement) {
    throw new Error("Gift card element is missing");
  }

  const width = getGiftCardCanonicalWidthPx();
  const height = Math.round(width / GIFT_CARD_ASPECT_RATIO);

  await waitForFonts(cardElement);
  await waitForImages(cardElement);

  const fontEmbedCSS = await getGiftCardFontEmbedCSS().catch(() => "");

  const dataUrl = await toPng(cardElement, {
    width,
    height,
    pixelRatio: EXPORT_PIXEL_RATIO,
    cacheBust: true,
    preferredFontFormat: "woff2",
    fontEmbedCSS: fontEmbedCSS || undefined,
    skipFonts: !fontEmbedCSS,
    style: {
      transform: "none",
      margin: "0",
      boxSizing: "border-box",
      aspectRatio: "auto",
      lineHeight: "normal",
      boxShadow: GIFT_CARD_BOX_SHADOW,
    },
  });

  return injectPngMetadata(dataUrl, {
    Author: SITE_NAME,
    Source: SITE_URL,
    Software: SITE_NAME,
    Description: "Crypto gift card created with " + SITE_NAME,
  });
}

export const GIFT_QR_EXPORT_SIZE = 512;
export const GIFT_QR_LOGO_SRC = "/favicon-32x32.png";
/** Logo footprint as a fraction of QR size — keep ~12–15% for reliable scanning */
const GIFT_QR_LOGO_SIZE_RATIO = 0.12;

export function getGiftQrImageSettings(qrSize = GIFT_QR_EXPORT_SIZE) {
  const logoSize = Math.round(qrSize * GIFT_QR_LOGO_SIZE_RATIO);
  return {
    src: GIFT_QR_LOGO_SRC,
    width: logoSize,
    height: logoSize,
    excavate: true,
  };
}

export function preloadGiftQrLogo() {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = resolve;
    image.src = GIFT_QR_LOGO_SRC;
  });
}

export function waitForQrCanvasPaint() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
}

export function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export async function downloadGiftCardImage(
  cardElement,
  filename = "gift-card.png",
) {
  const dataUrl = await renderGiftCardPng(cardElement);
  downloadDataUrl(dataUrl, filename);
}

export function downloadQrCodeImage(canvas, filename = "gift-qr.png") {
  if (!canvas) {
    throw new Error("QR canvas is missing");
  }

  const dataUrl = canvas.toDataURL("image/png");
  const withMeta = injectPngMetadata(dataUrl, {
    Author: SITE_NAME,
    Source: SITE_URL,
    Software: SITE_NAME,
    Description: "Gift wallet QR code from " + SITE_NAME,
  });
  downloadDataUrl(withMeta, filename);
}
