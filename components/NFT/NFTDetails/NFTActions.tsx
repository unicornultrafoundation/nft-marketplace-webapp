import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { APIResponse } from '@/services/api/types'
import { useMarket, useMarketStatus } from '@/hooks/useMarket'
import { useEffect, useState } from 'react'
import ConnectWalletButton from '@/components/Button/ConnectWalletButton'
import SellNFTModal from '@/components/Modal/SellNFTModal'

export default function NFTActions(nft: APIResponse.NFT) {
  const { isOwner, isOnSale } = useMarketStatus(nft)
  const [showSellModal, setShowSellModal] = useState(false)

  const handleSellNFT = () => {
    setShowSellModal(true)
  }

  if (isOwner) {
    return (
      <ConnectWalletButton className="w-full">
        {
          isOnSale ? (
            <Button>
              Cancel listing
            </Button>
          ) : (
            <Button className="mb-3 w-full" onClick={handleSellNFT}>
              Put on sale
            </Button>
          )
        }
        <SellNFTModal nft={nft} show={showSellModal} onClose={() => setShowSellModal(false)} />
      </ConnectWalletButton>
    )
  }

  return (
    <ConnectWalletButton className="w-full">
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
    </ConnectWalletButton>
  )
}