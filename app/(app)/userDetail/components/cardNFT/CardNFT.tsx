import React from "react";
import VerifySticker from "@/assets/svg/verify-sticker";
import Image from "next/image";
import Image1 from "@/assets/images/dark_rider-cover.jpeg";
import Image2 from "@/assets/images/dark_rider-title.png";
import Image3 from "@/assets/images/dark_rider-character.webp";
import Image4 from "@/assets/images/card-image-removebg.png";
import "./style.scss";


interface Props {
    name : string
    amount : number
    symbol : string
    nftImg? : any
    category : string
    isVerify : boolean
}

export default function CardNFT({name,amount,symbol,nftImg,category,isVerify}: Props) {

    return (
            <div className="border rounded-2xl ">
                <div className="p-[8px] ">
                    {/*<Image src ={nftImg} alt="card" className="w-full h-auto "></Image>*/}

                    <div class="card">
                        <div class="wrapper">
                            {/*<Image src={Image1} alt=""*/}
                            {/*       className="cover-image"/>*/}
                            <Image src ={nftImg} alt="card" className="cover-image "></Image>
                        </div>
                        {/*<Image src={Image2} alt="" className="title"/>*/}
                        <Image src={nftImg} alt=""
                               className="character"/>
                    </div>
                </div>
                <div className=" flex flex-col gap-[8px] pt-[4px] pb-[12px] px-[12px]">
                    <div className="flex gap-2 text-secondary">
                        {isVerify && <VerifySticker width={24} height={24}/>}
                        <span>{name}</span>
                    </div>
                    <div >
                        <span className="text-primary font-medium">{category}</span>
                    </div>
                    <div>
                        <span>{amount} {symbol}</span>
                    </div>
                </div>
            </div>
    )
}
