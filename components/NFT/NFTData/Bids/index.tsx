import React, { useMemo } from "react";
import Text from "@/components/Text";
import { NFT } from "@/types";
import { APIResponse } from "@/services/api/types";
import NFTBidEvent from "@/components/NFT/NFTData/Bids/BidEvent";
import { useNFTMarketStatus } from "@/hooks/useMarket";

export default function BidsTab({
  nft,
  marketData,
}: {
  nft: NFT;
  marketData?: APIResponse.NFTMarketData;
}) {
  const { isOwner } = useNFTMarketStatus(nft.collection.type, marketData);

  return (
    <div className="py-7 overflow-x-auto">
      {!!marketData?.bidInfo?.length ? (
        <div className="p-3 flex flex-col gap-4 rounded-2xl border border-disabled border-dashed whitespace-normal">
          {marketData?.bidInfo.map((event) => {
            return (
              <NFTBidEvent
                key={event.id}
                event={event}
                nft={nft}
                isOwner={isOwner}
              />
            );
          })}
        </div>
      ) : (
        <div className="p-7 rounded-2xl border border-disabled border-dashed">
          <Text className="text-secondary text-center text-bo">
            Nothing to show
          </Text>
        </div>
      )}
    </div>
  );
}
