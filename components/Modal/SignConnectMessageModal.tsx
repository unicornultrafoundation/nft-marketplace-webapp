import {
  CustomFlowbiteTheme,
  Modal,
  ModalProps,
  Spinner,
  Tooltip,
} from "flowbite-react";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useAccount, useSignMessage } from "wagmi";
import { SIGN_MESSAGE } from "@/config/constants";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import useAuthStore from "@/store/auth/store";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";
import { signMessage } from "@wagmi/core";

interface Props extends ModalProps {
  onConnectSuccess?: (accessToken?: string) => void;
  onSignup: () => void;
}

const modalTheme: CustomFlowbiteTheme["modal"] = {
  content: {
    inner:
      "relative rounded-lg bg-white shadow flex flex-col h-auto max-h-[600px] desktop:max-h-[800px] tablet:max-h-[800px]",
    base: "relative w-full desktop:p-10 tablet:p-6 p-4 ",
  },
  body: {
    base: "p-0 flex-1 overflow-auto",
  },
};

export default function SignConnectMessageModal({
  show,
  onConnectSuccess,
  onClose,
  onSignup,
}: Props) {
  const api = useMarketplaceApi();
  const { address } = useAccount();
  const { isError, isLoading, signMessageAsync, error } = useSignMessage();
  const { setProfile } = useAuthStore();
  const { onAuth } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleSignMessage = useCallback(async () => {
    setAuthError("");

    if (!address) return;
    const date = new Date().toISOString();

    try {
      setIsAuthenticating(true);

      // @ts-ignore
      const signature = window.ReactNativeWebView
        ? await (window as any).ethereum.request({
            method: "personal_sign",
            params: [SIGN_MESSAGE.CONNECT(date), address],
          })
        : await signMessage({ message: SIGN_MESSAGE.CONNECT(date) });

      const credentials = await onAuth(date, signature);
      const profile = await api.viewProfile(address);

      if (!profile.acceptedTerms) {
        // Not registered
        onSignup();
      } else {
        setProfile(profile);
        onConnectSuccess?.(credentials?.accessToken);
        onClose?.();
      }
    } catch (e: any) {
      setAuthError(e.message);
      setIsAuthenticating(false);
      console.error("Error signing connect message:", e);
    } finally {
      setIsAuthenticating(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const renderContent = () => {
    switch (true) {
      case isAuthenticating:
        return (
          <>
            <Text className="font-semibold text-primary text-center text-heading-sm">
              Authenticating...
            </Text>
            <Text className="text-secondary text-center" variant="body-18">
              Connecting your wallet to U2U NFT Market
            </Text>
            <Spinner size="xl" />
          </>
        );
      case isError || !!authError:
        return (
          <>
            <Text className="font-semibold text-error text-center text-heading-sm">
              Error report
            </Text>
            <Tooltip content={error?.message || authError} placement="bottom">
              <Text
                className="max-w-full text-secondary text-center text-ellipsis"
                variant="body-18"
              >
                {error?.message || authError}
              </Text>
            </Tooltip>

            <div>
              <Button
                className="w-full mb-5"
                variant="primary"
                onClick={handleSignMessage}
              >
                Try again
              </Button>
              <Button className="w-full" variant="secondary" onClick={onClose}>
                Close and Continue
              </Button>
            </div>
          </>
        );
      case isLoading:
      default:
        return (
          <>
            <Text className="font-semibold text-primary text-center text-heading-sm">
              Loading...
            </Text>
            <Text className="text-secondary text-center" variant="body-18">
              Sign the message in your wallet MetaMask to sign in safely
            </Text>
            <Spinner size="xl" />
            <Button className="w-full" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </>
        );
    }
  };

  useEffect(() => {
    if (show) {
      handleSignMessage();
    } else {
      setAuthError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <Modal
      theme={modalTheme}
      dismissible
      show={show}
      onClose={onClose}
      size="md"
    >
      <Modal.Body>
        <div className="mx-auto flex flex-col gap-8 p-8 items-center overflow-ellipsis">
          {renderContent()}
        </div>
      </Modal.Body>
    </Modal>
  );
}
