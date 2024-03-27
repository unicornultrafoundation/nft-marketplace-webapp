"use client";

import CollectionFilters from "@/components/Filters/CollectionFilters";
import CollectionsList from "@/components/List/CollectionsList";
import React from "react";
import { isMobile } from "react-device-detect";
import MobileCollectionFiltersModal from "@/components/Filters/MobileCollectionFiltersModal";
import { useCollectionFilterStore } from "@/store/filters/collections/store";
import {
  useFetchCollectionList,
  useInfiniteScroll,
} from "@/hooks/useInfiniteScroll";

export default function ExploreCollectionsPage() {
  const { showFilters, toggleFilter, filters, updateFilters, resetFilters } =
    useCollectionFilterStore((state) => state);
  const { data, size, setSize, isLoading, error } =
    useFetchCollectionList(filters);

  const { isLoadingMore, list: collections } = useInfiniteScroll({
    data,
    loading: isLoading,
    page: size,
    onNext: () => setSize(size + 1),
  });

  return (
    <div className="flex gap-6 flex-col desktop:flex-row">
      {isMobile ? (
        <MobileCollectionFiltersModal
          onApplyFilters={updateFilters}
          show={showFilters}
          activeFilters={filters}
          onResetFilters={resetFilters}
          onClose={() => toggleFilter(false)}
        />
      ) : (
        <CollectionFilters
          activeFilters={filters}
          onApplyFilters={updateFilters}
          showFilters={showFilters}
          onResetFilters={resetFilters}
        />
      )}

      <div className="flex-1">
        <CollectionsList
          error={error}
          isLoading={isLoading}
          isLoadMore={isLoadingMore}
          collections={collections.concatenatedData}
          showFilter={showFilters}
          currentHasNext={collections.currentHasNext}
        />
      </div>
    </div>
  );
}
