import { useAccount } from 'wagmi'
import { contracts } from '@/config/contracts'
import useAuthStore from '@/store/auth/store'
import { AssetType } from '@/types'
import { writeContract, waitForTransaction } from '@wagmi/core'
import { useMarketplaceApi } from '@/hooks/useMarketplaceApi'
import { MARKETPLACE_URL } from '@/config/constants'
import { parseImageUrl } from '@/utils/nft'

export const useCreateNFT = (type: AssetType) => {
  const api = useMarketplaceApi()
  const { address } = useAccount()
  const userId = useAuthStore(state => state.profile?.id)

  const proxyContract = type === 'ERC721' ? contracts.erc721Proxy : contracts.erc1155Proxy

  const onCreateNFT = async (params: Record<string, any>) => {
    if (!userId || !type) return
    const { collection, description, image, traits, royalties, name, amount, animation_url } = params

    const { id, u2uId } = await api.generateTokenId(collection)

    const metadata = {
      id: id,
      name: name,
      description: description,
      collectionAddress: collection,
      image: parseImageUrl(image),
      animation_url: parseImageUrl(animation_url),
      external_url: MARKETPLACE_URL + `/item/${collection}/${id}`,
      creatorId: userId,
      attributes: traits,
      royalties: [{ account: address, value: royalties }]
    }

    const { metadataHash } = await api.uploadMetadata(metadata)

    const tokenArgs: Record<string, any> = type === 'ERC1155' ? {
      tokenId: BigInt(u2uId),
      tokenURI: metadataHash,
      supply: amount,
      creators: [{ account: address, value: 10000 }],
      royalties: [{ account: address, value: Number(royalties) * 100 }],
      signatures: ["0x"]
    } : {
      tokenId: BigInt(u2uId).toString(),
      tokenURI: metadataHash,
      creators: [{ account: address, value: 10000 }],
      royalties: [{ account: address, value: royalties }],
      signatures: ["0x"]
    }
    const contractArgs = [
      tokenArgs,
      address,
      type === 'ERC1155' && amount
    ].filter(Boolean)

    const tx = await writeContract({
      address: collection,
      abi: proxyContract.abi,
      functionName: 'mintAndTransfer',
      args: contractArgs
    })

    const createNFTParams = {
      id: id.toString(),
      u2uId: BigInt(u2uId).toString(),
      name,
      ipfsHash: metadataHash,
      tokenUri: metadataHash,
      collectionId: collection,
      txCreationHash: tx.hash,
      image,
      creatorId: userId,
      traits: traits
    }

    await Promise.all([
      waitForTransaction({ hash: tx.hash }),
      api.createNFT(createNFTParams)
    ])
  }

  return { onCreateNFT }
}

