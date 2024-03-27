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
  value?: string | Blob;
  onInput?: (file: Blob | undefined) => void;
  loading?: boolean;
  error?: boolean;
  accept?: string;
  maxSize?: number;
}

export default function ImageUploader({
  className,
  value,
  onInput,
  loading,
  error,
  accept,
  maxSize = 100, // 100 MB
}: Props) {
  const [file, setFile] = useState<Blob | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  const fileType = useMemo(() => {
    if (!file) return undefined;
    return file.type.split("/")[0];
  }, [file]);

  const previewImage = useMemo(() => {
    if (value) {
      if (typeof value === "string") return value;
      return URL.createObjectURL(value);
    }

    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file, value]);

  const handleInputImage = (files: FileList | null) => {
    if (files && files[0].size < maxSize * 1024 ** 2) {
      onInput?.(files[0]);
      setFile(files[0]);
    } else {
      onInput?.(undefined);
      setFile(undefined);
      toast.error(`File extension is larger than the allowed size`);
    }
  };

  const handleClearFile = () => {
    onInput?.(undefined);
    setFile(undefined);
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const renderFile = () => {
    if (!file) {
      return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-6">
          <Text
            className="font-semibold text-secondary text-center"
            variant="body-24"
          >
            <span className="uppercase">{accept?.split(",").join(", ")}</span>{" "}
            Max {maxSize}mb.
          </Text>
          <Button variant="primary">Choose File</Button>
        </div>
      );
    }
    switch (fileType) {
      case "image":
        return (
          <Image
            src={previewImage}
            alt=""
            width={256}
            height={256}
            className="w-auto h-full object-contain rounded-2xl m-auto"
          />
        );
      case "video":
        return (
          <video className="w-full h-full rounded-2xl" controls>
            <source src={URL.createObjectURL(file)} type={file.type} />
            Your browser does not support the video tag.
          </video>
        );
      case "audio":
        return (
          <div className="w-full h-full rounded-2xl bg-black flex justify-center items-end p-2">
            <audio className="w-full h-[25px]" controls>
              <source src={URL.createObjectURL(file)} type={file.type} />
              Your browser does not support the audio tag.
            </audio>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={classNames(
        "relative cursor-pointer p-3 border border-dashed rounded-2xl w-full h-60",
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
        ref={inputRef}
        accept={accept}
        onChange={(e) => handleInputImage(e.target.files)}
      />

      {renderFile()}

      {!!file &&
        (loading ? (
          <Spinner className="absolute right-0 top-[-18px]" />
        ) : (
          <Button
            variant="icon"
            className="absolute right-0 top-[-18px]"
            onClick={handleClearFile}
          >
            <CloseIcon width={20} height={20} />
          </Button>
        ))}
    </div>
  );
}
