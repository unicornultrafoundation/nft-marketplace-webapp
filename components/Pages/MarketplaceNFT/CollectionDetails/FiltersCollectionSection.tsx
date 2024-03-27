import React from "react";
import SliderIcon from "@/components/Icon/Sliders";
import Button from "@/components/Button";
import CommandIcon from "@/components/Icon/Command";
import Input from "@/components/Form/Input";
import { APIParams } from "@/services/api/types";

interface Props {
  showFilters: boolean;
  toggleFilter: () => void;
  onSearch: (text: string) => void;
  activeFilters: APIParams.FetchNFTs;
}

export default function FiltersSectionCollection({
  showFilters,
  toggleFilter,
  onSearch,
  activeFilters,
}: Props) {
  return (
    <div className="flex gap-4 flex-wrap justify-between desktop:flex-nowrap mb-4 tablet:mb-8 desktop:mb-8">
      <div className="order-3 laptop:order-1">
        <Button
          onClick={toggleFilter}
          className={
            showFilters
              ? "bg-white shadow h-[56px]"
              : `bg-surface-soft h-[56px]`
          }
          scale="lg"
          variant="secondary"
        >
          Filters
          <span className="p-1 bg-surface-medium rounded-lg">
            <SliderIcon width={14} height={14} />
          </span>
        </Button>
      </div>
      <div className="relative flex-1 order-2 desktop:order-3 min-w-[180px]">
        <Input
          value={activeFilters.name}
          onChange={(e) => onSearch(e.target.value)}
          className="py-4 h-14 w-full"
          appendIcon={<CommandIcon color="gray-500" width={14} height={14} />}
          appendIconContainerClass="w-6 h-6 bg-surface-medium rounded-lg top-1/4 right-4 py-0 pr-0 pl-1.5"
        />
      </div>
      {/* <div className="order-4">
       <Dropdown
       label=""
       dismissOnClick={false}
       renderTrigger={() => (
       <div className="bg-surface-soft flex items-center justify-center gap-3 rounded-2xl p-3 h-full cursor-pointer">
       Price: Ascending
       <div className="rounded-lg p-1 bg-surface-medium">
       <Icon name="chevronDown" width={14} height={14} />
       </div>
       </div>
       )}>
       <Dropdown.Item>Price: Ascending</Dropdown.Item>
       <Dropdown.Item>Price: Descending</Dropdown.Item>
       <Dropdown.Item>Date: Ascending</Dropdown.Item>
       <Dropdown.Item>Date: Descending</Dropdown.Item>
       </Dropdown>
       </div> */}
    </div>
  );
}
