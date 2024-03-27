import { Collection } from "@/types";

export interface AppStoreState {
  collections: Record<string, Collection[]>;
}

export interface AppStoreAction {
  setCollection: (userId: string, collections: Collection[]) => void;
}
