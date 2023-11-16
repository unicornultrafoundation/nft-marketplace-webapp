"use client"

import { classNames } from '@/utils/string'
import { typography } from '@/config/theme'

type VariantType = keyof typeof typography

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: VariantType
}

export default function Text({ className, variant, children, ...rest }: Props) {

  return (
    <p className={classNames(className, `text-${variant || 'body-14'}`)} {...rest}>
      {children}
    </p>
  )
}