"use client";

import React from "react";
import { wagmiConfig } from "@/config/wagmi";
import { WagmiConfig } from "wagmi";
import { Flowbite } from "flowbite-react";
import appTheme from "@/config/flowbite";
import { SWRConfig } from "swr";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          refreshInterval: 0,
        }}
      >
        <Flowbite theme={{ theme: appTheme }}>{children}</Flowbite>
      </SWRConfig>
    </WagmiConfig>
  );
}
