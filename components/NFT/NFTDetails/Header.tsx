import Image from 'next/image'
import Icon from '@/components/Icon'
import { APIResponse } from '@/services/api/types'
import Text from '@/components/Text'
import Button from '@/components/Button'
import { useMemo } from 'react'
import NFTActions from '@/components/NFT/NFTDetails/NFTActions'
import useAuthStore from '@/store/auth/store'

export default function NFTDetailsHeader(nft: APIResponse.NFT) {
  const userId = useAuthStore(state => state.credentials?.userId)
  const { name, collection, sellInfo, creator, owners } = nft
  const type = collection.type

  const isOwner = useMemo(() => userId === owners[0].userId, [userId, owners])

  const isOnSale = useMemo(() => {
    const saleData = type === 'ERC721' ? sellInfo?.marketEvent721S : sellInfo?.marketEvent1155S
    if (!saleData) return false
    return saleData[0]?.event === 'AskNew'
  }, [sellInfo])

  const price = useMemo(() => {
    const saleData = type === 'ERC721' ? sellInfo?.marketEvent721S : sellInfo?.marketEvent1155S
    if (!saleData) return 0
    if (saleData[0]?.event !== 'AskNew') {
      return 0
    }
    return saleData[0]?.price
  }, [sellInfo])

  return (
    <div className="flex gap-16 items-stretch justify-center">
      <Image
        src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
        alt=""
        width={1}
        height={1}
        className="w-[512px] h-[512px] rounded-2xl" />

      <div className="flex flex-col gap-10 justify-between">
        {/* NFT info */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-1 items-center">
            <Icon name="verified" width={16} height={16} />
            <Text className="text-secondary">
              {collection.name}
            </Text>
          </div>

          <Text className="font-bold text-primary" variant="heading-md">
            {name}
          </Text>

          <Text className="text-secondary" variant="body-16">
            Created by <span className="text-primary underline">{creator.username}</span>
          </Text>
        </div>

        <div className="inline-flex gap-3">
          <Button variant="secondary" disabled>
            <Icon name="share" width={16} height={16} />
            Share
          </Button>
          <Button variant="secondary" disabled>
            <Icon name="refresh" width={16} height={16} />
            Refresh metadata
          </Button>
          <Button variant="icon" disabled>
            <Icon name="moreVertical" width={16} height={16} />
          </Button>
        </div>

        {/* Actions */}
        <div className="bg-surface-soft shadow rounded-2xl p-3">
          <div className="p-4">
            <Text className="text-secondary mb-2 font-semibold" variant="body-16">
              Price {isOwner.toString()}
            </Text>
            {
              isOnSale ? (
                <Text variant="heading-md">
                  <span className="text-primary font-semibold">{price}</span>&nbsp;
                  <span className="text-secondary">U2U</span>
                </Text>
              ) : (
                <Text>
                  # Not for sale
                </Text>
              )
            }
          </div>

          <NFTActions {...nft} />
        </div>
      </div>
    </div>
  )
}