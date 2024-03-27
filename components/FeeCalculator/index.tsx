import { NFT, Royalty } from "@/types";
import { useMemo } from "react";
import { formatUnits } from "ethers";
import { useReadNFTRoyalties } from "@/hooks/useRoyalties";
import { Address } from "wagmi";
import { findTokenByAddress } from "@/utils/token";
import Image from "next/image";
import Text from "../Text";

interface Props {
  mode: "buyer" | "seller";
  price?: bigint;
  nft: NFT;
  quoteToken?: Address;
  buyerFeeRatio: number;
  sellerFeeRatio: number;
  buyerFee: bigint;
  sellerFee: bigint;
  royaltiesFee: bigint;
  netReceived: bigint;
}

export default function FeeCalculator({
  price = BigInt(0),
  nft,
  mode,
  quoteToken,
  buyerFeeRatio,
  sellerFeeRatio,
  buyerFee,
  sellerFee,
  royaltiesFee,
  netReceived,
}: Props) {
  const token = useMemo(() => findTokenByAddress(quoteToken), [quoteToken]);

  const { data: royalties } = useReadNFTRoyalties(nft);

  const totalRoyalties = useMemo(() => {
    if (!royalties?.length) return 0;

    const totalRoyaltiesValue = royalties.reduce(
      (accumulator: bigint, current: Royalty) =>
        BigInt(current.value) + BigInt(accumulator),
      BigInt(0),
    );
    return Number(totalRoyaltiesValue) / 100;
  }, [royalties]);

  return (
    <div className="w-full p-4 border border-disabled rounded-2xl flex flex-col gap-3">
      {mode === "seller" ? (
        <>
          <div className="w-full flex items-center justify-between">
            <p className="text-secondary">
              Origin fee (Seller): {sellerFeeRatio}%
            </p>
            <div className="flex items-center font-bold gap-1">
              <Text
                showTooltip
                labelTooltip={formatUnits(sellerFee, token?.decimal)}
                className="w-auto max-w-[80px]"
              >
                {formatUnits(sellerFee, token?.decimal)}
              </Text>
              <p className="text-secondary">{token?.symbol}</p>
              {!!token?.logo && (
                <Image
                  className="w-5 h-5 rounded-full"
                  src={token?.logo || ""}
                  alt=""
                  width={40}
                  height={40}
                />
              )}
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <p className="text-secondary">Royalties fee ({totalRoyalties}%):</p>
            <div className="flex items-center font-bold gap-1">
              <Text
                showTooltip
                labelTooltip={formatUnits(sellerFee, token?.decimal)}
                className="w-auto max-w-[80px]"
              >
                {formatUnits(royaltiesFee, token?.decimal)}
              </Text>
              <p className="text-secondary">{token?.symbol}</p>
              {!!token?.logo && (
                <Image
                  className="w-5 h-5 rounded-full"
                  src={token?.logo || ""}
                  alt=""
                  width={40}
                  height={40}
                />
              )}
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <p className="text-secondary font-bold">You will get:</p>
            <div className="flex items-center font-bold gap-1">
              <Text
                showTooltip
                labelTooltip={formatUnits(sellerFee, token?.decimal)}
                className="w-auto max-w-[80px]"
              >
                {formatUnits(netReceived, token?.decimal)}
              </Text>
              <p className="text-secondary">{token?.symbol}</p>
              {!!token?.logo && (
                <Image
                  className="w-5 h-5 rounded-full"
                  src={token?.logo || ""}
                  alt=""
                  width={40}
                  height={40}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex items-center justify-between">
            <p className="text-secondary">
              Origin fee (Buyer): {buyerFeeRatio}%
            </p>
            <div className="flex items-center font-bold gap-1">
              <Text
                showTooltip
                labelTooltip={formatUnits(buyerFee, token?.decimal)}
                className="w-auto max-w-[80px]"
              >
                {formatUnits(buyerFee, token?.decimal)}
              </Text>
              <p className="text-secondary">{token?.symbol}</p>
              {!!token?.logo && (
                <Image
                  className="w-5 h-5 rounded-full"
                  src={token?.logo || ""}
                  alt=""
                  width={40}
                  height={40}
                />
              )}
            </div>
          </div>

          <div className="w-full flex items-center justify-between">
            <p className="text-secondary font-bold">You will pay:</p>
            <div className="flex items-center font-bold gap-1">
              <Text
                showTooltip
                labelTooltip={formatUnits(price + buyerFee, token?.decimal)}
                className="w-auto max-w-[80px]"
              >
                {formatUnits(price + buyerFee, token?.decimal)}
              </Text>
              <p className="text-secondary">{token?.symbol}</p>
              {!!token?.logo && (
                <Image
                  className="w-5 h-5 rounded-full"
                  src={token?.logo || ""}
                  alt=""
                  width={40}
                  height={40}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
