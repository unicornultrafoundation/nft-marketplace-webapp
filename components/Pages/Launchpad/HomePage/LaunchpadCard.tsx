import Image from 'next/image'
import Text from '@/components/Text'
import { Project, RoundType } from '@/types'
import Icon from '@/components/Icon'
import Stepper from '@/components/Stepper'
import { useRouter } from 'next/navigation'
import { useRoundsWithStatus } from '@/hooks/useRoundStatus'
import { useMemo } from 'react'
import { formatDisplayedBalance } from '@/utils'
import { formatEther } from 'ethers'
import { format } from 'date-fns'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  project: Project
}

export default function LaunchpadCard({ project, ...rest }: Props) {
  const router = useRouter()
  const { activeRound, activeRoundIndex, roundsWithStatus } = useRoundsWithStatus(project.rounds)

  const getIconName = (type: RoundType) => {
    switch (type) {
      case 'U2UMintRoundZero':
      case 'U2UPremintRoundZero':
        return 'round-zero'
      case 'U2UMintRoundWhitelist':
      case 'U2UPremintRoundWhitelist':
        return 'check'
      case 'U2UMintRoundFCFS':
      case 'U2UPremintRoundFCFS':
      default:
        return 'auction'
    }
  }

  const steps = useMemo(() => {
    return roundsWithStatus.map((round, index) => {
      return { label: round.name, value: index, icon: round.status === 'ENDED' ? 'check' : getIconName(round.type) }
    })
  }, [roundsWithStatus])

  return (
    <div
      className="cursor-pointer rounded-2xl border-[0.7px] border-gray-200"
      onClick={() => router.push(`/project/${project.id}`)}
      {...rest}>
      <div className="p-2">
        <Image
          className="rounded-lg w-full h-auto max-h-[308px]"
          src="https://fakeimg.pl/612x308/?text=Project"
          alt=""
          width={612}
          height={308} />
      </div>

      <div className="px-6 py-4 ">
        <div className="flex items-center justify-between mb-6">
          <Text className="font-semibold" variant="heading-sm">
            {project.name}
          </Text>

          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1">
              <Icon name="u2u-logo" width={16} height={16} />
              <Text className="font-semibold" variant="body-18">
                {formatDisplayedBalance(formatEther(activeRound?.price || 0))}
              </Text>
              <Text className="text-secondary" variant="body-12">U2U</Text>
            </div>
            <Text className="text-secondary" variant="body-14">
              {activeRound?.name}
            </Text>
          </div>
        </div>

        <Stepper current={activeRoundIndex} steps={steps} />

        <div className="mt-1 flex gap-10 justify-end items-center">
          {activeRound?.status === 'UPCOMING' && (
            <Text className="text-secondary" variant="body-12">
              {/*Start: <span className="font-medium text-primary">{format(activeRound.start , 'yyyy/M/dd - hh:mm a')}</span>*/}
            </Text>
          )}
          {activeRound?.status === 'ENDED' && (
            <Text className="text-secondary" variant="body-12">
              {/*Ended: <span className="font-medium text-primary">{format(activeRound.end, 'yyyy/M/dd - hh:mm a')}</span>*/}
            </Text>
          )}
          {activeRound?.status === 'MINTING' && (
            <Text className="text-secondary" variant="body-12">
              {/*Ending in: <span className="font-medium text-primary">{format(activeRound.end, 'yyyy/M/dd - hh:mm a')}</span>*/}
            </Text>
          )}


          <div className="flex items-center gap-1 mt-[80px] desktop:mt-auto">
            <Text className="text-secondary" variant="body-12">
              Items: {!!activeRound && activeRound.totalNftt > 0 ? formatDisplayedBalance(activeRound.totalNftt,0) : 'Open Edition'}
            </Text>
            <Icon name="u2u-logo" width={12} height={12} />
          </div>
        </div>
      </div>
    </div>
  )
}