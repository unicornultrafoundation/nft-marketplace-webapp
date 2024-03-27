import { APIParams } from "@/services/api/types";

export interface NFTFilterState {
  showFilters: boolean;
  filters: APIParams.FetchNFTs;
}

export interface NFTFilterAction {
  toggleFilter: (bool?: boolean) => void;
  setFilters: (filters: APIParams.FetchNFTs) => void;
  updateFilters: (filters: Partial<APIParams.FetchNFTs>) => void;
  resetFilters: () => void;
}
