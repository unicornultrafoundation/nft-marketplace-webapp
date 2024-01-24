import { Modal, ModalProps } from 'flowbite-react'
import Text from '../Text'
import Button from '../Button'
import VerifyIcon from '../Icon/Verify'
import { useRouter } from 'next/navigation'
import Icon from '../Icon'

interface FromState extends ModalProps {
  verifyData?: Record<string, any>;
}

export default function VerifyAccountModal({ show, onClose, verifyData }: FromState) {
  const router = useRouter()

  const handleVerifyAccount = () => {
    Object.keys(verifyData?.listVerify || {}).forEach(key => {
      if (verifyData?.listVerify && verifyData?.listVerify[key] === false) {
        switch (key) {
          case 'avatar' || 'verifyEmail' || 'bio' || 'twitterLink':
            router.push('/profile')
            break;
          case 'ownerOrCreater':
            router.push('/create/nft')
            break;
          default:
            break;
        }
      }
    })
    onClose?.();
  };

  return (
    <Modal dismissible onClose={onClose} position="center" show={show} size="sm">
      <Modal.Body>
        <div className='flex flex-col gap-4 p-3'>
          {verifyData?.accountStatus ?
            <Text className='text-body-24 font-normal text-success'>You have successfully verified your account</Text>
            :
            <>
              <Text className='text-body-24 font-bold'>Oops</Text>
              <Text className='text-body-16 font-medium'>To begin your verification process you must add following data</Text>
              <div>
                {verifyData?.listVerify && Object.entries(verifyData?.listVerify).map(([key, value]) => (
                  <li key={key} className='flex gap-2 items-center'>
                    <Icon name="verify-active" width={16} height={16} />
                    <Text>{`${key} is required`}</Text>
                  </li>
                ))}
              </div>
            </>
          }

          <Button onClick={handleVerifyAccount}>Continue</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
