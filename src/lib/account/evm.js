import { getEvmPrivateKey } from "@mybucks.online/core";
import { ethers } from "ethers";

import { EVM_NETWORKS, NETWORK } from "@p2p-gifts/lib/conf";

class EvmAccount {
  network = NETWORK.EVM;
  chainId = null;
  networkInfo = null;
  address = null;

  constructor(hashKey, chainId) {
    this.chainId = chainId;
    this.networkInfo = EVM_NETWORKS.find((n) => n.chainId === chainId);
    const signer = getEvmPrivateKey(hashKey);
    this.address = ethers.computeAddress(signer);
  }

  linkOfAddress(address) {
    return this.networkInfo.scanner + "/address/" + address;
  }
}

export default EvmAccount;
