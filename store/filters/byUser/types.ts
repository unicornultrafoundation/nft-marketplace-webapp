import { APIParams } from "@/services/api/types";
import { Address } from "wagmi";

interface NFTFilter {
  showFilters: boolean;
  filters: APIParams.FetchNFTs;
}

interface UserFilters {
  owned: NFTFilter;
  created: NFTFilter;
  onSale: NFTFilter;
}

type Mode = keyof UserFilters;

export type NFTFilterByUserState = Record<Address, UserFilters>;

export interface NFTFilterByUserAction {
  createFiltersForUser: (address: Address) => void;
  toggleFilter: (mode: Mode, address: Address, bool?: boolean) => void;
  setFilters: (
    mode: Mode,
    address: Address,
    filters: APIParams.FetchNFTs,
  ) => void;
  updateFilters: (
    mode: Mode,
    address: Address,
    filters: Partial<APIParams.FetchNFTs>,
  ) => void;
  resetFilters: (mode: Mode, address: Address) => void;
}
