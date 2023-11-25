import Text from '@/components/Text'
import { APIResponse } from '@/services/api/types'

export default function NFTDescriptions({  }: APIResponse.NFT) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <Text className="text-primary font-bold mb-4" variant="body-16">
          Description
        </Text>
        <Text>
          {}
        </Text>
      </div>

    </div>
  )
}