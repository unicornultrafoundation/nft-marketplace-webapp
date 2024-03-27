import { Spinner } from "flowbite-react";
import Text from "@/components/Text";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ALLOWED_VIDEO_TYPES } from "@/config/constants";
import placeholderImage from "@/assets/images/placeholder-image.svg";
import Icon from "@/components/Icon";
import { APIResponse } from "@/services/api/types";

interface Props {
  loading?: boolean;
  data?: APIResponse.SearchNFTs | undefined;
  onClose?: () => void;
}

export default function SearchNFTTab({ loading, data, onClose }: Props) {
  if (loading)
    return (
      <div className="w-full flex justify-center items-center mt-4">
        <Spinner size="xl" />
      </div>
    );

  if (!data || !data.data.length) {
    return (
      <div className="w-full flex justify-center items-center p-4 rounded-2xl border border-disabled border-dashed mt-4">
        <Text className="text-secondary font-semibold text-body-18">
          Nothing to show
        </Text>
      </div>
    );
  }

  return (
    <div className="pt-4 flex flex-col gap-1">
      {data.data.map((nft) => {
        const displayMedia = nft.animationUrl || nft.image;
        const fileExtension = displayMedia ? displayMedia.split(".").pop() : "";
        return (
          <Link
            onClick={onClose}
            href={`/item/${nft.collection?.address}/${nft.id}`}
            key={nft.collection?.address + "-" + nft.u2uId}
            className="flex items-center justify-between gap-3  px-1 py-1 rounded-xl opacity-60 hover:bg-gray-50 hover:opacity-100 transition-opacity"
          >
            <div className="flex flex-1 items-center gap-2">
              {(() => {
                if (!fileExtension) {
                  return <div className="w-8 h-8" />;
                }
                switch (true) {
                  case ALLOWED_VIDEO_TYPES.includes(fileExtension):
                    return (
                      <video className="w-8 h-8 rounded-2xl" controls>
                        <source
                          src={displayMedia}
                          type={`video/${fileExtension}`}
                        />
                        Your browser does not support the video tag.
                      </video>
                    );
                  default:
                    return (
                      <Image
                        className="w-8 h-8 rounded-xl object-cover"
                        width={25}
                        height={25}
                        src={nft.image || nft.animationUrl || placeholderImage}
                        alt="NFT Image"
                      />
                    );
                }
              })()}

              <div>
                <Text className="font-semibold text-primary" variant="body-16">
                  {nft.name}
                </Text>
              </div>
            </div>
          </Link>
        );
      })}
      <Link
        onClick={onClose}
        href={`/explore/items`}
        className=" border border-tertiary rounded-xl mt-1 py-1 bg-gray-100"
      >
        <div className="flex gap-1 items-center justify-center">
          <Icon name="search" width={25} height={25} />
          <Text className="font-semibold text-primary" variant="body-14">
            See all NFTs
          </Text>
        </div>
      </Link>
    </div>
  );
}
