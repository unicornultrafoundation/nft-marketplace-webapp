"use client";
import Icon from "@/components/Icon";
import InputDropdown from "@/components/Form/InputDropdown";
import Button from "@/components/Button";
import { useEffect } from "react";
import { CustomFlowbiteTheme, Modal, Tabs } from "flowbite-react";
import SearchUserTab from "./UserTab";
import SearchCollectionTab from "./CollectionTab";
import SearchNFTTab from "./NFTTab";
import { isMobile } from "react-device-detect";
// import { useSearch, useSearchCollection, useSearchNft, useSearchUser } from "@/hooks/useSearch";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";
import useSWRMutation from "swr/mutation";
import { useSearch } from "@/hooks/useSearch";

const modalTheme: CustomFlowbiteTheme["modal"] = {
  content: {
    inner:
      "relative rounded-lg bg-white shadow flex flex-col tablet:h-full h-full desktop:h-auto ",
    base: "relative w-full p-3 desktop:p-10 tablet:p-10 desktop:h-auto h-full tablet:h-full max-h-[85vh]",
  },
  body: {
    base: "p-0 flex-1 overflow-auto",
  },
};

export default function SearchInput() {
  const {
    setActiveTab,
    handleTextInput,
    searchKey,
    text,
    tabsRef,
    openModal,
    setOpenModal,
    searchString,
  } = useSearch();

  const api = useMarketplaceApi();

  const {
    trigger: searchCollection,
    data: collectionSearchData,
    isMutating: searchingCollection,
    reset: resetCollection,
  } = useSWRMutation(text.collection || null, (text) =>
    api.searchCollections(text),
  );

  const {
    trigger: searchNFTs,
    data: nftSearchData,
    isMutating: searchingNFT,
    reset: resetNft,
  } = useSWRMutation(text.nft || null, (text) => api.searchNFTs(text));

  const {
    trigger: searchUsers,
    data: userSearchData,
    isMutating: searchingUser,
    reset: resetUser,
  } = useSWRMutation(text.user || null, (text) => api.searchUsers(text));

  const handleSearch = () => {
    if (!searchKey || !text[searchKey]) return;
    switch (searchKey) {
      case "collection":
        return searchCollection();
      case "nft":
        return searchNFTs();
      case "user":
        return searchUsers();
    }
  };

  useEffect(() => {
    // Lazy search
    resetCollection();
    resetNft();
    resetUser();
    const timeOutId = setTimeout(handleSearch, 200);
    return () => clearTimeout(timeOutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString, text]);

  return (
    <>
      {isMobile ? (
        <>
          <Button onClick={() => setOpenModal(true)} variant="icon">
            <Icon
              className="text-secondary"
              name="search"
              width={24}
              height={24}
            />
          </Button>
          <Modal
            theme={modalTheme}
            show={openModal}
            onClose={() => setOpenModal(false)}
          >
            <Modal.Header>Search</Modal.Header>
            <Modal.Body>
              <InputDropdown
                closeOnClick
                className=""
                containerClass="desktop:w-[420px] tablet:w-[280px]"
                scale="sm"
                value={searchString}
                placeholder="Type for collections, NFTs etc"
                onChange={(event) => handleTextInput(event.target.value)}
                renderDropdown={(onclose) => (
                  <Tabs.Group
                    style="underline"
                    ref={tabsRef}
                    onActiveTabChange={(tab) => setActiveTab(tab)}
                  >
                    <Tabs.Item title="Collections">
                      <SearchCollectionTab
                        loading={searchingCollection}
                        data={collectionSearchData}
                        onClose={() => setOpenModal(false)}
                      />
                    </Tabs.Item>
                    <Tabs.Item title="NFTs">
                      <SearchNFTTab
                        loading={searchingNFT}
                        data={nftSearchData}
                        onClose={() => setOpenModal(false)}
                      />
                    </Tabs.Item>
                    <Tabs.Item title="Users">
                      <SearchUserTab
                        loading={searchingUser}
                        data={userSearchData}
                        onClose={() => setOpenModal(false)}
                      />
                    </Tabs.Item>
                  </Tabs.Group>
                )}
              />
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <InputDropdown
          closeOnClick
          className=""
          containerClass="desktop:w-[420px] tablet:w-[280px]"
          scale="sm"
          value={searchString}
          placeholder="Type for collections, NFTs etc"
          onChange={(event) => handleTextInput(event.target.value)}
          renderDropdown={(onclose) => (
            <Tabs.Group
              style="underline"
              ref={tabsRef}
              onActiveTabChange={(tab) => setActiveTab(tab)}
            >
              <Tabs.Item title="Collections">
                <SearchCollectionTab
                  loading={searchingCollection}
                  data={collectionSearchData}
                  onClose={onclose}
                />
              </Tabs.Item>
              <Tabs.Item title="NFTs">
                <SearchNFTTab
                  loading={searchingNFT}
                  data={nftSearchData}
                  onClose={onclose}
                />
              </Tabs.Item>
              <Tabs.Item title="Users">
                <SearchUserTab
                  loading={searchingUser}
                  data={userSearchData}
                  onClose={onclose}
                />
              </Tabs.Item>
            </Tabs.Group>
          )}
        />
      )}
    </>
  );
}
