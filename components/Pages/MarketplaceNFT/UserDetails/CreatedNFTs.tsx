import { useEffect } from "react";
import SliderIcon from "@/components/Icon/Sliders";
import Button from "@/components/Button";
import { classNames } from "@/utils/string";
import NFTsList from "@/components/List/NFTsList";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";
import useSWR from "swr";
import { Address } from "wagmi";
import { MODE_CREATED } from "@/config/constants";
import { useFetchNFTsByUser } from "@/hooks/useFetchNFTsByUser";

export default function CreatedNFTs({
  wallet,
  onUpdateAmount,
  userId,
}: {
  wallet: Address;
  onUpdateAmount: React.Dispatch<React.SetStateAction<number>>;
  userId: string;
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
  } = useFetchNFTsByUser(wallet, "created");

  const { data: totalCreated } = useSWR(
    [
      "total_creator-data",
      {
        creatorAddress: String(wallet) as `0x${string}`,
        mode: String(MODE_CREATED),
      },
    ],
    ([_, params]) =>
      api.getTotalCountById({
        ...params,
      }),
    { refreshInterval: 0 },
  );

  useEffect(() => {
    if (totalCreated) {
      onUpdateAmount(totalCreated);
    }
  }, [totalCreated, onUpdateAmount]);

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
        isLoadMore={isLoadingMore}
        isLoading={isLoading}
        onApplyFilters={updateFilters}
        activeFilters={filters}
        onResetFilters={resetFilters}
        showFilters={showFilters}
        items={items.concatenatedData}
        currentHasNext={items.currentHasNext}
        userId={userId}
        showCreateNFT={true}
        error={error}
      />
    </div>
  );
}
