import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";
import React, { useState } from "react";
import useSWR from "swr";
import Text from "@/components/Text";
import { NFT } from "@/types";
import NFTMarketEvent from "./MarketEvent";

export default function ActivitiesTab({ nft }: { nft: NFT }) {
  const api = useMarketplaceApi();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const { data, isLoading } = useSWR(
    {
      page,
      limit,
      tokenId: nft.u2uId ? nft.u2uId : nft.id,
      collectionAddress: nft.collection.address,
    },
    (params) => api.fetchNFTEvents(params),
    { refreshInterval: 10000 },
  );

  return (
    <div className="py-7 overflow-x-auto">
      {!!data?.length ? (
        <div className="p-3 tablet:p-7 flex flex-col gap-4 rounded-2xl border border-disabled border whitespace-normal h-auto max-h-[400px] overflow-auto  w-full tablet:w-full">
          {data.map((event) => (
            <NFTMarketEvent key={event.id} event={event} />
          ))}
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
