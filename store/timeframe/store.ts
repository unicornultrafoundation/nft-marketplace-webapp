import { create } from "zustand";
import { TimeframeStoreAction, TimeframeStoreState } from "./types";

const DEFAULT_STATE: TimeframeStoreState = {
  hasTimeframe: false,
  isInTimeframe: false,
  timeframes: [
    {
      hourStart: 0,
      minuteStart: 0,
      hourEnd: 0,
      minuteEnd: 0,
    },
  ],
};

const useTimeframeStore = create<TimeframeStoreState & TimeframeStoreAction>(
  (set) => ({
    ...DEFAULT_STATE,
    setHasTimeframe: (hasTimeframe) =>
      set(() => ({ hasTimeframe: hasTimeframe })),
    setIsInTimeframe: (isInTimeframe) =>
      set(() => ({ isInTimeframe: isInTimeframe })),
    setTimeframes: (timeframes) => set(() => ({ timeframes: timeframes })),
  }),
);

export default useTimeframeStore;
