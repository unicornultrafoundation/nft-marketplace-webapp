import CollectionsList from "@/components/List/CollectionsList";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { MODE_COLLECTIONS } from "@/config/constants";
import { Address } from "wagmi";
import {
  useFetchCollectionListByUser,
  useInfiniteScroll,
} from "@/hooks/useInfiniteScroll";

export default function UserCollections({
  onUpdateAmount,
  userId,
  wallet,
}: {
  onUpdateAmount: React.Dispatch<React.SetStateAction<number>>;
  userId: string;
  wallet: Address;
}) {
  const { id } = useParams();
  const api = useMarketplaceApi();

  const { data, isLoading, setSize, size, error } =
    useFetchCollectionListByUser(String(id));
  const { isLoadingMore, list: collections } = useInfiniteScroll({
    data,
    loading: isLoading,
    page: size,
    onNext: () => setSize(size + 1),
  });

  const { data: totalCollections } = useSWR(
    [
      "total_collections-data",
      {
        owner: String(wallet) as `0x${string}`,
        mode: String(MODE_COLLECTIONS),
      },
    ],
    ([_, params]) =>
      api.getTotalCountById({
        ...params,
      }),
    { refreshInterval: 0 },
  );

  useEffect(() => {
    if (totalCollections) {
      onUpdateAmount(totalCollections);
    }
  }, [totalCollections, onUpdateAmount]);

  return (
    <div className="w-full py-7 overflow-x-auto">
      <CollectionsList
        error={error}
        isLoading={isLoading}
        isLoadMore={isLoadingMore}
        collections={collections.concatenatedData}
        currentHasNext={collections.currentHasNext}
        showCreateCollection={true}
        creator={userId}
      />
    </div>
  );
}
