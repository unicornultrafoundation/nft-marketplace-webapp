import { useBidUsingNative } from '@/hooks/useMarket'
import Text from '@/components/Text'
import Input from '@/components/Form/Input'
import Button from '@/components/Button'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { tokens } from '@/config/tokens'
import { useAccount, useBalance } from 'wagmi'
import { formatUnits, parseEther, parseUnits } from 'ethers'
import FormValidationMessages from '@/components/Form/ValidationMessages'
import { FormState, NFT } from '@/types'
import { APIResponse } from '@/services/api/types'
import NFTMarketData = APIResponse.NFTMarketData
import { formatDisplayedBalance } from '@/utils'
import FeeCalculator from '@/components/FeeCalculator'
import { findTokenByAddress } from '@/utils/token'
import { numberRegex } from '@/utils/regex'

interface Props {
  onSuccess: () => void
  onError: (error: Error) => void
  nft: NFT
  marketData?: NFTMarketData
}

export default function BidStep({ onSuccess, onError, nft, marketData }: Props) {
  const { address } = useAccount()
  const { data: tokenBalance } = useBalance({
    address: address,
    enabled: !!address
  })
  const token = findTokenByAddress(tokens.wu2u.address)

  const { onBidUsingNative, isSuccess, isLoading, error } = useBidUsingNative(nft)
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors }
  } = useForm<FormState.BidNFT>()
  const formRules = {
    price: {
      required: 'Please input bid price',
      min: { value: 0, message: 'Price cannot be zero' },
      validate: {
        isNumber: (v: any) => !isNaN(v) || 'Please input a valid number',
        balance: (v: any) => {
          if (!tokenBalance?.value) return 'Not enough balance'
          if (nft.collection.type === 'ERC1155') {
            const totalPrice = Number(price) * Number(quantity)
            const totalPriceBN = parseEther(totalPrice.toString())
            return totalPriceBN < tokenBalance.value || 'Not enough balance'
          }
          const priceBN = parseEther(String(v))
          return priceBN < tokenBalance.value || 'Not enough balance'
        }
      }
    },
    quantity: {
      pattern: { value: numberRegex, message: 'Wrong number format' },
      validate: {
        required: (v: any) => {
          if (nft.collection.type === 'ERC721') return true
          return (!!v && !isNaN(v) && Number(v) > 0) || 'Please input a valid number of quantity'
        },
        quantity: (v: any) => {
          if (nft.collection.type === 'ERC721') return true
          return Number(v) <= Number(marketData?.totalSupply || 0) || 'Cannot bid more than total supply'
        }, 
      },
    }
  }
  const [price, quantity] = watch(['price', 'quantity'])

  const onSubmit = async ({ price, quantity }: FormState.BidNFT) => {
    try {
      await onBidUsingNative(price, quantity)
    } catch (e: any) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (error) onError(error)
  }, [error])

  useEffect(() => {
    if (isSuccess) onSuccess()
  }, [isSuccess])

  return (
    <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="font-bold">
        <Text className="mb-3" variant="heading-xs">
          Place a bid
        </Text>
        <Text className="text-secondary" variant="body-16">
          Creating bid
          for <span className="text-primary font-bold">{nft.name}</span> from <span className="text-primary font-bold">{nft.collection.name}</span> collection
        </Text>
      </div>

      <div>
        <label className="text-body-14 text-secondary font-semibold mb-1">
          {nft.collection.type === 'ERC721' ? 'Price' : 'Price per unit'}
        </label>
        <Input
          maxLength={18}
          size={18}
          error={!!errors.price}
          register={register('price', formRules.price)}
        />
      </div>

      <div>
        <label className="text-body-14 text-secondary font-semibold mb-1">Bid using</label>
        <Input
          readOnly
          value={token?.symbol}
          appendIcon={
            <Text>
              Balance: {formatDisplayedBalance(formatUnits(tokenBalance?.value || 0, 18))}
            </Text>
          }
        />
      </div>

      {nft.collection.type === 'ERC1155' ? (
        <>
          <div>
            <Text className="text-secondary font-semibold mb-1">Quantity</Text>
            <Input
              maxLength={3}
              size={3}
              register={register('quantity', formRules.quantity)}
              appendIcon={
                <Text className="w-56 overflow-ellipsis whitespace-nowrap text-right">
                  Max: {formatDisplayedBalance(marketData?.totalSupply || 0, 0)}
                </Text>}
            />
          </div>
          <div>
            <Text className="text-secondary font-semibold mb-1">Estimated cost:</Text>
            <Input
              readOnly
              value={Number(price) * Number(quantity) || 0}
              appendIcon={<Text>U2U</Text>} />
          </div>
          <FeeCalculator
            mode="buyer"
            nft={nft}
            price={parseUnits(String(Number(price) * Number(quantity) || 0), token?.decimal)}
            quoteToken={token?.address} />
        </>
      ) : (
        <FeeCalculator
          mode="buyer"
          nft={nft}
          price={parseUnits(price || '0', token?.decimal)}
          quoteToken={token?.address} />
      )}

      <FormValidationMessages errors={errors} />
      <Button type={'submit'} className="w-full" loading={isLoading}>
        Place bid
      </Button>
    </form>
  )
}