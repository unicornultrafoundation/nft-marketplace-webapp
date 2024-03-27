import { configureChains, createConfig } from "wagmi";
import {
  BLOCK_EXPLORER_URL,
  CHAIN_ID,
  NETWORK_NAME,
  RPC_URL,
} from "@/config/constants";
import { InjectedConnector } from "@wagmi/connectors/injected";
import { MetaMaskConnector } from "@wagmi/connectors/metaMask";
import { defineChain } from "viem";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

export const u2uChain = defineChain({
  id: Number(CHAIN_ID),
  name: NETWORK_NAME,
  network: NETWORK_NAME,
  nativeCurrency: {
    decimals: 18,
    name: "Unicorn Ultra Token",
    symbol: "U2U",
  },
  rpcUrls: {
    public: { http: [RPC_URL] },
    default: { http: [RPC_URL] },
  },
  blockExplorers: {
    etherscan: { name: "u2uScan", url: BLOCK_EXPLORER_URL },
    default: { name: "u2uScan", url: BLOCK_EXPLORER_URL },
  },
  // contracts: {
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 11_907_934,
  //   },
  // }
});

const { publicClient } = configureChains(
  [u2uChain],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: RPC_URL,
      }),
    }),
  ],
  {
    pollingInterval: 12000,
    rank: true,
    retryCount: 5,
    retryDelay: 1000,
    stallTimeout: 5000,
  },
);

const injectedConnector = new InjectedConnector({
  chains: [u2uChain],
  options: {
    name: (detectedName) =>
      `Injected (${
        typeof detectedName === "string"
          ? detectedName
          : detectedName.join(", ")
      })`,
    shimDisconnect: true,
  },
});

const metaMaskConnector = new MetaMaskConnector({
  chains: [u2uChain],
  options: {
    shimDisconnect: true,
  },
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [injectedConnector, metaMaskConnector],
});
