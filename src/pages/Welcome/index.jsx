import { useContext } from "react";
import styled from "styled-components";

import Button from "@p2p-gifts/components/Button";
import WelcomeSocialBar from "@p2p-gifts/components/WelcomeSocialBar";
import { StoreContext, WIZARD_STEP } from "@p2p-gifts/contexts/Store";
import { LEGAL_LINKS, POWERED_BY } from "@p2p-gifts/lib/site";
import media from "@p2p-gifts/styles/media";

const WelcomeScreen = styled.main`
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) =>
    `${theme.sizes.x3l} ${theme.sizes.base} ${theme.sizes.x4l}`};

  ${media.sm`
    padding-top: ${({ theme }) => theme.sizes.x2l};
    padding-bottom: ${({ theme }) => theme.sizes.x3l};
  `}
`;

const WelcomeInner = styled.div`
  width: 100%;
  max-width: 42rem;
  margin: auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.sizes.x2l};
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.x2l};
  width: 100%;
`;

const HeroFrame = styled.div`
  position: relative;
  width: 18rem;
  max-width: 100%;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  border: ${({ theme }) =>
    theme.mode === "dark" ? "1px solid rgba(255, 255, 255, 0.12)" : "none"};
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.05);
  }

  ${media.md`
    width: 20rem;
  `}

  @media (min-width: 992px) {
    width: 24rem;
  }
`;

const HeroImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border: 0;
  vertical-align: top;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent);
  pointer-events: none;
`;

const HeroWrap = styled.div`
  position: relative;
  line-height: 0;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.x3s};
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.x4l};
  font-weight: ${({ theme }) => theme.weights.bold};
  color: ${({ theme }) => theme.colors.textStrong};
  line-height: 1.1;

  ${media.sm`
    font-size: 2.5rem;
  `}

  @media (min-width: 992px) {
    font-size: 3.75rem;
  }
`;

const Tagline = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.weights.highlight};
  color: ${({ theme }) => theme.colors.textMuted};

  ${media.sm`
    font-size: ${({ theme }) => theme.fontSize.xl};
  `}

  @media (min-width: 992px) {
    font-size: ${({ theme }) => theme.fontSize.x2l};
  }
`;

const ValueText = styled.p`
  margin: 0;
  max-width: 36rem;
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};

  ${media.sm`
    font-size: ${({ theme }) => theme.fontSize.lg};
  `}

  @media (min-width: 992px) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const CtaSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.x2l};
  width: 100%;
  padding-top: ${({ theme }) => theme.sizes.x2l};
`;

const CtaBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.lg};
  width: 100%;
`;

const PoweredBy = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};

  a {
    color: inherit;
    font-weight: ${({ theme }) => theme.weights.bold};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media (min-width: 992px) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const LegalNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.sizes.x3s};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  span[aria-hidden] {
    user-select: none;
  }
`;

const Welcome = () => {
  const { setActiveStep } = useContext(StoreContext);

  const goToCreateWallet = () => {
    setActiveStep(WIZARD_STEP.CREATE_WALLET);
  };

  return (
    <WelcomeScreen>
      <WelcomeInner>
        <LogoSection>
          <HeroWrap>
            <HeroFrame>
              <HeroImage src="/preview.png" alt="Crypto gift card preview" />
              <HeroOverlay aria-hidden />
            </HeroFrame>
          </HeroWrap>
          <TitleBlock>
            <Title>p2p.gifts</Title>
            <Tagline>Create. Fund. Share.</Tagline>
          </TitleBlock>
        </LogoSection>

        <ValueText>
          Gift crypto to your community — no signup, no app install,
          instant claim.
        </ValueText>

        <CtaSection>
          <CtaBlock>
            <Button type="button" onClick={goToCreateWallet}>
              🎁 Start Gifting
            </Button>
          </CtaBlock>
          <PoweredBy>
            Powered by{" "}
            <a href={POWERED_BY.url} target="_blank" rel="noopener noreferrer">
              {POWERED_BY.label}
            </a>
          </PoweredBy>
          <LegalNav aria-label="Legal">
            {LEGAL_LINKS.map((link, index) => (
              <span key={link.href}>
                {index > 0 && <span aria-hidden> · </span>}
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </span>
            ))}
          </LegalNav>
          <WelcomeSocialBar />
        </CtaSection>
      </WelcomeInner>
    </WelcomeScreen>
  );
};

export default Welcome;
