"use client";

import { Dropdown, Tabs, TabsRef } from "flowbite-react";
import Button from "@/components/Button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Input from "@/components/Form/Input";
import SliderIcon from "@/components/Icon/Sliders";
import CommandIcon from "@/components/Icon/Command";
import { useCollectionFilterStore } from "@/store/filters/collections/store";
import { useNFTFilterStore } from "@/store/filters/items/store";
import { useUserFilterStore } from "@/store/filters/users/store";
import Icon from "@/components/Icon";

export default function ExploreSectionNavbar() {
  const tabs = [
    { label: "NFTs", href: "/explore/items" },
    { label: "Collections", href: "/explore/collections" },
    { label: "Users", href: "/explore/users" },
  ];

  const dropdownItems = [
    { name: "Price: Ascending", order: "asc", orderBy: "price" },
    { name: "Price: Descending", order: "desc", orderBy: "price" },
    { name: "Date: Ascending", order: "asc", orderBy: "time" },
    { name: "Date: Descending", order: "desc", orderBy: "time" },
  ];

  const pathname = usePathname();
  const router = useRouter();
  const tabsRef = useRef<TabsRef>(null);
  const [sortOption, setSortOption] = useState({
    name: "Date: Descending",
    order: "desc",
    orderBy: "time",
  });

  const {
    filters: { name: collectionSearchText },
    showFilters: showCollectionFilters,
    toggleFilter: toggleCollectionFilters,
    updateFilters: updateCollectionFilters,
  } = useCollectionFilterStore((state) => state);

  const {
    filters: { name: nftSearchText },
    showFilters: showNFTFilters,
    toggleFilter: toggleNFTFilters,
    updateFilters: updateNFTFilters,
  } = useNFTFilterStore((state) => state);

  const {
    filters: { search: userSearchText },
    showFilters: showUserFilters,
    toggleFilter: toggleUserFilters,
    updateFilters: updateUserFilters,
  } = useUserFilterStore((state) => state);

  const isFiltersVisible = useMemo(() => {
    switch (true) {
      case pathname.includes("collections"):
        return showCollectionFilters;
      case pathname.includes("items"):
        return showNFTFilters;
      default:
        return false;
    }
  }, [showCollectionFilters, showNFTFilters, pathname]);

  const handleToggleFilters = () => {
    switch (true) {
      case pathname.includes("collections"):
        return toggleCollectionFilters();
      case pathname.includes("items"):
        return toggleNFTFilters();
      default:
        return null;
    }
  };

  const searchText = useMemo(() => {
    switch (true) {
      case pathname.includes("collections"):
        return collectionSearchText;
      case pathname.includes("users"):
        return userSearchText;
      case pathname.includes("items"):
        return nftSearchText;
      default:
        return "";
    }
  }, [pathname, collectionSearchText, nftSearchText, userSearchText]);

  const handleInputText = (value: any) => {
    switch (true) {
      case pathname.includes("collections"):
        return updateCollectionFilters({ name: value });
      case pathname.includes("items"):
        return updateNFTFilters({ name: value });
      case pathname.includes("users"):
        return updateUserFilters({ search: value });
      default:
        return null;
    }
  };

  const handleChangeTab = (activeTab: number) => {
    return router.push(tabs[activeTab].href);
  };

  const sortCollections = (sortOptionCollection: any) => {
    updateCollectionFilters({
      orderBy: sortOptionCollection?.orderBy,
      order: sortOptionCollection?.order,
    });
  };

  const sortNFTs = (sortOptionNFT: any) => {
    updateNFTFilters({
      orderBy: sortOptionNFT?.orderBy,
      order: sortOptionNFT?.order,
    });
  };

  const handleChange = (selectedOption: any) => {
    let order = "",
      orderBy = "",
      name = "";
    switch (selectedOption) {
      case "Price: Ascending":
        order = "asc";
        orderBy = "price";
        name = "Price: Ascending";
        break;
      case "Price: Descending":
        order = "desc";
        orderBy = "price";
        name = "Price: Descending";
        break;
      case "Date: Descending":
        order = "desc";
        orderBy = "time";
        name = "Date: Descending";
        break;
      default:
        order = "asc";
        orderBy = "time";
        name = "Date: Ascending";
        break;
    }
    setSortOption({ name, order, orderBy });
  };

  useEffect(() => {
    if (pathname.includes("collections")) {
      sortCollections(sortOption);
    } else if (pathname.includes("items")) {
      sortNFTs(sortOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOption, pathname]);

  useEffect(() => {
    if (tabsRef.current) {
      switch (true) {
        case pathname.includes("items"):
          tabsRef.current.setActiveTab(0);
          break;
        case pathname.includes("collections"):
          tabsRef.current.setActiveTab(1);
          break;
        case pathname.includes("users"):
          tabsRef.current.setActiveTab(2);
          break;
      }
    }
  }, [tabsRef, pathname]);

  return (
    <div className="flex gap-4 flex-wrap justify-between desktop:flex-nowrap">
      {!pathname.includes("users") && (
        <div className="order-3 desktop:order-1">
          <Button
            onClick={handleToggleFilters}
            className={
              isFiltersVisible
                ? "bg-white shadow desktop:h-[55px] tablet:h-[55px] h-[56px]"
                : `bg-surface-soft desktop:h-[55px] tablet:h-[55px] h-[56px]`
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
      )}

      <div className="order-1 w-full desktop:order-2 desktop:flex-none desktop:w-auto">
        <Tabs.Group
          onActiveTabChange={handleChangeTab}
          style="default"
          ref={tabsRef}
        >
          {tabs.map((tab) => (
            <Tabs.Item
              active={pathname.includes(tab.href)}
              key={tab.href}
              title={tab.label}
            />
          ))}
        </Tabs.Group>
      </div>
      <div className="relative flex-1 order-2 desktop:order-3 min-w-[180px]">
        <Input
          onChange={(e) => handleInputText(e.target.value)}
          value={searchText}
          className="py-4 h-14"
          appendIcon={<CommandIcon color="gray-500" width={14} height={14} />}
          appendIconContainerClass="w-6 h-6 bg-surface-medium rounded-lg top-1/4 right-4 py-0 pr-0 pl-1.5"
        />
      </div>

      {!pathname.includes("users") && (
        <div className="order-4">
          <Dropdown
            label=""
            renderTrigger={() => (
              <div className="bg-surface-soft flex items-center justify-center gap-3 rounded-2xl p-3 h-full cursor-pointer">
                {sortOption.name}
                <div className="rounded-lg p-1 bg-surface-medium">
                  <Icon name="chevronDown" width={14} height={14} />
                </div>
              </div>
            )}
          >
            {dropdownItems.map((item: any, i: any) => (
              <Dropdown.Item key={i} onClick={() => handleChange(item.name)}>
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
      )}
    </div>
  );
}
