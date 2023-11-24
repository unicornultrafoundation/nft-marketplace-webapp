import { Modal, ModalProps } from 'flowbite-react'
import Text from '@/components/Text'
import defaultAvatar from "@/assets/images/default-avatar.png";
import Image from "next/image";
import Icon from "@/components/Icon";

interface Props extends ModalProps {

}

export default function ProfileModal({ show, onClose, onOpen, modalPlacement }: Props) {

  return (
    <div className="">
      <div className="hidden desktop:block tablet:block">
        <button onClick={onOpen}>
          <Image
            className="cursor-pointer"
            src={defaultAvatar}
            alt="Avatar"
            width={35}
            height={35}
          />
        </button>
      </div>
      <div className="block mobile:hidden text-secondary">

        <button onClick={onOpen}>
          <Icon color="secondary" name="burger" width={20} height={20}/>
        </button>
      </div>
      <Modal dismissible position={modalPlacement} show={show}>
        <Modal.Body>
          <div className="">
            <div className="flex justify-between items-center py-4">
              <div className="flex gap-3 items-center">
                <Image
                  src={defaultAvatar}
                  alt="Avatar"
                  width={48}
                  height={48}
                />
                <div className="flex flex-col">
                  <Text className="text-white">Phoenix55</Text>
                  <Text className="text-secondary">View profile</Text>
                </div>
              </div>
              <button className="text-white" onClick={onClose}>
                <Icon name="arrowRight" width={20} height={20} />
              </button>
            </div>

            <div className=" py-4">
              <a href={"/#"}>
                <Text className="text-secondary hover:text-white" variant="body-18">
                  Orders
                </Text>
              </a>
            </div>
            <div className=" py-4">
              <a href={"/#"}>
                <Text className="text-secondary hover:text-white" variant="body-18">
                  Create NFT
                </Text>
              </a>
            </div>
            <div className=" py-4">
              <div className="border-b"/>
            </div>
            <div className=" py-4 w-full">
              <a href={"/#"}>
                <Text className="text-secondary hover:text-white" variant="body-18">
                  Settings
                </Text>
              </a>
            </div>
            <div className=" py-4">
              <Text className="text-secondary hover:text-white" variant="body-18">
                Logout
              </Text>
            </div>
          </div>

        </Modal.Body>
      </Modal>
    </div>
  )
}
