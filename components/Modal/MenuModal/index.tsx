import { CustomFlowbiteTheme, Modal, ModalProps } from "flowbite-react";
import { navs } from "@/config/nav";
import Link from "next/link";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Collapsible from "@/components/Collapsible";
import ConnectWalletButton from "@/components/Button/ConnectWalletButton";
import { useAuth } from "@/hooks/useAuth";
import { isMobile } from "react-device-detect";
import MenuAccountInformation from "./AccountInformation";
import Image from "next/image";
import brandingSvg from "@/assets/branding.svg";

const modalTheme: CustomFlowbiteTheme["modal"] = {
  root: {
    sizes: {
      "7xl": "max-w-8 !p-0",
      sm: "max-w-sm !p-0",
    },
  },
  content: {
    inner: "relative bg-white flex flex-col h-screen",
  },
  body: {
    base: "p-0 flex-1 overflow-auto",
  },
};

export default function MenuModal({ onClose, show }: ModalProps) {
  const { isValidSession } = useAuth();

  return (
    <Modal
      dismissible
      onClose={onClose}
      show={show}
      size={isMobile ? "7xl" : "sm"}
      theme={modalTheme}
      position="top-right"
    >
      <Modal.Body className="flex flex-col gap-4 ">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-6">
            <div className="hidden tablet:block">
              <Link href="/" onClick={onClose} className="w-fit">
                <Image
                  className="h-7 object-contain w-fit"
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
            <button className="tablet:hidden" onClick={onClose}>
              <Icon
                className="text-secondary"
                name="search"
                width={24}
                height={24}
              />
            </button>
          </div>

          <div className="flex flex-1 justify-end items-center gap-4">
            <Button className="w-12 !min-w-0 !p-2" variant="icon" disabled>
              <Icon name="shoppingBag" width={16} height={16} />
            </Button>
            <button onClick={onClose}>
              <Icon name="close" width={24} height={24} />
            </button>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          {isValidSession ? (
            <MenuAccountInformation onClose={onClose} />
          ) : (
            <>
              {navs.map((nav) => {
                if (nav.items?.length) {
                  return (
                    <Collapsible
                      key={nav.label}
                      className="!p-0"
                      header={
                        <Text
                          className="text-primary font-semibold"
                          variant="body-18"
                        >
                          {nav.label}
                        </Text>
                      }
                    >
                      <div className="flex flex-col gap-2 px-2">
                        {nav.items.map((item) => (
                          <Link
                            className="text-secondary font-semibold text-body-16"
                            onClick={onClose}
                            href={item.href}
                            key={item.label}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </Collapsible>
                  );
                }

                return (
                  <Link
                    key={nav.label}
                    className="text-secondary font-semibold text-body-18"
                    onClick={onClose}
                    href={nav.href}
                  >
                    {nav.label}
                  </Link>
                );
              })}
            </>
          )}
        </div>

        <ConnectWalletButton showConnectButton />
      </Modal.Body>
    </Modal>
  );
}
