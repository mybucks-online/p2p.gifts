import { toPng } from "html-to-image";

import {
  getGiftCardCanonicalWidthPx,
  GIFT_CARD_ASPECT_RATIO,
  GIFT_CARD_BOX_SHADOW,
} from "@p2p-gifts/components/GiftCardPreview/constants";
import { injectPngMetadata } from "@p2p-gifts/lib/pngMetadata";
import { SITE_NAME, SITE_URL } from "@p2p-gifts/lib/site";

const EXPORT_PIXEL_RATIO = 2;

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

function mountExportClone(cardElement) {
  const width = getGiftCardCanonicalWidthPx();
  const height = Math.round(width / GIFT_CARD_ASPECT_RATIO);
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  Object.assign(host.style, {
    position: "fixed",
    left: "-10000px",
    top: "0",
    width: `${width}px`,
    height: `${height}px`,
    overflow: "hidden",
    pointerEvents: "none",
    lineHeight: "normal",
  });

  const clone = cardElement.cloneNode(true);
  Object.assign(clone.style, {
    transform: "none",
    width: `${width}px`,
    height: `${height}px`,
    margin: "0",
    boxSizing: "border-box",
    aspectRatio: "auto",
    lineHeight: "normal",
    boxShadow: GIFT_CARD_BOX_SHADOW,
  });

  host.appendChild(clone);
  document.body.appendChild(host);
  return { host, clone, width, height };
}

export async function renderGiftCardPng(cardElement) {
  if (!cardElement) {
    throw new Error("Gift card element is missing");
  }

  const { host, clone, width, height } = mountExportClone(cardElement);

  try {
    await waitForImages(clone);

    const dataUrl = await toPng(clone, {
      width,
      height,
      pixelRatio: EXPORT_PIXEL_RATIO,
      cacheBust: true,
    });
    return injectPngMetadata(dataUrl, {
      Author: SITE_NAME,
      Source: SITE_URL,
      Software: SITE_NAME,
      Description: "Crypto gift card created with " + SITE_NAME,
    });
  } finally {
    host.remove();
  }
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
