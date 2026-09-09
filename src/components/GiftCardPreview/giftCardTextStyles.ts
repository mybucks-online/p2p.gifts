import { css } from "styled-components";

/** Shared text rendering for on-screen preview and PNG export parity */
export const giftCardTextStyles = css`
  font-family: ${({ theme }) => theme.fonts.sans};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: geometricPrecision;
  font-kerning: normal;
  font-variant-ligatures: none;
`;
