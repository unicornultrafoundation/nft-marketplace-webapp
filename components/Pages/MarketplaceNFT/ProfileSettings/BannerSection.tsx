import React, { useRef } from "react";
import Image from "next/image";
import UploadIcon from "@/components/Icon/Upload";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import useAuthStore from "@/store/auth/store";
import { parseImageUrl } from "@/utils/nft";
import { getUserAvatarImage, getUserCoverImage } from "@/utils/string";

export default function BannerSection() {
  const { onUpdateProfile } = useAuth();
  const api = useMarketplaceApi();
  const avatar = useAuthStore((state) => state.profile?.avatar);
  const coverImage = useAuthStore((state) => state.profile?.coverImage);
  const avatarRef = useRef<HTMLInputElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);

  const handleUploadAvatar = async (files: FileList | null) => {
    if (!files) return;
    const toastId = toast.loading("Uploading Avatar image...", {
      type: "info",
    });
    try {
      const { fileHashes } = await api.uploadFile(files[0]);
      await onUpdateProfile({
        avatar: parseImageUrl(fileHashes[0]),
      });
      toast.update(toastId, {
        render: "Avatar updated successfully",
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
      if (avatarRef && avatarRef.current) {
        avatarRef.current.value = ""; // Clear file if user wants to upload another
      }
    }
  };

  const handleUploadCoverImage = async (files: FileList | null) => {
    if (!files) return;

    const toastId = toast.loading("Uploading Cover image...", { type: "info" });
    try {
      const { fileHashes } = await api.uploadFile(files[0]);
      await onUpdateProfile({
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
        coverImageRef.current.value = ""; // Clear file if user wants to upload another
      }
    }
  };

  return (
    <div className="bg-cover relative w-full h-[226px] rounded-2xl">
      <div className="absolute ml-6 bottom-0">
        <input
          className="absolute left-0 right-0 w-full h-full opacity-0 cursor-pointer"
          type="file"
          ref={avatarRef}
          onChange={(e) => handleUploadAvatar(e.target.files)}
        />
        <Image
          className="rounded-2xl w-[120px] h-[120px] object-cover"
          src={avatar || getUserAvatarImage()}
          alt="Avatar"
          width={256}
          height={256}
        />
      </div>

      <div className="absolute right-2 top-2 bg-button-secondary rounded-xl w-12 h-12">
        <div className="absolute top-[33%] left-[31%]">
          <UploadIcon width={16} height={16} />
        </div>
        <input
          className="bg-button-secondary px-4 h-12 w-12 rounded-xl opacity-0"
          type="file"
          ref={coverImageRef}
          onChange={(e) => handleUploadCoverImage(e.target.files)}
        />
      </div>
      <Image
        className="rounded-2xl w-full h-[180px] object-cover"
        src={coverImage || getUserCoverImage()}
        alt="Cover"
        width={1200}
        height={256}
      />
    </div>
  );
}
