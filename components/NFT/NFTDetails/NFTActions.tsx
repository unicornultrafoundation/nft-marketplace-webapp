import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { APIResponse } from '@/services/api/types'
import { useMarket } from '@/hooks/useMarket'
import { useEffect } from 'react'

export default function NFTActions(nft: APIResponse.NFT) {
  const { data } = useMarket(nft)

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <Button className="flex-1">
          Buy Now
        </Button>
        <Button className="w-12 !min-w-0 !p-2" disabled>
          <Icon name="shoppingBag" width={16} height={16} />
        </Button>
      </div>
      <Button className="w-full" variant="outlined">
        Place a bid
      </Button>
    </div>
  )
}