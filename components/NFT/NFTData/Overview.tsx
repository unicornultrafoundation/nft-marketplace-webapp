import Text from "@/components/Text";
import React, { useEffect, useMemo } from "react";
import { NFT, NFTMetadata, Royalty } from "@/types";
import { useReadNFTRoyalties } from "@/hooks/useRoyalties";
import { classNames, shortenAddress } from "@/utils/string";
import Image from "next/image";

export default function OverviewTab({
  metaData,
  nft,
}: {
  metaData?: NFTMetadata;
  nft: NFT;
}) {
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
    <div className="py-7 flex flex-col gap-8">
      <div>
        <Text className="text-primary font-bold mb-4" variant="body-16">
          Description
        </Text>
        {!metaData?.description ? (
          <div className="p-7 rounded-2xl border border-disabled border-dashed">
            <Text className="text-secondary text-center text-sm">
              Nothing to show
            </Text>
          </div>
        ) : (
          <Text className="text-secondary text-sm w-full break-words">
            {metaData?.description}
          </Text>
        )}
      </div>

      <div>
        <div className="flex items-center gap-1 mb-4">
          <Text className="text-primary font-semibold" variant="body-16">
            Royalties:
          </Text>
          <div className="rounded-lg px-3 bg-warning text-white text-body-12 font-medium">
            {totalRoyalties}%
          </div>
        </div>

        {royalties && royalties.length > 0 && (
          <div className="p-3 tablet:p-7 flex flex-col gap-4 rounded-2xl border whitespace-normal h-auto max-h-[400px] overflow-auto">
            {royalties.map((royalty, index) => {
              const royaltyValue = Number(royalty.value) / 100;
              const royaltyPercent = (royaltyValue / totalRoyalties) * 100;
              return (
                <div key={index} className="flex items-center gap-3">
                  <Image
                    className="w-10 h-10 rounded-full"
                    width={40}
                    height={40}
                    src={`https://avatar.vercel.sh/${royalty.account}`}
                    alt=""
                  />
                  <div className="flex-1 gap-4">
                    <div className="flex items-center gap-3 justify-between">
                      <Text className="font-semibold">
                        {shortenAddress(royalty.account)}
                      </Text>
                      <Text className="text-tertiary font-normal">
                        {royaltyPercent.toFixed(2)}%
                      </Text>
                    </div>
                    <div className="h-2 p-0.5 w-full bg-surface-medium shadow-sm rounded">
                      <div
                        className={`h-full bg-white shadow-sm rounded`}
                        style={{ width: `${royaltyPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
