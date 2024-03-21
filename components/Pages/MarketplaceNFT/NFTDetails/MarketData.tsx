import Image from "next/image";
import Icon from "@/components/Icon";
import Text from "@/components/Text";
import Button from "@/components/Button";
import NFTActions from "./NFTActions";
import { useNFTMarketStatus } from "@/hooks/useMarket";
import { formatUnits } from "ethers";
import Link from "next/link";
import { Tooltip } from "flowbite-react";
import { NFT } from "@/types";
import { APIResponse } from "@/services/api/types";
import {
  getDisplayedUserName,
  getUserAvatarImage,
  getUserLink,
} from "@/utils/string";
import { formatDisplayedNumber } from "@/utils";
import { useMemo } from "react";
import { findTokenByAddress } from "@/utils/token";

export default function NFTMarketData({
  nft,
  marketData,
}: {
  nft: NFT;
  marketData?: APIResponse.NFTMarketData;
}) {
  const type = nft.collection.type;

  const { isOnSale, saleData } = useNFTMarketStatus(type, marketData);
  const token = useMemo(
    () => findTokenByAddress(marketData?.sellInfo[0]?.quoteToken),
    [marketData?.sellInfo],
  );

  if (!marketData) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10 desktop:w-auto tablet:w-full">
      {/* NFT info */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-2  items-center">
          <Text
            showTooltip
            labelTooltip={nft.collection.name}
            className="w-auto max-w-[300px]"
          >
            <Link
              href={`/collection/${nft.collection.id}`}
              className="text-secondary underline"
            >
              {nft.collection.name}
            </Link>
          </Text>
          {nft.collection.isVerified && nft.creator?.accountStatus ? (
            <Icon name="verified" width={20} height={20} />
          ) : (
            <Icon name="verify-disable" width={20} height={20} />
          )}
        </div>

        <Tooltip content={nft.name} placement="bottom">
          <div className="desktop:max-w-[350px] tablet:max-w-[350px] w-full overflow-hidden">
            <Text
              className="font-bold text-primary desktop:text-body-40 tablet:text-body-40 text-body-24 text-ellipsis"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {nft.name}
            </Text>
          </div>
        </Tooltip>

        {!!nft.creator && (
          <Text className="text-secondary" variant="body-16">
            Created by{" "}
            <Link
              href={`/user/${nft.creator.id}`}
              className="text-primary underline"
            >
              {nft.creator.username}
            </Link>
          </Text>
        )}

        {type === "ERC721" && (
          <div className="flex items-center gap-2">
            <Text className="text-secondary" variant="body-16">
              Current Owner:
            </Text>
            <Link
              className="hover:underline flex items-center gap-1"
              href={getUserLink(marketData.owners[0])}
            >
              <Image
                width={56}
                height={56}
                className="w-6 h-6 rounded-full"
                src={getUserAvatarImage(marketData.owners[0])}
                alt="avatar"
              />
              {getDisplayedUserName(marketData.owners[0])}
            </Link>
          </div>
        )}
      </div>

      <div className="inline-flex gap-3">
        <Button variant="secondary" disabled>
          <Icon name="share" width={16} height={16} />
          Share
        </Button>
        <Button variant="secondary" disabled>
          <Icon name="refresh" width={16} height={16} />
          Refresh metadata
        </Button>
        <Button variant="icon" disabled>
          <Icon name="moreVertical" width={16} height={16} />
        </Button>
      </div>

      {/* Actions */}
      <div className="bg-surface-soft shadow rounded-2xl p-3">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <Text
                className="text-secondary mb-2 font-semibold"
                variant="body-16"
              >
                {type === "ERC1155" && "Best "}Price
              </Text>
              {isOnSale ? (
                <div className="flex items-start justify-between">
                  <Text variant="heading-md">
                    <span className="text-primary font-semibold">
                      {formatDisplayedNumber(formatUnits(saleData?.price || 0))}
                    </span>
                    &nbsp;
                    <span className="text-secondary">{token?.symbol}</span>
                  </Text>
                </div>
              ) : (
                <Text># Not for sale</Text>
              )}
            </div>

            {type === "ERC1155" && isOnSale && (
              <div>
                <Text
                  className="text-secondary mb-2 font-semibold text-right"
                  variant="body-16"
                >
                  Quantity
                </Text>
                <Text className="text-right" variant="heading-md">
                  {saleData?.quantity}
                </Text>
              </div>
            )}
          </div>
        </div>

        <NFTActions nft={nft} marketData={marketData} />
      </div>
    </div>
  );
}
