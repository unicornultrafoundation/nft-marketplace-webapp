import useAuthStore from '@/store/auth/store'
import { APIParams, APIResponse } from '@/services/api/types'
import { marketplaceApi } from '@/services/api'
import { API_ENDPOINTS } from '@/config/api'
import { Address } from 'wagmi'
import { useMemo } from 'react'

export const useMarketplaceApi = () => {
  const { credentials } = useAuthStore()
  const bearerToken = credentials?.accessToken
  const authHeader = useMemo(() => ({ headers: { 'Authorization': `Bearer ${bearerToken}` } }), [bearerToken])

  return useMemo(() => {
    return {
      connect: (params: APIParams.Connect): Promise<APIResponse.Connect> => marketplaceApi.post(API_ENDPOINTS.CONNECT, params),

      updateProfile: (params: APIParams.UpdateProfile) => marketplaceApi.post(API_ENDPOINTS.PROFILE, params, authHeader),

      uploadFile: (file: Blob): Promise<APIResponse.UploadImage> => {
        const form = new FormData();
        form.append("files", file, (file as any).name)
        return marketplaceApi.post(API_ENDPOINTS.UPLOAD_IMAGE, form)
      },

      updateCollection: (params: APIParams.UpdateCollection) => marketplaceApi.post(API_ENDPOINTS.COLLECTIONS, params, authHeader),

      createNFT: (params: APIParams.CreateNFT): Promise<APIResponse.CreateNFT> => marketplaceApi.post(API_ENDPOINTS.NFT, params, authHeader),
      fetchNFTs: (params: APIParams.SearchNFT): Promise<APIResponse.NFT[]> => marketplaceApi.post(API_ENDPOINTS.SEARCH_NFTS),

      /** GET **/
      generateTokenId: async (collectionAddress: Address): Promise<string> => {
        const idHash: number = await marketplaceApi.get(API_ENDPOINTS.TOKEN_ID + `?collectionAddress=${collectionAddress}`, authHeader)
        return BigInt(idHash).toString()
      },

      fetchCollections: (): Promise<APIResponse.Collection[]> => marketplaceApi.get(API_ENDPOINTS.COLLECTIONS),

      fetchCollectionsByUser: async (userId: string): Promise<APIResponse.Collection[]> => {
        const data: any = await marketplaceApi.get(API_ENDPOINTS.USER_COLLECTIONS + `/${userId}`)
        return (data && data[0]) ? data[0]['nftCollection'].map((item: any) => item.collection) as APIResponse.Collection[] : []
      },

      fetchNFTById: (id: string): Promise<APIResponse.NFT> => marketplaceApi.get(API_ENDPOINTS.NFT + `/${id}`),

      viewProfile: (wallet: Address): Promise<APIResponse.Profile> => marketplaceApi.get(API_ENDPOINTS.PROFILE + `/${wallet}`)
    }
  }, [authHeader])
}