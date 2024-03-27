export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL as string;
export const NETWORK_NAME = process.env.NEXT_PUBLIC_NETWORK_NAME as string;
export const BLOCK_EXPLORER_URL = process.env
  .NEXT_PUBLIC_BLOCK_EXPLORER_URL as string;
export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
export const MARKETPLACE_URL = process.env
  .NEXT_PUBLIC_MARKETPLACE_URL as string;
export const ZERO_COLLECTION = process.env.NEXT_PUBLIC_REQUIRED_COLLECTION;
export const SPECIAL_ROUND = process.env.NEXT_PUBLIC_SPECIAL_ROUND_CONTRACT;
export const CAMPAIGN_URL = "https://voyage.u2nft.io/";
export const LAUNCHPAD_APPLY_URL = "https://forms.gle/9MaNk6gQbKccqqAeA";
export const NFT_COLLECTION_VERIFICATION_REQUEST =
  "https://docs.google.com/forms/d/1Klf53N2M29IPkltkMBwXifOEpwrg9yZUgFTpO9socFM/prefill";

export const SIGN_MESSAGE = {
  CONNECT: (time: string) =>
    `I want to login on U2UNFTMarket at ${time}. I accept the U2U Terms of Service https://unicornultra.xyz and I am at least 13 years old.`,
};

export const FINGERPRINT =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

export const ALLOWED_IMAGE_TYPES = ".png,.jpeg, .png, .gif, .webp";
export const ALLOWED_AUDIO_TYPES = ".mp3, .mpeg";
export const ALLOWED_VIDEO_TYPES = ".mp4, .webm";
export const ALLOWED_FILE_TYPES = [
  ALLOWED_IMAGE_TYPES,
  ALLOWED_AUDIO_TYPES,
  ALLOWED_VIDEO_TYPES,
].join(", ");

export const MAX_ROYALTIES = 2000; // 20%

//this mode for get count total number
export const MODE_OWNED = "owner";
export const MODE_CREATED = "creator";
export const MODE_ON_SALES = "onsales";
export const MODE_COLLECTIONS = "collection";
