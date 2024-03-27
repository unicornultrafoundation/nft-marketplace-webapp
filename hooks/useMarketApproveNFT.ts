import { Address, useContractRead } from "wagmi";
import { contracts } from "@/config/contracts";
import useAuthStore from "@/store/auth/store";
import { NFT } from "@/types";
import { waitForTransaction, writeContract } from "@wagmi/core";
import { useMemo } from "react";
import { tokens } from "@/config/tokens";

export const useMarketApproveNFT = (nft: NFT) => {
  const type = nft.collection.type;
  const marketContract =
    type === "ERC721" ? contracts.erc721Market : contracts.erc1155Market;
  const wallet = useAuthStore((state) => state.profile?.publicKey);

  const { data: isMarketContractApprovedForAll } = useContractRead({
    address: nft.collection.address,
    abi: (type === "ERC721"
      ? contracts.erc721Base.abi
      : contracts.erc1155Base.abi) as any,
    functionName: "isApprovedForAll",
    args: [wallet as Address, marketContract.address],
    enabled: !!wallet,
    watch: true,
  });

  const { data: isMarketContractApprovedForSingle } = useContractRead({
    address: nft.collection.address,
    abi: contracts.erc721Base.abi,
    functionName: "getApproved",
    args: [(nft.u2uId || nft.id) as any],
    watch: true,
    enabled: type === "ERC721",
    select: (data) => {
      return data !== "0x0000000000000000000000000000000000000000";
    },
  });

  const isMarketContractApprovedToken = useMemo(() => {
    if (nft.collection.address === tokens.wu2u.address) return true;
    if (
      type === "ERC721" &&
      (isMarketContractApprovedForAll || isMarketContractApprovedForSingle)
    )
      return true;
    if (type !== "ERC721" && isMarketContractApprovedForAll) return true;
    return false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isMarketContractApprovedForAll,
    isMarketContractApprovedForSingle,
    nft.collection.address,
    tokens.wu2u.address,
  ]);

  const onApproveTokenForAll = async () => {
    const { hash } = await writeContract({
      address: nft.collection.address,
      abi: (type === "ERC721"
        ? contracts.erc721Base.abi
        : contracts.erc1155Base.abi) as any,
      functionName: "setApprovalForAll",
      args: [marketContract.address, true],
      value: BigInt(0) as any,
    });
    return waitForTransaction({ hash });
  };

  const onApprovalTokenForSingle = async () => {
    const { hash } = await writeContract({
      address: nft.collection.address,
      abi: contracts.erc721Base.abi,
      functionName: "approve",
      args: [contracts.erc721Market.address, BigInt(nft.u2uId)],
      value: BigInt(0) as any,
    });
    return waitForTransaction({ hash });
  };

  return {
    isMarketContractApprovedForAll,
    onApproveTokenForAll,
    onApprovalTokenForSingle,
    isMarketContractApprovedForSingle,
    isMarketContractApprovedToken,
  };
};
