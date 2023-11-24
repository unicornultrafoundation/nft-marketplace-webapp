import React from "react";
import Image from "next/image";
import "../cardNFT/style.scss";
import Image1 from "@/assets/images/dark_rider-cover.jpeg"
import Image2 from "@/assets/images/dark_rider-title.png"
import Image3 from "@/assets/images/dark_rider-character.webp"






export default function Test() {

    return (
        <div className="">
            <a href="" alt="" target="_blank">
                <div class="card">
                    <div class="wrapper">
                        <Image src={Image1} alt=""
                             className="cover-image"/>
                    </div>
                    <Image src={Image2} alt="" className="title"/>
                    <Image src={Image3} alt=""
                         className="character"/>
                </div>
            </a>
        </div>
    )
}
