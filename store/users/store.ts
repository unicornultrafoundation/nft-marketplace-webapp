import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserAction, UserState } from "@/store/users/types";

const DEFAULT_STATE: UserState = {
  queryString: {
    users: "",
  },
};

export const useUserStore = create(
  devtools(
    persist<UserState & UserAction>(
      (set, get) => ({
        ...DEFAULT_STATE,
        setQueryString: (key, text) =>
          set((state) => ({
            queryString: {
              ...state.queryString,
              [key]: text,
            },
          })),
      }),
      { name: "user-storage" },
    ),
  ),
);
