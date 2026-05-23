import { getEvmPrivateKey } from "@mybucks.online/core";
import { ethers } from "ethers";

import { EVM_NETWORKS, NETWORK } from "@p2p-gifts/lib/conf";

class EvmAccount {
  network = NETWORK.EVM;
  chainId = null;
  networkInfo = null;
  signer = null;
  account = null;
  provider = null;
  address = null;
  activated = true;

  constructor(hashKey, chainId) {
    this.chainId = chainId;
    this.networkInfo = EVM_NETWORKS.find((n) => n.chainId === chainId);
    this.provider = new ethers.JsonRpcProvider(this.networkInfo.provider);
    this.signer = getEvmPrivateKey(hashKey);
    this.account = new ethers.Wallet(this.signer, this.provider);
    this.address = this.account.address;
  }

  linkOfAddress(address) {
    return this.networkInfo.scanner + "/address/" + address;
  }
}

export default EvmAccount;
