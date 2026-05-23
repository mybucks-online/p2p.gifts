import { createContext, useMemo, useState } from "react";
import { generateToken } from "@mybucks.online/core";

import EvmAccount from "@p2p-gifts/lib/account/evm";
import {
  DEFAULT_CHAIN_ID,
  DEFAULT_NETWORK,
  findNetworkNameByChainId,
  GIFTING_LINK_ORIGIN,
  WALLET_URL_PARAM,
} from "@p2p-gifts/lib/conf";

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
  const [passphrase, setPassphrase] = useState("");
  const [pin, setPin] = useState("");
  const [hash, setHash] = useState("");
  const [legacy, setLegacy] = useState(false);

  const [activeStep, setActiveStep] = useState(INITIAL_WIZARD_STEP);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark";
  });

  const [network, setNetwork] = useState(DEFAULT_NETWORK);
  const [chainId, setChainId] = useState(DEFAULT_CHAIN_ID);
  const account = useMemo(
    () => (!hash ? null : new EvmAccount(hash, chainId)),
    [hash, chainId],
  );

  const giftingLink = useMemo(() => {
    if (!passphrase || !pin || !hash) {
      return "";
    }
    const networkName = findNetworkNameByChainId(chainId);
    const token = generateToken(passphrase, pin, networkName, legacy);
    if (!token) {
      return "";
    }
    return `${GIFTING_LINK_ORIGIN}#${WALLET_URL_PARAM}=${token}`;
  }, [passphrase, pin, hash, chainId, legacy]);

  const reset = () => {
    setPassphrase("");
    setPin("");
    setHash("");
    setLegacy(false);
    setActiveStep(INITIAL_WIZARD_STEP);
    setNetwork(DEFAULT_NETWORK);
    setChainId(DEFAULT_CHAIN_ID);
  };

  const setup = (pw, pc, lgcy, hsh, nw, cid) => {
    setPassphrase(pw);
    setPin(pc);
    setLegacy(lgcy);
    setHash(hsh);

    if (nw) {
      setNetwork(nw);
    }
    if (cid) {
      setChainId(cid);
    }
  };

  const updateNetwork = (net, id) => {
    setNetwork(net);
    setChainId(id);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <StoreContext.Provider
      value={{
        passphrase,
        pin,
        hash,
        legacy,
        reset,
        setup,
        activeStep,
        setActiveStep,
        network,
        chainId,
        account,
        updateNetwork,
        giftingLink,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
