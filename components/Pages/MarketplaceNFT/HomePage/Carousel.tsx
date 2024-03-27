"use client";

import { Carousel, CustomFlowbiteTheme } from "flowbite-react";
import Button from "@/components/Button";
import Image from "next/image";
import defaultSlider1 from "@/assets/images/default-slider-1.png";
import defaultSlider2 from "@/assets/images/default-slider-2.png";
import defaultSlider3 from "@/assets/images/default-slider-3.png";
import defaultSlider4 from "@/assets/images/default-slider-4.png";
import defaultSlider5 from "@/assets/images/default-slider-5.png";
import Link from "next/link";
import { CAMPAIGN_URL } from "@/config/constants";
import { useEffect, useState } from "react";

const carouselTheme: CustomFlowbiteTheme["carousel"] = {
  root: {
    base: "relative h-full w-full",
    leftControl:
      "absolute top-0 desktop:left-[-17px] tablet:left-[-10px] left-[-5px] flex h-full items-center justify-center focus:outline-none",
    rightControl:
      "absolute top-0 desktop:right-[-17px] tablet:right-[-10px] right-[-5px] flex h-full items-center justify-center focus:outline-none",
  },
  control: {
    base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-surface-soft/70 group-hover:bg-surface-soft group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10",
    icon: "h-4 w-4 text-black/70 sm:h-5 sm:w-5",
  },
  indicators: {
    active: {
      off: "bg-white/50 hover:bg-white",
      on: "bg-white",
    },
    base: "h-1 w-5 rounded-full",
    wrapper: "absolute bottom-3 left-1/2 flex -translate-x-1/2 space-x-3",
  },
  item: {
    base: "absolute px-3 desktop:px-1 top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
  },
};

export default function CarouselBanner() {
  const sliderImages = [
    {
      src: defaultSlider1,
      alt: "Slide 1",
      showButton: false,
      link: CAMPAIGN_URL,
    },
    { src: defaultSlider2, alt: "Slide 2", showButton: false, link: "" },
    { src: defaultSlider3, alt: "Slide 3", showButton: false, link: "" },
    { src: defaultSlider4, alt: "Slide 4", showButton: false, link: "" },
    { src: defaultSlider5, alt: "Slide 5", showButton: false, link: "" },
  ];

  return (
    <div className="flex justify-center items-center w-full">
      <div className="desktop:w-[480px] desktop:h-[480px] tablet:w-[340px] tablet:h-[340px] w-full h-[320px] ">
        <Carousel
          pauseOnHover
          theme={carouselTheme}
          indicators={true}
          slideInterval={5000}
        >
          {sliderImages.map((image, index) => (
            <div
              key={index}
              className="flex h-full w-full  justify-center items-center"
            >
              <Image
                className="rounded-2xl object-cover w-full h-full"
                src={image.src}
                alt={image.alt}
                width={500}
              />
              {image.showButton && (
                <div className="absolute bottom-8 px-10 w-full">
                  <Link target="_blank" href={image.link}>
                    <Button
                      className="w-full flex items-center justify-center  shadow-2xl shadow-cyan-500/50 opacity-70 hover:opacity-100"
                      scale="lg"
                      variant="secondary"
                    >
                      <span className="text-black">Discover</span>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
