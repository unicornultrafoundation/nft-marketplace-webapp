import { Address, useAccount, useContractWrite } from 'wagmi'
import { contracts } from '@/config/contracts'
import useAuthStore from '@/store/auth/store'
import { AssetType } from '@/types'
import { Id, toast } from 'react-toastify'
import { useMarketplaceApi } from '@/hooks/useMarketplaceApi'
import { APIParams } from '@/services/api/types'
import { useCallback } from 'react'

export const useCreateNFT = (collection: Address, type: AssetType) => {
  const api = useMarketplaceApi()
  const { address } = useAccount()
  const userId = useAuthStore(state => state.profile?.id)

  const proxyContract = type === 'ERC721' ? contracts.erc721Proxy : contracts.erc1155Proxy
  const { writeAsync } = useContractWrite({
    address: collection,
    abi: proxyContract.abi,
    functionName: 'mintAndTransfer'
  })

  const onCreateNFT = useCallback(async (type: AssetType, params: Record<string, any>, toastId?: Id) => {
    if (!userId || !collection) return

    if (toastId) toast.update(toastId, { render: 'Uploading Image', type: 'info' })
    const { fileHashes, metadataHash } = await api.uploadFile(
      params.image,
      {
        traits: [],
        description: params.description
      })

    if (toastId) toast.update(toastId, { render: 'Generating config', type: 'info' })
    const tokenId = await api.generateTokenId(collection)

    if (toastId) toast.update(toastId, { render: 'Sending Transaction', type: 'info' })
    const tokenURI = "ipfs://" + fileHashes[0]
    const baseArgs: Record<string, any> =type === 'ERC1155'?{
      tokenId,
      tokenURI,
      supply: params.amount,
      creators: [{ account: address, value: 10000 }],
      royalties: [],
      signatures: ["0x"]
    } : {
      tokenId,
      tokenURI,
      creators: [{ account: address, value: 10000 }],
      royalties: [],
      signatures: ["0x"]
    }
    // if (type === 'ERC1155') baseArgs.supply = params.amount
    const args = [
      baseArgs,
      address,
      type === 'ERC1155' && params.amount
    ].filter(Boolean)

    const { hash } = await writeAsync({ args })

    const createNFTParams = {
      id: tokenId,
      name: params.name,
      ipfsHash: metadataHash,
      tokenUri: tokenURI,
      collectionId: collection,
      txCreationHash: hash,
      imageHash: fileHashes[0],
      creatorId: userId,
      traits: []
    } as APIParams.CreateNFT
    const res = await api.createNFT(createNFTParams)

    if (toastId) toast.update(toastId, { render: 'Item created successfully', type: 'success', isLoading: false })
  }, [collection, address])

  return { onCreateNFT }
}

