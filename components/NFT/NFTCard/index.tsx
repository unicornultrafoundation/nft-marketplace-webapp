import React from "react";
import VerifySticker from "@/assets/svg/verify-sticker";
import Image from "next/image";
import "./style.scss";
import { APIResponse } from '@/services/api/types'
import { useRouter } from 'next/navigation'

export default function NFTCard({ name, id, creator, collection }: APIResponse.NFT) {
  const router = useRouter()

  return (
    <div className="border rounded-2xl">
      <div className="p-2">
        <div
          className="card"
          onClick={() => router.push(`/item/${id}`)}>
          <div className="wrapper">
            <Image
              src={'https://flowbite.com/docs/images/carousel/carousel-3.svg'}
              width={1}
              height={1}
              alt="image"
              className="cover-image rounded-2xl" />
          </div>
          <Image
            src={'https://flowbite.com/docs/images/carousel/carousel-3.svg'}
            alt="image"
            className="character rounded-2xl"
            width={1}
            height={1} />
        </div>
      </div>

      <div className=" flex flex-col gap-2 pt-1 pb-3 px-3">
        <div className="flex gap-2 text-secondary">
          <VerifySticker width={24} height={24} />
          <span>{name}</span>
        </div>
        <span className="text-primary font-medium">{collection.name}</span>
        <span>0 U2U</span>
      </div>
    </div>
  )
}
