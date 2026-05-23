import { useContext } from "react";
import { toast } from "react-toastify";
import copy from "clipboard-copy";
import { QRCodeSVG } from "qrcode.react";
import styled from "styled-components";

import { ArrowUpRightIcon, CopyIcon } from "@p2p-gifts/assets/icons";
import BaseButton from "@p2p-gifts/components/Button";
import { Container, Stack } from "@p2p-gifts/components/Containers";
import InfoCallout from "@p2p-gifts/components/InfoCallout";
import { Label } from "@p2p-gifts/components/Label";
import Link from "@p2p-gifts/components/Link";
import NetworkSelector from "@p2p-gifts/components/NetworkSelector";
import {
  WizardStepSummary,
  WizardStepTitle,
} from "@p2p-gifts/components/Texts";
import { StoreContext, WIZARD_STEP } from "@p2p-gifts/contexts/Store";
import media from "@p2p-gifts/styles/media";

const FundStack = styled(Stack)`
  width: 100%;
  gap: ${({ theme }) => theme.sizes.x2l};
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.x3s};
  text-align: center;
`;

const AddressRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.sizes.sm};
  width: 100%;
  max-width: 100%;
`;

const AddressButton = styled.button`
  text-align: center;
  font-size: ${({ theme }) => theme.sizes.sm};
  font-weight: ${({ theme }) => theme.weights.regular};
  font-family: inherit;
  line-height: 140%;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textMuted};
  overflow-wrap: anywhere;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CopyAddressButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    opacity: 0.8;
  }

  img {
    display: block;
    width: 1.375rem;
    height: 1.375rem;
  }
`;

const NetworkField = styled.div`
  width: 100%;
`;

const AddressField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.x3s};
`;

const NetworkSelectWrap = styled.div`
  width: 100%;

  & > div {
    display: block;
    width: 100%;
  }

  select {
    width: 100%;
    box-sizing: border-box;
    font-size: ${({ theme }) => theme.fontSize.sm};
    padding: ${({ theme }) => theme.sizes.base};
    border-radius: ${({ theme }) => theme.radius.form};

    ${media.sm`
      font-size: ${({ theme }) => theme.fontSize.base};
    `}
  }
`;

const QRCodeWrapper = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.sizes.base};
  border-radius: ${({ theme }) => theme.radius.sm};
  display: block;
  line-height: 0;

  & > svg {
    display: block;
  }
`;

const VerifyDepositWrap = styled.div`
  width: 100%;
  text-align: center;
`;

const VerifyDepositLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.sizes.x3s};

  img {
    flex-shrink: 0;
    width: 1em;
    height: 1em;
    display: block;
  }
`;

const Button = styled(BaseButton)`
  min-width: 12rem;
`;

const LegacyBadge = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.sizes.xs};
  font-weight: ${({ theme }) => theme.weights.regular};
  color: ${({ theme }) => theme.colors.warning};
  margin-bottom: ${({ theme }) => theme.sizes.sm};
`;

const Fund = () => {
  const { account, network, chainId, legacy, updateNetwork, setActiveStep } =
    useContext(StoreContext);

  const copyAddress = () => {
    copy(account.address);
    toast("Address copied into clipboard.");
  };

  const proceedToGiftCard = () => {
    setActiveStep(WIZARD_STEP.GIFT_CARD);
  };

  return (
    <Container>
      <FundStack>
        <Header>
          <WizardStepTitle step={2}>Fund Your Gift Wallet</WizardStepTitle>
          <WizardStepSummary>
            Send cryptocurrency to the wallet address below
          </WizardStepSummary>
        </Header>
        {legacy && <LegacyBadge>Legacy wallet</LegacyBadge>}

        <NetworkField>
          <Label htmlFor="fund-network">Select Network</Label>
          <NetworkSelectWrap>
            <NetworkSelector
              id="fund-network"
              network={network}
              chainId={chainId}
              updateNetwork={updateNetwork}
            />
          </NetworkSelectWrap>
        </NetworkField>

        <QRCodeWrapper>
          <QRCodeSVG value={network + ":" + account.address} />
        </QRCodeWrapper>

        <AddressField>
          <AddressRow>
            <AddressButton
              type="button"
              onClick={copyAddress}
              aria-label="Copy address"
            >
              {account.address}
            </AddressButton>
            <CopyAddressButton
              type="button"
              onClick={copyAddress}
              aria-label="Copy address"
            >
              <img src={CopyIcon} alt="" />
            </CopyAddressButton>
          </AddressRow>
          <VerifyDepositWrap>
            <VerifyDepositLink
              href={account.linkOfAddress(account.address)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Verify your deposit
              <img src={ArrowUpRightIcon} alt="" />
            </VerifyDepositLink>
          </VerifyDepositWrap>
        </AddressField>

        <InfoCallout align="start">
          For the recipient&apos;s convenience, include native tokens for gas
          fees when you send other tokens as well.
        </InfoCallout>

        <Button onClick={proceedToGiftCard} $size="block">
          Proceed
        </Button>
      </FundStack>
    </Container>
  );
};

export default Fund;
