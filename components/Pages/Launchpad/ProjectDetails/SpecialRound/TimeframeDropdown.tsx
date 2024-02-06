import { Round, Timeframe } from '@/types';
import { useState } from 'react';
import { classNames } from '@/utils/string';
import Icon from '@/components/Icon';
import { useTimeframe } from '@/hooks/useTimeframe';
import DropdownCustomized from '@/components/Dropdown/DropdownCustomized';

interface Props {
  round: Round;
}

export default function TimeframeDropdown({ round }: Props) {
  const [open, setOpen] = useState(false);
  const { timeframes, currentTimeframe } = useTimeframe(round);

  const formatTimeframe = (timeframe?: Timeframe) => {
    if (!timeframe) return null;
    return (
      <span className='flex-1'>
        {timeframe.hourStart < 10
          ? `0${timeframe.hourStart}`
          : timeframe.hourStart}
        :
        {timeframe.minuteStart < 10
          ? `0${timeframe.minuteStart}`
          : timeframe.minuteStart}{' '}
        - {timeframe.hourEnd < 10 ? `0${timeframe.hourEnd}` : timeframe.hourEnd}
        :
        {timeframe.minuteEnd < 10
          ? `0${timeframe.minuteEnd}`
          : timeframe.minuteEnd}{' '}
        UTC
      </span>
    );
  };

  return (
    <DropdownCustomized
      activator={
        <div className='flex items-center gap-4 pt-3 pl-4 pr-4'>
          {currentTimeframe?.isInTimeframe && (
            <div className='w-2 h-2 rounded-full bg-success' />
          )}
          {formatTimeframe(
            timeframes
              ? timeframes[currentTimeframe.index]
              : { hourStart: 0, minuteStart: 0, hourEnd: 0, minuteEnd: 0 }
          )}
          <div
            className={classNames(
              'rounded-lg p-1 bg-surface-medium transition-transform',
              open && 'rotate-180'
            )}
          >
            <Icon name='chevronDown' width={14} height={14} className='grow' />
          </div>
        </div>
      }
      dropdown={timeframes?.map((timeframe, index) =>
        currentTimeframe?.index == index && currentTimeframe.isInTimeframe ? (
          <div className='flex items-center gap-4' key={index}>
            <div className='w-2 h-2 rounded-full bg-success' />
            <p key={index}>{formatTimeframe(timeframe)}</p>
          </div>
        ) : currentTimeframe.index >= index ? (
          <div className='flex items-center gap-4' key={index}>
            <div className='w-2 h-2 rounded-full bg-disabled' />
            <p key={index}>{formatTimeframe(timeframe)}</p>
          </div>
        ) : (
          <div className='flex items-center gap-4' key={index}>
            <div className='w-2 h-2 rounded-full bg-warning' />
            <p key={index}>{formatTimeframe(timeframe)}</p>
          </div>
        )
      )}
      className='bg-white rounded-2xl h-12'
      open={open}
      setOpen={setOpen}
    />
  );
}
