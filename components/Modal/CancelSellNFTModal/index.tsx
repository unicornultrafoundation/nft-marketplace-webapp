import {
  CustomFlowbiteTheme,
  Modal,
  ModalProps,
  Tooltip,
} from "flowbite-react";
import { useCancelSellNFT } from "@/hooks/useMarket";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useEffect, useMemo, useState } from "react";
import useAuthStore from "@/store/auth/store";
import { NFT } from "@/types/entitites";
import { APIResponse } from "@/services/api/types";
import NFTMarketData = APIResponse.NFTMarketData;
import { toast } from "react-toastify";
import { useCancelSellURC1155, useCancelSellURC721 } from "@/hooks/useSellNFT";

interface Props extends ModalProps {
  nft: NFT;
  marketData?: NFTMarketData;
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

export default function CancelSellNFTModal({
  nft,
  show,
  onClose,
  marketData,
}: Props) {
  const wallet = useAuthStore((state) => state.profile?.publicKey);
  const [loading, setLoading] = useState(false);
  const onCancelSellURC721 = useCancelSellURC721(nft);
  const onCancelSellURC1155 = useCancelSellURC1155();
  const mySale = useMemo(() => {
    return marketData?.sellInfo?.find(
      (item) => item.from?.signer?.toLowerCase() === wallet?.toLowerCase(),
    );
  }, [marketData, wallet]);

  const handleCancelSell = async () => {
    const toastId = toast.loading("Preparing data...", { type: "info" });
    setLoading(true);
    try {
      if (nft.collection.type === "ERC721") {
        await onCancelSellURC721();
      } else {
        await onCancelSellURC1155(mySale?.operationId || "");
      }
      toast.update(toastId, {
        render: "Sale cancelled successfully",
        type: "success",
        autoClose: 1000,
        closeButton: true,
        isLoading: false,
      });
      onClose?.();
    } catch (e) {
      console.error(e);
      toast.update(toastId, {
        render: "Sale cancelled failed",
        type: "error",
        autoClose: 1000,
        closeButton: true,
        isLoading: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      theme={modalTheme}
      dismissible
      size="lg"
      show={show}
      onClose={onClose}
    >
      <Modal.Body className="p-10">
        <div className="flex flex-col justify-center gap-4 items-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="font-bold">
              <Text className="mb-3 text-center" variant="heading-xs">
                Cancel listing
              </Text>
              <Text className="text-secondary" variant="body-16">
                Cancel sale for{" "}
                <span className="text-primary font-bold">{nft.name}</span> from{" "}
                <span className="text-primary font-bold">
                  {nft.collection.name}
                </span>{" "}
                collection
              </Text>
            </div>

            <div className="w-full flex gap-4">
              <Button className="flex-1" variant="secondary" onClick={onClose}>
                Close
              </Button>
              <Button
                className="flex-1"
                onClick={handleCancelSell}
                loading={loading}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
