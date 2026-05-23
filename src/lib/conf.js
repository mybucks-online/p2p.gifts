export const NETWORK = Object.freeze({
  EVM: "ethereum",
});

export const DEFAULT_NETWORK = NETWORK.EVM;
export const DEFAULT_CHAIN_ID = 137;

export const EVM_NETWORKS = [
  {
    chainId: 1,
    name: "ethereum",
    label: "Ethereum",
    provider:
      "https://mainnet.infura.io/v3/" + import.meta.env.VITE_INFURA_API_KEY,
    scanner: "https://etherscan.io",
  },
  {
    chainId: 137,
    name: "polygon",
    label: "Polygon",
    provider:
      "https://polygon-mainnet.infura.io/v3/" +
      import.meta.env.VITE_INFURA_API_KEY,
    scanner: "https://polygonscan.com",
  },
  {
    chainId: 42161,
    name: "arbitrum",
    label: "Arbitrum",
    provider:
      "https://arbitrum-mainnet.infura.io/v3/" +
      import.meta.env.VITE_INFURA_API_KEY,
    scanner: "https://arbiscan.io",
  },
  {
    chainId: 10,
    name: "optimism",
    label: "Optimism",
    provider:
      "https://optimism-mainnet.infura.io/v3/" +
      import.meta.env.VITE_INFURA_API_KEY,
    scanner: "https://optimistic.etherscan.io",
  },
  {
    chainId: 56,
    name: "bsc",
    label: "BNB Chain",
    provider: "https://bsc-dataseed.binance.org/",
    scanner: "https://bscscan.com",
  },
  {
    chainId: 43114,
    name: "avalanche",
    label: "Avalanche",
    provider:
      "https://avalanche-mainnet.infura.io/v3/" +
      import.meta.env.VITE_INFURA_API_KEY,
    scanner: "https://snowtrace.io",
  },
  {
    chainId: 8453,
    name: "base",
    label: "Base",
    provider:
      "https://base-mainnet.infura.io/v3/" +
      import.meta.env.VITE_INFURA_API_KEY,
    scanner: "https://basescan.org",
  },
];

export const findNetworkNameByChainId = (chainId) => {
  const found = EVM_NETWORKS.find((item) => item.chainId === chainId);
  return found?.name ?? EVM_NETWORKS[0].name;
};

export const WALLET_URL_PARAM = "wallet";

export { CLAIM_APP_ORIGIN as GIFTING_LINK_ORIGIN } from "@p2p-gifts/lib/site";

/** p2p.gifts PIN minimum (core default is 6; stricter for gifting) */
export const PIN_MIN_LENGTH = 7;
