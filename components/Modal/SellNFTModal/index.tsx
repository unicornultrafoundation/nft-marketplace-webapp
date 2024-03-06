import { CustomFlowbiteTheme, Modal, ModalProps } from "flowbite-react";
import { useState } from "react";
import Text from "@/components/Text";
import Input from "@/components/Form/Input";
import { useMemo } from "react";
import { useCalculateFee } from "@/hooks/useMarket";
import Button from "@/components/Button";
import Select from "@/components/Form/Select";
import { tokenOptions } from "@/config/tokens";
import { useForm } from "react-hook-form";
import useAuthStore from "@/store/auth/store";
import FormValidationMessages from "@/components/Form/ValidationMessages";
import { FormState, NFT } from "@/types";
import { APIResponse } from "@/services/api/types";
import NFTMarketData = APIResponse.NFTMarketData;
import FeeCalculator from "@/components/FeeCalculator";
import { parseUnits } from "ethers";
import { findTokenByAddress } from "@/utils/token";
import { numberRegex } from "@/utils/regex";
import { useSellURC1155, useSellURC721 } from "@/hooks/useSellNFT";
import { toast } from "react-toastify";
import { useMarketApproveNFT } from "@/hooks/useMarketApproveNFT";
import NFTApproval from "@/components/NFTApproval";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";

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

export default function SellNFTModal({
  nft,
  show,
  marketData,
  onClose,
}: Props) {
  const api = useMarketplaceApi();
  const [loading, setLoading] = useState(false);
  const type = nft.collection.type;
  const wallet = useAuthStore((state) => state.profile?.publicKey);
  const ownerData = useMemo(() => {
    if (!wallet || !marketData) return undefined;
    return marketData.owners.find(
      (owner) => owner.publicKey.toLowerCase() === wallet.toLowerCase(),
    );
  }, [wallet, marketData]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormState.SellNFT>();
  const [price, quantity, quoteToken] = watch([
    "price",
    "quantity",
    "quoteToken",
  ]);
  const token = useMemo(() => findTokenByAddress(quoteToken), [quoteToken]);
  const onSellURC721 = useSellURC721(nft);
  const onSellURC1155 = useSellURC1155(nft);
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
    price: parseUnits(price?.toString() || "0", token?.decimal),
    onSuccess: (data) => {
      if (!price || isNaN(Number(price))) return;
    },
  });

  const formRules = {
    price: {
      required: "Please input price",
      validate: {
        isNumber: (v: number) =>
          !isNaN(v) || "Please input a valid price number",
        min: (v: number) => Number(v) > 0 || "Price must be greater than 0",
        max: (v: number) =>
          Number(v) < 10e15 - 1 || "Please input a safe price number",
        decimals: (v: number) => {
          const decimalPart = (v.toString().split(".")[1] || "").length;
          return decimalPart <= 18 || "The decimal length cannot exceed 18";
        },
      },
    },
    quantity: {
      pattern: { value: numberRegex, message: "Wrong number format" },
      validate: {
        required: (v: number) => {
          if (type === "ERC721") return true;
          return (
            (!!v && !isNaN(v) && v > 0) ||
            "Please input quantity of item to sell"
          );
        },
        amount: (v: number) => {
          if (type === "ERC721") return true;
          if (!ownerData) return "Quantity exceeds owned amount";
          return (
            v <= Number(ownerData.quantity) || "Quantity exceeds owned amount"
          );
        },
      },
    },
  };

  const onSubmit = async ({
    price,
    quoteToken,
    quantity,
  }: FormState.SellNFT) => {
    const toastId = toast.loading("Preparing data...", { type: "info" });
    setLoading(true);
    try {
      if (nft.collection.type === "ERC721") {
        await onSellURC721(price, quoteToken);
      } else {
        await onSellURC1155(price, quoteToken, quantity);
      }
      await api.getFloorPrice({ address: nft.collection.address });
      toast.update(toastId, {
        render: "Your NFT has been put on sale!",
        type: "success",
        autoClose: 1000,
        closeButton: true,
        isLoading: false,
      });
      onClose?.();
    } catch (e) {
      console.error(e);
      toast.update(toastId, {
        render: "Your NFT has been unsold",
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
        render: "Approve token successfully",
        type: "success",
        autoClose: 1000,
        closeButton: true,
        isLoading: false,
      });
    } catch (e) {
      toast.update(toastId, {
        render: "Failed to approve token",
        type: "error",
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    } finally {
      setLoading(false);
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
          <form
            className="w-full flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="font-bold">
              <Text className="mb-3" variant="heading-xs">
                Sell NFT
              </Text>
              <Text className="text-secondary" variant="body-16">
                Creating sell order for{" "}
                <span className="text-primary font-bold">{nft.name}</span> from{" "}
                <span className="text-primary font-bold">
                  {nft.collection.name}
                </span>{" "}
                collection
              </Text>
            </div>

            <div>
              <label className="text-body-14 text-secondary font-semibold mb-1">
                Price
              </label>
              <Input
                maxLength={18}
                size={18}
                error={!!errors.price}
                register={register("price", formRules.price)}
              />
            </div>

            <div>
              <label className="text-body-14 text-secondary font-semibold mb-1">
                Sell using
              </label>
              <Select
                options={tokenOptions}
                register={register("quoteToken")}
              />
            </div>

            {nft.collection.type === "ERC1155" ? (
              <div>
                <Text className="text-secondary font-semibold mb-1">
                  Quantity
                </Text>
                <Input
                  maxLength={3}
                  size={3}
                  error={!!errors.quantity}
                  register={register("quantity", formRules.quantity)}
                  containerClass="mb-4"
                  appendIcon={
                    <Text className="mr-5">Owned: {ownerData?.quantity}</Text>
                  }
                />
                <FeeCalculator
                  mode="seller"
                  nft={nft}
                  price={parseUnits(
                    String(Number(price || 0) * Number(quantity || 0)),
                    token?.decimal,
                  )}
                  quoteToken={token?.address}
                  sellerFee={sellerFee}
                  buyerFee={buyerFee}
                  sellerFeeRatio={sellerFeeRatio}
                  buyerFeeRatio={buyerFeeRatio}
                  netReceived={netReceived}
                  royaltiesFee={royaltiesFee}
                />
              </div>
            ) : (
              <FeeCalculator
                mode="seller"
                nft={nft}
                quoteToken={token?.address}
                price={parseUnits(String(price || 0), token?.decimal)}
                sellerFee={sellerFee}
                buyerFee={buyerFee}
                sellerFeeRatio={sellerFeeRatio}
                buyerFeeRatio={buyerFeeRatio}
                netReceived={netReceived}
                royaltiesFee={royaltiesFee}
              />
            )}
            <FormValidationMessages errors={errors} />
            {isMarketContractApprovedToken ? (
              <Button type={"submit"} className="w-full" loading={loading}>
                Put on sale
              </Button>
            ) : (
              <NFTApproval
                nft={nft}
                isMarketContractApprovedToken={isMarketContractApprovedToken}
                handleApproveTokenForAll={handleApproveTokenForAll}
                handleApproveTokenForSingle={handleApproveTokenForSingle}
              />
            )}
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
