import { useContext, useMemo, useState } from "react";
import {
  generateHash,
  PASSPHRASE_MAX_LENGTH,
  PASSPHRASE_MIN_LENGTH,
  PASSPHRASE_MIN_ZXCVBN_SCORE,
  PIN_MAX_LENGTH,
  PIN_MIN_ZXCVBN_SCORE,
  randomPassphrase,
  randomPIN,
} from "@mybucks.online/core";
import styled from "styled-components";
import zxcvbn from "zxcvbn";

import Button from "@p2p-gifts/components/Button";
import { Container } from "@p2p-gifts/components/Containers";
import InfoCallout from "@p2p-gifts/components/InfoCallout";
import Input from "@p2p-gifts/components/Input";
import { Label } from "@p2p-gifts/components/Label";
import Modal from "@p2p-gifts/components/Modal";
import PasswordToggleIcon from "@p2p-gifts/components/PasswordToggleIcon";
import Progress from "@p2p-gifts/components/Progress";
import RefreshIconButton from "@p2p-gifts/components/RefreshIconButton";
import StrengthMeter from "@p2p-gifts/components/StrengthMeter";
import {
  WizardStepSummary,
  WizardStepTitle,
} from "@p2p-gifts/components/Texts";
import { StoreContext, WIZARD_STEP } from "@p2p-gifts/contexts/Store";
import { PIN_MIN_LENGTH } from "@p2p-gifts/lib/conf";
import media from "@p2p-gifts/styles/media";

const CreateWalletContainer = styled(Container)`
  margin-top: 3rem;

  ${media.md`
    margin-top: 2rem;
  `}
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.x3s};
  text-align: center;
`;

const PROGRESS_MODAL_SIZE = "10rem";

const ProgressWrapper = styled.div`
  box-sizing: border-box;
  width: ${PROGRESS_MODAL_SIZE};
  height: ${PROGRESS_MODAL_SIZE};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.sizes.base};
  padding: ${({ theme }) => theme.sizes.xl};
  background: ${({ theme }) => theme.colors.card};

  progress {
    width: 100%;
    max-width: 100%;
  }
`;

const GreetingIcon = styled.img`
  width: calc(${PROGRESS_MODAL_SIZE} * 0.4);
  height: calc(${PROGRESS_MODAL_SIZE} * 0.4);
  object-fit: contain;
  flex-shrink: 0;
`;

const CredentialInputWrapper = styled.div`
  position: relative;
`;

const CompactInput = styled(Input)`
  margin-bottom: ${({ theme }) => theme.sizes.x3s};
`;

const RefreshButton = styled.button`
  position: absolute;
  right: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const CommitHash = styled.span`
  display: none;
`;

const CreateWallet = () => {
  const { setup, setActiveStep } = useContext(StoreContext);

  const [passphrase, setPassphrase] = useState(() => randomPassphrase());
  const [pin, setPin] = useState(() => randomPIN(PIN_MIN_LENGTH));
  const [disabled, setDisabled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPassphrase, setShowPassphrase] = useState(true);
  const [showPin, setShowPin] = useState(true);
  const [passphraseFocused, setPassphraseFocused] = useState(false);
  const [pinFocused, setPinFocused] = useState(false);

  const passphraseStrength = useMemo(() => {
    if (!passphrase) return 0;
    const { score } = zxcvbn(passphrase);
    if (passphrase.length < PASSPHRASE_MIN_LENGTH) {
      return Math.min(score, PASSPHRASE_MIN_ZXCVBN_SCORE - 1);
    }
    return score;
  }, [passphrase]);

  const pinStrength = useMemo(() => {
    if (!pin || pin.length < PIN_MIN_LENGTH) return 0;
    const { score } = zxcvbn(pin);
    return score < 2 ? score : 2;
  }, [pin]);

  const hasInvalidInput = useMemo(
    () =>
      disabled ||
      !passphrase ||
      !pin ||
      passphraseStrength < PASSPHRASE_MIN_ZXCVBN_SCORE ||
      pinStrength < PIN_MIN_ZXCVBN_SCORE,
    [passphrase, pin, disabled, passphraseStrength, pinStrength],
  );

  const onSubmit = async () => {
    navigator.clipboard.writeText("");
    setDisabled(true);
    setActiveStep(WIZARD_STEP.GENERATE);
    const hash = await generateHash(
      passphrase,
      pin,
      (p) => setProgress(Math.floor(p * 100)),
      false,
    );
    setup(passphrase, pin, false, hash);
    setProgress(0);
    setActiveStep(WIZARD_STEP.FUND);
    setDisabled(false);
  };

  const onRandomPassphrase = () => {
    const value = randomPassphrase();
    setPassphrase(value);
    setShowPassphrase(true);
    navigator.clipboard.writeText(value);
  };

  const onRandomPin = () => {
    const value = randomPIN(PIN_MIN_LENGTH);
    setPin(value);
    setShowPin(true);
    navigator.clipboard.writeText(value);
  };

  const onKeyDown = (e) => {
    if (hasInvalidInput) {
      return;
    }

    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <>
      <CreateWalletContainer>
        <Header>
          <WizardStepTitle step={1}>Secure Your Gift Wallet</WizardStepTitle>
          <WizardStepSummary>
            Auto-generated for security. No need to remember.
          </WizardStepSummary>
        </Header>

        <div>
          <Label htmlFor="passphrase">Passphrase</Label>
          <CredentialInputWrapper>
            <CompactInput
              id="passphrase"
              type={showPassphrase ? "text" : "password"}
              placeholder="e.g. My-1st-car-was-a-red-Ford-2005!"
              disabled={disabled}
              value={passphrase}
              maxLength={PASSPHRASE_MAX_LENGTH}
              onChange={(e) => setPassphrase(e.target.value)}
              onKeyDown={onKeyDown}
              onFocus={() => setPassphraseFocused(true)}
              onBlur={() => setPassphraseFocused(false)}
            />
            <RefreshButton
              type="button"
              disabled={disabled}
              aria-label="Generate passphrase"
              onClick={onRandomPassphrase}
            >
              <RefreshIconButton focused={passphraseFocused} />
            </RefreshButton>
            <ToggleButton
              type="button"
              disabled={disabled}
              onClick={() => setShowPassphrase(!showPassphrase)}
              aria-label={
                showPassphrase ? "Hide passphrase" : "Show passphrase"
              }
            >
              <PasswordToggleIcon
                show={showPassphrase}
                focused={passphraseFocused}
              />
            </ToggleButton>
          </CredentialInputWrapper>
          <StrengthMeter level={passphraseStrength} maxLevel={4} />
        </div>

        <div>
          <Label htmlFor="pin">PIN</Label>
          <CredentialInputWrapper>
            <CompactInput
              id="pin"
              type={showPin ? "text" : "password"}
              placeholder="e.g. 202w875"
              disabled={disabled}
              value={pin}
              maxLength={PIN_MAX_LENGTH}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              onFocus={() => setPinFocused(true)}
              onBlur={() => setPinFocused(false)}
            />
            <RefreshButton
              type="button"
              disabled={disabled}
              aria-label="Generate PIN"
              onClick={onRandomPin}
            >
              <RefreshIconButton focused={pinFocused} />
            </RefreshButton>
            <ToggleButton
              type="button"
              disabled={disabled}
              onClick={() => setShowPin(!showPin)}
              aria-label={showPin ? "Hide PIN" : "Show PIN"}
            >
              <PasswordToggleIcon show={showPin} focused={pinFocused} />
            </ToggleButton>
          </CredentialInputWrapper>
          <StrengthMeter level={pinStrength} maxLevel={2} />
        </div>

        <InfoCallout>
          Please do not refresh the page before downloading your gift card!
        </InfoCallout>

        <Button onClick={onSubmit} disabled={hasInvalidInput} $size="block">
          Create Wallet
        </Button>
      </CreateWalletContainer>

      {import.meta.env.VITE_COMMIT_HASH && (
        <CommitHash data-commit={import.meta.env.VITE_COMMIT_HASH} />
      )}

      <Modal show={!!progress} width={PROGRESS_MODAL_SIZE}>
        <ProgressWrapper>
          <GreetingIcon src="/logo-72x72.png" alt="p2p.gifts" loading="lazy" />
          <Progress value={progress} max="100" />
        </ProgressWrapper>
      </Modal>
    </>
  );
};

export default CreateWallet;
