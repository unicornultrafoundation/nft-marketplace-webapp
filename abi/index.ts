import U2UMintRoundZeroABI from "@/abi/U2UMintRoundZero.json";
import U2UMintRoundWhitelistABI from "@/abi/U2UMintRoundWhitelist.json";
import U2UMintRoundFCFSABI from "@/abi/U2UMintRoundFCFS.json";
import U2UPremintRoundZeroABI from "@/abi/U2UPremintRoundZero.json";
import U2UPremintRoundWhitelistABI from "@/abi/U2UPremintRoundWhitelist.json";
import U2UPremintRoundFCFSABI from "@/abi/U2UPremintRoundFCFS.json";
import U2UMintRoundWhitelistCustomizedABI from "@/abi/U2UMintRoundWhitelistCustomized.json";
import { RoundType } from "@/types";

export const abis: Record<RoundType, any> = {
  U2UMintRoundFCFS: U2UMintRoundFCFSABI,
  U2UMintRoundWhitelist: U2UMintRoundWhitelistABI,
  U2UMintRoundZero: U2UMintRoundZeroABI,
  U2UPremintRoundFCFS: U2UPremintRoundFCFSABI,
  U2UPremintRoundWhitelist: U2UPremintRoundWhitelistABI,
  U2UPremintRoundZero: U2UPremintRoundZeroABI,
  U2UMintRoundWhitelistCustomized: U2UMintRoundWhitelistCustomizedABI,
};
