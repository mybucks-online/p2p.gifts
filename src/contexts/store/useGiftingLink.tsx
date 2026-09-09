import { useMemo } from "react";
import { generateToken } from "@mybucks.online/core";

import {
  findNetworkNameByChainId,
  GIFTING_LINK_ORIGIN,
  WALLET_URL_PARAM,
} from "@p2p-gifts/lib/conf";

const useGiftingLink = (
  passphrase: string,
  pin: string,
  hash: string,
  chainId: number,
  legacy: boolean,
) => {
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

  return { giftingLink };
};

export default useGiftingLink;
