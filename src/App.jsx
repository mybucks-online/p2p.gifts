import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";

import { AppShell } from "@p2p-gifts/components/Containers";
import ThemeToggleButton from "@p2p-gifts/components/ThemeToggleButton";
import { StoreContext, WIZARD_STEP } from "@p2p-gifts/contexts/Store";
import CreateWallet from "@p2p-gifts/pages/CreateWallet";
import Fund from "@p2p-gifts/pages/Fund";
import GenerateGiftCard from "@p2p-gifts/pages/GenerateGiftCard";
import Welcome from "@p2p-gifts/pages/Welcome";
import media from "@p2p-gifts/styles/media";

import "react-toastify/dist/ReactToastify.css";

const CommitHash = styled.span`
  display: none;
`;

const AppWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  width: 100%;
`;

const WelcomeScroll = styled.div`
  flex: 1 1 0;
  min-height: 0;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const MainScroll = styled.div`
  flex: 1 1 0;
  min-height: 0;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Main = styled.main`
  box-sizing: border-box;
  max-width: ${({ theme }) => theme.sizes.shellMax};
  margin-inline: auto;
  padding-top: ${({ theme }) => theme.sizes.x3l};
  padding-inline: ${({ theme }) => theme.sizes.x2l};
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    width: 100%;
  }

  ${media.lg`
    padding-top: ${({ theme }) => theme.sizes.x2l};
    padding-inline: ${({ theme }) => theme.sizes.xl};
  `}

  ${media.sm`
    padding-top: ${({ theme }) => theme.sizes.xl};
    padding-inline: ${({ theme }) => theme.sizes.base};
  `}
`;

function Content({ activeStep }) {
  if (
    activeStep === WIZARD_STEP.CREATE_WALLET ||
    activeStep === WIZARD_STEP.GENERATE
  ) {
    return <CreateWallet />;
  }
  if (activeStep === WIZARD_STEP.FUND) {
    return <Fund />;
  }
  if (activeStep === WIZARD_STEP.GIFT_CARD) {
    return <GenerateGiftCard />;
  }
  return null;
}

function App() {
  const { activeStep, theme } = useContext(StoreContext);

  return (
    <AppWrapper>
      {activeStep !== WIZARD_STEP.WELCOME ? <ThemeToggleButton fixed /> : null}
      <AppShell>
        {activeStep === WIZARD_STEP.WELCOME ? (
          <WelcomeScroll>
            <Welcome />
          </WelcomeScroll>
        ) : (
          <MainScroll>
            <Main>
              <Content activeStep={activeStep} />
            </Main>
          </MainScroll>
        )}
      </AppShell>

      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        theme={theme}
      />

      {import.meta.env.VITE_COMMIT_HASH && (
        <CommitHash data-commit={import.meta.env.VITE_COMMIT_HASH} />
      )}
    </AppWrapper>
  );
}

export default App;
