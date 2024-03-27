import { contracts } from "@/config/contracts";
import { Address, useContractRead } from "wagmi";
import { waitForTransaction, writeContract } from "@wagmi/core";
import { NFT, Royalties } from "@/types";
import { toast } from "react-toastify";

export const useReadCollectionRoyalties = (collectionAddress: Address) => {
  const royaltiesRegistryContract = contracts.royaltiesRegistry;

  return useContractRead({
    ...royaltiesRegistryContract,
    functionName: "getRoyaltiesByToken",
    args: [collectionAddress],
    enabled: !!collectionAddress,
    watch: true,
    select: ([_, royalties]) => royalties,
  });
};

export const useUpdateCollectionRoyalties = () => {
  const royaltiesRegistryContract = contracts.royaltiesRegistry;

  return async (collectionAddress: Address, royalties: Royalties) => {
    if (!royalties || !collectionAddress) {
      return toast.error("Collection not found", {
        autoClose: 1000,
        closeButton: true,
      });
    }

    const { hash } = await writeContract({
      ...royaltiesRegistryContract,
      functionName: "setRoyaltiesByToken",
      args: [collectionAddress, royalties],
      value: BigInt(0) as any,
    });

    return waitForTransaction({ hash });
  };
};

export const useReadNFTRoyalties = (nft: NFT) => {
  const royaltiesRegistryContract = contracts.royaltiesRegistry;

  return useContractRead({
    ...royaltiesRegistryContract,
    functionName: "getRoyalties",
    args: [nft.collection.address, (nft.u2uId || nft.id) as any],
    enabled: !!nft,
    watch: true,
  });
};
