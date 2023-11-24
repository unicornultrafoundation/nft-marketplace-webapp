import { colors } from '@/config/theme'
import defaultColors from 'tailwindcss/colors'
import { useMemo } from 'react'

import U2ULogo from './U2ULogo'
import BurgerIcon from './Burger'
import ChevronDownIcon from './ChevronDown'
import UploadIcon from './Upload'
import CircleIcon from './Circle'
import MetamaskIcon from './Metamask'
import WalletConnectIcon from './WalletConnect'
import ArrowRightIcon from './ArrowRight'
import PlusCircleIcon from './PlusCircle'
import SliderIcon from './Slider'
import VerifiedIcon from './Verified'
import ArrowLeftIcon from './ArrowLeft'
import SearchIcon from "@/components/Icon/Search";
import U2NftMobileLogo from "@/components/Icon/U2NftMobile";
import BoxIcon from './Box'
import DollarSignIcon from './DollarSign'
import MoreVerticalIcon from './MoreVertical'
import RepeatIcon from './Repeat'
import TrendingUpIcon from './TrendingUp'
import ShareIcon from './Share'
import RefreshIcon from './Refresh'
import ShoppingBagIcon from './ShoppingBag'

type Color = keyof typeof defaultColors & keyof typeof colors

export interface IconProps {
  width?: number;
  height?: number;
  className?: string
  color?: Color | string
}

export default function Icon({ name, width, height, ...rest }: IconProps & {
  name: string
}) {
  const iconW = useMemo(() => width || 20, [width])
  const iconH = useMemo(() => height || 20, [height])

  const renderIcon = () => {
    switch (name) {
      case 'u2u-logo':
        return <U2ULogo width={iconW} height={iconH} />
      case 'burger':
        return <BurgerIcon width={iconW} height={iconH} {...rest} />
      case 'chevronDown':
        return <ChevronDownIcon width={iconW} height={iconH} {...rest} />
      case 'arrowRight':
        return <ArrowRightIcon width={iconW} height={iconH} {...rest} />
      case 'arrowLeft':
        return <ArrowLeftIcon width={iconW} height={iconH} {...rest} />
      case 'upload':
        return <UploadIcon width={iconW} height={iconH} {...rest} />
      case 'circle':
        return <CircleIcon width={iconW} height={iconH} {...rest} />
      case 'metaMask':
      case 'injected':
        return <MetamaskIcon width={iconW} height={iconH} {...rest} />
      case 'walletConnect':
        return <WalletConnectIcon width={iconW} height={iconH} {...rest} />
      case 'plusCircle':
        return <PlusCircleIcon width={iconW} height={iconH} {...rest} />
      case 'slider':
        return <SliderIcon width={iconW} height={iconH} {...rest} />
      case 'verified':
        return <VerifiedIcon width={iconW} height={iconH} />
      case 'box':
        return <BoxIcon width={iconW} height={iconH} {...rest} />
      case 'dollarSign':
        return <DollarSignIcon width={iconW} height={iconH} {...rest} />
      case 'moreVertical':
        return <MoreVerticalIcon width={iconW} height={iconH} {...rest} />
      case 'repeat':
        return <RepeatIcon width={iconW} height={iconH} {...rest} />
      case 'trendingUp':
        return <TrendingUpIcon width={iconW} height={iconH} {...rest} />
      case 'share':
        return <ShareIcon width={iconW} height={iconH} {...rest} />
      case 'refresh':
        return <RefreshIcon width={iconW} height={iconH} {...rest} />
      case 'shoppingBag':
        return <ShoppingBagIcon width={iconW} height={iconH} {...rest} />
      case 'search':
        return <SearchIcon width={iconW} height={iconH} {...rest} />
      case 'u2u-logo-mobile':
        return <U2NftMobileLogo width={iconW} height={iconH} {...rest} />
      default:
        return null
    }
  }
  return renderIcon()
}