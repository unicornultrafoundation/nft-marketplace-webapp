'use client'

import NFTDetailsHeader from '@/components/NFT/NFTDetails/Header'
import useSWR from 'swr'
import { useMarketplaceApi } from '@/hooks/useMarketplaceApi'
import { useParams } from 'next/navigation'

export default function NFTDetails() {
  const { id } = useParams()
  const api = useMarketplaceApi()
  const { data: item, error, isLoading } = useSWR(
    `/item/${id}`,
    () => api.fetchNFTById(id as string)
  )
  return (
    <div className="w-full px-4 tablet:px-10 desktop:px-20  py-4 tablet:py-8 desktop:py-10">
      {!!item && <NFTDetailsHeader {...item} />}
    </div>
  )
}