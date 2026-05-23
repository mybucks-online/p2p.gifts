import Select from "@p2p-gifts/components/Select";
import { EVM_NETWORKS, NETWORK } from "@p2p-gifts/lib/conf";

const NetworkSelector = ({ network, chainId, updateNetwork, id }) => {
  const onChange = (e) => {
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
