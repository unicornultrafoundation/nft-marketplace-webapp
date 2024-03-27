import { Address, useAccount } from "wagmi";
import { contracts } from "@/config/contracts";
import useAuthStore from "@/store/auth/store";
import { AssetType } from "@/types";
import { writeContract, waitForTransaction } from "@wagmi/core";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";
import { MARKETPLACE_URL } from "@/config/constants";
import { parseImageUrl } from "@/utils/nft";

export const useCreateNFT = (type: AssetType) => {
  const api = useMarketplaceApi();
  const { address } = useAccount();
  const userId = useAuthStore((state) => state.profile?.id);

  // const proxyContract = type === 'ERC721' ? contracts.erc721Proxy : contracts.erc1155Proxy

  const onCreateNFT = async (params: Record<string, any>) => {
    if (!userId || !type || !address) return;
    const {
      collection,
      description,
      image,
      traits,
      royalties,
      name,
      amount,
      animation_url,
    } = params;
    const royaltiesBigInt = BigInt(Number(Number(royalties).toFixed(2)) * 100);

    const { id, u2uId } = await api.generateTokenId(collection);

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
    };

    const { metadataHash } = await api.uploadMetadata(metadata);

    const mintERC721 = () => {
      const tokenArgs = {
        tokenId: BigInt(BigInt(u2uId).toString()),
        tokenURI: metadataHash,
        creators: [{ account: address, value: BigInt(10000) }],
        royalties: [{ account: address, value: royaltiesBigInt }],
        signatures: ["0x"] as Address[],
      };

      return writeContract({
        address: collection,
        abi: contracts.erc721Proxy.abi,
        functionName: "mintAndTransfer",
        args: [tokenArgs, address],
        value: BigInt(0) as any,
      });
    };

    const mintERC1155 = () => {
      const tokenArgs = {
        tokenId: BigInt(u2uId),
        tokenURI: metadataHash,
        supply: amount,
        creators: [{ account: address, value: BigInt(10000) }],
        royalties: [{ account: address, value: royaltiesBigInt }],
        signatures: ["0x"] as Address[],
      };

      return writeContract({
        address: collection,
        abi: contracts.erc1155Proxy.abi,
        functionName: "mintAndTransfer",
        args: [tokenArgs, address, amount],
        value: BigInt(0) as any,
      });
    };

    const tx = await (type === "ERC721" ? mintERC721() : mintERC1155());

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
      traits: traits,
    };

    await Promise.all([
      waitForTransaction({ hash: tx.hash }),
      api.createNFT(createNFTParams),
    ]);
  };

  return { onCreateNFT };
};
