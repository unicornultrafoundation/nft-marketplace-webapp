import { create } from 'zustand';
import { TimeframeStoreAction, TimeframeStoreState } from './types';

const DEFAULT_STATE: TimeframeStoreState = {
  hasTimeframe: false,
  isInTimeframe: false,
};

const useTimeframeStore = create<TimeframeStoreState & TimeframeStoreAction>(
  (set) => ({
    ...DEFAULT_STATE,
    setHasTimeframe: (hasTimeframe) =>
      set(() => ({ hasTimeframe: hasTimeframe })),
    setIsInTimeframe: (isInTimeframe) =>
      set(() => ({ isInTimeframe: isInTimeframe })),
  })
);

export default useTimeframeStore;
