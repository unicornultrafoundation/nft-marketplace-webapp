import {
  CustomFlowbiteTheme,
  Modal,
  ModalProps,
  Tooltip,
} from "flowbite-react";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { useMemo, useState } from "react";
import { NFT, MarketEvent, FormState } from "@/types";
import FeeCalculator from "@/components/FeeCalculator";
import Input from "@/components/Form/Input";
import { numberRegex } from "@/utils/regex";
import FormValidationMessages from "@/components/Form/ValidationMessages";
import { useCalculateFee } from "@/hooks/useMarket";
import { parseUnits } from "ethers";
import { useForm } from "react-hook-form";
import { findTokenByAddress } from "@/utils/token";
import { toast } from "react-toastify";
import { useAcceptBidURC1155, useAcceptBidURC721 } from "@/hooks/useBidNFT";
import NFTApproval from "@/components/NFTApproval";
import { useMarketApproveNFT } from "@/hooks/useMarketApproveNFT";
interface Props extends ModalProps {
  nft: NFT;
  bid?: MarketEvent;
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

export default function AcceptBidNFTModal({ nft, show, onClose, bid }: Props) {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormState.AcceptBidNFT>({
    defaultValues: {
      quantity: bid?.quantity ? Number(bid.quantity) : 0,
    },
  });
  const [price, quantity, quoteToken] = watch([
    "price",
    "quantity",
    "quoteToken",
  ]);
  const token = useMemo(() => findTokenByAddress(quoteToken), [quoteToken]);
  const [loading, setLoading] = useState(false);
  const type = nft?.collection.type;
  const onAcceptBidURC721 = useAcceptBidURC721(nft);
  const onAcceptBidURC1155 = useAcceptBidURC1155();
  const {
    isMarketContractApprovedToken,
    onApproveTokenForAll,
    onApprovalTokenForSingle,
  } = useMarketApproveNFT(nft);
  const {
    sellerFee,
    buyerFee,
    royaltiesFee,
    netReceived,
    sellerFeeRatio,
    buyerFeeRatio,
  } = useCalculateFee({
    collectionAddress: nft.collection.address,
    tokenId: nft.u2uId || nft.id,
    price: BigInt(bid?.price || 0),
    onSuccess: (data) => {
      if (!price || isNaN(Number(price))) return;
    },
  });

  const onSubmit = async ({ quantity }: FormState.AcceptBidNFT) => {
    if (!bid || !bid.to?.signer) return;
    const toastId = toast.loading("Preparing data...", { type: "info" });
    setLoading(true);
    try {
      if (type === "ERC721") {
        await onAcceptBidURC721(bid.to.signer, bid.quoteToken);
      } else {
        await onAcceptBidURC1155(bid.operationId, quantity);
      }
      toast.update(toastId, {
        render: "Bid order has been fulfilled successfully",
        type: "success",
        autoClose: 1000,
        closeButton: true,
        isLoading: false,
      });
      onClose?.();
    } catch (e) {
      console.error(e);
      toast.update(toastId, {
        render: "Failed to accept bid",
        type: "error",
        autoClose: 1000,
        closeButton: true,
        isLoading: false,
      });
    } finally {
      setLoading(false);
      reset();
    }
  };

  const handleApproveTokenForSingle = async () => {
    const toastId = toast.loading("Preparing data...", { type: "info" });
    setLoading(true);
    try {
      toast.update(toastId, { render: "Sending token", type: "info" });
      await onApprovalTokenForSingle();

      toast.update(toastId, {
        render: "Approval has been updated successfully",
        type: "success",
        autoClose: 1000,
        closeButton: true,
        isLoading: false,
      });
    } catch (e) {
      toast.update(toastId, {
        render: "Failed to approve marketplace contract",
        type: "error",
        autoClose: 1000,
        closeButton: true,
        isLoading: false,
      });
    } finally {
      setLoading(false);
      reset();
    }
  };

  const handleApproveTokenForAll = async () => {
    const toastId = toast.loading("Preparing data...", { type: "info" });
    setLoading(true);
    try {
      toast.update(toastId, { render: "Sending token", type: "info" });
      await onApproveTokenForAll();
      toast.update(toastId, {
        render: "Approve token successfully",
        type: "success",
        autoClose: 1000,
        closeButton: true,
        isLoading: false,
      });
    } catch (e) {
      console.error(e);
      toast.update(toastId, {
        render: "Failed to approve token",
        type: "error",
        autoClose: 1000,
        closeButton: true,
        isLoading: false,
      });
    } finally {
      setLoading(false);
      reset();
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
        <div className="flex flex-col justify-center items-center gap-4">
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="font-bold">
              <Text className="mb-3 text-center" variant="heading-xs">
                Accept Bid
              </Text>
              <Text className="text-secondary" variant="body-16">
                Filling bid order for{" "}
                <span className="text-primary font-bold">{nft?.name}</span> from{" "}
                <span className="text-primary font-bold">
                  {nft?.collection.name}
                </span>{" "}
                collection
              </Text>
            </div>

            {type === "ERC721" ? (
              <FeeCalculator
                mode="seller"
                nft={nft}
                // price={BigInt(bid?.price || 0)}
                price={parseUnits(String(bid?.price || 0), token?.decimal)}
                quoteToken={bid?.quoteToken}
                sellerFee={sellerFee}
                buyerFee={buyerFee}
                sellerFeeRatio={sellerFeeRatio}
                buyerFeeRatio={buyerFeeRatio}
                netReceived={netReceived}
                royaltiesFee={royaltiesFee}
              />
            ) : (
              <>
                <div className="mb-4">
                  <label className="text-body-14 text-secondary" htmlFor="">
                    Quantity:
                  </label>
                  <Input
                    maxLength={18}
                    size={18}
                    error={!!errors.quantity}
                    appendIcon={<Text>Available: {bid?.quantity}</Text>}
                    register={register("quantity", {
                      pattern: {
                        value: numberRegex,
                        message: "Wrong number format",
                      },
                      validate: {
                        required: (v: any) =>
                          (!!v && v > 0 && !isNaN(v)) ||
                          "Please input quantity",
                        amount: (v: any) =>
                          v <= Number(bid?.quantity) ||
                          "Quantity cannot exceed bid amount",
                      },
                    })}
                  />
                </div>
                <FeeCalculator
                  mode="seller"
                  nft={nft}
                  quoteToken={bid?.quoteToken}
                  // price={BigInt(bid?.price || 0) * BigInt(bid?.quantity || 0)}
                  price={parseUnits(
                    String(
                      Number(bid?.price || 0) * Number(bid?.quantity || 0),
                    ),
                    token?.decimal,
                  )}
                  sellerFee={sellerFee}
                  buyerFee={buyerFee}
                  sellerFeeRatio={sellerFeeRatio}
                  buyerFeeRatio={buyerFeeRatio}
                  netReceived={netReceived}
                  royaltiesFee={royaltiesFee}
                />
              </>
            )}
            <FormValidationMessages errors={errors} />

            <div className="flex gap-4 mt-7 w-full">
              {isMarketContractApprovedToken ? (
                <>
                  <Button
                    className="flex-1"
                    variant="secondary"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1" type="submit" loading={loading}>
                    Accept bid
                  </Button>
                </>
              ) : (
                <NFTApproval
                  loading={loading}
                  nft={nft}
                  isMarketContractApprovedToken={isMarketContractApprovedToken}
                  handleApproveTokenForAll={handleApproveTokenForAll}
                  handleApproveTokenForSingle={handleApproveTokenForSingle}
                />
              )}
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
