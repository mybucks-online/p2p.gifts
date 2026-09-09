import type { ChangeEvent } from "react";

import Select from "@p2p-gifts/components/Select";
import { EVM_NETWORKS, NETWORK } from "@p2p-gifts/lib/conf";

type NetworkSelectorProps = {
  network: string;
  chainId: number;
  updateNetwork: (net: string, id: number) => void;
  id?: string;
};

const NetworkSelector = ({
  network,
  chainId,
  updateNetwork,
  id,
}: NetworkSelectorProps) => {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const [n, cid] = e.target.value.split(".");
    updateNetwork(n, parseInt(cid));
  };

  return (
    <Select id={id} onChange={onChange} value={network + "." + chainId}>
      {EVM_NETWORKS.map(({ chainId: cid, label }) => (
        <option key={cid} value={NETWORK.EVM + "." + cid}>
          {label}
        </option>
      ))}
    </Select>
  );
};

export default NetworkSelector;
