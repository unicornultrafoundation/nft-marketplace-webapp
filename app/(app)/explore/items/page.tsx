"use client";

import NFTsList from "@/components/List/NFTsList";
import { useNFTFilterStore } from "@/store/filters/items/store";
import { useFetchNFTList, useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export default function ExploreNFTsPage() {
  const { showFilters, toggleFilter, filters, updateFilters, resetFilters } =
    useNFTFilterStore();

  const { error, isLoading, setSize, size, data } = useFetchNFTList(filters);

  const { isLoadingMore, list: items } = useInfiniteScroll({
    data,
    loading: isLoading,
    page: size,
    onNext: () => setSize(size + 1),
  });

  return (
    <NFTsList
      onClose={() => toggleFilter(false)}
      isLoading={isLoading}
      isLoadMore={isLoadingMore}
      activeFilters={filters}
      onApplyFilters={updateFilters}
      onResetFilters={resetFilters}
      showFilters={showFilters}
      items={items.concatenatedData}
      currentHasNext={items.currentHasNext}
      error={error}
    />
  );
}
