import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import styled from "styled-components";

import {
  GIFT_CARD_ASPECT_RATIO,
  GIFT_CARD_QR_SIZE,
  GIFT_CARD_WIDTH_REM,
} from "@p2p-gifts/components/GiftCardPreview/constants";
import { resolveDefaultCardTheme } from "@p2p-gifts/components/GiftCardPreview/DefaultCard/themes";
import GiftCardNote from "@p2p-gifts/components/GiftCardPreview/GiftCardNote";

const CardRoot = styled.div`
  width: ${GIFT_CARD_WIDTH_REM}rem;
  aspect-ratio: ${GIFT_CARD_ASPECT_RATIO};
  position: relative;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.sizes.lg};
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: stretch;
  gap: ${({ theme }) => theme.sizes.sm};
  overflow: hidden;
  color: ${({ theme }) => theme.colors.textInverse};
  background: ${({ $from, $to }) =>
    `linear-gradient(to bottom right, ${$from}, ${$to})`};
`;

const GiftCardDecor = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.1;
  pointer-events: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border: 2px solid white;
  }

  &::before {
    top: 1rem;
    right: 1rem;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
  }

  &::after {
    bottom: 1rem;
    left: 1rem;
    width: 3rem;
    height: 3rem;
    border-radius: ${({ theme }) => theme.radius.sm};
    transform: rotate(45deg);
  }
`;

const GiftCardLeft = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  padding-top: 1rem;
  text-align: left;
  min-width: 0;
  min-height: 0;
`;

const GiftCardTop = styled.div`
  flex-shrink: 0;
`;

const GiftCardBrand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.sm};
  font-weight: ${({ theme }) => theme.weights.bold};
  font-size: ${({ theme }) => theme.fontSize.lg};
  margin-bottom: ${({ theme }) => theme.sizes.x3s};
`;

const GiftCardSite = styled.p`
  flex-shrink: 0;
  margin: auto 0 0.5rem;
  font-size: 0.5rem;
  font-weight: ${({ theme }) => theme.weights.regular};
  opacity: 0.85;

  strong {
    font-weight: ${({ theme }) => theme.weights.bold};
  }
`;

const GiftCardQrInner = styled.div`
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

/** Default gradient gift card — first card format */
const DefaultCard = forwardRef(function DefaultCard(
  { theme, note = "", giftingLink },
  ref,
) {
  const { from, to } = resolveDefaultCardTheme(theme);

  return (
    <CardRoot ref={ref} $from={from} $to={to}>
      <GiftCardDecor aria-hidden />
      <GiftCardLeft>
        <GiftCardTop>
          <GiftCardBrand>
            <span aria-hidden>🎁</span>
            <span>p2p.gifts</span>
          </GiftCardBrand>
        </GiftCardTop>
        <GiftCardNote note={note} />
        <GiftCardSite>
          powered by <strong>mybucks.online</strong>
        </GiftCardSite>
      </GiftCardLeft>
      {giftingLink ? (
        <GiftCardQrInner>
          <QRCodeSVG
            value={giftingLink}
            size={GIFT_CARD_QR_SIZE}
            fgColor={to}
            bgColor="#ffffff"
          />
        </GiftCardQrInner>
      ) : null}
    </CardRoot>
  );
});

export default DefaultCard;
