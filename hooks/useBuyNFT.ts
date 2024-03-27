import { contracts } from "@/config/contracts";
import { readContract, waitForTransaction, writeContract } from "@wagmi/core";
import { NFT } from "@/types";
import { BigNumberish } from "ethers";
import { Address } from "wagmi";

export const useBuyURC721UsingNative = (nft: NFT) => {
  const onBuyURC721UsingNative = async (price: any) => {
    const [_, buyerFee] = await readContract({
      ...contracts.feeDistributorContract,
      functionName: "calculateFee",
      args: [
        price as bigint,
        nft.collection.address,
        (nft.u2uId || nft.id) as any,
      ],
    });
    const { hash } = await writeContract({
      abi: contracts.erc721Market.abi,
      address: contracts.erc721Market.address,
      functionName: "buyUsingEth",
      args: [nft.collection.address, (nft.u2uId || nft.id) as any],
      value: BigInt(price) + buyerFee,
    });
    return waitForTransaction({ hash });
  };
  return onBuyURC721UsingNative;
};

export const useBuyURC1155UsingNative = (nft: NFT) => {
  const onBuyURC1155UsingNative = async (
    operationId: string,
    price: any,
    quantity: number,
  ) => {
    const totalPrice = BigInt(price) * BigInt(quantity);
    const [_, buyerFee] = await readContract({
      ...contracts.feeDistributorContract,
      functionName: "calculateFee",
      args: [totalPrice, nft.collection.address, (nft.u2uId || nft.id) as any],
    });
    const { hash } = await writeContract({
      abi: contracts.erc1155Market.abi,
      address: contracts.erc1155Market.address,
      functionName: "buyUsingEth",
      args: [BigInt(operationId), BigInt(quantity)],
      value: totalPrice + buyerFee,
    });
    return waitForTransaction({ hash });
  };
  return onBuyURC1155UsingNative;
};

export const useBuyURC721UsingURC20 = (nft: NFT) => {
  const onBuyURC721UsingURC20 = async (quoteToken: Address, price: any) => {
    const { hash } = await writeContract({
      abi: contracts.erc721Market.abi,
      address: contracts.erc721Market.address,
      functionName: "buy",
      args: [
        nft.collection.address,
        BigInt(nft.u2uId ?? nft.id),
        quoteToken,
        BigInt(price),
      ],
    });
    return waitForTransaction({ hash });
  };
  return onBuyURC721UsingURC20;
};

export const useBuyURC1155UsingURC20 = () => {
  const onBuyURC1155UsingURC20 = async (
    operationId: string,
    quantity: number,
  ) => {
    const { hash } = await writeContract({
      abi: contracts.erc1155Market.abi,
      address: contracts.erc1155Market.address,
      functionName: "buy",
      args: [BigInt(operationId), BigInt(quantity)],
      value: BigInt(0) as any,
    });
    return waitForTransaction({ hash });
  };
  return onBuyURC1155UsingURC20;
};

export const useBuyNFT = (
  nft: NFT,
  price: BigNumberish,
  operationId: string,
  quantity: number,
  quoteToken: Address,
) => {
  const buyURC721UsingNative = useBuyURC721UsingNative(nft);
  const buyURC1155UsingNative = useBuyURC1155UsingNative(nft);
  const buyURC721UsingURC20 = useBuyURC721UsingURC20(nft);
  const buyURC1155UsingURC20 = useBuyURC1155UsingURC20();

  return {
    buyURC721UsingNative,
    buyURC1155UsingNative,
    buyURC721UsingURC20,
    buyURC1155UsingURC20,
  };
};
