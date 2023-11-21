"use client"

import Image from 'next/image'
import brandingSvg from '@/assets/branding.svg'
import Link from 'next/link'
import Text from '@/components/Text'
import Input from '@/components/Form/Input'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { Tabs } from 'flowbite-react'

export default function MainFooter() {
  const links = [
    {
      title: 'Marketplace',
      items: [
        { label: 'Explore', href: '#' },
        { label: 'Create', href: '#' },
        { label: 'Artists', href: '#' }
      ]
    },
    {
      title: 'Links',
      items: [
        { label: 'API', href: '#' },
        { label: 'Token', href: '#' },
        { label: 'Branding', href: '#' }
      ]
    },
    {
      title: 'Socials',
      items: [
        { label: 'Facebook', href: '#' },
        { label: 'Instagram', href: '#' },
        { label: 'Discord', href: '#' }
      ]
    }
  ]
  return (
    <footer className="desktop:px-20 desktop:py-16 tablet:px-8 tablet:py-10 px-4 py-8 flex flex-col gap-10">
      <div className="flex justify-between flex-col gap-10 tablet:flex-row desktop:flex-row tablet:gap-0 desktop:gap-0">
        <Link href="/">
          <Image height={28} src={brandingSvg} alt="u2u-brand" />
        </Link>

        <div className="gap-10 tablet:mr-24 desktop:mr-24 grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-3">
          {links.map(group => (
            <div
              key={group.title}
              className="flex flex-col gap-3">
              <Text className="text-primary font-semibold" variant="body-16">
                {group.title}
              </Text>
              {group.items.map((item, index) => (
                <Link className="text-secondary" key={index} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="border-y border-gray-200 flex justify-between flex-col tablet:flex-row desktop:flex-row gap-10 py-6 tablet:py-10 desktop:py-10">
        <div>
          <Text className="text-primary font-medium mb-3" variant="body-18">
            Join our newsletter
          </Text>
          <Text className="text-secondary" variant="body-16">
            Keep up to date with us
          </Text>
        </div>

        <div className="flex items-center gap-3">
          <Input containerClass="w-full tablet:w-72 desktop:w-72 " scale="sm" placeholder="Enter your email address" />
          <Button>
            Submit
            <Icon name="arrow-right" width={12} height={12} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col tablet:flex-row desktop:flex-row justify-center tablet:justify-between desktop:justify-between items-center gap-4 tablet:gap-0 desktop:gap-0">
        <div className="flex-1">
          <Text className="text-tertiary" variant="body-12">
            © U2NFT, Inc. All rights reserved.
          </Text>
        </div>

        <div className="flex-1 flex items-center justify-center gap-6">
          <Link href="#" className="text-body-12 text-tertiary">
            Terms of Service
          </Link>
          <Link href="#" className="text-body-12 text-tertiary">
            Privacy policy
          </Link>
          <Link href="#" className="text-body-12 text-tertiary">
            Cookies
          </Link>
        </div>

        <div className="flex-1 self-center tablet:self-end desktop:self-end">
          <Text className="text-tertiary text-right" variant="body-12">
            Tabs
          </Text>
        </div>
      </div>
    </footer>
  )
}