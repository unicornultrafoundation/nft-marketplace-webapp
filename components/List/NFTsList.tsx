import { APIParams, APIResponse } from "@/services/api/types";
import NFTFilters, { FilterType } from "@/components/Filters/NFTFilters";
import { classNames } from "@/utils/string";
import NFTCard from "@/components/NFT/NFTCard";
import { Spinner } from "flowbite-react";
import React from "react";
import Text from "@/components/Text";
import MobileNFTFiltersModal from "@/components/Filters/MobileNFTFiltersModal";
import { isMobile } from "react-device-detect";
import { AssetType, NFT } from "@/types";
import Link from "next/link";
import Button from "../Button";
import useAuthStore from "@/store/auth/store";

interface Props {
  items?: NFT[];
  showFilters: boolean;
  filters?: FilterType[];
  activeFilters: APIParams.FetchNFTs;
  onApplyFilters: (filtersParams: APIParams.FetchNFTs) => void;
  onResetFilters: () => void;
  traitFilters?: APIResponse.CollectionDetails["traitAvailable"];
  onClose?: () => void; // For mobile only: Close modal filters
  isLoading?: boolean;
  isLoadMore?: boolean | undefined;
  error?: boolean;
  dataCollectionType?: AssetType;
  userId?: string;
  showCreateNFT?: boolean;
  currentHasNext: boolean;
}

export default function NFTsList({
  items,
  showFilters,
  filters,
  activeFilters,
  onApplyFilters,
  onResetFilters,
  traitFilters,
  onClose,
  isLoading,
  isLoadMore,
  error,
  dataCollectionType,
  userId,
  showCreateNFT,
  currentHasNext,
}: Props) {
  const myId = useAuthStore((state) => state.profile?.id);

  const renderList = () => {
    if (error && !items) {
      return (
        <div className="w-full h-56 flex justify-center items-center p-7 rounded-2xl border border-disabled border-dashed">
          <Text variant="heading-xs" className="text-center">
            Network Error!
            <br />
            Please try again later
          </Text>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="w-full h-56 flex justify-center items-center">
          <Spinner size="xl" />
        </div>
      );
    }
    if (!items?.length) {
      return (
        <>
          {showCreateNFT
            ? myId === userId && (
                <Link href={`/create/nft/${dataCollectionType}`}>
                  <div className="flex items-center justify-center rounded-xl border border-1 hover:shadow-md border-soft transition-all h-[295px] desktop:w-[250px] w-full ">
                    <Button variant="primary">Create an NFT</Button>
                  </div>
                </Link>
              )
            : ""}
          <div className="w-full h-[295px] flex justify-center items-center p-7 rounded-2xl border border-disabled border-dashed">
            <Text className="text-secondary font-semibold text-body-18">
              Nothing to show
            </Text>
          </div>
        </>
      );
    }
    return (
      <div className="w-full">
        <div
          className={classNames(
            "grid mt-4 mb-6 desktop:mt-0 desktop:mb-20 tablet:mt-0 tablet:mb-10 desktop:gap-3 tablet:gap-4 gap-3",
            isMobile
              ? "desktop:grid-cols-6 tablet:grid-cols-3 grid-cols-2"
              : showFilters
                ? "desktop:grid-cols-4 tablet:grid-cols-2 grid-cols-1"
                : "desktop:grid-cols-6 tablet:grid-cols-3 grid-cols-2",
          )}
        >
          {showCreateNFT && myId === userId && (
            <Link href={`/create/nft/${dataCollectionType}`}>
              <div className="flex items-center justify-center rounded-xl hover:shadow-md transition-all h-[295px] desktop:w-auto w-full border">
                <Button variant="primary">Create an NFT</Button>
              </div>
            </Link>
          )}

          {items.map((item) => (
            <div
              className="h-full"
              key={item.collection.address + "-" + item.u2uId}
            >
              <NFTCard {...item} />
            </div>
          ))}
        </div>

        {!!items?.length && (
          <div className="flex justify-center items-center">
            {isLoadMore && (
              <div className="w-full h-56 flex justify-center items-center">
                <Spinner size="xl" />
              </div>
            )}
            {!currentHasNext && (
              <div className="w-full h-36 flex justify-center items-center">
                No more data
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div
        className={classNames(
          "w-full flex gap:4 tablet:gap-7 laptop:gap-10 desktop:gap-12 mb-7",
          showFilters
            ? "flex-col tablet:flex-row desktop:flex-row tablet:items-start"
            : "tablet:flex-row",
        )}
      >
        {isMobile ? (
          <MobileNFTFiltersModal
            show={showFilters}
            activeFilters={activeFilters}
            onClose={onClose}
            onResetFilters={onResetFilters}
            baseFilters={filters}
            onApplyFilters={onApplyFilters}
            traitsFilter={traitFilters}
          />
        ) : (
          <NFTFilters
            showFilters={showFilters}
            activeFilters={activeFilters}
            onResetFilters={onResetFilters}
            baseFilters={filters}
            onApplyFilters={onApplyFilters}
            traitsFilter={traitFilters}
          />
        )}
        <div className="flex-1">{renderList()}</div>
      </div>
    </div>
  );
}
