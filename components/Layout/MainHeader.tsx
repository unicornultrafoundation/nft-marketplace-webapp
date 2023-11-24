import brandingSvg from '@/assets/branding.svg'
import Link from 'next/link'
import Image from 'next/image'
import Input from '@/components/Form/Input'
import { useState } from 'react'
import Icon from '@/components/Icon'
import { Dropdown } from 'flowbite-react'
import ProfileModal from "@/components/Modal/ProfileModal";

export const HEADER_HEIGHT = 88
export default function MainHeader() {
  const [searchString, setSearchString] = useState('')
  const [openModal, setOpenModal] = useState(false);
  const navs = [
    {
      label: 'Explore',
      items: [
        { href: '/explore/collections', label: 'Collections' },
        { href: '/explore/items', label: 'NFTs' },
        { href: '/explore/users', label: 'Users' }
      ]
    },
    {
      label: 'Create',
      items: [
        { href: '/create/collection', label: 'Collection' },
        { href: '/create/nft', label: 'NFT' }
      ]
    },
    { label: 'Sell', href: '#' }
  ]

  return (
    <nav className={`h-[${HEADER_HEIGHT}px] bg-white border-gray-200 dark:bg-gray-900 px-7`}>
      <div className="flex flex-wrap items-center justify-between mx-auto py-4">
        <div className="flex items-center gap-6">
          <div className="hidden desktop:block tablet:block">
            <Link href="/">
              <Image height={28} src={brandingSvg} alt="u2u-brand"/>
            </Link>
          </div>
          <div className="block mobile:hidden">
            <Link href="/">
              <Icon name="u2u-logo-mobile" width={28} height={28}/>
            </Link>
          </div>


          <div className="hidden desktop:block tablet:block">
            <Input
              containerclassName="hidden tablet:block desktop:w-[420px] tablet:w-[280px]"
              value={searchString}
              placeholder="Type for collections, NFTs etc"
              onChange={event => setSearchString(event.target.value)}
            />
          </div>
          <div className="block mobile:hidden flex">
            <Input
              value={searchString}
              onChange={event => setSearchString(event.target.value)}
              prependIcon={<Icon name="search" width={28} height={28}/>}
            />
          </div>


          <div className="hidden w-full tablet:block tablet:w-auto" id="navbar-default">
            <ul
              className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navs.map((nav, index) => nav.items ?
                (
                  <Dropdown
                    label=""
                    key={index}
                    renderTrigger={() => (
                      <span
                        className="block py-2 px-3 font-semibold text-secondary cursor-pointer">
                        {nav.label}
                      </span>)}>
                    {nav.items.map((item, i) => (
                      <Dropdown.Item key={i}>
                        <Link href={item.href}>{item.label}</Link>
                      </Dropdown.Item>
                    ))}
                  </Dropdown>
                ) : (
                  <li key={index}>
                    <Link
                      href={nav.href ?? ''}
                      className="block py-2 px-3 font-semibold text-secondary"
                      aria-current="page"
                    >
                      {nav.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className=" tablet:flex gap-4 items-center">
          {/*<ConnectWalletButton mode="link">*/}
          <ProfileModal show={openModal}
                        modalPlacement={"top-right"}
                        onOpen={() => setOpenModal(true)}
                        onClose={() => setOpenModal(false)}/>
          {/*</ConnectWalletButton>*/}
        </div>
      </div>
    </nav>
  )
}
