import { useRoundStatus } from '@/hooks/useRoundStatus';
import { Round, RoundStatus } from '@/types';
import { format } from 'date-fns';

interface Props {
  round: Round;
}

export default function RoundStatusHeader({ round }: Props) {
  const status = useRoundStatus(round);
  return (() => {
    switch (status) {
      case 'MINTING':
        return (
          <div className='flex items-start gap-2'>
            <div className='w-2 h-2 mt-1 rounded-full bg-success' />

            <div>
              <p className='text-body-16 font-medium leading-none'>
                Minting: <span className='text-success'>Live</span>
              </p>
              <p className='text-body-14 text-secondary'>
                End:{' '}
                <span className='text-secondary'>
                  {format(new Date(round?.end) || 0, 'yyyy/M/dd hh:mm a')}
                </span>
              </p>
            </div>
          </div>
        );

      case 'UPCOMING':
        return (
          <div className='flex items-start gap-2'>
            <div className='w-2 h-2 mt-1 rounded-full bg-warning' />
            <div>
              <p className='text-body-16 font-medium leading-none'>
                Minting: <span className='text-warning'>Upcoming</span>
              </p>
              <p className='text-body-14 text-secondary'>
                Start:{' '}
                <span className='text-secondary'>
                  {format(new Date(round?.start) || 0, 'yyyy/M/dd hh:mm a')}
                </span>
              </p>
            </div>
          </div>
        );
      case 'ENDED':
        return (
          <div className='flex items-start gap-2'>
            <div className='w-2 h-2 mt-1 rounded-full bg-error' />

            <div>
              <p className='text-body-16 font-medium leading-none'>
                Minting: <span className='text-error'>Ended</span>
              </p>
              <p className='text-body-14 text-secondary'>
                End:{' '}
                <span className='text-secondary'>
                  {format(new Date(round?.end) || 0, 'yyyy/M/dd hh:mm a')}
                </span>
              </p>
            </div>
          </div>
        );
    }
  })();
}
