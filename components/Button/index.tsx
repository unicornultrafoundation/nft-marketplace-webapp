"use client"

import { useMemo } from 'react'
import { classNames } from '@/utils/string'
import { Spinner } from 'flowbite-react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  scale?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'text' | 'icon' | 'outlined'
  loading?: boolean
  loadingText?: string
}

export default function Button({
  className,
  loading,
  loadingText,
  scale,
  variant,
  children,
  disabled,
  type,
  ...rest
}: ButtonProps) {
  const baseClass = useMemo(() => {
    return `focus:outline-none transition-all ${disabled ? 'cursor-not-allowed text-disabled' : 'cursor-pointer '}`
  }, [disabled])

  const scaleClass = useMemo(() => {
    switch (scale) {
      case "lg":
        return classNames(
          'text-body-18',
          variant === 'icon' ? 'p-4 rounded-full w-fit' : 'px-6 py-3.5 h-[52px] min-w-40 rounded-xl'
        )
      case "sm":
        return classNames(
          'text-body-14',
          variant === 'icon' ? 'p-3 rounded-full w-fit' : 'px-4 py-2 h-9 min-w-[120px] rounded-lg'
        )
      case "md":
      default:
        return classNames(
          'text-body-14 rounded-xl',
          variant === 'icon' ? 'p-3 rounded-full w-fit' : 'px-5 py-3 h-11 min-w-[120px]'
        )
    }
  }, [scale, variant])

  const variantClass = useMemo(() => {
    switch (variant) {
      case 'icon':
        return 'bg-surface-soft'
      case 'text':
        if (disabled) return 'text-disabled'
        return 'bg-transparent text-primary outline-none'
      case 'secondary':
        if (disabled) return 'bg-gray-100 text-disabled'
        return 'text-primary bg-button-secondary hover:bg-gray-200'
      case 'outlined':
        if (disabled) return 'bg-gray-100 text-disabled'
        return 'text-primary bg-surface-soft border-surfacehard border hover:bg-gray-200'
      case 'primary':
      default:
        if (disabled) return 'text-gray-0 bg-disabled'
        return 'text-gray-0 bg-button hover:bg-gray-700'
    }
  }, [variant, disabled])

  const loadingClass = useMemo(() => {
    return loading ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''
  }, [loading])

  return (
    <button
      type={type ?? 'button'}
      disabled={disabled}
      className={classNames(baseClass, scaleClass, variantClass, loadingClass, className)}
      {...rest}
    >
      <div className="flex justify-center items-center gap-3">
        {
          loading ? (
            <>
              <Spinner size="sm" />
              {loadingText || 'Loading...'}
            </>

          ) : children
        }
      </div>
    </button>
  )
}