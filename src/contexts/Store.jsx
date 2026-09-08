import { createContext, useState } from "react";

import { DEFAULT_CHAIN_ID, DEFAULT_NETWORK } from "@p2p-gifts/lib/conf";

import useCredentials from "./store/useCredentials";
import useGiftingLink from "./store/useGiftingLink";
import useTheme from "./store/useTheme";
import useWalletAccount from "./store/useWalletAccount";

/** Wizard steps (creator flow) */
export const WIZARD_STEP = Object.freeze({
  WELCOME: "welcome",
  CREATE_WALLET: "createWallet",
  GENERATE: "generate",
  FUND: "fund",
  GIFT_CARD: "giftCard",
});

export const INITIAL_WIZARD_STEP = WIZARD_STEP.WELCOME;

/** Creator wizard steps shown in UI (create → fund → gift card) */
export const WIZARD_STEP_COUNT = 3;

export const StoreContext = createContext({
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

const StoreProvider = ({ children }) => {
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

  const [activeStep, setActiveStep] = useState(INITIAL_WIZARD_STEP);

  const setup = (pw, pc, lgcy, hsh, nw, cid) => {
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

  const value = {
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
