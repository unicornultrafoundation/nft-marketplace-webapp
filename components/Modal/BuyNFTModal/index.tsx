import { CustomFlowbiteTheme, Modal, ModalProps } from "flowbite-react";
import { useCalculateFee } from "@/hooks/useMarket";
import Text from "@/components/Text";
import Input from "@/components/Form/Input";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { formatEther, formatUnits, MaxUint256, parseUnits } from "ethers";
import { findTokenByAddress } from "@/utils/token";
import { useMemo, useState } from "react";
import { Address, useAccount, useBalance } from "wagmi";
import FormValidationMessages from "@/components/Form/ValidationMessages";
import { FormState, MarketEvent, NFT } from "@/types";
import FeeCalculator from "@/components/FeeCalculator";
import { formatDisplayedNumber } from "@/utils";
import { numberRegex } from "@/utils/regex";
import { tokens } from "@/config/tokens";
import ERC20TokenApproval from "@/components/ERC20TokenApproval";
import { toast } from "react-toastify";
import {
  useBuyURC1155UsingNative,
  useBuyURC1155UsingURC20,
  useBuyURC721UsingNative,
  useBuyURC721UsingURC20,
} from "@/hooks/useBuyNFT";
import { useMarketApproveERC20 } from "@/hooks/useMarketApproveERC20";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";

interface Props extends ModalProps {
  nft: NFT;
  saleData?: MarketEvent;
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

export default function BuyNFTModal({ nft, saleData, show, onClose }: Props) {
  const api = useMarketplaceApi();
  const { address } = useAccount();
  const {
    handleSubmit,
    watch,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormState.BuyNFT>({
    defaultValues: {
      quoteToken: saleData?.quoteToken,
    },
  });
  const [price, quantity, quoteToken, allowance] = watch([
    "price",
    "quantity",
    "quoteToken",
    "allowance",
  ]);
  const token = useMemo(
    () => findTokenByAddress(saleData?.quoteToken),
    [saleData],
  );
  const [loading, setLoading] = useState(false);
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
    price:
      nft.collection.type === "ERC721"
        ? BigInt(saleData?.price || "0")
        : BigInt(saleData?.price || "0") * BigInt(quantity || "0"),
    onSuccess: (data) => {
      if (!saleData?.price || isNaN(Number(saleData?.price))) return;
      const priceBigint =
        nft.collection.type === "ERC721"
          ? BigInt(saleData?.price || "0")
          : BigInt(saleData?.price || "0") * BigInt(quantity || "0");
      const { buyerFee } = data;
      const totalCostBigint = priceBigint + buyerFee;
      setValue("allowance", formatUnits(totalCostBigint, token?.decimal));
    },
  });
  const onBuyURC721UsingNative = useBuyURC721UsingNative(nft);
  const onBuyURC1155UsingNative = useBuyURC1155UsingNative(nft);
  const onBuyURC721UsingURC20 = useBuyURC721UsingURC20(nft);
  const onBuyURC1155UsingURC20 = useBuyURC1155UsingURC20();

  const {
    allowance: allowanceBalance,
    isTokenApproved,
    onApproveToken,
  } = useMarketApproveERC20(
    token?.address as Address,
    nft.collection.type,
    parseUnits(price || "0", token?.decimal) + buyerFee,
  );

  const formRules = {
    allowance: {
      required: true,
    },
  };

  const { data: tokenBalance } = useBalance({
    address: address,
    enabled: !!address && !!token?.address,
    token: token?.address === tokens.wu2u.address ? undefined : token?.address,
    watch: true,
  });

  const totalPriceBN = useMemo(() => {
    if (!quantity) return BigInt(0);
    return BigInt(saleData?.price || "0") * BigInt(quantity);
  }, [quantity, saleData]);

  const onSubmit = async ({ quantity }: FormState.BuyNFT) => {
    if (!saleData) return;
    setLoading(true);
    try {
      switch (nft.collection.type) {
        case "ERC721":
          if (quoteToken === tokens.wu2u.address) {
            await onBuyURC721UsingNative(
              BigInt(saleData.price) + BigInt(buyerFee),
            );
          } else {
            await onBuyURC721UsingURC20(
              quoteToken,
              BigInt(saleData.price) + BigInt(buyerFee),
            );
          }
          break;
        case "ERC1155":
          if (quoteToken === tokens.wu2u.address) {
            await onBuyURC1155UsingNative(
              saleData?.operationId,
              BigInt(saleData.price) + BigInt(buyerFee),
              quantity,
            );
          } else {
            await onBuyURC1155UsingURC20(saleData?.operationId, quantity);
          }
          break;
        default:
          break;
      }
      await api.getFloorPrice({ address: nft.collection.address });
      toast.success(`Order has been fulfilled successfully`, {
        autoClose: 1000,
        closeButton: true,
      });
      onClose?.();
    } catch (e: any) {
      toast.error(`Error report: ${e.message}`, {
        autoClose: 1000,
        closeButton: true,
      });
      onClose?.();
      console.error(e);
    } finally {
      setLoading(false);
      reset();
    }
  };

  const handleApproveMinAmount = () => {
    if (allowanceBalance === undefined) return;

    const priceBigint = parseUnits(price || "0", token?.decimal);
    const totalCostBigint = priceBigint + buyerFee;
    const remainingToApprove =
      BigInt(allowanceBalance as bigint) < totalCostBigint
        ? totalCostBigint - allowanceBalance
        : 0;
    setValue("allowance", formatUnits(remainingToApprove, token?.decimal));
  };

  const handleApproveMaxAmount = () => {
    setValue("allowance", "UNLIMITED");
  };

  const handleAllowanceInput = (event: any) => {
    const value = event.target.value;
    if (allowance === "UNLIMITED") {
      setValue("allowance", value.slice(-1));
    } else {
      setValue("allowance", value);
    }
  };

  const handleApproveToken = async () => {
    const toastId = toast.loading("Preparing data...", { type: "info" });
    setLoading(true);
    try {
      toast.update(toastId, { render: "Sending token", type: "info" });
      const allowanceBigint =
        allowance === "UNLIMITED"
          ? MaxUint256
          : parseUnits(allowance, token?.decimal);
      await onApproveToken(allowanceBigint);

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
                Purchase NFT
              </Text>
              <Text className="text-secondary" variant="body-16">
                Filling sell order for{" "}
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
                readOnly
                value={formatUnits(saleData?.price || "0", 18)}
                appendIcon={
                  nft.collection.type === "ERC1155" && (
                    <Text>Quantity: {saleData?.quantity}</Text>
                  )
                }
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-body-14 text-secondary font-semibold">
                  Buy using
                </label>
                <Text>
                  Balance:{" "}
                  {formatDisplayedNumber(
                    formatUnits(
                      tokenBalance?.value || 0,
                      tokenBalance?.decimals,
                    ),
                  )}
                </Text>
              </div>
              <Input readOnly value={token?.symbol} />
            </div>

            {nft.collection.type === "ERC721" && (
              <FeeCalculator
                mode="buyer"
                nft={nft}
                price={BigInt(saleData?.price || "0")}
                quoteToken={token?.address}
                sellerFee={sellerFee}
                buyerFee={buyerFee}
                sellerFeeRatio={sellerFeeRatio}
                buyerFeeRatio={buyerFeeRatio}
                netReceived={netReceived}
                royaltiesFee={royaltiesFee}
              />
            )}

            {nft.collection.type === "ERC1155" && (
              <>
                <div>
                  <Text className="text-secondary font-semibold mb-1">
                    Quantity
                  </Text>
                  <Input
                    maxLength={3}
                    size={3}
                    error={!!errors.quantity}
                    register={register("quantity", {
                      pattern: {
                        value: numberRegex,
                        message: "Wrong number format",
                      },
                      validate: {
                        required: (v) =>
                          (!!v && !isNaN(v) && v > 0) ||
                          "Please input quantity of item to purchase",
                        max: (v) =>
                          v <= Number(saleData?.quantity) ||
                          "Quantity exceeds sale amount",
                        balance: (v) => {
                          if (!tokenBalance?.value) return "Not enough balance";
                          const totalPriceBN =
                            BigInt(saleData?.price || 0) * BigInt(v);
                          return (
                            totalPriceBN < tokenBalance.value ||
                            "Not enough balance"
                          );
                        },
                      },
                    })}
                  />
                </div>

                <div>
                  <Text className="text-secondary font-semibold mb-1">
                    Estimated cost:
                  </Text>
                  <Input
                    readOnly
                    value={formatDisplayedNumber(
                      formatUnits(totalPriceBN, token?.decimal),
                    )}
                    appendIcon={<Text>{token?.symbol}</Text>}
                  />
                </div>

                <FeeCalculator
                  mode="buyer"
                  nft={nft}
                  price={totalPriceBN}
                  quoteToken={token?.address}
                  sellerFee={sellerFee}
                  buyerFee={buyerFee}
                  sellerFeeRatio={sellerFeeRatio}
                  buyerFeeRatio={buyerFeeRatio}
                  netReceived={netReceived}
                  royaltiesFee={royaltiesFee}
                />
              </>
            )}

            {isTokenApproved ? (
              <Button type={"submit"} className="w-full" loading={loading}>
                Purchase item
              </Button>
            ) : (
              <ERC20TokenApproval
                allowanceBalance={allowanceBalance}
                quoteToken={quoteToken}
                onApproveMinAmount={handleApproveMinAmount}
                onAllowanceInput={() => handleAllowanceInput}
                onApproveMaxAmount={handleApproveMaxAmount}
                onApproveToken={handleApproveToken}
                loading={loading}
                registerAllowanceInput={register(
                  "allowance",
                  formRules.allowance,
                )}
              />
            )}
            <FormValidationMessages errors={errors} />
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
