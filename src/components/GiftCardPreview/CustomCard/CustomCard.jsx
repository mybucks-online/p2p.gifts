import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import styled from "styled-components";

import {
  GIFT_CARD_ASPECT_RATIO,
  GIFT_CARD_QR_SIZE,
  GIFT_CARD_WIDTH_REM,
} from "@p2p-gifts/components/GiftCardPreview/constants";
import GiftCardBrand from "@p2p-gifts/components/GiftCardPreview/GiftCardBrand";
import GiftCardNote from "@p2p-gifts/components/GiftCardPreview/GiftCardNote";
import { giftCardTextStyles } from "@p2p-gifts/components/GiftCardPreview/giftCardTextStyles";
import {
  DEFAULT_CARD_TEMPLATE_QR_COLOR,
  DEFAULT_CARD_TEMPLATE_TEXT_COLOR,
} from "@p2p-gifts/data/cardTemplates";

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
  color: ${({ $textColor }) => $textColor};
  background: #374151;
  line-height: normal;
  ${giftCardTextStyles}
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
  min-height: 0;
  padding-top: 1rem;
  min-width: 0;
`;

const CardTop = styled.div`
  flex-shrink: 0;
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
  {
    backgroundImage,
    note = "",
    giftingLink,
    qrColor = DEFAULT_CARD_TEMPLATE_QR_COLOR,
    textColor = DEFAULT_CARD_TEMPLATE_TEXT_COLOR,
  },
  ref,
) {
  return (
    <CardRoot ref={ref} $textColor={textColor}>
      {backgroundImage ? (
        <BackgroundImage src={backgroundImage} alt="" aria-hidden />
      ) : null}
      <CardLeft>
        <CardTop>
          <GiftCardBrand textShadow="0 1px 4px rgba(0, 0, 0, 0.55)" />
        </CardTop>
        <GiftCardNote note={note} shadow />
      </CardLeft>
      {giftingLink ? (
        <CardQrInner>
          <QRCodeSVG
            value={giftingLink}
            size={GIFT_CARD_QR_SIZE}
            fgColor={qrColor}
            bgColor="#ffffff"
          />
        </CardQrInner>
      ) : null}
    </CardRoot>
  );
});

export default CustomCard;
