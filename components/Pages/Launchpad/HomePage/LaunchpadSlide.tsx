import Image from 'next/image'
import Text from '@/components/Text'
import Icon from '@/components/Icon'
import Stepper from '@/components/Stepper'
import Button from '@/components/Button'
import Link from 'next/link'
import { Project, RoundType } from '@/types'
import { useRoundsWithStatus } from '@/hooks/useRoundStatus'
import { useMemo } from 'react'
import { formatDisplayedBalance } from '@/utils'
import { formatEther } from 'ethers'

interface Props {
  project: Project
}

export default function LaunchpadSlide({ project }: Props) {
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
    <div className="flex justify-center desktop:gap-8 m-10 flex-col tablet:flex-row desktop:flex-row">
      {/** Project Image **/}
      <Image
        width={384}
        height={384}
        src={project.banner}
        className="desktop:w-96 desktop:h-96 tablet:w-96 tablet:h-96 rounded-2xl w-full h-auto"
        alt="" />

      <div className="flex flex-col justify-between">
        {/** Project descriptions **/}
        <div className="flex flex-col gap-4 mb-6 desktop:mb-0 tablet:mb-0">
          <Text className="font-semibold" variant="heading-md">
            Projects: {project.name}
          </Text>
          <div className="flex gap-3 items-center">
            <Icon name="u2u-logo" width={24} height={24} />
            <div className="desktop:h-full tablet:h-full h-[20px] bg-gray-500 w-[1px]" />
            <Text variant="body-16">
              <span className="text-secondary">Items:</span>
              {" "}{activeRound?.totalNftt === 0 ? 'Open Edition' : activeRound?.totalNftt || 0}
            </Text>
          </div>

          {/** Sale data **/}
          <div className="flex items-start desktop:gap-6 tablet:gap-6 gap-1 flex-col tablet:flex-row desktop:flex-row">
            <div className="flex items-center gap-2 tablet:gap-0 desktop:gap-0 flex-row tablet:flex-col desktop:flex-col">
              <Text className="text-secondary" variant="body-16">
                Round Price
              </Text>
              <div className="flex items-center gap-2">
                <Icon name="u2u-logo" width={24} height={24} />
                <Text className="font-semibold" variant="heading-md">
                  {formatDisplayedBalance(formatEther(activeRound?.price || 0))}
                </Text>
                <Text className="font-semibold text-tertiary" variant="body-16">U2U</Text>
              </div>
            </div>

            <div className="flex items-center gap-2 tablet:gap-0 desktop:gap-0 flex-row tablet:flex-col desktop:flex-col">
              <Text className="text-secondary" variant="body-16">
                Items
              </Text>
              <Text className="font-semibold" variant="heading-md">
                {activeRound?.totalNftt === 0 ? 'Open Edition' : activeRound?.totalNftt || 0}
              </Text>
            </div>
          </div>
        </div>

        {/** Project Rounds **/}
        <Stepper current={activeRoundIndex} steps={steps} />

        <Link className="flex desktop:w-[300px] tablet:w-[300px] w-full desktop:justify-start tablet:justify-start justify-center "
              href={`/project/${project.id}`}>
          <Button className=" w-3/4 mt-12">
            Details
          </Button>
        </Link>
      </div>
    </div>
  )
}