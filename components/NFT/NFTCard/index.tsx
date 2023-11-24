import React from "react";
import VerifySticker from "@/assets/svg/verify-sticker";
import Image from "next/image";
import "./style.scss";

interface Props {
  name: string
  amount: number
  symbol: string
  nftImg?: any
  category: string
  isVerify: boolean
}

export default function NFTCard({ name, amount, symbol, nftImg, category, isVerify }: Props) {

  return (
    <div className="border rounded-2xl">
      <div className="p-[8px] ">
        <div className="card">
          <div className="wrapper">
            <Image src={nftImg} alt="card" className="cover-image" />
          </div>
          <Image src={nftImg} alt="" className="character" />
        </div>
      </div>
      <div className=" flex flex-col gap-2 pt-1 pb-3 px-3">
        <div className="flex gap-2 text-secondary">
          {isVerify && <VerifySticker width={24} height={24} />}
          <span>{name}</span>
        </div>
        <span className="text-primary font-medium">{category}</span>
        <span>{amount} {symbol}</span>
      </div>
    </div>
  )
}
