import {
  Address,
  erc20ABI,
  useContractRead,
  useContractReads,
  useContractWrite,
} from "wagmi";
import { useMemo } from "react";
import { contracts } from "@/config/contracts";
import useAuthStore from "@/store/auth/store";
import { AssetType } from "@/types";
import { waitForTransaction, writeContract } from "@wagmi/core";
import { tokens } from "@/config/tokens";
import { isAddress } from "ethers";

export const useMarketApproveERC20 = (
  token: Address,
  type: AssetType,
  totalCost: bigint,
) => {
  const wallet = useAuthStore((state) => state.profile?.publicKey);
  const marketContract =
    type === "ERC721" ? contracts.erc721Market : contracts.erc1155Market;

  const { data: allowance, isLoading: isFetchingApproval } = useContractRead({
    address: token,
    abi: erc20ABI,
    functionName: "allowance",
    args: [wallet as Address, marketContract.address],
    enabled: !!isAddress,
    watch: true,
  });

  const isTokenApproved = useMemo(() => {
    if (token === tokens.wu2u.address) return true;
    if (!allowance) return false;
    return allowance >= totalCost;
  }, [allowance, token, totalCost]);

  const onApproveToken = async (allowance: bigint) => {
    const { hash } = await writeContract({
      abi: erc20ABI,
      address: token,
      functionName: "approve",
      args: [marketContract.address, allowance],
    });
    return waitForTransaction({ hash });
  };
  return {
    isTokenApproved,
    onApproveToken,
    isFetchingApproval,
    allowance,
  };
};
