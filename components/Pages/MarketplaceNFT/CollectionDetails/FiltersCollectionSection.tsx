import React, { useEffect, useState } from "react";
import SliderIcon from "@/components/Icon/Sliders";
import Button from "@/components/Button";
import CommandIcon from "@/components/Icon/Command";
import Input from "@/components/Form/Input";
import { APIParams } from "@/services/api/types";
import { Dropdown } from "flowbite-react";
import Icon from "@/components/Icon";
import { useFilterByCollection } from "@/store/filters/byCollection/store";
import { Address } from "wagmi";

interface Props {
  showFilters: boolean;
  toggleFilter: () => void;
  onSearch: (text: string) => void;
  activeFilters: APIParams.FetchNFTs;
  collectionAddress: Address
}

export default function FiltersSectionCollection({
  showFilters,
  toggleFilter,
  onSearch,
  activeFilters,
  collectionAddress
}: Props) {
  const dropdownItems = [
    { name: "Price: Ascending", order: "asc", orderBy: "price" },
    { name: "Price: Descending", order: "desc", orderBy: "price" },
    { name: "Date: Ascending", order: "asc", orderBy: "time" },
    { name: "Date: Descending", order: "desc", orderBy: "time" },
  ];
  const [sortOption, setSortOption] = useState({name: "Date: Ascending", order: 'asc', orderBy: 'time' });

  const { updateFilters } = useFilterByCollection((state) => state);

  const sortNFTs = (sortOptionNFT: any) => {
    updateFilters(collectionAddress ,{ order: sortOptionNFT?.order, orderBy: sortOptionNFT?.orderBy});
  };

  const handleChange = (selectedOption: any) => {
    let order = '', orderBy = '', name= ''; 
    switch (selectedOption) {
      case "Price: Ascending":
        order = 'asc';
        orderBy = 'price';
        name= "Price: Ascending";
        break;
      case "Price: Descending":
        order = 'desc';
        orderBy = 'price';
        name= 'Price: Descending';
        break;
      case "Date: Descending":
        order = 'desc';
        orderBy = 'time';
        name= 'Date: Descending';
        break;
      default:
          order = 'asc';
          orderBy = 'time';
          name= 'Date: Ascending';
          break;
    }    
    setSortOption({name, order, orderBy });
  };

  // useEffect(() => {
  //   sortNFTs(sortOption);
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [sortOption]);

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
            renderTrigger={() => (
              <div className="bg-surface-soft flex items-center justify-center gap-3 rounded-2xl p-3 h-full cursor-pointer">
                {sortOption.name}
                <div className="rounded-lg p-1 bg-surface-medium">
                  <Icon name="chevronDown" width={14} height={14} />
                </div>
              </div>
            )}>
            {dropdownItems.map((item: any, i: any) => (
              <Dropdown.Item
                key={i}
                onClick={() => handleChange(item.name)}
              >
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div> */}
    </div>
  );
}
