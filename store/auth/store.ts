import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";
import { AuthStoreAction, AuthStoreState } from "@/store/auth/types";

const DEFAULT_STATE: AuthStoreState = {
  credentials: null,
  profile: null,
};

const useAuthStore = create(
  devtools(
    persist<AuthStoreState & AuthStoreAction>(
      (set, get) => ({
        ...DEFAULT_STATE,
        setCredentials: (credentials) => set(() => ({ credentials })),
        setProfile: (profile) => set(() => ({ profile })),
      }),
      { name: "auth-storage" },
    ),
  ),
);

export const clearProfile = () => useAuthStore.setState(DEFAULT_STATE);

export default useAuthStore;
