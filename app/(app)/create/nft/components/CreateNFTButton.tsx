import Button, { ButtonProps } from '@/components/Button'
import ConnectWalletButton from '@/components/Button/ConnectWalletButton'
import { Address } from 'wagmi'
import { useCreateNFT } from '@/hooks/useNFT'
import { useFormContext } from 'react-hook-form'
import { CreateNFTForm } from '@/types/form'
import { toast } from 'react-toastify'
import { AssetType } from '@/types'

interface Props extends ButtonProps {
  collection: Address,
  assetType: AssetType
}

export default function CreateNFTButton({ disabled, collection, assetType }: Props) {
  const { onCreateNFT } = useCreateNFT(collection, assetType)
  const { getValues } = useFormContext<CreateNFTForm>()

  const handleSubmit = async () => {
    const data = getValues()
    if (!assetType) return
    const toastId = toast.loading('Preparing transaction...', { type: 'info' })
    const { collection, ...rest } = data

    try {
      await onCreateNFT(assetType, rest, toastId)
    } catch (e) {
      toast.update(toastId, { render: `Error Minting item: ${e}`, type: 'error', isLoading: false })
      console.error(e)
    }
  }

  return (
    <ConnectWalletButton>
      <Button
        disabled={disabled}
        onClick={handleSubmit}
        className="w-full tablet:w-auto desktop:w-auto">
        Create Item
      </Button>
    </ConnectWalletButton>
  )
}