import React, { useEffect } from "react";
import SliderIcon from "@/components/Icon/Sliders";
import Button from "@/components/Button";
import { classNames } from "@/utils/string";
import NFTsList from "@/components/List/NFTsList";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";
import useSWR from "swr";
import { Address } from "wagmi";
import { MODE_OWNED } from "@/config/constants";
import { useFetchNFTsByUser } from "@/hooks/useFetchNFTsByUser";

export default function OwnedNFTs({
  wallet,
  onUpdateAmount,
}: {
  wallet: Address;
  onUpdateAmount: React.Dispatch<React.SetStateAction<number>>;
}) {
  const api = useMarketplaceApi();
  const {
    isLoadingMore,
    isLoading,
    items,
    error,
    showFilters,
    filters,
    toggleFilter,
    resetFilters,
    updateFilters,
  } = useFetchNFTsByUser(wallet, "owned");

  const { data: totalOwned } = useSWR(
    [
      "total_owner-data",
      { owner: String(wallet) as `0x${string}`, mode: String(MODE_OWNED) },
    ],
    ([_, params]) =>
      api.getTotalCountById({
        ...params,
      }),
    { refreshInterval: 0 },
  );

  useEffect(() => {
    if (totalOwned) {
      onUpdateAmount(totalOwned);
    }
  }, [totalOwned, onUpdateAmount]);

  return (
    <div className="w-full py-7">
      <Button
        onClick={() => toggleFilter()}
        className={classNames(
          showFilters ? "bg-white shadow" : `bg-surface-soft`,
          "mb-7",
        )}
        scale="sm"
        variant="secondary"
      >
        Filters
        <span className="p-1 bg-surface-medium rounded-lg">
          <SliderIcon width={14} height={14} />
        </span>
      </Button>

      <NFTsList
        onClose={() => toggleFilter(false)}
        isLoadMore={isLoadingMore}
        isLoading={isLoading}
        activeFilters={filters}
        onApplyFilters={updateFilters}
        onResetFilters={resetFilters}
        showFilters={showFilters}
        items={items.concatenatedData}
        currentHasNext={items.currentHasNext}
        error={error}
      />
    </div>
  );
}
