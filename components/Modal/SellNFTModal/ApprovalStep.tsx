import Text from '@/components/Text'
import { Spinner } from 'flowbite-react'
import { useMarket } from '@/hooks/useMarket'
import { APIResponse } from '@/services/api/types'
import { useEffect, useMemo, useState } from 'react'
import { useWaitForTransaction } from 'wagmi'
import Button from '@/components/Button'

interface Props {
  onNext: () => void
  onError: (error: Error) => void
  nft: APIResponse.NFT
}

export default function ApprovalStep({ nft, onNext, onError }: Props) {
  const [txHash, setTxHash] = useState<string>()
  const {
    isMarketContractApproved,
    onApproveMarketContract,
    isFetchingApproval,
    contractCallError
  } = useMarket(nft)

  const {
    data,
    error: errorApproving,
    isLoading: isApproving,
    isSuccess: approvalCompleted
  } = useWaitForTransaction({
    hash: txHash as `0x${string}`,
    enabled: !!txHash
  })

  const handleApproveMarketContract = async () => {
    try {
      const { hash } = await onApproveMarketContract()
      setTxHash(hash)
    } catch (e) {

    }
  }

  const renderContent = useMemo(() => {
    switch (true) {
      case isApproving:
        return (
          <Text className="text-secondary text-center" variant="body-18">
            Approving contract ...
          </Text>
        )
      case !isFetchingApproval && !isMarketContractApproved:
        return (
          <>
            <Text className="text-secondary text-center" variant="body-18">
              Contract not approved. Please approve before proceed ...
            </Text>
            <Button className="w-full" onClick={handleApproveMarketContract}>Approve</Button>
          </>
        )
      case !!isMarketContractApproved:
        return (
          <Text className="text-secondary text-center" variant="body-18">
            Contract approved. Proceeding ...
          </Text>
        )
    }
  }, [isFetchingApproval, isMarketContractApproved, isApproving])

  useEffect(() => {
    if (isMarketContractApproved || approvalCompleted) onNext()
  }, [isMarketContractApproved, approvalCompleted]);

  useEffect(() => {
    if (contractCallError) onError(contractCallError)
  }, [contractCallError]);

  useEffect(() => {
    if (errorApproving) onError(errorApproving)
  }, [errorApproving]);


  return (
    <>
      <Text className="font-semibold text-primary text-center text-heading-sm">
        Approve market contract
      </Text>
      <Spinner size="xl" />
      {renderContent}
    </>
  )
}