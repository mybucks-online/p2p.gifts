import { css } from "styled-components";

export const giftCardTextOutlineStyles = css`
  -webkit-text-stroke: 1px white;
  paint-order: stroke fill;
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.45);
`;

/** Shared text rendering for on-screen preview and PNG export parity */
export const giftCardTextStyles = css`
  font-family: ${({ theme }) => theme.fonts.sans};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: geometricPrecision;
  font-kerning: normal;
  font-variant-ligatures: none;
`;
