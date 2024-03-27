import { Spinner } from "flowbite-react";
import Text from "@/components/Text";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import placeholderImage from "@/assets/images/placeholder-image.svg";
import Icon from "@/components/Icon";
import { APIResponse } from "@/services/api/types";

interface Props {
  loading?: boolean;
  data?: APIResponse.SearchCollections | undefined;
  onClose?: () => void;
}

export default function SearchCollectionTab({ loading, data, onClose }: Props) {
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
    <div className="pt-4 flex flex-col gap-2">
      {data.data.map((collection) => {
        return (
          <Link
            onClick={onClose}
            href={`/collection/${collection.id}`}
            key={collection.id}
            className="flex items-center justify-between gap-3  px-1 py-1 rounded-xl opacity-60 hover:bg-gray-50 hover:opacity-100 transition-opacity"
          >
            <div className="flex flex-1 items-center gap-2">
              <Image
                className="w-8 h-8 rounded-xl object-cover"
                width={25}
                height={25}
                src={collection.avatar || placeholderImage}
                alt="Image"
              />
              <div className="flex items-center gap-1">
                <Text className="font-semibold text-primary" variant="body-16">
                  {collection.name}
                </Text>
                {collection.creators &&
                collection.creators.length > 0 &&
                collection.creators[0].user.accountStatus &&
                collection.isVerified ? (
                  <Icon name="verify-active" width={20} height={20} />
                ) : (
                  <Icon name="verify-disable" width={20} height={20} />
                )}
              </div>
            </div>
            <Text className="font-semibold">{collection.floorPrice} U2U</Text>
          </Link>
        );
      })}
      <Link
        onClick={onClose}
        href={`/explore/collections`}
        className=" border border-tertiary rounded-xl mt-1 py-1 bg-gray-100"
      >
        <div className="flex gap-1 items-center justify-center">
          <Icon name="search" width={22} height={22} />
          <Text className="font-semibold text-primary" variant="body-14">
            See all Collections
          </Text>
        </div>
      </Link>
    </div>
  );
}
