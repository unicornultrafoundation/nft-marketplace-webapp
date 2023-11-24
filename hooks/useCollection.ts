import { useContractWrite } from 'wagmi'
import { contracts } from '@/config/contracts'
import useAuthStore from '@/store/auth/store'
import { useCallback } from 'react'
import { APIParams } from '@/services/api/types'
import { AssetType } from '@/types'
import { Id } from 'react-toastify'
import { useMarketplaceApi } from '@/hooks/useMarketplaceApi'

export const useCreateCollection = () => {
  const { writeAsync: write721 } = useContractWrite({
    ...contracts.erc721Factory,
    functionName: 'createToken'
  })
  const { writeAsync: write1155 } = useContractWrite({
    ...contracts.erc1155Factory,
    functionName: 'createToken'
  })

  const onCreateCollection = async (type: AssetType, args: any[], toastId?: Id) => {
    // const { hash } = type === 'ERC721' ? await write721({ args }) : await write1155({ args })
    if (type === 'ERC721') {
      return write721({ args })
    }
    return write1155({ args })
  }

  return { onCreateCollection }
}

export const useUpdateCollection = () => {
  const api = useMarketplaceApi()

  const onUpdateCollection = (params: APIParams.UpdateCollection) => api.updateCollection(params)

  return { onUpdateCollection }
}
