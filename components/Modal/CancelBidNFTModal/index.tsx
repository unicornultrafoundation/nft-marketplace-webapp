import {
  CustomFlowbiteTheme,
  Modal,
  ModalProps,
  Tooltip,
} from "flowbite-react";
import { useCancelBidNFT } from "@/hooks/useMarket";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { NFT, MarketEvent } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props extends ModalProps {
  nft: NFT;
  bid?: MarketEvent | undefined;
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

export default function CancelBidNFTModal({ nft, show, onClose, bid }: Props) {
  const { onCancelBid, isLoading, error, isSuccess } = useCancelBidNFT(nft);

  const handleCancelBid = async () => {
    if (!bid) return;
    try {
      onCancelBid(bid.operationId);
    } catch (e: any) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(`Error report: ${error.message}`, {
        autoClose: 1000,
        closeButton: true,
      });
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Bid cancelled successfully`, {
        autoClose: 1000,
        closeButton: true,
      });
      onClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <Modal
      theme={modalTheme}
      dismissible
      size="lg"
      show={show}
      onClose={onClose}
    >
      <Modal.Body className="p-10">
        <div className="flex flex-col justify-center items-center gap-4 ">
          <div className="font-bold">
            <Text className="mb-3 text-center" variant="heading-xs">
              Cancel Bidding
            </Text>
            <Text className="text-secondary text-center" variant="body-16">
              Preparing to remove bid for{" "}
              <span className="text-primary font-bold">{nft.name}</span> from{" "}
              <span className="text-primary font-bold">
                {nft.collection.name}
              </span>{" "}
              collection
            </Text>
          </div>

          <div className="flex gap-4 w-full">
            <Button className="flex-1" variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button
              className="flex-1"
              onClick={handleCancelBid}
              loading={isLoading}
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
