import { APIResponse } from '@/services/api/types'
import { useAccount, useContractRead, useContractReads } from 'wagmi'
import { useMemo } from 'react'
import { contracts } from '@/config/contracts'
import useAuthStore from '@/store/auth/store'

export const useMarket = (nft: APIResponse.NFT) => {
  const type = nft.collection.type
  const marketContract = type === 'ERC721' ? contracts.erc721Market : contracts.erc1155Market
  const wallet = useAuthStore(state => state.profile?.publicKey)

  // const { address } = useAccount()

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: nft.collection.address,
        abi: type === 'ERC721' ? contracts.erc721.abi : contracts.erc1155.abi,
        functionName: 'ownerOf',
        args: [nft.id]
      },
      {
        address: nft.collection.address,
        abi: type === 'ERC721' ? contracts.erc721.abi : contracts.erc1155.abi,
        functionName: 'isApprovedForAll',
        args: [wallet, marketContract.address]
      }
    ]
  })

  // const isOwner = useMemo(() => owner === address, [owner, address])

  return {
    data
  }
}