import styled from "styled-components";

import { InfoBlueIcon } from "@p2p-gifts/assets/icons";

const Wrap = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: ${({ theme }) =>
    theme.mode === "dark" ? "rgba(59, 158, 255, 0.12)" : "#eff6ff"};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => theme.sizes.base};
`;

const Inner = styled.div`
  display: flex;
  align-items: ${({ $align }) =>
    $align === "start" ? "flex-start" : "center"};
  gap: ${({ theme }) => theme.sizes.sm};
`;

const Icon = styled.span`
  flex-shrink: 0;
  display: flex;
  margin-top: ${({ $align }) => ($align === "start" ? "0.125rem" : "0")};

  img {
    display: block;
    width: 1.125rem;
    height: 1.125rem;
  }
`;

const Body = styled.div`
  min-width: 0;
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.weights.regular};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  line-height: 1.45;
`;

const InfoCallout = ({ children, align = "center" }) => (
  <Wrap>
    <Inner $align={align}>
      <Icon $align={align} aria-hidden>
        <img src={InfoBlueIcon} alt="" />
      </Icon>
      <Body>
        <Text>{children}</Text>
      </Body>
    </Inner>
  </Wrap>
);

export default InfoCallout;
