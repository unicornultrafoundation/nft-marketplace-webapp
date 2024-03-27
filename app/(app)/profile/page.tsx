"use client";

import React, { useEffect } from "react";
import { Tabs } from "flowbite-react";
import AccountStep from "@/components/Pages/MarketplaceNFT/ProfileSettings/AccountStep";
import ProfileStep from "@/components/Pages/MarketplaceNFT/ProfileSettings/ProfileStep";
import WalletStep from "@/components/Pages/MarketplaceNFT/ProfileSettings/WalletStep";
import BannerSection from "@/components/Pages/MarketplaceNFT/ProfileSettings/BannerSection";
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const { isValidSession } = useAuth();
  useEffect(() => {
    if (!isValidSession) return redirect("/");
  }, [isValidSession]);

  return (
    <div className="w-full relative gap-10 tablet:gap-8 desktop:gap-8 flex flex-col items-center desktop:py-10 desktop:px-60 tablet:py-10 tablet:px-16 py-4 px-4">
      <BannerSection />

      <div className="w-full ">
        <Tabs.Group style="underline">
          <Tabs.Item active title="Profile">
            <ProfileStep />
          </Tabs.Item>
          <Tabs.Item active title="Account">
            <AccountStep />
          </Tabs.Item>
          <Tabs.Item active title="Wallet">
            <WalletStep />
          </Tabs.Item>
          {/* <Tabs.Item active title="Notification">
            <NotificationStep />
          </Tabs.Item> */}
        </Tabs.Group>
      </div>
    </div>
  );
}
