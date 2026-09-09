import { useMemo, useState } from "react";

import EvmAccount from "@p2p-gifts/lib/account/evm";
import { DEFAULT_CHAIN_ID, DEFAULT_NETWORK } from "@p2p-gifts/lib/conf";

/** Wallet ready only after passphrase+PIN → Scrypt → hash → account. */
const useWalletAccount = (hash: string) => {
  const [network, setNetwork] = useState<string>(DEFAULT_NETWORK);
  const [chainId, setChainId] = useState(DEFAULT_CHAIN_ID);

  const account: EvmAccount | null = useMemo(
    () => (!hash ? null : new EvmAccount(hash, chainId)),
    [hash, chainId],
  );

  const updateNetwork = (net: string, id: number) => {
    setNetwork(net);
    setChainId(id);
  };

  const reset = () => {
    setNetwork(DEFAULT_NETWORK);
    setChainId(DEFAULT_CHAIN_ID);
  };

  return {
    network,
    chainId,
    account,
    setNetwork,
    setChainId,
    updateNetwork,
    reset,
  };
};

export default useWalletAccount;
