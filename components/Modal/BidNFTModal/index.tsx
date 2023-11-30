import { Modal, ModalProps } from 'flowbite-react'
import { useState } from 'react'
import Text from '@/components/Text'
import Button from '@/components/Button'
import { APIResponse, MarketEvent } from '@/services/api/types'

import ApprovalStep from './ApprovalStep'
import BidStep from "./BidStep";

interface Props extends ModalProps {
  nft: APIResponse.NFT,
}

export default function BidNFTModal({ nft, show, onClose }: Props) {
  const [error, setError] = useState<Error>()
  const [step, setStep] = useState(1)

  const handleReset = () => {
    onClose?.()
    setStep(1)
    setError(undefined)
  }

  const renderContent = () => {
    switch (step) {
      case 1:
        return <ApprovalStep nft={nft} onNext={() => setStep(2)} onError={setError} />
      case 2:
        return <BidStep nft={nft} onError={setError} onSuccess={() => setStep(3)} />
      case 3:
        return (
          <>
            <Text className="font-semibold text-success" variant="heading-sm">
              Success
            </Text>
            <Text className="text-secondary">
              You have successfully placed a bid on {nft.collection.name} - {nft.name}!
            </Text>
            <Button className="w-full" variant="secondary" onClick={onClose}>
              Close and continue
            </Button>
          </>
        )
      default:
        return <></>
    }
  }

  return (
    <Modal
      dismissible
      size="md"
      show={show}
      onClose={handleReset}>
      <Modal.Body>
        <div className="flex flex-col justify-center items-center gap-4">
          {
            !!error ? (
              <>
                <Text className="font-semibold text-error text-center text-heading-sm">
                  Error report
                </Text>
                <Text className="max-w-full text-secondary text-center text-ellipsis" variant="body-18">
                  {error?.message}
                </Text>

                <Button className="w-full" variant="secondary" onClick={handleReset}>
                  Close
                </Button>
              </>
            ) : renderContent()
          }
        </div>
      </Modal.Body>
    </Modal>
  )
}