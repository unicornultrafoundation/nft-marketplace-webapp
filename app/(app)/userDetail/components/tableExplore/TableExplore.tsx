import React from "react";
import VerifySticker from "@/assets/svg/verify-sticker";
import Image from "next/image";
import TagIcon from "@/assets/svg/tag-icon";
import BoxIcon from "@/assets/svg/box-icon";
import TrendingUpIcon from "@/assets/svg/trending-up-icon";
import DollarSignIcon from "@/assets/svg/dollar-sign-icon";
import RepeatIcon from "@/assets/svg/repeat-icon";





interface Props {
    exploreName : string
    thumbnailImage?: any
    type : string
    price : string
    symbol : string
    by : string
    time: number;
}

const iconMapping = {
    Listed: <TagIcon width={34} height={34} />,
    Minted: <BoxIcon width={34} height={34} />,
    Bids: <TrendingUpIcon width={34} height={34} />,
    Purchased: <DollarSignIcon width={34} height={34} />,
    Transfered: <RepeatIcon width={34} height={34} />,
};

export default function TableExplore({exploreName,type,thumbnailImage,price,symbol,by,time}: Props) {

    return (
        <div
        className="grid grid-cols-5 text-sm text-gray-700 border-b border-gray-200 items-center py-[16px] overflow-y-scroll">
            <div className="">
                <div className="gap-[16px] flex items-center ">
                    <Image src={thumbnailImage} width={48} height={48}/>
                    <p>{exploreName}</p>
                </div>
            </div>
            <div className="gap-[8px] flex items-center">
                {iconMapping[type]}
                <span>{type}</span>
            </div>
            <div>
                <span> {price} {symbol}</span>
            </div>
            <div>
                <a href="">
                    <p className="underline">
                        {by}
                    </p>
                </a>
            </div>
            <div>
                <span> {time}</span>
            </div>
        </div>
    )
}
