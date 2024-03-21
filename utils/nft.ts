import { BASE_API_URL } from "@/config/api";

export const parseImageUrl = (url?: string) => {
  if (!url) return "";
  return BASE_API_URL + "/common/ipfs-serve?ipfsPath=" + url;
};

export const convertImageUrl = (url?: string): string => {
  const baseURL = BASE_API_URL + "/common/ipfs-serve?ipfsPath=";
  if (!url) return "";

  const ipfsPrefix = ["https://ipfs.io/ipfs/", "testnet-api.memetaverse.club", "u2u-images.s3.ap-southeast-1.amazonaws.com"]; 

  if (url.startsWith(ipfsPrefix[0])) { 
    const ipfsPath = url.replace(ipfsPrefix[0], "ipfs://ipfs/");
    return baseURL + encodeURIComponent(ipfsPath);
  }  else if (url.includes(baseURL) || (ipfsPrefix.some(prefix => url.includes(prefix)))) {
    return url;
  } else {
    return baseURL + encodeURIComponent(url);
  }
};
