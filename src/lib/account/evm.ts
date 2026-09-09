import { getEvmPrivateKey } from "@mybucks.online/core";
import { ethers } from "ethers";

import { EVM_NETWORKS, NETWORK } from "@p2p-gifts/lib/conf";
import type { EvmNetworkConfig } from "@p2p-gifts/types/network";

class EvmAccount {
  network = NETWORK.EVM;
  chainId: number;
  networkInfo: EvmNetworkConfig | undefined;
  address: string;

  constructor(hashKey: string, chainId: number) {
    this.chainId = chainId;
    this.networkInfo = EVM_NETWORKS.find((n) => n.chainId === chainId);
    const signer = getEvmPrivateKey(hashKey);
    this.address = ethers.computeAddress(signer);
  }

  linkOfAddress(address: string): string {
    return this.networkInfo?.scanner + "/address/" + address;
  }
}

export default EvmAccount;
