'use client'

import Text from '@/components/Text'
import ImageUploader from '@/components/Form/ImageUploader'
import Input from '@/components/Form/Input'
import Textarea from '@/components/Form/Textarea'
import Button from '@/components/Button'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import NFTTypeSelection from '@/components/NFT/NFTTypeSelection'
import {
  useCreateCollection,
  useUpdateCollection
} from '@/hooks/useCollection'
import { randomWord } from '@rarible/types'
import useAuthStore from '@/store/auth/store'
import { BASE_API_URL } from '@/config/api'
import Icon from '@/components/Icon'
import { toast } from 'react-toastify'
import { AssetType } from '@/types'
import ConnectWalletButton from '@/components/Button/ConnectWalletButton'
import { useMarketplaceApi } from '@/hooks/useMarketplaceApi'

export default function CreateNFTCollectionPage() {
  const api = useMarketplaceApi()
  const creator = useAuthStore(state => state.profile?.id)
  const [type, setType] = useState<AssetType>()
  const { onCreateCollection } = useCreateCollection()
  const { onUpdateCollection } = useUpdateCollection()
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      name: '',
      symbol: '',
      description: '',
      shortUrl: ''
    }
  })

  const [image, setImage] = useState<Blob | undefined>()

  const resetForm = () => {
    reset()
    setType(undefined)
  }

  const onSubmit = async (data: any) => {
    if (!type || !creator || !image) return
    const toastId = toast.loading('Uploading Image...', { type: 'info' })

    try {
      const salt = randomWord()
      const { name, symbol, description, shortUrl } = data
      const args = [name, symbol, 'ipfs:/', BASE_API_URL + '/collection/' + shortUrl, [], salt]
      const { fileHashes } = await api.uploadFile(image)

      toast.update(toastId, { render: 'Sending transaction', type: 'info' })

      const tx = await onCreateCollection(type, args)
      const res = await onUpdateCollection({
        name,
        symbol,
        description,
        type,
        shortUrl,
        txCreationHash: tx.hash,
        creators: creator,
        metadata: JSON.stringify({
          image: fileHashes[0]
        })
      })

      toast.update(toastId, { render: 'Collection created successfully', type: 'success', isLoading: false })
      resetForm()
    } catch (e) {
      toast.update(toastId, { render: `Error creating collection: ${e}`, type: 'error', isLoading: false })
      console.error(e)
    }
  }

  if (!type) {
    return (
      <NFTTypeSelection title="Choose collection type" onSelect={setType} />
    )
  }

  return (
    <div className="w-full flex justify-center py-10 tablet:py-20 desktop:py-20">
      <div className="flex flex-col tablet:w-[550px] w-full">

        <div className="flex items-center mb-6 tablet:mb-10 desktop:mb-10">
          <Button variant="text" onClick={resetForm}>
            <Icon name="arrowLeft" width={24} height={24} />
          </Button>
          <Text className="text-body-32 tablet:text-body-40 desktop:text-body font-semibold">
            Create New Collection - {type}
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-10">
            {/* Upload file */}
            <div>
              <Text className="text-base font-semibold mb-1">Collection image</Text>
              <ImageUploader
                image={image}
                onInput={setImage}
              />
            </div>
            {/* Name */}
            <div>
              <Text className="text-base font-semibold mb-1">Display name</Text>
              <Input register={register('name')}
              />
            </div>
            {/* Symbol */}
            <div>
              <Text className="text-base font-semibold mb-1">Symbol</Text>
              <Input
                register={register('symbol')}
              />
            </div>
            <div>
              <Text className="text-base font-semibold mb-1">Short URL</Text>
              <Input
                register={register('shortUrl')}
              />
            </div>
            {/* Description */}
            <div>
              <Text className="text-base font-semibold mb-1">Description (optional)</Text>
              <Textarea
                className="h-[160px] resize-none"
                register={register('description')}
              />
            </div>

            {/* Button finish */}
            <div className="justify-end flex">
              <ConnectWalletButton>
                <Button type="submit" className="w-full tablet:w-auto desktop:w-auto">
                  Create collection
                </Button>
              </ConnectWalletButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}