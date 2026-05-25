import { useRef } from "react";
import styled from "styled-components";

import {
  GIFT_CARD_ASPECT_RATIO,
  GIFT_CARD_WIDTH_REM,
} from "@p2p-gifts/components/GiftCardPreview/constants";
import { useGiftCardPreviewScale } from "@p2p-gifts/components/GiftCardPreview/useGiftCardPreviewScale";
import { sizes as breakpoints } from "@p2p-gifts/styles/media";

const DESKTOP_MIN = breakpoints.lg + 1;

/** Shadow outside the clip so rounded corners are not squared off */
const PreviewOuter = styled.div`
  width: 100%;
  max-width: ${GIFT_CARD_WIDTH_REM}rem;
  flex-shrink: 0;
  min-width: 0;
  filter: drop-shadow(0 20px 30px rgba(15, 23, 42, 0.22));

  ${({ theme }) =>
    theme.mode === "dark" &&
    `
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.45));
  `}

  @media (min-width: ${DESKTOP_MIN}px) {
    align-self: stretch;
  }
`;

const Frame = styled.div`
  --gift-card-preview-scale: 1;
  width: 100%;
  aspect-ratio: ${GIFT_CARD_ASPECT_RATIO};
  position: relative;
  overflow: hidden;
  isolation: isolate;
  border-radius: calc(
    ${({ theme }) => theme.radius.form} * var(--gift-card-preview-scale)
  );
`;

const ScaledSlot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: ${({ $scale }) => `scale(${$scale})`};
  transform-origin: top left;
  line-height: 0;
`;

/** Responsive viewport for gift card templates (fixed 28rem layout, scales on narrow screens). */
const GiftCardPreview = ({ children }) => {
  const frameRef = useRef(null);
  const scale = useGiftCardPreviewScale(frameRef);

  return (
    <PreviewOuter>
      <Frame ref={frameRef} style={{ "--gift-card-preview-scale": scale }}>
        <ScaledSlot $scale={scale}>{children}</ScaledSlot>
      </Frame>
    </PreviewOuter>
  );
};

export default GiftCardPreview;
export {
  CARD_STYLE_GROUPS,
  CARD_STYLE_ID_DEFAULT,
  getCardFormatConfig,
  parseCardStyle,
} from "@p2p-gifts/components/GiftCardPreview/cardFormats";
export {
  getGiftCardCanonicalWidthPx,
  GIFT_CARD_ASPECT_RATIO,
  GIFT_CARD_QR_SIZE,
  GIFT_CARD_WIDTH_REM,
} from "@p2p-gifts/components/GiftCardPreview/constants";
export { default as CustomCard } from "@p2p-gifts/components/GiftCardPreview/CustomCard";
export { default as DefaultCard } from "@p2p-gifts/components/GiftCardPreview/DefaultCard";
export {
  DEFAULT_CARD_THEME_ID_DEFAULT,
  DEFAULT_CARD_THEME_OPTIONS,
} from "@p2p-gifts/components/GiftCardPreview/DefaultCard";
