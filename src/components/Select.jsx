import styled from "styled-components";

import media from "@p2p-gifts/styles/media";

const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 8rem;

  ${media.sm`
      width: 7.5rem;
    `}

  &::before, &::after {
    --size: 0.3rem;
    position: absolute;
    pointer-events: none;
    right: ${({ theme }) => theme.sizes.base};
    content: "";
    transition: border-color 0.2s;
  }

  &::before {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-bottom: var(--size) solid ${({ theme }) => theme.colors.textMuted};
    top: 40%;
  }

  &::after {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-top: var(--size) solid ${({ theme }) => theme.colors.textMuted};
    top: 55%;
  }

  &:has(select:hover)::before,
  &:has(select:focus)::before {
    border-bottom-color: ${({ theme }) => theme.colors.primary};
  }

  &:has(select:hover)::after,
  &:has(select:focus)::after {
    border-top-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SelectComponent = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.card};
  border: 2px solid ${({ theme }) => theme.colors.border};
  outline: none;
  border-radius: ${({ theme }) => theme.radius.base};
  padding: ${({ theme }) => `${theme.sizes.x3s} ${theme.sizes.base}`};
  font-size: ${({ theme }) => theme.sizes.sm};
  font-weight: ${({ theme }) => theme.weights.highlight};
  line-height: 130%;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textStrong};
  transition:
    border-color 0.2s,
    color 0.2s;

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Select = (props) => (
  <SelectWrapper>
    <SelectComponent {...props} />
  </SelectWrapper>
);

export default Select;
