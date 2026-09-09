import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from "react";

import EvmAccount from "@p2p-gifts/lib/account/evm";
import { DEFAULT_CHAIN_ID, DEFAULT_NETWORK } from "@p2p-gifts/lib/conf";

import useCredentials from "./store/useCredentials";
import useGiftingLink from "./store/useGiftingLink";
import useTheme, { type Theme } from "./store/useTheme";
import useWalletAccount from "./store/useWalletAccount";

/** Wizard steps (creator flow) */
export const WIZARD_STEP = Object.freeze({
  WELCOME: "welcome",
  CREATE_WALLET: "createWallet",
  GENERATE: "generate",
  FUND: "fund",
  GIFT_CARD: "giftCard",
});

export type WizardStep = (typeof WIZARD_STEP)[keyof typeof WIZARD_STEP];

export const INITIAL_WIZARD_STEP: WizardStep = WIZARD_STEP.WELCOME;

/** Creator wizard steps shown in UI (create → fund → gift card) */
export const WIZARD_STEP_COUNT = 3;

/** The Store's full data shape as seen by every page/component. */
export interface StoreContextValue {
  passphrase: string;
  pin: string;
  hash: string;
  legacy: boolean;
  reset: () => void;
  setup: (
    pw: string,
    pc: string,
    lgcy: boolean,
    hsh: string,
    nw?: string,
    cid?: number,
  ) => void;

  activeStep: WizardStep;
  setActiveStep: Dispatch<SetStateAction<WizardStep>>;

  network: string;
  chainId: number;
  account: EvmAccount | null;
  updateNetwork: (net: string, id: number) => void;

  giftingLink: string;

  theme: Theme;
  toggleTheme: () => void;
}

export const StoreContext = createContext<StoreContextValue>({
  passphrase: "",
  pin: "",
  hash: "",
  legacy: false,
  setup: () => {},
  reset: () => {},

  activeStep: INITIAL_WIZARD_STEP,
  setActiveStep: () => {},

  network: DEFAULT_NETWORK,
  chainId: DEFAULT_CHAIN_ID,
  account: null,
  updateNetwork: () => {},

  giftingLink: "",

  theme: "light",
  toggleTheme: () => {},
});

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const credentials = useCredentials();
  const theme = useTheme();
  const walletAccount = useWalletAccount(credentials.hash);
  const { giftingLink } = useGiftingLink(
    credentials.passphrase,
    credentials.pin,
    credentials.hash,
    walletAccount.chainId,
    credentials.legacy,
  );

  const [activeStep, setActiveStep] = useState<WizardStep>(INITIAL_WIZARD_STEP);

  const setup: StoreContextValue["setup"] = (pw, pc, lgcy, hsh, nw, cid) => {
    credentials.setup(pw, pc, lgcy, hsh);
    if (nw) {
      walletAccount.setNetwork(nw);
    }
    if (cid) {
      walletAccount.setChainId(cid);
    }
  };

  const reset = () => {
    credentials.reset();
    walletAccount.reset();
    setActiveStep(INITIAL_WIZARD_STEP);
  };

  const value: StoreContextValue = {
    passphrase: credentials.passphrase,
    pin: credentials.pin,
    hash: credentials.hash,
    legacy: credentials.legacy,
    reset,
    setup,

    activeStep,
    setActiveStep,

    network: walletAccount.network,
    chainId: walletAccount.chainId,
    account: walletAccount.account,
    updateNetwork: walletAccount.updateNetwork,

    giftingLink,

    theme: theme.theme,
    toggleTheme: theme.toggleTheme,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;
