import React from "react";
import Image from "next/image";
import EditProfile from "../button/EditProfile";
import Icon from '@/components/Icon'

interface Props {
  name: string
  bio: string
  backgroundImage?: any
  avatarImage?: any
  totalFollower: string
  totalFollowing: string
  isVerify: boolean
}

export default function Profile({ name, totalFollower, totalFollowing, bio, avatarImage, backgroundImage, isVerify }: Props) {

  return (
    <div className="">
      <div className="flex">
        <div className="w-full relative">
          <Image src={backgroundImage} alt="user-detail-bg" className="w-full h-auto" />

          <div className="absolute border-white rounded-2xl pl-[80px]"
               style={{ bottom: '0', transform: 'translateY(50%)' }}>
            <Image src={avatarImage} alt="user-detail-bg" width={120} height={120} />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between pt-[80px] px-[80px] mb-[56px]">
        <div className="">
          <div className="flex flex-col gap-[24px]">
            <div className="flex items-center ">
              <text className="font-semibold text-[32px] pr-2">{name}</text>
              {isVerify && <Icon name="verified" width={24} height={24} />}
            </div>
            <div>
              <text className="text-secondary text-sm">{bio}</text>
            </div>
            <div className="">
              <EditProfile />
            </div>
          </div>

          <div className="flex gap-[24px] mt-[40px]">
            <div>
              <span className="text-sm font-medium pr-1">{totalFollower}</span>
              <span className="text-secondary text-sm">Followers</span>
            </div>
            <div>
              <span className="text-sm font-medium pr-1">{totalFollowing}</span>
              <span className="text-secondary text-sm">Following</span>
            </div>
          </div>
        </div>
        <button className="bg-button-secondary h-[40px] w-[40px] rounded-xl flex justify-center items-center ">
          <Icon name="more-vertical" width={20} height={20} />
        </button>
      </div>
    </div>
  )
}
