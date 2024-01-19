'use client'

import Text from '@/components/Text'
import ImageUploader from '@/components/Form/ImageUploader'
import Input from '@/components/Form/Input'
import Textarea from '@/components/Form/Textarea'
import Button from '@/components/Button'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import {
  useCreateCollection,
  useUpdateCollection
} from '@/hooks/useCollection'
import { randomWord } from '@rarible/types'
import useAuthStore from '@/store/auth/store'
import { BASE_API_URL } from '@/config/api'
import Icon from '@/components/Icon'
import { toast } from 'react-toastify'
import { AssetType, FormState } from '@/types'
import ConnectWalletButton from '@/components/Button/ConnectWalletButton'
import { useMarketplaceApi } from '@/hooks/useMarketplaceApi'
import FormValidationMessages from '@/components/Form/ValidationMessages'
import { noSpecialCharacterRegex } from '@/utils/regex'
import { parseImageUrl } from '@/utils/nft'
import { waitForTransaction } from '@wagmi/core'
import { redirect, useParams, useRouter } from 'next/navigation'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { CHAIN_ID } from '@/config/constants'

export default function CreateNFTCollectionPage() {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const type = useParams().type.toString().toUpperCase() as AssetType
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [validating, setValidating] = useState(false)
  const [uploading, setUploading] = useState(false)
  const api = useMarketplaceApi()
  const creator = useAuthStore(state => state.profile?.id)
  const { onCreateCollectionContract } = useCreateCollection()
  const { onCreateCollection } = useUpdateCollection()
  const {
    handleSubmit,
    register,
    reset,
    watch,
    setError,
    clearErrors,
    control,
    setValue,
    formState: { errors }
  } = useForm<FormState.CreateCollection>({ reValidateMode: 'onChange' })

  const formRules = {
    name: {
      required: 'Collection name is required!',
      pattern: { value: noSpecialCharacterRegex, message: 'Collection name should not contain special characters' },
      maxLength: { value: 25, message: 'Collection name cannot exceed 25 characters' }
    },
    symbol: {
      required: 'Symbol is required!',
      pattern: { value: noSpecialCharacterRegex, message: 'Collection symbol should not contain special characters' }
    },
    shortUrl: {
      pattern: { value: noSpecialCharacterRegex, message: 'Short url should not contain special characters' }
    },
    description: {
      maxLength: { value: 256, message: 'Description cannot exceed 256 characters' }
    },
    image: {
      required: 'Collection image is required!'
    }
  }

  const handleUploadImage = async (file?: Blob) => {
    if (!file) {
      setValue('avatar', '')
      return
    }
    setUploading(true)
    try {
      await toast.promise(api.uploadFile(file), {
        pending: 'Uploading image...',
        success: {
          render: (data) => {
            setValue('avatar', parseImageUrl(data?.data?.fileHashes[0]) as string)
            clearErrors('avatar');
            return 'Collection image uploaded successfully'
          }
        },
        error: {
          render: (error) => {
            setValue('avatar', '')
            return `Uploading error: ${(error.data as any).message}`
          }
        }
      })
    } finally {
      setUploading(false)
    }
  }

  const resetForm = () => {
    reset()
    router.push('/create/collection')
  }

  const onSubmit = async (data: FormState.CreateCollection) => {
    if (!type || !creator) return
    if (!!chain?.id && chain?.id !== Number(CHAIN_ID)) {
      switchNetwork?.(Number(CHAIN_ID));
      return;
    }
    const toastId = toast.loading('Preparing data...', { type: 'info' })
    setLoading(true)
    try {
      const salt = randomWord()
      const fullShortUrl = BASE_API_URL + '/collection/' + data.shortUrl
      const args = [data.name, data.symbol, `ipfs://`, fullShortUrl, [], salt]

      toast.update(toastId, { render: 'Sending transaction', type: 'info' })

      const tx = await onCreateCollectionContract(type, args)
      await Promise.all([
        waitForTransaction({ hash: tx.hash }),

        onCreateCollection({
          ...data,
          type,
          txCreationHash: tx.hash,
          creator
        })
      ])

      toast.update(toastId, {
        render: 'Collection created successfully',
        type: 'success',
        isLoading: false,
        autoClose: 5000,
        closeButton: true
      })
      resetForm()
      router.push('/explore/collections')
    } catch (e: any) {
      toast.update(toastId, {
        render: `Error creating collection: ${e.message ?? e}`,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
        closeButton: true
      })
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleValidateInput = async (name: string, value: Record<string, any>) => {
    try {
      setValidating(true)
      if (name === 'name' && !!value.name) {
        const existed = await api.validateInput({ key: 'collectionName', value: value.name })
        if (existed) setError('name', { type: 'custom', message: 'Collection name already existed' })
        else if (errors.name) clearErrors('name')
      }

      if (name === 'shortUrl' && !!value.shortUrl) {
        const existed = await api.validateInput({ key: 'collectionShortUrl', value: value.shortUrl })
        if (existed) setError('shortUrl', { type: 'custom', message: 'Short url already existed' })
        else if (errors.shortUrl) clearErrors('shortUrl')
      }
    } finally {
      setValidating(false)
    }
  }

  useEffect(() => {
    const subscription = watch(async (value, { name, type }) => {
      if (!name) return
      handleValidateInput(name, value)
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    if (type !== 'ERC1155' && type !== 'ERC721') {
      return redirect('/create/collection')
    }
  }, [type]);

  return (
    <div className="w-full flex justify-center py-10 tablet:py-20 desktop:py-20">
      <div className="flex flex-col tablet:w-[550px] w-full">

        <div className="flex items-center mb-6 tablet:mb-10 desktop:mb-10">
          <Button
            variant="text"
            onClick={resetForm}
            className="min-w-[60px] tablet:min-w-[120px] desktop:min-w-[120px]">
            <Icon name="arrowLeft" width={24} height={24} />
          </Button>
          <Text className="text-body-32 tablet:text-body-40 desktop:text-body-40 font-semibold flex-1">
            Create New Collection - {type}
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 p-4">
            {/* Upload file */}
            <div>
              <Text className="text-base font-semibold mb-1">Collection image</Text>
              <Controller
                name="avatar"
                control={control}
                rules={formRules.image}
                render={({ field: { value } }) => (
                  <ImageUploader
                    value={value}
                    onInput={handleUploadImage}
                    loading={uploading}
                    error={!!errors.avatar}
                    maxSize={20}
                    accept=".png,.jpeg, .png, .gif, .webp"
                  />
                )}
              />
            </div>
            {/* Name */}
            <div>
              <Text className="text-base font-semibold mb-1">Display name</Text>
              <Input register={register('name', formRules.name)} error={!!errors.name} />
            </div>
            {/* Symbol */}
            <div>
              <Text className="text-base font-semibold mb-1">Symbol</Text>
              <Input register={register('symbol', formRules.symbol)} error={!!errors.symbol} />
            </div>
            <div>
              <Text className="text-base font-semibold mb-1">Short URL</Text>
              <Input
                error={!!errors.shortUrl}
                register={register('shortUrl', formRules.shortUrl)}
              />
            </div>
            {/* Description */}
            <div>
              <Text className="text-base font-semibold mb-1">Description (optional)</Text>
              <Textarea
                className="h-[160px] resize-none"
                register={register('description', formRules.description)}
                error={!!errors.description}
              />
            </div>

            <FormValidationMessages errors={errors} />

            {/* Button finish */}
            <ConnectWalletButton>
              <Button
                loading={loading}
                loadingText="Creating collection ..."
                disabled={validating || uploading || Object.keys(errors).length > 0}
                type="submit"
                className="w-full tablet:w-auto desktop:w-auto">
                Create collection
              </Button>
            </ConnectWalletButton>
          </div>
        </form>
      </div>
    </div>
  )
}