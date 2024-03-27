import { Timeframe } from "@/types";

export interface TimeframeStoreState {
  hasTimeframe: boolean;
  isInTimeframe: boolean;
  timeframes: Timeframe[];
}

export interface TimeframeStoreAction {
  setHasTimeframe: (hasTimeframe: boolean) => void;
  setIsInTimeframe: (isInTimeframe: boolean) => void;
  setTimeframes: (timeframes: Timeframe[]) => void;
}
