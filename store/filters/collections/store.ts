import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CollectionFilterState, CollectionFilterAction } from "./types";

const DEFAULT_STATE: CollectionFilterState = {
  showFilters: false,
  filters: {
    creatorAddress: undefined,
    name: "",
    min: "",
    max: "",
    page: 1,
    limit: 20,
    order: "",
    orderBy: "",
  },
};

export const useCollectionFilterStore = create(
  devtools<CollectionFilterState & CollectionFilterAction>(
    (set, get) => ({
      ...DEFAULT_STATE,
      toggleFilter: (bool) =>
        set((state) => ({
          showFilters: bool === undefined ? !state.showFilters : bool,
        })),
      setFilters: (filters) => set(() => ({ filters })),
      updateFilters: (filters) =>
        set((state) => ({
          filters: {
            ...state.filters,
            ...filters,
          },
        })),
      resetFilters: () =>
        set((state) => ({ ...DEFAULT_STATE, showFilters: state.showFilters })),
    }),
    { name: "collection-filter" },
  ),
);
