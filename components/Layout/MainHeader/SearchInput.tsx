"use client"
import Icon from '@/components/Icon'
import InputDropdown from '@/components/Form/InputDropdown'
import Button from '@/components/Button'
import { useMemo, useRef, useState, useEffect } from 'react'
import { Tabs, TabsRef } from 'flowbite-react'
import useSWR from 'swr'
import SearchUserTab from './UserTab'
import SearchCollectionTab from './CollectionTab'
import SearchNFTTab from './NFTTab'
import { useMarketplaceApi } from '@/hooks/useMarketplaceApi'
import { Modal } from 'flowbite-react'
import Input from '@/components/Form/Input'

export default function SearchInput() {
  const api = useMarketplaceApi()
  const [text, setText] = useState('')
  const tabsRef = useRef<TabsRef>(null);
  const [activeTab, setActiveTab] = useState(0)

  const mode = useMemo(() => {
    switch (activeTab) {
      case 0:
        return 'COLLECTION'
      case 1:
        return 'NFT'
      case 2:
        return 'USER'
      default:
        return 'NFT'
    }
  }, [activeTab])

  const { data: collectionSearchData, isLoading: searchingCollection } = useSWR(
    (!!text && mode === 'COLLECTION') ? text : null,
    (text) => api.searchCollections(text),
    { revalidateOnFocus: false }
  )
  const { data: nftSearchData, isLoading: searchingNFT } = useSWR(
    (!!text && mode === 'NFT') ? text : null,
    (text) => api.searchNFTs(text),
    { revalidateOnFocus: false }
  )
  const { data: userSearchData, isLoading: searchingUser } = useSWR(
    (!!text && mode === 'USER') ? text : null,
    (text) => api.searchUsers(text),
    { revalidateOnFocus: false }
  )

  const [isMobile, setIsMobile] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <>
      {
        isMobile ? (
          <>
            <Button onClick={() => setOpenModal(true)} variant="icon">
              <Icon className="text-secondary" name="search" width={24} height={24} />
            </Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
              <Modal.Header>Search</Modal.Header>
              <Modal.Body>
                <Input placeholder='Type for collections, NFTs etc' />
              </Modal.Body>
            </Modal>
          </>
        ) : (
          <InputDropdown
            closeOnClick
            className=""
            containerClass="desktop:w-[420px] tablet:w-[280px]"
            scale="sm"
            value={text}
            placeholder="Type for collections, NFTs etc"
            onChange={event => setText(event.target.value)}
            renderDropdown={onclose => (
              <Tabs.Group style="underline" ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>
                <Tabs.Item title="Collections">
                  <SearchCollectionTab loading={searchingCollection} data={collectionSearchData} onClose={onclose} />
                </Tabs.Item>
                <Tabs.Item title="NFTs">
                  <SearchNFTTab loading={searchingNFT} data={nftSearchData} onClose={onclose} />
                </Tabs.Item>
                <Tabs.Item title="Users">
                  <SearchUserTab loading={searchingUser} data={userSearchData} onClose={onclose} />
                </Tabs.Item>
              </Tabs.Group>
            )}
          />
        )
      }
    </>
  )
}
