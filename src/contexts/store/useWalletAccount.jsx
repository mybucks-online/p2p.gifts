import { useMemo, useState } from "react";

import EvmAccount from "@p2p-gifts/lib/account/evm";
import { DEFAULT_CHAIN_ID, DEFAULT_NETWORK } from "@p2p-gifts/lib/conf";

/** Wallet ready only after passphrase+PIN → Scrypt → hash → account. */
const useWalletAccount = (hash) => {
  const [network, setNetwork] = useState(DEFAULT_NETWORK);
  const [chainId, setChainId] = useState(DEFAULT_CHAIN_ID);

  const account = useMemo(
    () => (!hash ? null : new EvmAccount(hash, chainId)),
    [hash, chainId],
  );

  const updateNetwork = (net, id) => {
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
