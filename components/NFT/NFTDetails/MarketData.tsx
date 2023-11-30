import Image from 'next/image'
import Icon from '@/components/Icon'
import { APIResponse } from '@/services/api/types'
import Text from '@/components/Text'
import Button from '@/components/Button'
import NFTActions from '@/components/NFT/NFTDetails/NFTActions'
import { useNFTMarketStatus } from '@/hooks/useMarket'
import { formatUnits } from 'ethers'
import { parseImageUrl } from '@/utils/nft'
import defaultImg from '@/assets/images/default-cover-photo.png'

export default function NFTMarketData({ nft }: { nft: APIResponse.NFT }) {
  const { isOnSale, saleData } = useNFTMarketStatus(nft)

  return (
    <div className="flex flex-col gap-10 justify-between">
      {/* NFT info */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-1 items-center">
          <Icon name="verified" width={16} height={16} />
          <Text className="text-secondary">
            {nft.collection.name}
          </Text>
        </div>

        <Text className="font-bold text-primary desktop:text-body-40 tablet:text-body-40 text-body-24">
          {nft.name}
        </Text>

        <Text className="text-secondary" variant="body-16">
          Created by <span className="text-primary underline">{nft.creator.username}</span>
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
            Price
          </Text>
          {
            isOnSale ? (
              <Text variant="heading-md">
                  <span className="text-primary font-semibold">
                    {formatUnits(saleData?.price || '0')}
                  </span>&nbsp;
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
  )
}