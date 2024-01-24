import { Collection } from '@/types';

export interface TimeframeStoreState {
  hasTimeframe: boolean;
  isInTimeframe: boolean;
}

export interface TimeframeStoreAction {
  setHasTimeframe: (hasTimeframe: boolean) => void;
  setIsInTimeframe: (isInTimeframe: boolean) => void;
}
