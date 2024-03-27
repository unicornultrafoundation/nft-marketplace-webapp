import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { AppStoreState, AppStoreAction } from "./types";

const DEFAULT_STATE: AppStoreState = {
  collections: {},
};

const useAppCommonStore = create(
  devtools<AppStoreState & AppStoreAction>(
    (set, get) => ({
      ...DEFAULT_STATE,
      setCollection: (userId, collections) =>
        set((state) => {
          return {
            collections: {
              ...state.collections,
              [userId]: collections,
            },
          };
        }),
    }),
    { name: "app-storage" },
  ),
);

export default useAppCommonStore;
