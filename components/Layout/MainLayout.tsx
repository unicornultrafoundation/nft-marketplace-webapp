"use client"

import { useNetwork } from 'wagmi'
import { useEffect } from 'react'
import { CHAIN_ID } from '@/config/constants'
import MainHeader from '@/components/Layout/MainHeader'
import MainFooter from '@/components/Layout/MainFooter'

export default function MainLayout({ children }: {
  children: React.ReactNode
}) {
  const { chain } = useNetwork()

  useEffect(() => {
    if (chain?.id && chain?.id !== CHAIN_ID) {
      alert('Wrong network detected!')
    }
  }, [chain])

  return (
    <main className="flex flex-col min-h-screen">
      <MainHeader />
      <div className="flex-1">
        {children}
      </div>
      <MainFooter />
    </main>
  )
};