import useAuthStore from "@/store/auth/store";
import { APIParams, APIResponse } from "@/services/api/types";
import { marketplaceApi } from "@/services/api";
import { API_ENDPOINTS } from "@/config/api";
import { Address } from "wagmi";
import { useCallback, useMemo } from "react";
import { parseQueries, sanitizeObject } from "@/utils";
import { parseUnits } from "ethers";
import { tokens } from "@/config/tokens";

export const useMarketplaceApi = () => {
  const { credentials } = useAuthStore();
  const bearerToken = credentials?.accessToken;

  // Bearer token - Support directly passing token via function call or getting from auth store
  const authHeader = useCallback(
    (accessToken?: string) => ({
      headers: { Authorization: `Bearer ${accessToken || bearerToken}` },
    }),
    [bearerToken],
  );

  return useMemo(() => {
    return {
      connect: (params: APIParams.Connect): Promise<APIResponse.Connect> =>
        marketplaceApi.post(API_ENDPOINTS.CONNECT, params),

      updateProfile: (
        params: APIParams.UpdateProfile,
      ): Promise<APIResponse.ProfileDetails> =>
        marketplaceApi.post(API_ENDPOINTS.PROFILE, params, authHeader()),

      resendEmail: (
        params: APIParams.ResendVerifyMail,
      ): Promise<APIResponse.ResendEmail> =>
        marketplaceApi.post(
          API_ENDPOINTS.SEND_VERIFY_EMAIL,
          params,
          authHeader(),
        ),
      search: (params: APIParams.Search): Promise<any> =>
        marketplaceApi.post(API_ENDPOINTS.SEARCH, params),

      searchNFTs: (text: string): Promise<APIResponse.SearchNFTs> =>
        marketplaceApi.post(API_ENDPOINTS.SEARCH, {
          mode: "NFT",
          text,
        }),

      searchCollections: (
        text: string,
      ): Promise<APIResponse.SearchCollections> =>
        marketplaceApi.post(API_ENDPOINTS.SEARCH, {
          mode: "COLLECTION",
          text,
        }),

      searchUsers: (text: string): Promise<APIResponse.SearchUsers> =>
        marketplaceApi.post(API_ENDPOINTS.SEARCH, {
          mode: "USER",
          text,
        }),

      uploadFile: (
        files: Blob[] | Blob,
        metadata?: Record<string, any>,
      ): Promise<APIResponse.UploadImage> => {
        const form = new FormData();
        if (Array.isArray(files)) {
          files.forEach((file) => {
            form.append("files", file);
          });
        } else {
          form.append("files", files, (files as any).name);
        }

        if (metadata) {
          form.append("metadata", JSON.stringify(metadata));
        }
        return marketplaceApi.post(API_ENDPOINTS.UPLOAD_IMAGE, form);
      },

      uploadMetadata: (
        data: Record<string, any>,
      ): Promise<APIResponse.UploadMetadata> => {
        const form = new FormData();
        form.append("metadata", JSON.stringify(data));
        return marketplaceApi.post(API_ENDPOINTS.UPLOAD_IMAGE, form);
      },

      createCollection: (params: APIParams.CreateCollection) =>
        marketplaceApi.post(API_ENDPOINTS.COLLECTIONS, params, authHeader()),

      updateCollection: ({ coverImage, id }: APIParams.UpdateCollection) =>
        marketplaceApi.put(
          API_ENDPOINTS.COLLECTIONS + `/${id}`,
          { coverImage },
          authHeader(),
        ),

      createNFT: (
        params: APIParams.CreateNFT,
      ): Promise<APIResponse.CreateNFT> =>
        marketplaceApi.post(API_ENDPOINTS.NFT, params, authHeader()),

      fetchNFTs: (
        params: APIParams.FetchNFTs,
      ): Promise<APIResponse.FetchNFTs> => {
        const { priceMin, priceMax, quoteToken } = params;
        const bigintMin =
          priceMin !== undefined ? parseUnits(priceMin, 18) : undefined;
        const bigintMax =
          priceMax !== undefined ? parseUnits(priceMax, 18) : undefined;
        return marketplaceApi.post(
          API_ENDPOINTS.SEARCH_NFT,
          sanitizeObject({
            ...params,
            sellStatus:
              Number(priceMin) || Number(priceMax)
                ? "AskNew"
                : params.sellStatus,
            priceMin: bigintMin?.toString(),
            priceMax: bigintMax?.toString(),
          }),
        );
      },

      fetchNFTEvents: (
        params: APIParams.NFTEvents,
      ): Promise<APIResponse.NFTEvents> =>
        marketplaceApi.post(API_ENDPOINTS.NFT_EVENTS, params),

      fetchUserActivities: (
        params: APIParams.UserActivities,
      ): Promise<APIResponse.UserActivities> =>
        marketplaceApi.post(API_ENDPOINTS.USER_ACTIVITIES, params),

      validateInput: (params: APIParams.ValidateInput): Promise<boolean> =>
        marketplaceApi.post(API_ENDPOINTS.VALIDATE_INPUT, params),

      /** GET **/
      fetchCollections: (
        params: APIParams.FetchCollections,
      ): Promise<APIResponse.FetchCollections> => {
        const { min, max } = params;
        const bigintMin = min !== undefined ? parseUnits(min, 18) : undefined;
        const bigintMax = max !== undefined ? parseUnits(max, 18) : undefined;
        return marketplaceApi.get(
          API_ENDPOINTS.COLLECTIONS +
            parseQueries(
              sanitizeObject({
                ...params,
                min: bigintMin?.toString(),
                max: bigintMax?.toString(),
              }),
            ),
        );
      },

      fetchCollectionById: (
        id: string | Address,
      ): Promise<APIResponse.CollectionDetails> =>
        marketplaceApi.get(API_ENDPOINTS.COLLECTIONS + `/${id}`),

      fetchCollectionsByUser: async ({
        userId,
        ...rest
      }: APIParams.FetchCollectionById): Promise<APIResponse.FetchCollections> => {
        return marketplaceApi.get(
          API_ENDPOINTS.USER_COLLECTIONS + `/${userId}` + parseQueries(rest),
        );
      },

      generateTokenId: async (
        collectionAddress: Address,
      ): Promise<APIResponse.GenerateTokenId> =>
        marketplaceApi.get(
          API_ENDPOINTS.TOKEN_ID + `?collectionAddress=${collectionAddress}`,
          authHeader(),
        ),

      fetchNFTById: (
        params: APIParams.FetchNFTDetails,
      ): Promise<APIResponse.NFTDetails> => {
        return marketplaceApi.get(API_ENDPOINTS.NFT + parseQueries(params));
      },

      fetchMarketDataByNFT: (
        params: APIParams.FetchNFTMarketData,
      ): Promise<APIResponse.NFTMarketData> =>
        marketplaceApi.get(
          API_ENDPOINTS.NFT_TRANSACTIONS + parseQueries(params),
        ),

      getNFTMetaData: (
        ifpsUrl: string,
      ): Promise<APIResponse.FetchNFTMetadata> => {
        return marketplaceApi.get(
          API_ENDPOINTS.GET_METADATA + `?ipfsPath=${ifpsUrl}`,
        );
      },

      viewProfile: (
        id: Address | string,
      ): Promise<APIResponse.ProfileDetails> =>
        marketplaceApi.get(API_ENDPOINTS.PROFILE + `/${id}`, authHeader()),

      fetchUsers: async (
        params: APIParams.FetchUsers,
      ): Promise<APIResponse.UsersData> =>
        marketplaceApi.get(
          API_ENDPOINTS.USER + parseQueries(params),
          authHeader(),
        ),

      verifyAccount: (): Promise<APIResponse.VerifyAccount> =>
        marketplaceApi.post(API_ENDPOINTS.LIST_VERIFY, {}, authHeader()),

      fetchEmailVerify: (
        params: APIParams.FetchEmailVerify,
      ): Promise<APIResponse.FetchEmailVerify> =>
        marketplaceApi.post(API_ENDPOINTS.VERIFY_EMAIL, params, authHeader()),

      followUser: ({
        userId,
        accessToken,
      }: APIParams.FollowUser): Promise<APIResponse.FollowUser> =>
        marketplaceApi.post(
          API_ENDPOINTS.FOLLOW + `/${userId}`,
          {},
          authHeader(accessToken),
        ),
      getTotalCountById: (params: APIParams.CountNumber): Promise<number> =>
        marketplaceApi.post(API_ENDPOINTS.TOTAL_COUNT, params),
      getFloorPrice: (params: {
        address: Address | string;
      }): Promise<APIResponse.FloorPrice> => {
        const requestData = {
          address: params.address,
        };
        return marketplaceApi.post(
          API_ENDPOINTS.FLOOR_PRICE,
          requestData,
          authHeader(),
        );
      },
    };
  }, [authHeader]);
};
