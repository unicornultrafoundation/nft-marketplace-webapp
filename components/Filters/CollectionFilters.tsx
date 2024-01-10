'use client'

import { Accordion } from 'flowbite-react'
import Text from '@/components/Text'
import Input from '@/components/Form/Input'
import Button from '@/components/Button'
import { APIParams } from '@/services/api/types'
import { useState } from 'react'
import Collapsible from '../Collapsible'
import { BrowserView } from 'react-device-detect'

interface Props {
  visible: boolean
  onApplyFilters?: (filters: APIParams.FetchCollections) => void
}

export default function CollectionFilters({ onApplyFilters, visible }: Props) {
  const [activeFilters, setActiveFilters] = useState<APIParams.FetchCollections>({
    min: '',
    max: ''
  })
  const [error, setError] = useState<boolean>(false)

  const handleChange = (key: keyof typeof activeFilters, value: any) => {
    if (
      (key === 'min' && (value === '' || (!isNaN(value) && Number(value) >= 0))) ||
      (key === 'max' && (!isNaN(value) && Number(value) >= 0))
    ) {
      const _filters = { ...activeFilters };
      _filters[key] = value;

      const min = _filters.min !== '' ? Number(_filters.min) : null;
      const max = _filters.max !== '' ? Number(_filters.max) : null;

      if (
        (min !== null && max !== null && min > max) ||
        (min === null && max === 0) ||
        (min === 0 && max === 0)
      ) {
        setError(true);
      } else {
        setError(false);
      }

      setActiveFilters(_filters);
    } else {
      setError(true);
    }
  };

  const handleApplyFilters = () => {
    if (error) {
      return
    } else {
      onApplyFilters?.(activeFilters)
    }
  }

  if (!visible) return null

  return (
    <div className="w-72 flex flex-col ">
      <Collapsible header="Floor Price" className='rounded-2xl border'>
        <div className="flex items-center gap-4 mb-4">
          <Input
            value={activeFilters.min as string}
            onChange={e => handleChange('min', e.target.value)}
            containerClass="w-24"
            scale="sm"
            placeholder="Min"
            error={error}
          />
          <Text className="text-primary">
            to
          </Text>
          <Input
            value={activeFilters.max as string}
            onChange={e => handleChange('max', e.target.value)}
            containerClass="w-24"
            scale="sm"
            placeholder="Max"
            error={error}
          />
        </div>
        <BrowserView>
          <Button className="w-full" variant="secondary" onClick={handleApplyFilters}>
            Apply
          </Button>
        </BrowserView>
      </Collapsible>
    </div>
  )
}