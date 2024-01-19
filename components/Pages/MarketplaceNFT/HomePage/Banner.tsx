"use client"

import Text from '@/components/Text'
import { Carousel, CustomFlowbiteTheme } from 'flowbite-react'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { HEADER_HEIGHT } from '@/components/Layout/MainHeader'
import Image from 'next/image'
import defaultSlider1 from '@/assets/images/default-slider-1.png'
import defaultSlider2 from '@/assets/images/default-slider-2.png'
import defaultSlider3 from '@/assets/images/default-slider-3.png'
import defaultSlider4 from '@/assets/images/default-slider-4.png'
import defaultSlider5 from '@/assets/images/default-slider-5.png'
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CAMPAIGN_URL } from "@/config/constants";

const carouselTheme: CustomFlowbiteTheme['carousel'] = {
  control: {
    base: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-7 sm:w-7",
    icon: "h-4 w-4 text-white sm:h-5 sm:w-5"
  },
  indicators: {
    active: {
      off: "bg-white/50 hover:bg-white",
      on: "bg-white"
    },
    base: "h-1 w-5 rounded-full",
    wrapper: "absolute bottom-3 left-1/2 flex -translate-x-1/2 space-x-3"
  }
}

export default function HomePageBanner() {
  const router = useRouter()

  const sliderImages = [
    { src: defaultSlider1, alt: 'Slide 1', showButton: true, link: CAMPAIGN_URL },
    { src: defaultSlider2, alt: 'Slide 2', showButton: true, link: '' },
    { src: defaultSlider3, alt: 'Slide 3', showButton: true, link: '' },
    { src: defaultSlider4, alt: 'Slide 4', showButton: true, link: '' },
    { src: defaultSlider5, alt: 'Slide 5', showButton: true, link: '' }
  ];

  return (
    <div
      className="flex items-stretch justify-center gap-12 bg-transparent flex-col desktop:flex-row tablet:flex-row tablet:w-full my-8 mx-4 tablet:mx-auto desktop:mx-auto">
      <div className="flex justify-center items-center order-2 tablet:order-1">
        <div className="desktop:w-[611px] w-full tablet:pl-8">
          <Text className="desktop:text-heading-xl text-body-40 text-primary font-semibold mb-12">
            Discover digital art and Collect NFTs
          </Text>
          <div className="flex items-center gap-4 flex-col tablet:flex-row desktop:flex-row">
            <Button
              onClick={() => router.push('/create/nft')}
              className="bg-purple-500 hover:bg-purple-500/80 w-full tablet:w-auto desktop:w-auto">
              Create your NFTs
              <Icon name="arrowRight" />
            </Button>
            <Button
              onClick={() => router.push('/explore/items')}
              className="w-full tablet:w-auto desktop:w-auto"
              variant="secondary">
              Start exploring
              <Icon name="arrowRight" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center order-1 tablet:order-2">
        <div
          className="desktop:w-[480px] desktop:h-[480px] tablet:w-[340px] tablet:h-[340px] w-full h-[320px] tablet:pr-8">
          <Carousel pauseOnHover theme={carouselTheme} indicators={true}>
            {sliderImages.map((image, index) => (
              <div key={index} className="flex h-full w-full  justify-center items-center">
                <Image
                  className="rounded-tl-xl rounded-tr-xl object-cover"
                  src={image.src}
                  alt={image.alt}
                  width={500}
                  style={{ width: '100%', height: '100%' }}
                />
                {image.showButton && (
                  <div
                    className="absolute bottom-8 px-10 w-full">
                    <Link target="_blank" href={image.link}>
                      <Button
                        className="w-full flex items-center justify-center  shadow-2xl shadow-cyan-500/50 opacity-70 hover:opacity-100"
                        scale="lg"
                        variant="secondary">
                           <span className="text-black">
                             Open Link
                           </span>
                        {/*<Icon name="arrowRight"/>*/}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  )
}