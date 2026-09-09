import styled from "styled-components";

import Link from "@p2p-gifts/components/Link";
import { PROMO_BANNER } from "@p2p-gifts/lib/site";
import media from "@p2p-gifts/styles/media";

const Bar = styled.div`
  flex-shrink: 0;
  width: 100%;
  box-sizing: border-box;
  background: ${({ theme }) =>
    theme.mode === "dark"
      ? `color-mix(in srgb, ${theme.colors.primary} 22%, #0f172a)`
      : `color-mix(in srgb, ${theme.colors.primary} 12%, #eff6ff)`};
  border-bottom: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.colors.primary} 35%, transparent);
  padding: ${({ theme }) => `${theme.sizes.sm} ${theme.sizes.base}`};
  text-align: center;
`;

const Text = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.weights.regular};
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.textStrong};

  ${media.sm`
    font-size: ${({ theme }) => theme.fontSize.xs};
  `}
`;

const CtaLink = styled(Link)`
  font-weight: ${({ theme }) => theme.weights.highlight};
  white-space: nowrap;
`;

const NotificationBanner = () => {
  if (!PROMO_BANNER.enabled) {
    return null;
  }

  const { message, ctaLabel, ctaUrl } = PROMO_BANNER;

  return (
    <Bar role="status" aria-live="polite">
      <Text>
        {message}{" "}
        {ctaUrl ? (
          <CtaLink href={ctaUrl} target="_blank" rel="noopener noreferrer">
            {ctaLabel}
          </CtaLink>
        ) : (
          <strong>{ctaLabel}</strong>
        )}
      </Text>
    </Bar>
  );
};

export default NotificationBanner;
