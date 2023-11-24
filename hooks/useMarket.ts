import { APIResponse } from '@/services/api/types'
import { useContractRead, useContractWrite } from 'wagmi'
import { useMemo } from 'react'
import { contracts } from '@/config/contracts'
import useAuthStore from '@/store/auth/store'

export const useMarketStatus = (nft: APIResponse.NFT) => {
  const { collection, sellInfo, owners } = useMemo(() => nft, [nft])

  const type = collection.type
  const userId = useAuthStore(state => state.profile?.id)

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

  return {
    isOwner,
    isOnSale,
    price
  }
}

export const useMarket = (nft: APIResponse.NFT) => {
  const type = nft.collection.type
  const marketContract = type === 'ERC721' ? contracts.erc721Market : contracts.erc1155Market
  const wallet = useAuthStore(state => state.profile?.publicKey)

  const { data: isMarketContractApproved,  } = useContractRead({
    address: nft.collection.address,
    abi: type === 'ERC721' ? contracts.erc721.abi : contracts.erc1155.abi,
    functionName: 'isApprovedForAll',
    args: [wallet, marketContract.address],
    enabled: !!wallet
  })

  const {
    isLoading: isFetchingApproval,
    writeAsync: onApproveMarketContract,
    error: contractCallError
  } = useContractWrite({
    address: nft.collection.address,
    abi: type === 'ERC721' ? contracts.erc721.abi : contracts.erc1155.abi,
    functionName: 'setApprovalForAll',
    args: [marketContract.address, true]
  })

  return {
    isMarketContractApproved,
    onApproveMarketContract,
    isFetchingApproval,
    contractCallError
  }
}