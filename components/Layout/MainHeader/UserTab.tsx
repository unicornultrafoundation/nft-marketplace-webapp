import { Spinner } from "flowbite-react";
import Text from "@/components/Text";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getUserAvatarImage } from "@/utils/string";
import { APIResponse } from "@/services/api/types";
import Icon from "@/components/Icon";

interface Props {
  loading?: boolean;
  data?: APIResponse.SearchUsers | undefined;
  onClose?: () => void;
}

export default function SearchUserTab({ loading, data, onClose }: Props) {
  if (loading)
    return (
      <div className="w-full h-56 flex justify-center items-center">
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
      {data.data.map((user) => (
        <Link
          onClick={onClose}
          href={`/user/${user.id}`}
          key={user.id}
          className="flex items-center justify-between gap-3  px-1 py-1 rounded-xl opacity-60 hover:bg-gray-50 hover:opacity-100 transition-opacity"
        >
          <div className="flex flex-1 items-center gap-2">
            <Image
              className="w-8 h-8 rounded-xl object-cover"
              width={25}
              height={25}
              src={getUserAvatarImage(user)}
              alt="Avatar"
            />
            <div className="flex items-center gap-1">
              <Text className="font-semibold text-primary" variant="body-16">
                {user.username}
              </Text>
              {user.accountStatus ? (
                <Icon name="verify-active" width={20} height={20} />
              ) : (
                <Icon name="verify-disable" width={20} height={20} />
              )}
            </div>
          </div>
        </Link>
      ))}
      <Link
        onClick={onClose}
        href={`/explore/users`}
        className=" border border-tertiary rounded-xl mt-1 py-1 bg-gray-100"
      >
        <div className="flex gap-1 items-center justify-center">
          <Icon name="search" width={25} height={25} />
          <Text className="font-semibold text-primary" variant="body-14">
            See all Users
          </Text>
        </div>
      </Link>
    </div>
  );
}
