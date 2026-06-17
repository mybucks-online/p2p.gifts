import { getFontEmbedCSS, toPng } from "html-to-image";

import {
  getGiftCardCanonicalWidthPx,
  GIFT_CARD_ASPECT_RATIO,
  GIFT_CARD_BOX_SHADOW,
} from "@p2p-gifts/components/GiftCardPreview/constants";
import { injectPngMetadata } from "@p2p-gifts/lib/pngMetadata";
import { SITE_NAME, SITE_URL } from "@p2p-gifts/lib/site";

const EXPORT_PIXEL_RATIO = 2;
const INTER_FONT_FAMILY = "Inter";
const FONT_EMBED_OPTIONS = { preferredFontFormat: "woff2" };

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

  const fontEmbedCSS = await getFontEmbedCSS(cardElement, FONT_EMBED_OPTIONS);

  const dataUrl = await toPng(cardElement, {
    width,
    height,
    pixelRatio: EXPORT_PIXEL_RATIO,
    cacheBust: true,
    ...FONT_EMBED_OPTIONS,
    fontEmbedCSS,
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
