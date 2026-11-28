import { useContext, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

import Button from "@p2p-gifts/components/Button";
import WelcomeSocialBar from "@p2p-gifts/components/WelcomeSocialBar";
import { StoreContext, WIZARD_STEP } from "@p2p-gifts/contexts/Store";
import { ACTIVE_CARD_TEMPLATES } from "@p2p-gifts/data/cardTemplates";
import {
  CLAIM_APP_ORIGIN,
  HOW_IT_WORKS,
  LEGAL_LINKS,
  POWERED_BY,
  SITE_LOGO_MARK,
  SITE_NAME,
} from "@p2p-gifts/lib/site";

const Screen = styled.div`
  --welcome-highlight: ${({ theme }) =>
    theme.mode === "dark" ? "#f9a8d4" : "#be185d"};
  color: ${({ theme }) => theme.colors.textStrong};

  h1,
  h2,
  h3,
  p,
  figure {
    margin: 0;
  }

  h2 {
    font-size: clamp(1.875rem, 4vw, 2.5rem);
    line-height: 1.15;
    text-wrap: balance;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.6;
  }

  a:hover {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  section[id] {
    scroll-margin-top: 8rem;
  }
`;

const Width = styled.div`
  width: min(100%, ${({ theme }) => theme.sizes.shellMax});
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 2rem);
`;

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 2;
  background: ${({ theme }) => theme.colors.shellGradientFrom};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Row = styled(Width)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-block: 0.875rem;
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  font-size: ${({ theme }) => theme.fontSize.x2l};
  font-weight: ${({ theme }) => theme.weights.bold};
  white-space: nowrap;
`;

const Links = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem 1.25rem;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const HeaderLinks = styled(Links)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const CreateButton = styled(Button)`
  border-radius: 999px;
  padding: 0.7rem 1.25rem;
  white-space: nowrap;
`;

const Hero = styled(Width)`
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
  padding-block: clamp(3rem, 8vw, 7rem);

  @media (min-width: 52rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const HeroCopy = styled.div`
  display: grid;
  gap: 1.5rem;

  h1 {
    font-size: clamp(2.5rem, 5.4vw, 3.75rem);
    line-height: 1.05;
    letter-spacing: -0.04em;
    text-wrap: balance;
  }

  h1 span {
    color: var(--welcome-highlight);
  }
`;

const Benefits = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  li {
    padding: 0.4rem 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.card};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`;

const HeroActions = styled(Actions)`
  @media (min-width: 52rem) {
    margin-top: ${({ theme }) => theme.sizes.xl};
  }
`;

const HeroImages = styled.div`
  display: grid;
  min-width: 0;
  aspect-ratio: 3 / 2;
`;

const heroEffects = [
  "none",
  "translateY(12px)",
  "translateX(16px)",
  "scale(0.97)",
] as const;

type HeroEffect = (typeof heroEffects)[number];

const enterHeroImage = (effect: HeroEffect) => keyframes`
  from { transform: ${effect}; }
  to { transform: none; }
`;

const HeroImage = styled.img<{ $visible: boolean; $effect: HeroEffect }>`
  grid-area: 1 / 1;
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: 3 / 2;
  object-fit: contain;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 650ms ease-in-out;

  ${({ $visible, $effect }) =>
    $visible &&
    $effect !== "none" &&
    css`
      animation: ${enterHeroImage($effect)} 650ms ease-out;
    `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    animation: none;
  }
`;

const Band = styled.section`
  border-block: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
`;

const Section = styled(Width)`
  padding-block: clamp(3rem, 7vw, 6rem);
`;

const SectionIntro = styled.div`
  display: grid;
  gap: 0.75rem;
  max-width: 42rem;
  margin-inline: auto;
  text-align: center;
`;

const Steps = styled.ol`
  display: grid;
  gap: 1rem;
  padding: 0;
  margin: 2rem 0 0;
  list-style: none;

  @media (min-width: 44rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Step = styled.li`
  display: grid;
  align-content: start;
  gap: 0.75rem;
  padding: clamp(1.25rem, 4vw, 2rem);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.colors.card};

  span {
    color: var(--welcome-highlight);
    font-weight: ${({ theme }) => theme.weights.bold};
  }

  a {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  gap: 1rem;
  margin-top: 2rem;

  img {
    display: block;
    width: 100%;
    aspect-ratio: 3 / 2;
    object-fit: contain;
  }

  @media (min-width: 52rem) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Callout = styled.div`
  display: grid;
  justify-items: center;
  gap: 1rem;
  text-align: center;
  padding: clamp(2rem, 6vw, 4rem) 1rem;
  border-radius: ${({ theme }) => theme.radius.card};
  background: linear-gradient(135deg, #0f172a, #312e81);
  color: #fff;

  p {
    color: #e2e8f0;
  }

  ${Actions} {
    justify-content: center;
    margin-top: ${({ theme }) => theme.sizes.x3s};

    a {
      text-decoration: underline;
      text-underline-offset: 0.2em;
    }
  }
`;

const Footer = styled.footer`
  padding-block: 2rem 2.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FooterLayout = styled(Width)`
  display: grid;
  gap: 1rem;
  grid-template-areas: "brand" "credit" "links" "social";
  align-items: center;
  justify-items: center;
  text-align: center;

  ${Brand} {
    grid-area: brand;
  }

  ${Links} {
    grid-area: links;
    justify-content: center;
  }

  @media (min-width: 60rem) {
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "brand links social" "credit credit credit";
    text-align: left;

    ${Brand},
    > p {
      justify-self: start;
    }
  }
`;

const FooterCredit = styled.p`
  grid-area: credit;
  font-size: ${({ theme }) => theme.fontSize.xs};

  a {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
`;

const FooterSocial = styled.div`
  grid-area: social;
`;

const sections = [
  { id: "how-it-works", label: "How it works" },
  { id: "how-to-claim", label: "How to claim" },
  { id: "templates", label: "Templates" },
];

const senderSteps = [
  [
    "Create a gift wallet",
    "Create a one-time wallet with randomly generated credentials. The gift card includes those credentials as a QR code.",
  ],
  [
    "Fund the wallet",
    "Send supported crypto to the gift wallet on the network you selected.",
  ],
  [
    "Design your gift card",
    "Pick a template or upload an image, then add and style a warm, personal note.",
  ],
  [
    "Download and share",
    "Save your gift card as a PNG to send privately or print.",
  ],
];

const recipientSteps = [
  [
    "Scan the QR code",
    <>
      Use your phone’s camera to scan the code and open the gift wallet at{" "}
      <a href={CLAIM_APP_ORIGIN} target="_blank" rel="noopener noreferrer">
        app.mybucks.online
      </a>
      .
    </>,
  ],
  ["Transfer the gift", "Select the asset and send it to your own wallet."],
] as const;

const templatePreviews = new Map([
  ["merry-christmas", "merry-christmas"],
  ["congratulations", "congratulations"],
  ["happy-birthday", "happy-birthday"],
  ["good-luck", "good-luck"],
  ["happy-halloween", "happy-halloween"],
  ["thank-you", "thank-you"],
  ["coffee-on-me", "coffee-on-me"],
  ["general-gift-card", "general-gift"],
  ["happy-holidays", "happy-holidays"],
  ["top-up", "top-up"],
  ["crypto-gradient", "crypto-gradient"],
]);

const customGiftPreview = {
  src: "/previews/custom-gift-card.png",
  alt: "Custom gift card example",
};

const galleryPreviews = ACTIVE_CARD_TEMPLATES.flatMap(({ id, name }) => {
  const preview = templatePreviews.get(id);
  return preview ? [{ src: `/previews/${preview}.png`, alt: name }] : [];
})
  .reverse()
  .concat(customGiftPreview);

const repositoryUrl = "https://github.com/mybucks-online/p2p.gifts";

const heroPreviews = ["merry-christmas", "happy-birthday", "good-luck"]
  .flatMap((name) => {
    const preview = galleryPreviews.find(
      ({ src }) => src === `/previews/${name}.png`,
    );
    return preview ? [preview] : [];
  })
  .concat(customGiftPreview);

const Welcome = () => {
  const { setActiveStep } = useContext(StoreContext);
  const [{ index: previewIndex, effect }, setHeroPreview] = useState<{
    index: number;
    effect: HeroEffect;
  }>({ index: 0, effect: "none" });

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      if (!motion.matches && !document.hidden) {
        const effect =
          heroEffects[Math.floor(Math.random() * heroEffects.length)];
        setHeroPreview(({ index }) => ({
          index: (index + 1) % heroPreviews.length,
          effect,
        }));
      }
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const createGift = () => setActiveStep(WIZARD_STEP.CREATE_WALLET);
  const createAction = (
    <CreateButton
      type="button"
      onClick={createGift}
      data-umami-event="start-gifting"
    >
      Create a Gift Card
    </CreateButton>
  );

  return (
    <Screen id="welcome">
      <Bar>
        <Row>
          <Brand href="#welcome">
            <img src={SITE_LOGO_MARK} width="32" height="32" alt="" />
            {SITE_NAME}
          </Brand>
          <HeaderLinks aria-label="Landing page">
            {sections.map(({ id, label }) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </HeaderLinks>
          {createAction}
        </Row>
      </Bar>
      <main>
        <Hero as="section" aria-labelledby="welcome-title">
          <HeroCopy>
            <h1 id="welcome-title">
              Surprise someone with a <span>crypto</span> gift card
            </h1>
            <Benefits>
              <li>Free to use</li>
              <li>No sign-up</li>
              <li>No app install</li>
              <li>Instant claim</li>
            </Benefits>
            <HeroActions>
              {createAction}
              <a href="#how-it-works">See how it works</a>
            </HeroActions>
          </HeroCopy>
          <HeroImages>
            {heroPreviews.map((preview, index) => (
              <HeroImage
                key={preview.src}
                {...preview}
                $visible={index === previewIndex}
                $effect={effect}
                aria-hidden={index !== previewIndex}
              />
            ))}
          </HeroImages>
        </Hero>

        <Band>
          <Section>
            <SectionIntro>
              <h2>Send a funded wallet as a gift</h2>
              <p>
                You can surprise someone without asking for their wallet
                address. The gift card’s QR code gives them full access to the
                funds.
              </p>
            </SectionIntro>
          </Section>
        </Band>

        {[
          {
            id: "how-it-works",
            title: "How it works",
            intro: "Just a few clicks. Feel like a wizard.",
            steps: senderSteps,
          },
          {
            id: "how-to-claim",
            title: "How to claim",
            intro: "Claim your gift with a phone camera and a browser.",
            steps: recipientSteps,
          },
        ].map(({ id, title, intro, steps }) => (
          <Section
            as="section"
            key={id}
            id={id}
            aria-labelledby={`${id}-title`}
          >
            <SectionIntro>
              <h2 id={`${id}-title`}>{title}</h2>
              <p>{intro}</p>
            </SectionIntro>
            <Steps role="list">
              {steps.map(([name, description], index) => (
                <Step key={name}>
                  <span>Step {index + 1}</span>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </Step>
              ))}
            </Steps>
          </Section>
        ))}

        <Section as="section" id="templates" aria-labelledby="templates-title">
          <SectionIntro>
            <h2 id="templates-title">Built-in templates</h2>
            <p>Choose a design for the occasion or upload your own image.</p>
          </SectionIntro>
          <Gallery>
            {galleryPreviews.map(({ src, alt }) => (
              <figure key={src}>
                <img src={src} alt={alt} loading="lazy" />
              </figure>
            ))}
          </Gallery>
        </Section>

        <Section>
          <Callout>
            <h2>Make your first crypto gift card</h2>
            <p>Free to use and open source.</p>
            <Actions>
              {createAction}
              <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </a>
            </Actions>
          </Callout>
        </Section>
      </main>

      <Footer>
        <FooterLayout>
          <Brand href="#welcome">
            <img src={SITE_LOGO_MARK} width="32" height="32" alt="" />
            {SITE_NAME}
          </Brand>
          <FooterCredit>
            Powered by{" "}
            <a href={POWERED_BY.url} target="_blank" rel="noopener noreferrer">
              {POWERED_BY.label}
            </a>
          </FooterCredit>
          <Links aria-label="Documentation and legal">
            {[HOW_IT_WORKS, ...LEGAL_LINKS].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            ))}
          </Links>
          <FooterSocial>
            <WelcomeSocialBar />
          </FooterSocial>
        </FooterLayout>
      </Footer>
    </Screen>
  );
};

export default Welcome;
