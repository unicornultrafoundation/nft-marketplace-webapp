import { createPublicClient, http } from "viem";
import { u2uChain } from "@/config/wagmi";

const viemClient = createPublicClient({
  chain: u2uChain,
  transport: http(),
});

export default viemClient;
