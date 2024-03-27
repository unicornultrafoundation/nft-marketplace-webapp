import { AssetType, Collection, Round } from "@/types";
import { waitForTransaction, writeContract } from "@wagmi/core";
import { getRoundAbi } from "@/utils";
import { formatUnits } from "ethers";

type BuyFunctionName = `buy${AssetType}`;
type ClaimFunctionName = `claim${AssetType}`;

const getBuyFunctionName = (assetType: AssetType): BuyFunctionName => {
  return <"buyERC721" | "buyERC1155">`buy${assetType}`;
};

const getClaimFunctionName = (assetType: AssetType): ClaimFunctionName => {
  return <"claimERC721" | "claimERC1155">`claim${assetType}`;
};

export const useWriteRoundContract = (round: Round, collection: Collection) => {
  const roundAbi = getRoundAbi(round);

  const onBuyNFT = async (amount?: number) => {
    const functionName = getBuyFunctionName(collection.type);
    const args = functionName === "buyERC1155" ? [amount] : [];
    const price =
      functionName === "buyERC1155"
        ? BigInt(round.price) * BigInt(amount || 0)
        : BigInt(round.price);

    const tx = await writeContract({
      address: round.address,
      abi: roundAbi,
      functionName,
      args,
      value: price,
      // gasPrice: BigInt(3000000000),             // 3 Gwei
      gas: BigInt(500000),
      // maxFeePerGas: BigInt(3000000000),         // 3 Gwei
      // maxPriorityFeePerGas: BigInt(2000000000)  // 2 Gwei
    });

    return {
      hash: tx.hash,
      waitForTransaction: () => waitForTransaction({ hash: tx.hash }),
    };
  };

  const onBuyNFTCustomized = async () => {
    const functionName = getBuyFunctionName(collection.type);
    const args: any[] = [];
    const price = BigInt(round.price);

    const tx = await writeContract({
      address: round.address,
      abi: roundAbi,
      functionName,
      args,
      value: price,
      // gasPrice: BigInt(3000000000),             // 3 Gwei
      gas: BigInt(500000),
      // maxFeePerGas: BigInt(3000000000),         // 3 Gwei
      // maxPriorityFeePerGas: BigInt(2000000000)  // 2 Gwei
    });

    return {
      hash: tx.hash,
      waitForTransaction: () => waitForTransaction({ hash: tx.hash }),
    };
  };

  const onClaimNFT = async () => {
    const functionName = getClaimFunctionName(collection.type);
    const tx = await writeContract({
      address: round.address,
      abi: roundAbi,
      functionName,
      args: [],
      value: BigInt(0) as any,
    });

    return {
      hash: tx.hash,
      waitForTransaction: () => waitForTransaction({ hash: tx.hash }),
    };
  };

  return {
    onClaimNFT,
    onBuyNFT,
    onBuyNFTCustomized,
  };
};
