import { useMemo, useState } from "react";
import SignupModal from "@/components/Modal/SignupModal";
import WalletConnectModal from "@/components/Modal/WalletConnectModal";
import { useAccount } from "wagmi";
import SignConnectMessageModal from "@/components/Modal/SignConnectMessageModal";
import useAuthStore from "@/store/auth/store";
import Button from "@/components/Button/index";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  className?: string;
  children?: React.ReactNode;
  action?: (accessToken?: string) => void;
  showConnectButton?: boolean;
}

export default function ConnectWalletButton({
  action,
  className,
  showConnectButton,
  children,
}: Props) {
  const [showWalletConnect, setShowWalletConnect] = useState(false);
  const [showSignMessage, setShowSignMessage] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const { isValidSession } = useAuth();

  const handleConnectWallet = () => {
    if (typeof localStorage !== "undefined") {
      if (!isValidSession) {
        localStorage.removeItem("auth-storage");
        setShowWalletConnect(true);
      } else {
        // Access Token has been saved in auth store
        action?.();
      }
    }
  };

  return (
    <>
      <div className={className} onClick={handleConnectWallet}>
        {showConnectButton && !isValidSession ? (
          <Button
            type="button"
            className="w-full"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </Button>
        ) : (
          children
        )}
      </div>

      <WalletConnectModal
        show={showWalletConnect}
        onSignMessage={() => setShowSignMessage(true)}
        onClose={() => setShowWalletConnect(false)}
      />

      <SignConnectMessageModal
        show={showSignMessage}
        onConnectSuccess={(accessToken) => action?.(accessToken)}
        onSignup={() => setShowSignup(true)}
        onClose={() => setShowSignMessage(false)}
      />

      <SignupModal
        show={showSignup}
        onClose={() => setShowSignup(false)}
        onSignupSuccess={(accessToken) => action?.(accessToken)}
      />
    </>
  );
}
