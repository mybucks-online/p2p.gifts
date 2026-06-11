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
    scanner: "https://etherscan.io",
  },
  {
    chainId: 137,
    name: "polygon",
    label: "Polygon",
    scanner: "https://polygonscan.com",
  },
  {
    chainId: 42161,
    name: "arbitrum",
    label: "Arbitrum",
    scanner: "https://arbiscan.io",
  },
  {
    chainId: 10,
    name: "optimism",
    label: "Optimism",
    scanner: "https://optimistic.etherscan.io",
  },
  {
    chainId: 56,
    name: "bsc",
    label: "BNB Chain",
    scanner: "https://bscscan.com",
  },
  {
    chainId: 43114,
    name: "avalanche",
    label: "Avalanche",
    scanner: "https://snowtrace.io",
  },
  {
    chainId: 8453,
    name: "base",
    label: "Base",
    scanner: "https://basescan.org",
  },
  {
    chainId: 143,
    name: "monad",
    label: "Monad",
    scanner: "https://monadscan.com",
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
