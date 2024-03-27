import { Collection, Round } from "@/types";

export interface LaunchpadStoreState {
  round: Round;
  isSpecial: boolean;
  collection: Collection;
}

export interface LaunchpadStoreAction {
  setRound: (round: Round) => void;
  setIsSpecial: (isSpecial: boolean) => void;
  setCollection: (collection: Collection) => void;
}
