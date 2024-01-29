import React from "react";
import Image from "next/image";
import Text from '@/components/Text'
import useAuthStore from '@/store/auth/store'
import Button from '@/components/Button'
import Link from 'next/link'
import { User } from '@/types'
import { getUserAvatarImage, getUserCoverImage } from "@/utils/string";
import UserFollow from "@/components/Pages/MarketplaceNFT/UserDetails/UserFollow";
import { formatDisplayedNumber } from "@/utils";
import Icon from "@/components/Icon";


export default function Profile({
                                  id,
                                  username,
                                  bio,
                                  avatar,
                                  coverImage,
                                  accountStatus,
                                  isFollowed,
                                  followers,
                                  following
                                }: User) {
  const myId = useAuthStore(state => state.profile?.id)

  return (
      <div className="">
        <div className="w-full relative">
          <Image
              src={coverImage || getUserCoverImage()}
              width={1200} height={220}
              alt="user-detail-bg"
              className="w-full desktop:h-[220px] tablet:h-[220px] h-[160px] object-cover"/>

          <div className="absolute border-white rounded-2xl desktop:pl-[80px] tablet:pl-[80px] pl-4"
               style={{ bottom: '0', transform: 'translateY(50%)' }}>
            <Image
                src={avatar || getUserAvatarImage()}
                alt="user-detail-bg"
                width={120} height={120}
                className="rounded-2xl w-[80px] h-[80px] tablet:w-[120px] desktop:w-[120px] tablet:h-[120px] desktop:h-[120px]"/>
          </div>
        </div>

        <div className="w-full flex justify-between pt-20 desktop:px-20 tablet:px-20 px-4 mb-14">
          <div className="">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Text className="font-semibold desktop:text-body-32 tablet:text-body-32 text-body-24">{username}</Text>
                {accountStatus ? <Icon name="verified" width={24} height={24}/>
                    :
                    <Link className="flex gap-1" href={`/profile`}>
                      <Icon name="verify-disable" width={24} height={24}/>
                      <span className="text-secondary">Get verified</span>
                    </Link>
                }
              </div>
              <div>
                <Text className="text-secondary text-sm">{bio ? bio : 'Nothing to show'}</Text>
              </div>
              {
                myId === id ?
                    (
                        <Link href="/profile">
                          <Button variant="secondary" scale="sm">
                            Edit profile
                          </Button>
                        </Link>
                    )
                    :
                    (
                        <UserFollow userId={id} isFollowed={isFollowed}/>
                    )
              }
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <Text className="text-body-12 font-medium">{formatDisplayedNumber(followers, 1)}</Text>
                  <Text className="text-body-12 text-secondary">Followers</Text>
                </div>
                <div className="flex gap-2">
                  <Text className="text-body-12 font-medium">{formatDisplayedNumber(following, 1)}</Text>
                  <Text className="text-body-12 text-secondary">Following</Text>
                </div>
              </div>
            </div>
          </div>
          {/* <button className="bg-button-secondary h-10 w-10 rounded-xl flex justify-center items-center ">
          <Icon name="moreVertical" width={20} height={20} />
        </button> */}
        </div>
      </div>
  )
}
