import { useEffect, useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import { sanitizeObject } from "@/utils";
import { APIParams, APIResponse } from "@/services/api/types";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";
import useSWR from "swr";

interface ListData {
  data: any[];
  paging: APIResponse.Pagination;
}

interface Params {
  data: ListData[] | undefined;
  onNext: () => void;
  loading: boolean | undefined;
  page: number;
  offset?: number;
}

export const useFetchCollectionList = (filters: APIParams.FetchCollections) => {
  const api = useMarketplaceApi();

  return useSWRInfinite(
    (index) => ({
      ...filters,
      page: index + 1,
    }),
    (params) =>
      api.fetchCollections(
        sanitizeObject(params) as APIParams.FetchCollections,
      ),
  );
};

export const useFetchCollectionListByUser = (id: string) => {
  const api = useMarketplaceApi();

  return useSWRInfinite(
    (index) =>
      id
        ? {
            userId: id,
            hasBase: false,
            page: index + 1,
          }
        : null,
    (params) => api.fetchCollectionsByUser(params),
  );
};

export const useFetchNFTList = (filters: APIParams.FetchNFTs) => {
  const api = useMarketplaceApi();

  return useSWRInfinite(
    (index) => ({
      ...filters,
      page: index + 1,
    }),
    (params) => api.fetchNFTs(sanitizeObject(params) as APIParams.FetchNFTs),
  );
};

export const useFetchUserList = (filters: APIParams.FetchUsers) => {
  const api = useMarketplaceApi();

  return useSWRInfinite(
    (index) => ({
      ...filters,
      page: index + 1,
    }),
    (params) => api.fetchUsers(sanitizeObject(params) as APIParams.FetchUsers),
  );
};

export const useInfiniteScroll = ({
  data,
  loading,
  page,
  onNext,
  offset = 800,
}: Params) => {
  const list = useMemo(() => {
    let currentHasNext = false;
    let concatenatedData: any[] = [];

    if (data) {
      concatenatedData = data.reduce(
        (prevData: any[], currentPage: ListData) => [
          ...prevData,
          ...currentPage.data,
        ],
        [],
      );
      const hasNextArray = data.map(
        (currentPage: ListData) => currentPage.paging,
      );
      currentHasNext = hasNextArray[data.length - 1].hasNext;
    }

    return { concatenatedData, currentHasNext };
  }, [data]);

  const isLoadingMore =
    loading || (page > 0 && data && data[page - 1] === undefined);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop > scrollHeight - clientHeight - offset &&
        !isLoadingMore &&
        page &&
        list.currentHasNext
      ) {
        onNext();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoadingMore, page, list.currentHasNext]);

  return {
    list,
    isLoadingMore,
  };
};
