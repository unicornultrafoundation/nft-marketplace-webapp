"use client";

import UploadIcon from "@/components/Icon/Upload";
import React, { useMemo, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";
import { toast } from "react-toastify";
import useAuthStore from "@/store/auth/store";
import { APIResponse } from "@/services/api/types";
import { useAuth } from "@/hooks/useAuth";
import { parseImageUrl } from "@/utils/nft";

interface Props {
  cover: string | StaticImageData;
  avatar: string | StaticImageData;
  creators?: APIResponse.CollectionDetails["collection"]["creators"];
  collectionId: string;
}

export default function BannerSectionCollection({
  collectionId,
  cover,
  avatar,
  creators,
}: Props) {
  const { isValidSession } = useAuth();
  const coverImageRef = useRef<HTMLInputElement>(null);
  const wallet = useAuthStore((state) => state.profile?.publicKey);
  const isOwner = useMemo(() => {
    if (!creators || !wallet) return false;
    return (
      creators.some(
        (creator) =>
          creator.user.publicKey.toLowerCase() === wallet.toLowerCase(),
      ) ?? false
    );
  }, [creators, wallet]);

  const api = useMarketplaceApi();

  const handleInputImage = async (files: FileList | null) => {
    if (!files) return;
    const toastId = toast.loading("Uploading Cover image...", { type: "info" });
    try {
      const { fileHashes } = await api.uploadFile(files[0]);

      await api.updateCollection({
        id: collectionId,
        coverImage: parseImageUrl(fileHashes[0]),
      });
      toast.update(toastId, {
        render: "Cover image updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
    } catch (e: any) {
      toast.update(toastId, {
        render: `Error report: ${e.message || e}`,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        closeButton: true,
      });
    } finally {
      if (coverImageRef && coverImageRef.current) {
        coverImageRef.current.value = "";
      }
    }
  };
  return (
    <div
      className="bg-cover relative w-full desktop:h-[220px] tablet:h-[220px] h-[160px]"
      style={{
        background:
          "var(--gradient-001, linear-gradient(90deg, #22C746 -2.53%, #B0F445 102.48%))",
      }}
    >
      <div className="absolute desktop:ml-20 tablet:ml-20 ml-4 block w-[80px] h-[80px] tablet:w-[120px] desktop:w-[120px] tablet:h-[120px] desktop:h-[120px] desktop:bottom-[-46px] tablet:bottom-[-46px] bottom-[-38px]">
        <Image
          src={avatar}
          alt="user-detail-bg"
          width={1440}
          height={220}
          className="rounded-2xl h-full object-cover"
        />
      </div>

      {isOwner && isValidSession && (
        <div className="absolute right-2 top-2 bg-button-secondary rounded-xl w-12 h-12">
          <div className="absolute top-[33%] left-[31%]">
            <UploadIcon width={16} height={16} />
          </div>
          <input
            className="opacity-0"
            type="file"
            ref={coverImageRef}
            onChange={(e) => handleInputImage(e.target.files)}
          />
        </div>
      )}

      {!!cover && (
        <Image
          className="w-full h-full object-cover"
          src={cover}
          alt="Cover"
          width={1200}
          height={256}
        />
      )}
    </div>
  );
}
