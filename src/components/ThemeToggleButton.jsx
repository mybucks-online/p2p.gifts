import { useContext } from "react";
import styled, { css } from "styled-components";

import { StoreContext } from "@p2p-gifts/contexts/Store";

export const ChromeIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radius.form};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition:
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textStrong};
    transform: scale(1.05);
  }

  svg {
    display: block;
  }
`;

const SunIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 2V4M12 20V22M4.92993 4.92993L6.34314 6.34314M17.6569 17.6569L19.0711 19.0711M2 12H4M20 12H22M4.92993 19.0711L6.34314 17.6569M17.6569 6.34314L19.0711 4.92993"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ToggleWrap = styled(ChromeIconButton)`
  ${({ $fixed }) =>
    $fixed &&
    css`
      position: fixed;
      left: ${({ theme }) => theme.sizes.base};
      bottom: ${({ theme }) => theme.sizes.base};
      z-index: 20;
      box-shadow:
        0 0 6px 1px
          color-mix(
            in srgb,
            ${({ theme }) => theme.colors.primary} 28%,
            transparent
          ),
        ${({ theme }) => theme.colors.cardShadow};
    `}
`;

const ThemeToggleButton = ({ fixed = false }) => {
  const { theme, toggleTheme } = useContext(StoreContext);
  const isLight = theme === "light";

  return (
    <ToggleWrap
      type="button"
      $fixed={fixed}
      onClick={toggleTheme}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      {isLight ? <MoonIcon /> : <SunIcon />}
    </ToggleWrap>
  );
};

export default ThemeToggleButton;
