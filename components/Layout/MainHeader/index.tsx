import brandingSvg from "@/assets/branding.svg";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Icon from "@/components/Icon";
import ConnectWalletButton from "@/components/Button/ConnectWalletButton";
import useAuthStore from "@/store/auth/store";
import SearchInput from "@/components/Layout/MainHeader/SearchInput";
import MenuModal from "@/components/Modal/MenuModal";
import { getUserAvatarImage } from "@/utils/string";
import NavbarMenu from "@/components/Layout/MainHeader/NavbarMenu";

export const HEADER_HEIGHT = 88;

export default function MainHeader() {
  const user = useAuthStore((state) => state.profile);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav
      className={`h-[${HEADER_HEIGHT}px] bg-white border-gray-200 dark:bg-gray-900 desktop:px-20 desktop:py-5 tablet:px-10 tablet:py-5 px-4 py-3 `}
    >
      <div className="flex flex-wrap items-center justify-between mx-auto ">
        <div className="flex items-center gap-6">
          <div className="hidden desktop:block tablet:block">
            <Link href="/" className="w-fit">
              <Image
                className="h-10 object-contain desktop:w-[500px] tablet:w-fit"
                height={100}
                src={brandingSvg}
                alt="u2u-brand"
              />
            </Link>
          </div>
          <div className="block tablet:hidden">
            <Link href="/">
              <Icon name="u2u-logo-mobile" width={28} height={28} />
            </Link>
          </div>
          <SearchInput />
          <NavbarMenu />
        </div>

        <div className="flex gap-4 items-center">
          <div className="hidden tablet:block">
            <ConnectWalletButton
              showConnectButton
              action={() => setShowMenu(true)}
            >
              <div className="w-[35px] h-[35px]">
                <Image
                  className="cursor-pointer select-none opacity-80 hover:opacity-100 transition-opacity rounded-full w-full h-[35px] object-cover"
                  src={getUserAvatarImage(user)}
                  alt="Avatar"
                  width={35}
                  height={35}
                />
              </div>
            </ConnectWalletButton>
          </div>
          <button
            className="block tablet:hidden !p-0"
            onClick={() => setShowMenu(true)}
          >
            <Icon color="secondary" name="burger" width={20} height={20} />
          </button>
        </div>
      </div>
      <MenuModal show={showMenu} onClose={() => setShowMenu(false)} />
    </nav>
  );
}
