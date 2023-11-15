"use client"

import { contracts } from '@/config/contracts'
import Select from '@/components/Form/Select'
import { useMemo, useState } from 'react'
import { Address, useContractRead, useContractWrite } from 'wagmi'
import Text from '@/components/Text'
import Button from '@/components/Button'
import Input from '@/components/Form/Input'

export default function TestPage() {
  const contractOptions = Object.entries(contracts).map(([name, contract]) => {
    return { value: contract.address, label: name }
  })
  const [selectedContractAddr, setSelectedContractAddr] = useState(contractOptions[0].value)

  const selectedContract = useMemo(() => {
    return Object.values(contracts).find(c => c.address === selectedContractAddr)
  }, [selectedContractAddr])

  const viewFunctions = useMemo(() => {
    if (!selectedContract) return []
    return selectedContract.abi.filter((item: any) => item.type === 'function' && item.stateMutability === 'view')
  }, [selectedContract])

  const mutableFunctions = useMemo(() => {
    if (!selectedContract) return []
    return selectedContract.abi
      .filter((item: any) => item.type === 'function' && item.stateMutability !== 'view')
  }, [selectedContract])

  const [viewFunctionName, setViewFunctionName] = useState('')
  const [mutableFuncName, setMutableFuncName] = useState('')
  const [args, setArgs] = useState<any[]>(Array.from(Array(10)))
  const inputs = useMemo(() => {
    const funcName = viewFunctionName || mutableFuncName
    if (!funcName) return []
    const selectedFunc = selectedContract?.abi.find((item: any) => item.name === funcName)
    return selectedFunc?.inputs || []
  }, [viewFunctionName, mutableFuncName, selectedContract])

  const [executeFuncName, setExecuteFuncName] = useState('')

  const {
    data: viewResponse,
    error: viewError,
    isLoading: isViewing
  } = useContractRead({
    address: selectedContractAddr,
    abi: selectedContract?.abi,
    functionName: executeFuncName,
    args: args.filter(Boolean)
  })
  const {
    data: mutationResponse,
    error: mutatingError,
    isLoading: isMutating,
    write
  } = useContractWrite({
    address: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    abi: selectedContract?.abi,
    functionName: executeFuncName
  })

  const response = useMemo(() => {
    if (!!viewFunctionName) return viewResponse
    if (!!mutableFuncName) return mutationResponse
    return 'null'
  }, [viewFunctionName, mutableFuncName, viewResponse, mutationResponse])

  const error = useMemo(() => {
    if (!!viewFunctionName) return viewError
    if (!!mutableFuncName) return mutatingError
    return { message: 'null' }
  }, [viewFunctionName, mutableFuncName, viewError, mutatingError])

  return (
    <div className="flex flex-col gap-6">
      <Select
        value={selectedContractAddr}
        onChange={e => setSelectedContractAddr(e.target.value as Address)}
        options={contractOptions}
      />

      <div className="flex gap-4">
        <div className="w-40 flex flex-col gap-2">
          <Text variant="heading-md">
            functions
          </Text>

          <Text variant="body-14">
            Mutable
          </Text>
          {
            mutableFunctions.map((item: any) => (
              <Button
                variant={item.name === mutableFuncName ? 'primary' : 'secondary'}
                key={item.name}
                onClick={() => {
                  setMutableFuncName(item.name)
                  setViewFunctionName('')
                  setExecuteFuncName('')
                  setArgs(Array.from(Array(10)))
                }}
              >
                {item.name}
              </Button>
            ))
          }

          <Text variant="body-14">
            View
          </Text>
          {
            viewFunctions.map((item: any) => (
              <Button
                variant={item.name === viewFunctionName ? 'primary' : 'secondary'}
                key={item.name}
                onClick={() => {
                  setViewFunctionName(item.name)
                  setMutableFuncName('')
                  setExecuteFuncName('')
                  setArgs(Array.from(Array(10)))
                }}
              >
                {item.name}
              </Button>
            ))
          }
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <Text variant="heading-md">
            Params
          </Text>
          {
            inputs.map((item: any, index: number) => {

              return (
                <div key={item.name}>
                  <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </label>
                  <Input
                    value={args[index]}
                    placeholder={`type: ${item.type}`}
                    onChange={e => {
                      const inputs = [...args]
                      inputs[index] = e.target.value
                      setArgs(inputs)
                    }}
                  />
                </div>
              )
            })
          }
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <Text variant="heading-md">
            Response
          </Text>
          <Button onClick={() => {
            setExecuteFuncName(viewFunctionName || mutableFuncName)
            if (mutableFuncName) setTimeout(() => write(), 10)
          }}>
            {(isMutating || isViewing) ? 'Loading...' : 'Execute'}
          </Button>

          <Text>
            Data: {response?.toString() || 'null'}
          </Text>
          <Text>
            Error: {error?.message}
          </Text>
        </div>
      </div>
    </div>
  )
}