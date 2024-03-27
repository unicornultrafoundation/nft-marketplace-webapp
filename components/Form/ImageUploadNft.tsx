"use client";

import Image from "next/image";
import CloseIcon from "@/components/Icon/Close";
import { useMemo, useRef, useState } from "react";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { classNames } from "@/utils/string";
import { Spinner } from "flowbite-react";
import { toast } from "react-toastify";

interface Props {
  className?: string;
  image?: string | Blob;
  onInput?: (file: Blob | undefined) => void;
  loading?: boolean;
  error?: boolean;
}

export default function ImageUploadNft({
  className,
  image,
  onInput,
  loading,
  error,
}: Props) {
  const allowed: any = {
    image: {
      extensions: ["jpg", "jpeg", "png"],
      size: 1000000,
    },
    video: {
      extensions: ["mp4", "MOV"],
      size: 100000000,
    },
    audio: {
      extensions: ["mp3", "ogg"],
      size: 100000000,
    },
  };
  const [file, setFile] = useState<Blob | undefined>();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputCoverRef = useRef<HTMLInputElement>(null);
  const [fileImage, setFileImage] = useState<Blob | undefined>();
  const [fileType, setFileType] = useState<any>();

  const previewUploadFile = useMemo(() => {
    if (image) {
      if (typeof image === "string") return image;
      return URL.createObjectURL(image);
    }

    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file, image]);

  const handleInputUploadFile = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      let newFileType = "";

      if (allowed.image.extensions.includes(fileExtension)) {
        newFileType = "image";
      } else if (allowed.video.extensions.includes(fileExtension)) {
        newFileType = "video";
      } else if (allowed.audio.extensions.includes(fileExtension)) {
        newFileType = "audio";
      } else {
        toast.error(`File extension is not valid.`);
        if (inputFileRef && inputFileRef.current) {
          inputFileRef.current.value = "";
        }
      }

      if (allowed[newFileType]) {
        if (file.size > allowed[newFileType].size) {
          toast.error(`File extension is larger than the allowed size`);
          onInput?.(undefined);
          setFile(undefined);
        } else {
          onInput?.(file);
          setFileType(newFileType);
          setFile(file);
          return;
        }
      }
    }
  };

  const handleClearUploadFile = () => {
    onInput?.(undefined);
    setFile(undefined);
    setFileImage(undefined);
    if (inputFileRef && inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const previewUploadCover = useMemo(() => {
    if (image) {
      if (typeof image === "string") return image;
      return URL.createObjectURL(image);
    }

    if (!fileImage) return "";
    return URL.createObjectURL(fileImage);
  }, [fileImage, image]);

  const handleInputUploadCover = (filesImage: FileList | null) => {
    if (filesImage) {
      onInput?.(filesImage[0]);
      setFileImage(filesImage[0]);
    } else {
      onInput?.(undefined);
      setFileImage(undefined);
    }
  };

  const handleClearUploadCover = () => {
    onInput?.(undefined);
    setFileImage(undefined);
    if (inputCoverRef && inputCoverRef.current) {
      inputCoverRef.current.value = "";
    }
  };

  return (
    <>
      <div
        className={classNames(
          "relative cursor-pointer p-1 border border-dashed rounded-2xl w-full",
          error ? "border-error" : "border-tertiary",
          className,
        )}
      >
        <input
          className={
            !!file
              ? "hidden"
              : `absolute left-0 right-0 w-full h-full opacity-0 cursor-pointer`
          }
          type="file"
          ref={inputFileRef}
          onChange={(e) => handleInputUploadFile(e.target.files)}
        />

        {!!file ? (
          fileType && fileType === "image" ? (
            <Image
              src={previewUploadFile}
              alt=""
              width={256}
              height={256}
              className="w-full h-auto object-cover rounded-2xl"
            />
          ) : fileType && fileType === "video" ? (
            <video className="w-full rounded-2xl" controls>
              <source src={URL.createObjectURL(file)} type={file.type} />
              Your browser does not support the video tag.
            </video>
          ) : fileType && fileType === "audio" ? (
            <div className="w-full h-[256px] rounded-2xl bg-black flex justify-center items-end p-2">
              <audio className="w-full h-[25px]" controls>
                <source src={URL.createObjectURL(file)} type={file.type} />
                Your browser does not support the audio tag.
              </audio>
            </div>
          ) : (
            ""
          )
        ) : (
          <div className="w-full px-10 py-20 flex flex-col justify-center items-center gap-6">
            <Text className="font-semibold text-secondary" variant="body-24">
              PNG, JPG, JPEG, MP4 or MP3. Max 10mb.
            </Text>
            <Button variant="primary">Choose File</Button>
          </div>
        )}

        {!!file &&
          (loading ? (
            <Spinner className="absolute right-0 top-[-18px]" />
          ) : (
            <Button
              variant="icon"
              className="absolute right-0 top-[-18px]"
              onClick={handleClearUploadFile}
            >
              <CloseIcon width={20} height={20} />
            </Button>
          ))}
      </div>

      {!!file &&
        (fileType === "video" || fileType === "audio" ? (
          <>
            <Text className="text-body-16 font-semibold mt-4">
              Upload Cover
            </Text>
            <div
              className={classNames(
                "relative cursor-pointer p-1 border border-dashed rounded-2xl w-full mt-1",
                error ? "border-error" : "border-tertiary",
                className,
              )}
            >
              <input
                className={`absolute left-0 right-0 w-full h-full opacity-0 cursor-pointer`}
                type="file"
                ref={inputCoverRef}
                accept=".png,.jpeg, .png"
                onChange={(e) => handleInputUploadCover(e.target.files)}
              />
              {!!fileImage ? (
                <Image
                  src={previewUploadCover}
                  alt=""
                  width={256}
                  height={256}
                  className="w-full h-auto object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full px-10 py-20 flex flex-col justify-center items-center gap-6">
                  <Text
                    className="font-semibold text-secondary"
                    variant="body-24"
                  >
                    PNG, JPG, JPEG. Max 10mb.
                  </Text>
                  <Button variant="primary">Choose File</Button>
                </div>
              )}
              {!!fileImage &&
                (loading ? (
                  <Spinner className="absolute right-0 top-[-18px]" />
                ) : (
                  <Button
                    variant="icon"
                    className="absolute right-0 top-[-18px]"
                    onClick={handleClearUploadCover}
                  >
                    <CloseIcon width={20} height={20} />
                  </Button>
                ))}
            </div>
          </>
        ) : (
          ""
        ))}
    </>
  );
}
