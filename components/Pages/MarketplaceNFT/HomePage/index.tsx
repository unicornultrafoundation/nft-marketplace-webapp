"use client";

import Text from "@/components/Text";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useRouter } from "next/navigation";
import CarouselBanner from "@/components/Pages/MarketplaceNFT/HomePage/Carousel";

export default function HomePageBanner() {
  const router = useRouter();

  return (
    <div className="flex justify-center gap-14 desktop:gap-0 tablet:gap-0 flex-col-reverse tablet:flex-row desktop:flex-row w-full px-4 py-8 tablet:px-20 tablet:py-8 desktop:px-20 desktop:py-8">
      <div className="flex desktop:justify-center tablet:justify-center items-center w-full">
        <div className="w-full desktop:w-auto table:w-auto">
          <div className="pl-0 tablet:pl-8 desktop:pl-12 w-full">
            <Text className="desktop:text-heading-xl tablet:text-body-40 text-body-40 text-primary font-semibold mb-8 tablet:mb-12 desktop:mb-12 w-[343px] desktop:w-[611px] tablet:w-[360px]">
              Discover digital art and Collect NFTs
            </Text>
            <div className="flex items-center gap-4 flex-col tablet:flex-row desktop:flex-row">
              <Button
                onClick={() => router.push("/create/nft")}
                className="bg-purple-500 hover:bg-purple-500/80 w-full tablet:w-auto desktop:w-auto"
              >
                Create your NFTs
                <Icon name="arrowRight" />
              </Button>
              <Button
                onClick={() => router.push("/explore/items")}
                className="w-full tablet:w-auto desktop:w-auto"
                variant="secondary"
              >
                Start exploring
                <Icon name="arrowRight" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <CarouselBanner />
    </div>
  );
}
