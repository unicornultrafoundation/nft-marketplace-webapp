"use client";

import { useParams, useRouter } from "next/navigation";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";
import useSWR from "swr";
import Text from "@/components/Text";
import NFTData from "@/components/NFT/NFTData";
import NFTMarketData from "@/components/Pages/MarketplaceNFT/NFTDetails/MarketData";
import NFTImage from "@/components/Pages/MarketplaceNFT/NFTDetails/NFTImage";
import Icon from "@/components/Icon";
import { Spinner } from "flowbite-react";
import React from "react";
import useSWRImmutable from "swr/immutable";

export default function NFTPage() {
  const router = useRouter();
  const { id, collectionAddress } = useParams();
  const api = useMarketplaceApi();

  const {
    data: item,
    isLoading,
    error,
  } = useSWRImmutable(
    [
      "nft-details",
      { collectionAddress: String(collectionAddress), id: String(id) },
    ],
    ([_, params]) => api.fetchNFTById(params),
  );

  const { data: marketData } = useSWR(
    [
      "nft-market-data",
      { collectionAddress: String(collectionAddress), id: String(id) },
    ],
    ([_, params]) =>
      api.fetchMarketDataByNFT({
        ...params,
        bidListPage: 1,
        bidListLimit: 100,
      }),
    { refreshInterval: 10000 },
  );

  const { data: metaData } = useSWRImmutable(
    !!item?.tokenUri ? item.tokenUri : null,
    (uri) => api.getNFTMetaData(uri),
    { refreshInterval: 600000 },
  );

  if (isLoading) {
    return (
      <div className="w-full h-96 p-10 flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error && !item) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <Text variant="heading-xs" className="text-center">
          Network Error!
          <br />
          Please try again later
        </Text>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <Text variant="heading-xs">Item not found!</Text>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="desktop:px-[100px] px-4 tablet:py-[60px] py-6 flex flex-col desktop:w-auto tablet:w-[646px] w-full justify-center">
        <div className="flex desktop:gap-16 tablet:gap-8 gap-8 desktop:flex-row flex-col items-center w-full tablet:items-start">
          <div className="flex gap-4 justify-center flex-col tablet:flex-row">
            <div
              className="w-10 h-10 flex justify-center items-center rounded-[42px] bg-surface-soft shadow hover:shadow-md"
              onClick={router.back}
            >
              <Icon
                className="cursor-pointer"
                name="arrowLeft"
                width={20}
                height={20}
              />
            </div>
            <NFTImage item={item} />
          </div>
          <NFTMarketData nft={item} marketData={marketData} />
        </div>
        <div className="flex mt-[34px] desktop:w-[700px] tablet:w-full desktop:pl-14">
          <NFTData marketData={marketData} nft={item} metaData={metaData} />
        </div>
      </div>
    </div>
  );
}
