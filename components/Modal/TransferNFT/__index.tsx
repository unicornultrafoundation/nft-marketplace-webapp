import {CustomFlowbiteTheme, Modal, ModalProps, Tooltip} from 'flowbite-react'
import {useState} from 'react'
import Text from '@/components/Text'
import Button from '@/components/Button'
import {NFT} from '@/types'
import TransferStep from "@/components/Modal/TransferNFT/TransferStep";
import { APIResponse } from '@/services/api/types'
import NFTMarketData = APIResponse.NFTMarketData

interface Props extends ModalProps {
  nft: NFT,
  marketData?: NFTMarketData
}

const modalTheme: CustomFlowbiteTheme['modal'] = {
  content: {
    inner: "relative rounded-lg bg-white shadow flex flex-col h-auto max-h-[600px] desktop:max-h-[800px] tablet:max-h-[800px]",
    base: "relative w-full desktop:p-10 tablet:p-6 p-4 ",
  },
  body: {
    base: "p-0 flex-1 overflow-auto"
  }
}

export default function TransferNFTModal({ nft, show, onClose, marketData }: Props) {
  const handleReset = () => {
    onClose?.()
  }

  return (
    <Modal
      theme={modalTheme}
      dismissible
      size="lg"
      show={show}
      onClose={handleReset}>
      <Modal.Body className="p-10">
        <div className="flex flex-col justify-center items-center gap-4">
          <TransferStep nft={nft} marketData={marketData} handleReset={handleReset} />
        </div>
      </Modal.Body>
    </Modal>
  )
}