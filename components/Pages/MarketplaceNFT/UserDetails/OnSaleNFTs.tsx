import React, { useEffect } from "react";
import SliderIcon from "@/components/Icon/Sliders";
import Button from "@/components/Button";
import { classNames } from "@/utils/string";
import NFTsList from "@/components/List/NFTsList";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";
import useSWR from "swr";
import { Address } from "wagmi";
import { MODE_ON_SALES } from "@/config/constants";
import { useFetchNFTsByUser } from "@/hooks/useFetchNFTsByUser";

export default function OnSaleNFTs({
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
  } = useFetchNFTsByUser(wallet, "onSale");

  const { data: totalOnSales } = useSWR(
    [
      "total_on_sales-data",
      { owner: String(wallet) as `0x${string}`, mode: String(MODE_ON_SALES) },
    ],
    ([_, params]) =>
      api.getTotalCountById({
        ...params,
      }),
    { refreshInterval: 0 },
  );

  useEffect(() => {
    if (totalOnSales) {
      onUpdateAmount(totalOnSales);
    }
  }, [totalOnSales, onUpdateAmount]);

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
        filters={["type", "price"]}
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
    </div>
  );
}
