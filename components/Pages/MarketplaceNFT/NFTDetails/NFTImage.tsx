import Image from "next/image";
import React, { useMemo } from "react";
import {
  ALLOWED_AUDIO_TYPES,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
} from "@/config/constants";
import { NFT } from "@/types";
import { convertImageUrl } from "@/utils/nft";

export default function NFTImage({ item }: { item: NFT }) {
  const displayMedia = useMemo(
    () => convertImageUrl(item?.animationUrl || item?.image),
    [item?.animationUrl, item?.image],
  );
  const fileExtension = useMemo(
    () => displayMedia?.split(".").pop(),
    [displayMedia],
  );

  const fileType = useMemo(() => {
    if (!fileExtension) return "image";

    switch (true) {
      case ALLOWED_AUDIO_TYPES.includes(fileExtension):
        return "audio";
      case ALLOWED_VIDEO_TYPES.includes(fileExtension):
        return "video";
      case ALLOWED_IMAGE_TYPES.includes(fileExtension):
        return "image";
      default:
        return "image";
    }
  }, [fileExtension]);

  const renderMedia = () => {
    if (!displayMedia) return null;
    switch (fileType) {
      case "audio":
        return (
          <div className="desktop:w-[640px] desktop:h-[614px] tablet:w-[410px] tablet:h-[394px] w-[341px] h-[341px] relative">
            <Image
              src={item?.image || ""}
              alt=""
              width={512}
              height={512}
              className="object-cover w-full h-full rounded-2xl mb-10"
            />
            <audio className="absolute bottom-0 h-10 desktop:w-[640px] tablet:w-[410px] w-[341px]" controls>
              <source
                src={displayMedia}
                type={`${fileType}/${fileExtension}`}
              />
              Your browser does not support the audio tag.
            </audio>
          </div>
        );
      case "video":
        return (
          <video
            className="desktop:w-[640px] desktop:h-[614px] tablet:w-[410px] tablet:h-[394px] w-[341px] h-[341px] rounded-2xl mb-10"
            controls
          >
            <source src={displayMedia} type={`${fileType}/${fileExtension}`} />
            Your browser does not support the video tag.
          </video>
        );
      case "image":
        return (
          <div className="desktop:w-[640px] desktop:h-[614px] tablet:w-[410px] tablet:h-[394px] w-[341px] h-[341px]">
            <Image
              src={displayMedia}
              alt=""
              width={512}
              height={512}
              className="object-cover w-full h-full rounded-2xl mb-10"
            />
          </div>
        );
    }
  };

  return renderMedia();
}
