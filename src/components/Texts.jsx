import styled from "styled-components";

import { WIZARD_STEP_COUNT } from "@p2p-gifts/contexts/Store";
import media from "@p2p-gifts/styles/media";

export const H3 = styled.h3`
  color: ${({ theme }) => theme.colors.textStrong};
  font-size: ${({ theme }) => theme.fontSize.x2l};
  font-weight: ${({ theme }) => theme.weights.bold};
  line-height: 150%;
  margin-bottom: ${({ theme }) => theme.sizes.base};

  ${media.sm`
    font-size: ${({ theme }) => theme.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.sizes.xl};
  `}
`;

const WizardStepTitleRoot = styled(H3)`
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.sizes.sm};
  width: 100%;
`;

const StepIndicatorWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: ${({ theme }) => `${theme.sizes.x3s} ${theme.sizes.sm}`};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.weights.highlight};
  line-height: 1;
  white-space: nowrap;

  ${media.sm`
    font-size: ${({ theme }) => theme.fontSize.sm};
  `}
`;

export const WizardStepTitle = ({
  step,
  total = WIZARD_STEP_COUNT,
  children,
  className,
}) => (
  <WizardStepTitleRoot className={className}>
    <StepIndicatorWrap aria-label={`Step ${step} of ${total}`}>
      {step}/{total}
    </StepIndicatorWrap>
    <span>{children}</span>
  </WizardStepTitleRoot>
);

export const WizardStepSummary = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.weights.regular};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.45;
`;
