import { Modal, ModalProps } from 'flowbite-react'
import { useState } from 'react'
import Text from '@/components/Text'
import Button from '@/components/Button'
import ApprovalStep from '@/components/Modal/SellNFTModal/ApprovalStep'
import { APIResponse } from '@/services/api/types'

interface Props extends ModalProps {
  nft: APIResponse.NFT,
}

export default function SellNFTModal({ nft, show, onClose }: Props) {
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
        return 'Step2'
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