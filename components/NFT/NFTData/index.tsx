import { APIResponse } from "@/services/api/types";
import { Tabs } from "flowbite-react";
import OverviewTab from "./Overview";
import BidsTab from "@/components/NFT/NFTData/Bids";
import ActivitiesTab from "@/components/NFT/NFTData/Activities";
import PropertiesTab from "@/components/NFT/NFTData/Properties";
import OwnersTab from "@/components/NFT/NFTData/Owners";
import { NFT, NFTMetadata } from "@/types";

interface Props {
  nft: NFT;
  metaData?: NFTMetadata;
  marketData?: APIResponse.NFTMarketData;
}

export default function NFTData({ nft, metaData, marketData }: Props) {
  return (
    <div className="pb-7 tablet:w-full overflow-auto">
      <Tabs.Group
        style="underline"
        className="flex flex-nowrap overflow-x-auto"
      >
        {nft.collection.type === "ERC1155" && (
          <Tabs.Item
            active
            title={
              <div className="min-w-fit whitespace-nowrap">
                Owners ({marketData?.owners.length || 0})
              </div>
            }
          >
            <OwnersTab nft={nft} marketData={marketData} />
          </Tabs.Item>
        )}
        <Tabs.Item
          active
          title={<div className="min-w-fit whitespace-nowrap">Overview</div>}
        >
          <OverviewTab metaData={metaData} nft={nft} />
        </Tabs.Item>
        <Tabs.Item
          title={<div className="min-w-fit whitespace-nowrap">Properties</div>}
        >
          <PropertiesTab metaData={metaData} />
        </Tabs.Item>
        <Tabs.Item
          title={
            <div className="min-w-fit whitespace-nowrap">
              Bids ({marketData?.bidInfo.length || 0})
            </div>
          }
        >
          <BidsTab marketData={marketData} nft={nft} />
        </Tabs.Item>
        <Tabs.Item title="Activities">
          <ActivitiesTab nft={nft} />
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
}
