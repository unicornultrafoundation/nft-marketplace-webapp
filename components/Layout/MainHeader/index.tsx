import brandingSvg from '@/assets/branding.svg'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Icon from '@/components/Icon'
import Dropdown from '@/components/Dropdown'
// import { Dropdown } from 'flowbite-react/lib/esm/components/Dropdown'
// import { DropdownItem } from 'flowbite-react/lib/esm/components/Dropdown/DropdownItem'
import ProfileModal from "@/components/Modal/ProfileModal";
import defaultAvatar from '@/assets/images/default-avatar.png'
import ConnectWalletButton from '@/components/Button/ConnectWalletButton'
import { navs } from '@/config/nav'
import useAuthStore from '@/store/auth/store'
import { parseImageUrl } from '@/utils/nft'
import MobileMenuModal from '@/components/Modal/MobileMenuModal'
import SearchInput from '@/components/Layout/MainHeader/SearchInput'
import Text from '@/components/Text'

export const HEADER_HEIGHT = 88

export default function MainHeader() {
  const avatar = useAuthStore(state => state.profile?.avatar)
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <nav className={`h-[${HEADER_HEIGHT}px] bg-white border-gray-200 dark:bg-gray-900 px-4 tablet:px-7`}>
      <div className="flex flex-wrap items-center justify-between mx-auto py-4">
        <div className="flex items-center gap-6">
          <div className="hidden desktop:block tablet:block">
            <Link href="/">
              <Image height={40} src={brandingSvg} alt="u2u-brand" />
            </Link>
          </div>
          <div className="block tablet:hidden">
            <Link href="/">
              <Icon name="u2u-logo-mobile" width={28} height={28} />
            </Link>
          </div>

          <SearchInput />

          <div className="hidden desktop:block w-full" id="navbar-default">
            <ul
              className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:items-center md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navs.map((nav, index) => nav.items ?
                (
                  <Dropdown
                    key={index}
                    activator={
                      <Text className="font-semibold text-secondary hover:text-primary transition-colors" variant="body-16">
                        {nav.label}
                      </Text>
                    }
                    dropdown={
                      <div className="flex flex-col">
                        {nav.items.map((item, i) => (
                          <Link className="py-1.5" key={i} href={item.href ?? '/'}>{item.label}</Link>
                        ))}
                      </div>
                    }
                  />
                ) : (
                  <li key={index}>
                    <Link
                      href={nav.href ?? ''}
                      className="font-semibold text-secondary hover:text-primary transition-colors text-body-16"
                      aria-current="page"
                    >
                      {nav.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="hidden tablet:block">
            <ConnectWalletButton mode="link">
              <Image
                onClick={() => setShowProfile(true)}
                className="cursor-pointer select-none opacity-80 hover:opacity-100 transition-opacityZ"
                src={avatar ? parseImageUrl(avatar) : defaultAvatar}
                alt="Avatar"
                width={35}
                height={35}
              />
            </ConnectWalletButton>
          </div>

          <button className="block tablet:hidden !p-0" onClick={() => setShowMobileMenu(true)}>
            <Icon color="secondary" name="burger" width={20} height={20} />
          </button>
        </div>
      </div>

      <MobileMenuModal
        show={showMobileMenu}
        onClose={() => setShowMobileMenu(false)}
      />
      <ProfileModal
        show={showProfile}
        onClose={() => setShowProfile(false)} />
    </nav>
  )
}
