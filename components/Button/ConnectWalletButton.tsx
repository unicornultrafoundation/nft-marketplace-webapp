"use client"

import Button, { ButtonProps } from './index'
import { useState } from 'react'
import SignupModal from '@/components/Modal/SignupModal'
import WalletConnectModal from '@/components/Modal/WalletConnectModal'
import { useAccount } from 'wagmi'
import SignConnectMessageModal from '@/components/Modal/SignConnectMessageModal'
import useAuthStore from '@/store/auth/store'
import { useRouter } from 'next/navigation'

interface Props extends ButtonProps{
  children?: React.ReactNode
  mode?: 'link' | 'modal'
}

export default function ConnectWalletButton({ className, mode = 'modal', children, ...rest }: Props) {
  const router = useRouter()
  const { isConnected } = useAccount()
  const [showWalletConnect, setShowWalletConnect] = useState(false)
  const [showSignMessage, setShowSignMessage] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const acceptedTerms = useAuthStore(state => state.profile?.acceptedTerms)
  const accessToken = useAuthStore(state => state.credentials?.accessToken)

  const handleConnectWallet = () => {
    if (mode === 'modal') {
      setShowWalletConnect(true)
    } else {
      router.push('/connect')
    }
  }

  if (isConnected && acceptedTerms && !!accessToken) {
    return children
  }

  return (
    <>
      <Button type="button" onClick={handleConnectWallet} className={className} {...rest}>
        Connect Wallet
      </Button>

      <WalletConnectModal
        show={showWalletConnect}
        onSignMessage={() => setShowSignMessage(true)}
        onClose={() => setShowWalletConnect(false)} />

      <SignConnectMessageModal
        show={showSignMessage}
        onSignup={() => setShowSignup(true)}
        onClose={() => setShowSignMessage(false)} />

      <SignupModal
        show={showSignup}
        onClose={() => setShowSignup(false)} />
    </>
  )
}