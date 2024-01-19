'use client';

import React, { useState } from 'react';
import { Spinner, Tabs } from 'flowbite-react';
import { useParams } from 'next/navigation';
import useSWR from 'swr';
import { useMarketplaceApi } from '@/hooks/useMarketplaceApi';
import Text from '@/components/Text';
import { formatDisplayedBalance } from '@/utils';
import OwnedNFTs from "@/components/Pages/MarketplaceNFT/UserDetails/OwnedNFTs";
import OnSaleNFTs from "@/components/Pages/MarketplaceNFT/UserDetails/OnSaleNFTs";
import CreatedNFTs from "@/components/Pages/MarketplaceNFT/UserDetails/CreatedNFTs";
import UserCollections from "@/components/Pages/MarketplaceNFT/UserDetails/UserCollections";
import Activities from "@/components/Pages/MarketplaceNFT/UserDetails/Activities";
import Profile from "@/components/Pages/MarketplaceNFT/UserDetails/Profile";

export default function ProfilePage() {
  const api = useMarketplaceApi();
  const { id } = useParams();
  const {
    data: user,
    isLoading,
    error,
  } = useSWR([id], (userId) => api.viewProfile(userId.toString()), {
    refreshInterval: 600000,
  });

  const [ownedAmount, setOwnedAmount] = useState(0);
  const [saleAmount, setSaleAmount] = useState(0);
  const [createdAmount, setCreatedAmount] = useState(0);
  const [createdCollectionAmount, setCreatedCollectionAmount] = useState(0);

  if (isLoading) {
    return (
      <div className='w-full h-96 p-10 flex justify-center items-center'>
        <Spinner size='xl' />
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className='w-full h-96 flex justify-center items-center'>
        <Text variant='heading-xs' className='text-center'>
          Network Error!
          <br />
          Please try again later
        </Text>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='w-full h-96 p-10 flex justify-center items-center'>
        <Text className='font-semibold text-body-32'>User does not exist!</Text>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <Profile {...user} />

      <div className='desktop:px-20 tablet:px-20 px-4'>
        <Tabs.Group
          style='underline'
          className='flex flex-nowrap overflow-x-auto'
        >
          <Tabs.Item
            title={
              <div className='min-w-fit whitespace-nowrap'>
                Owned ({formatDisplayedBalance(ownedAmount, 0)})
              </div>
            }
          >
            <OwnedNFTs
              wallet={user.publicKey}
              onUpdateAmount={setOwnedAmount}
            />
          </Tabs.Item>
          <Tabs.Item
            title={
              <div className='min-w-fit whitespace-nowrap'>
                On Sale ({formatDisplayedBalance(saleAmount, 0)})
              </div>
            }
          >
            <OnSaleNFTs
              wallet={user.publicKey}
              onUpdateAmount={setSaleAmount}
            />
          </Tabs.Item>
          <Tabs.Item
            title={
              <div className='min-w-fit whitespace-nowrap'>
                Created ({formatDisplayedBalance(createdAmount, 0)})
              </div>
            }
          >
            <CreatedNFTs
              userId={user.id}
              wallet={user.publicKey}
              onUpdateAmount={setCreatedAmount}
            />
          </Tabs.Item>
          <Tabs.Item
            title={
              <div className='min-w-fit whitespace-nowrap'>
                Collections (
                {formatDisplayedBalance(createdCollectionAmount, 0)})
              </div>
            }
          >
            <UserCollections
              userId={user.id}
              onUpdateAmount={setCreatedCollectionAmount}
            />
          </Tabs.Item>
          <Tabs.Item
            title={
              <div className='min-w-fit whitespace-nowrap'>Activities</div>
            }
          >
            <Activities wallet={user.publicKey} />
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  );
}
