'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Text from '@/components/Text'
import ExploreSectionNavbar from '@/components/Layout/ExploreNavbar'

export default function ExploreLayout({ children }: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const title = useMemo(() => {
    switch (true) {
      case pathname.includes('collections'):
        return 'Explore Collections'
      case pathname.includes('items'):
        return 'Explore NFTs'
      case pathname.includes('users'):
        return 'Explore Users'
    }
  }, [pathname])
  const caption = 'Discover and collect crypto art'

  return (
    <div className="flex flex-col px-4 tablet:px-10 desktop:px-20">
      <div className="flex flex-col gap-4 desktop:gap-8 py-4 tablet:py-8 desktop:py-10">
        <div>
          <Text className="text-body-18 tablet:text-body-24 desktop:text-body-32 font-semibold tablet:mb-1.5 desktop:mb-2">
            {title}
          </Text>
          <Text className="text-secondary">{caption}</Text>
        </div>

        <ExploreSectionNavbar />
      </div>

      <div className="pb-20">
        {children}
      </div>
    </div>
  )
}