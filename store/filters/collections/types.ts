import { APIParams } from "@/services/api/types";

export interface CollectionFilterState {
  showFilters: boolean;
  filters: APIParams.FetchCollections;
}

export interface CollectionFilterAction {
  toggleFilter: (bool?: boolean) => void;
  setFilters: (filters: APIParams.FetchCollections) => void;
  updateFilters: (filters: Partial<APIParams.FetchCollections>) => void;
  resetFilters: () => void;
}
