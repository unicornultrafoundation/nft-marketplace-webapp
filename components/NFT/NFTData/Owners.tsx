import { APIResponse } from '@/services/api/types'
import { useMemo, useState } from 'react'
import Image from 'next/image'
import defaultAvatar from "@/assets/images/default-avatar.png";
import Button from '@/components/Button'
import { formatEther } from 'ethers'
import Link from 'next/link'
import useAuthStore from '@/store/auth/store'
import BuyNFTModal from '@/components/Modal/BuyNFTModal'
import { formatDisplayedBalance } from '@/utils'

export default function OwnersTab({ nft }: { nft: APIResponse.NFT }) {
  const [modals, setModals] = useState<Record<string, any>>({})
  const userWallet = useAuthStore(state => state.profile?.publicKey)
  const owners = useMemo(() => {
    return nft.owners.map(owner => {
      const sellInfo = nft.sellInfo.find(item => item.from.toLowerCase() === owner.publicKey.toLowerCase())
      return {
        ...owner,
        sellInfo
      }
    }).sort((a, b) => {
      return !!a.sellInfo ? -1 : 0
    })
  }, [nft])

  return (
    <div className="w-full py-7">
      <div className="p-3 flex flex-col gap-4 rounded-2xl border border-disabled border-dashed">
        {owners.map((owner) => {
          return (
            <div className="flex items-center justify-between" key={owner.id}>
              <Link href={`/user/${owner.id}`} className="flex items-center gap-4">
                <Image
                  className="w-12 h-12 rounded-2xl"
                  width={80}
                  height={80}
                  src={owner.avatar || defaultAvatar}
                  alt="avatar" />
                <div>
                  <p className="font-medium">
                    {owner.username}
                  </p>
                  {!!owner.sellInfo ? (
                    <p className="text-secondary text-body-14 font-semibold">
                      {owner.sellInfo.amounts} / {owner.quantity} item(s) on sale for
                      <span className="text-primary">
                        {" "}{formatDisplayedBalance(formatEther(owner.sellInfo.price), 2)} U2U
                      </span>
                      {" "}each
                    </p>
                  ) : (
                    <p className="text-secondary font-semibold text-body-14">
                      {owner.quantity} edition(s) - <span className="font-bold">Not for sale</span>
                    </p>
                  )}
                </div>
              </Link>

              {(!!owner.sellInfo) && owner.publicKey.toLowerCase() === userWallet?.toLowerCase() ? (
                <div className="text-body-14 font-medium text-secondary p-2 rounded-lg bg-surface-soft w-[120px] text-center">
                  This is me
                </div>
              ) : (
                <>
                  <BuyNFTModal
                    saleData={owner.sellInfo}
                    nft={nft}
                    show={modals[owner.id]}
                    onClose={() => setModals({ ...modals, [owner.id]: false })} />
                  <Button scale="sm" onClick={() => setModals({ ...modals, [owner.id]: true })}>
                    Buy now
                  </Button>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}