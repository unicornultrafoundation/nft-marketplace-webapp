"use client";
import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";
import useSWR from "swr";
import { sanitizeObject } from "@/utils";
import { APIParams, APIResponse } from "@/services/api/types";
import NFTsList from "@/components/List/NFTsList";
import BannerSectionCollection from "@/components/Pages/MarketplaceNFT/CollectionDetails/BannerSection";
import InformationSectionCollection from "@/components/Pages/MarketplaceNFT/CollectionDetails/InformationSection";
import FiltersSectionCollection from "@/components/Pages/MarketplaceNFT/CollectionDetails/FiltersCollectionSection";
import { Spinner } from "flowbite-react";
import Text from "@/components/Text";
import {
  getCollectionAvatarImage,
  getCollectionBannerImage,
} from "@/utils/string";
import { useFilterByCollection } from "@/store/filters/byCollection/store";
import useSWRInfinite from "swr/infinite";
import { useFetchNFTList, useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Address } from "wagmi";

export default function CollectionPage() {
  const { id } = useParams();
  const api = useMarketplaceApi();
  const filterStore = useFilterByCollection((state) => state);

  const {
    data: collectionData,
    isLoading: isLoadingCollection,
    error: collectionError,
  } = useSWR(!!id ? id : null, (id: string) => api.fetchCollectionById(id), {
    refreshInterval: 30000,
    onSuccess: (data) => {
      const collectionAddress = data?.collection.address;
      filterStore.createFiltersForCollection(collectionAddress);
      filterStore.updateFilters(collectionAddress, { collectionAddress });
    },
  });

  const { showFilters, filters, toggleFilter, resetFilters, updateFilters } =
    useMemo(() => {
      const collectionAddress = collectionData?.collection.address;
      const hasCollectionFilters =
        !!collectionAddress && !!filterStore[collectionAddress];

      return {
        showFilters: hasCollectionFilters
          ? filterStore[collectionAddress].showFilters
          : false,
        filters: hasCollectionFilters
          ? filterStore[collectionAddress].filters
          : {},
        createFiltersForCollection: filterStore.createFiltersForCollection,
        toggleFilter: (bool?: boolean) =>
          filterStore.toggleFilter(collectionAddress as Address, bool),
        setFilters: (filters: APIParams.FetchNFTs) =>
          filterStore.setFilters(collectionAddress as Address, filters),
        updateFilters: (filters: Partial<APIParams.FetchNFTs>) =>
          filterStore.updateFilters(collectionAddress as Address, filters),
        resetFilters: () =>
          filterStore.resetFilters(collectionAddress as Address),
      };
    }, [filterStore, collectionData]);

  const {
    error: listError,
    isLoading,
    setSize,
    size,
    data,
  } = useFetchNFTList(filters);

  const { isLoadingMore, list: items } = useInfiniteScroll({
    data,
    loading: isLoading,
    page: size,
    onNext: () => setSize(size + 1),
  });

  if (collectionError) {
    return (
      <div className="w-full h-96 flex flex-col gap-4 justify-center items-center">
        <Text variant="heading-xs" className="text-center font-semibold">
          Service Error
        </Text>
        <Text variant="body-16" className="text-center font-medium">
          Please try again later!
        </Text>
      </div>
    );
  }

  if (isLoadingCollection) {
    return (
      <div className="w-full h-96 p-10 flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!collectionData?.collection) {
    return (
      <div className="w-full h-96 p-10 flex justify-center items-center">
        <Text className="font-semibold text-body-32">
          Collection does not exist!
        </Text>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <BannerSectionCollection
        collectionId={collectionData.collection.id}
        creators={collectionData.collection.creators}
        cover={getCollectionBannerImage(collectionData.collection)}
        avatar={getCollectionAvatarImage(collectionData.collection)}
      />

      <InformationSectionCollection data={collectionData} />

      <div className="mt-10 desktop:px-20 tablet:px-20 px-4">
        <FiltersSectionCollection
          showFilters={showFilters}
          toggleFilter={() => toggleFilter()}
          activeFilters={filters}
          onSearch={(name) => updateFilters({ name })}
        />
        <div className="flex gap-4 desktop:flex-row flex-col">
          <NFTsList
            isLoading={isLoading}
            isLoadMore={isLoadingMore}
            filters={["status", "price"]}
            activeFilters={filters}
            onResetFilters={resetFilters}
            onApplyFilters={updateFilters}
            showFilters={showFilters}
            items={items.concatenatedData}
            currentHasNext={items.currentHasNext}
            traitFilters={collectionData.traitAvailable}
            onClose={() => toggleFilter(false)}
            dataCollectionType={collectionData.collection.type}
            showCreateNFT
            userId={collectionData.collection?.creators[0].userId}
            error={listError}
          />
        </div>
      </div>
    </div>
  );
}
