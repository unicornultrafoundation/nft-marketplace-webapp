// export const BASE_API_URL = process.env.NODE_ENV === 'development' ? 'https://marketplace-api-dev.uniultra.xyz' : ''
export const BASE_API_URL = process.env.NODE_ENV === 'development' ? 'https://b10g0wn1-8888.asse.devtunnels.ms' : ''

export const API_ENDPOINTS = {
  CONNECT: '/auth/connect',
  PROFILE: '/user/profile',
  COLLECTIONS: '/collection',
  USER_COLLECTIONS: '/collection/user',
  UPLOAD_IMAGE: '/common/upload-ipfs',
  TOKEN_ID: '/nft/tokenId',
  CREATE_NFT: '/nft',
  SEARCH_NFTS: '/nft/search'
}