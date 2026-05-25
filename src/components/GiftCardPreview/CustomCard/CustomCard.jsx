import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import styled from "styled-components";

import {
  GIFT_CARD_ASPECT_RATIO,
  GIFT_CARD_QR_SIZE,
  GIFT_CARD_WIDTH_REM,
} from "@p2p-gifts/components/GiftCardPreview/constants";
import GiftCardNote from "@p2p-gifts/components/GiftCardPreview/GiftCardNote";

const CardRoot = styled.div`
  width: ${GIFT_CARD_WIDTH_REM}rem;
  aspect-ratio: ${GIFT_CARD_ASPECT_RATIO};
  position: relative;
  border-radius: ${({ theme }) => theme.radius.form};
  padding: ${({ theme }) => theme.sizes.lg};
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: stretch;
  gap: ${({ theme }) => theme.sizes.sm};
  overflow: hidden;
  color: #ffffff;
  background: #374151;
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`;

const CardLeft = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  padding-top: 1rem;
  min-width: 0;
`;

const CardBrand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.sm};
  font-weight: ${({ theme }) => theme.weights.bold};
  font-size: ${({ theme }) => theme.fontSize.lg};
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.55);
`;

const CardSite = styled.p`
  flex-shrink: 0;
  margin: auto 0 0.5rem;
  font-size: 0.5rem;
  font-weight: ${({ theme }) => theme.weights.regular};
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.55);
  opacity: 0.95;

  strong {
    font-weight: ${({ theme }) => theme.weights.bold};
  }
`;

const CardQrInner = styled.div`
  position: relative;
  z-index: 1;
  align-self: start;
  margin-top: 1rem;
  background: #ffffff;
  padding: ${({ theme }) => theme.sizes.xs};
  border-radius: ${({ theme }) => theme.radius.sm};
  line-height: 0;

  svg {
    display: block;
    width: ${GIFT_CARD_QR_SIZE}px;
    height: ${GIFT_CARD_QR_SIZE}px;
  }
`;

/** Custom background gift card — user image with branding, note, and QR */
const CustomCard = forwardRef(function CustomCard(
  { backgroundImage, note = "", giftingLink },
  ref,
) {
  return (
    <CardRoot ref={ref}>
      {backgroundImage ? (
        <BackgroundImage src={backgroundImage} alt="" aria-hidden />
      ) : null}
      <CardLeft>
        <CardBrand>
          <span aria-hidden>🎁</span>
          <span>p2p.gifts</span>
        </CardBrand>
        <GiftCardNote note={note} shadow />
        <CardSite>
          powered by <strong>mybucks.online</strong>
        </CardSite>
      </CardLeft>
      {giftingLink ? (
        <CardQrInner>
          <QRCodeSVG
            value={giftingLink}
            size={GIFT_CARD_QR_SIZE}
            fgColor="#111827"
            bgColor="#ffffff"
          />
        </CardQrInner>
      ) : null}
    </CardRoot>
  );
});

export default CustomCard;
