'use client'

import { Dropdown, Tabs, TabsRef } from 'flowbite-react'
import Button from '@/components/Button'
import { usePathname, useRouter } from 'next/navigation'
import { useMemo, useRef } from 'react'
import Input from '@/components/Form/Input'
import { useUIStore } from '@/store/ui/store'
import SliderIcon from '@/components/Icon/Sliders'
import CommandIcon from '@/components/Icon/Command'
import Icon from '@/components/Icon'

export default function ExploreSectionNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { showFilters, toggleFilter } = useUIStore(state => state)
  const tabsRef = useRef<TabsRef>(null);
  const tabs = [
    { label: 'NFTs', href: '/explore/items' },
    { label: 'Collections', href: '/explore/collections' },
    { label: 'Users', href: '/explore/users' }
  ]

  const routeKey = useMemo(() => {
    switch (true) {
      case pathname.includes('collections'):
        return 'collections'
      case pathname.includes('items'):
        return 'nfts'
      case pathname.includes('profile'):
        return 'profile'
    }
  }, [pathname])

  const isFiltersVisible = useMemo(() => {
    if (!routeKey) return false
    return showFilters[routeKey]
  }, [showFilters, routeKey])

  const handleChangeTab = (activeTab: number) => {
    return router.push(tabs[activeTab].href)
  }

  const handleToggleFilters = () => {
    if (!routeKey) return
    toggleFilter(routeKey)
  }

  return (
    <div className="flex gap-4 flex-wrap justify-between desktop:flex-nowrap">
      <div className="order-3 desktop:order-1">
        <Button
          onClick={handleToggleFilters}
          className={isFiltersVisible ? 'bg-white shadow' : `bg-surface-soft`}
          scale="lg"
          variant="secondary">
          Filters
          <span className="p-1 bg-surface-medium rounded-lg">
          <SliderIcon width={14} height={14} />
          </span>
        </Button>
      </div>
      <div className="order-1 w-full desktop:order-2 desktop:flex-none desktop:w-auto">
        <Tabs.Group onActiveTabChange={handleChangeTab} style="default" ref={tabsRef}>
          {tabs.map(tab => (
            <Tabs.Item
              active={pathname.includes(tab.href)}
              key={tab.href}
              title={tab.label}
            />
          ))}
        </Tabs.Group>
      </div>
      <div className="relative flex-1 order-2 desktop:order-3">
        <Input
          className="py-4 h-14"
          appendIcon={<CommandIcon color="gray-500" width={14} height={14} />}
          appendIconContainerClass="w-6 h-6 bg-surface-medium rounded-lg top-1/4 right-4 py-0 pr-0 pl-1.5" />
      </div>
      <div className="order-4">
        <Dropdown
          label=""
          dismissOnClick={false}
          renderTrigger={() => (
            <Button scale="lg" className="w-60 bg-surface-soft" variant="secondary">
              Price: Ascending
              <div className="rounded-lg p-1 bg-surface-medium">
                <Icon name="chevronDown" width={14} height={14} />
              </div>
            </Button>
          )}>
          <Dropdown.Item>Price: Ascending</Dropdown.Item>
          <Dropdown.Item>Price: Descending</Dropdown.Item>
          <Dropdown.Item>Date: Ascending</Dropdown.Item>
          <Dropdown.Item>Date: Descending</Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  )
}