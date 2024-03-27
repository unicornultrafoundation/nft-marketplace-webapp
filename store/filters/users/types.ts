import { APIParams } from "@/services/api/types";

export interface UserFilterState {
  showFilters: boolean;
  filters: APIParams.FetchUsers;
}

export interface UserFilterActions {
  toggleFilter: (bool?: boolean) => void;
  setFilters: (filters: APIParams.FetchUsers) => void;
  updateFilters: (filters: Partial<APIParams.FetchUsers>) => void;
  resetFilters: () => void;
}
