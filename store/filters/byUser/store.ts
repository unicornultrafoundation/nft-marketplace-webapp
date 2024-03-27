import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NFTFilterByUserState, NFTFilterByUserAction } from "./types";

const BASE_FILTERS = {
  traits: [],
  name: "",
  type: undefined,
  userAddress: undefined,
  creatorAddress: undefined,
  priceMax: "",
  priceMin: "",
  sellStatus: undefined,
  owner: undefined,
  page: 1,
  limit: 20,
};

const DEFAULT_FILTERS_BY_USER = {
  owned: {
    showFilters: false,
    filters: BASE_FILTERS,
  },
  created: {
    showFilters: false,
    filters: BASE_FILTERS,
  },
  onSale: {
    showFilters: false,
    filters: {
      ...BASE_FILTERS,
      sellStatus: "AskNew",
    },
  },
};

export const useFilterByUser = create(
  devtools<NFTFilterByUserState & NFTFilterByUserAction>(
    (set, get) => ({
      ...{},
      createFiltersForUser: (userAddress) =>
        set((state) => {
          return {
            ...state,
            [userAddress]: DEFAULT_FILTERS_BY_USER,
          };
        }),
      toggleFilter: (mode, userAddress, bool) =>
        set((state) => {
          if (!state[userAddress]) return state;

          return {
            [userAddress]: {
              ...state[userAddress],
              [mode]: {
                ...state[userAddress][mode],
                showFilters:
                  bool === undefined
                    ? !state[userAddress][mode].showFilters
                    : bool,
              },
            },
          };
        }),
      setFilters: (mode, userAddress, filters) =>
        set((state) => {
          if (!state[userAddress]) return state;
          return {
            [userAddress]: {
              ...state[userAddress],
              [mode]: {
                ...state[userAddress][mode],
                filters,
              },
            },
          };
        }),
      updateFilters: (mode, userAddress, filters) =>
        set((state) => {
          if (!state[userAddress]) return state;

          return {
            [userAddress]: {
              ...state[userAddress],
              [mode]: {
                ...state[userAddress][mode],
                filters: {
                  ...state[userAddress][mode].filters,
                  ...filters,
                },
              },
            },
          };
        }),
      resetFilters: (mode, userAddress) =>
        set((state) => {
          if (!state[userAddress]) return state;
          return {
            [userAddress]: {
              ...state[userAddress],
              [mode]: {
                filters: {
                  ...DEFAULT_FILTERS_BY_USER[mode].filters,
                  userAddress,
                  creatorAddress:
                    mode === "created"
                      ? state[userAddress][mode].filters.creatorAddress
                      : undefined,
                },
                showFilters: state[userAddress][mode].showFilters,
              },
            },
          };
        }),
    }),
    { name: "filter-by-user" },
  ),
);
