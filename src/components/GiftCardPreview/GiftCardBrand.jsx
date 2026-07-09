import styled from "styled-components";

import { SITE_LOGO_MARK, SITE_NAME } from "@p2p-gifts/lib/site";

const BrandRoot = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.xs};
  font-weight: ${({ theme }) => theme.weights.bold};
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 1;
  margin-bottom: ${({ $noteSpacing, theme }) =>
    $noteSpacing ? theme.sizes.x3s : 0};
  text-shadow: ${({ $textShadow }) => $textShadow ?? "none"};
`;

const BrandLogo = styled.img`
  display: block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  object-fit: contain;
  align-self: center;
`;

const BrandWordmark = styled.span`
  display: flex;
  align-items: center;
  height: 1em;
  line-height: 1;
`;

/** p2p.gifts mark + wordmark for gift card templates */
export default function GiftCardBrand({ noteSpacing = false, textShadow }) {
  return (
    <BrandRoot $noteSpacing={noteSpacing} $textShadow={textShadow}>
      <BrandLogo src={SITE_LOGO_MARK} alt="" aria-hidden loading="eager" />
      <BrandWordmark>{SITE_NAME}</BrandWordmark>
    </BrandRoot>
  );
}
