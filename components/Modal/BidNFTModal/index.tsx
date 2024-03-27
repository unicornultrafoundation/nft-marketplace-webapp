import { CustomFlowbiteTheme, Modal, ModalProps } from "flowbite-react";
import { useMemo, useState } from "react";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { FormState, NFT } from "@/types";
import { APIResponse } from "@/services/api/types";
import { Address, useAccount, useBalance } from "wagmi";
import { findTokenByAddress } from "@/utils/token";
import { tokenOptions, tokens } from "@/config/tokens";
import { useCalculateFee } from "@/hooks/useMarket";
import { useForm } from "react-hook-form";
import { formatUnits, MaxUint256, parseEther, parseUnits } from "ethers";
import { toast } from "react-toastify";
import Input from "@/components/Form/Input";
import { formatDisplayedNumber } from "@/utils";
import FeeCalculator from "@/components/FeeCalculator";
import FormValidationMessages from "@/components/Form/ValidationMessages";
import { numberRegex } from "@/utils/regex";
import Select from "@/components/Form/Select";
import ERC20TokenApproval from "@/components/ERC20TokenApproval";
import {
  useBidURC1155UsingNative,
  useBidURC1155UsingURC20,
  useBidURC721UsingNative,
  useBidURC721UsingURC20,
} from "@/hooks/useBidNFT";
import { useMarketApproveERC20 } from "@/hooks/useMarketApproveERC20";
import NFTMarketData = APIResponse.NFTMarketData;

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

export default function BidNFTModal({ nft, show, onClose, marketData }: Props) {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const onBidURC721UsingNative = useBidURC721UsingNative(nft);
  const onBidURC1155UsingNative = useBidURC1155UsingNative(nft);
  const onBidURC721UsingURC20 = useBidURC721UsingURC20(nft);
  const onBidURC1155UsingURC20 = useBidURC1155UsingURC20(nft);
  const {
    handleSubmit,
    watch,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormState.BidNFT>({
    defaultValues: {
      quoteToken: tokens.wu2u.address,
    },
  });
  const [price, quantity, quoteToken, allowance] = watch([
    "price",
    "quantity",
    "quoteToken",
    "allowance",
  ]);
  const token = useMemo(() => findTokenByAddress(quoteToken), [quoteToken]);
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
    price: parseUnits(price || "0", token?.decimal),
    onSuccess: (data) => {
      if (!price || isNaN(Number(price))) return;
      const priceBigint = parseUnits(
        !isNaN(Number(price)) ? (price as string) : "0",
        token?.decimal,
      );
      const { buyerFee } = data;
      const totalCostBigint = priceBigint + buyerFee;
      // Update allowance input when price is changing
      setValue("allowance", formatUnits(totalCostBigint, token?.decimal));
    },
  });

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
    price: {
      required: "Please input bid price",
      min: { value: 0, message: "Price cannot be zero" },
      validate: {
        isNumber: (v: any) => !isNaN(v) || "Please input a valid number",
        balance: (v: any) => {
          if (!tokenBalance?.value) return "Not enough balance";
          if (nft.collection.type === "ERC1155") {
            const totalPrice = Number(price) * Number(quantity);
            const totalPriceBN = parseEther(totalPrice.toString());
            return totalPriceBN < tokenBalance.value || "Not enough balance";
          }
          const priceBN = parseEther(String(v));
          return priceBN < tokenBalance.value || "Not enough balance";
        },
      },
    },
    quantity: {
      pattern: { value: numberRegex, message: "Wrong number format" },
      validate: {
        required: (v: any) => {
          if (nft.collection.type === "ERC721") return true;
          return (
            (!!v && !isNaN(v) && Number(v) > 0) ||
            "Please input a valid number of quantity"
          );
        },
        quantity: (v: any) => {
          if (nft.collection.type === "ERC721") return true;
          return (
            Number(v) <= Number(marketData?.totalSupply || 0) ||
            "Cannot bid more than total supply"
          );
        },
      },
    },
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

  const onSubmit = async ({ price, quantity }: FormState.BidNFT) => {
    const toastId = toast.loading("Preparing data...", { type: "info" });
    setLoading(true);
    try {
      switch (nft.collection.type) {
        case "ERC721":
          if (quoteToken === tokens.wu2u.address) {
            await onBidURC721UsingNative(price);
          } else {
            await onBidURC721UsingURC20(price, quoteToken);
          }
          break;
        case "ERC1155":
          if (quoteToken === tokens.wu2u.address) {
            await onBidURC1155UsingNative(price, quantity);
          } else {
            await onBidURC1155UsingURC20(price, quoteToken, quantity);
          }
          break;
        default:
          break;
      }
      toast.update(toastId, {
        render: "Bid placed successfully",
        type: "success",
        autoClose: 1000,
        closeButton: true,
        isLoading: false,
      });
      onClose?.();
    } catch (e: any) {
      console.error(e);
      toast.update(toastId, {
        render: "Bid placed failed",
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

  const handleAllowanceInput = (event: any) => {
    const value = event.target.value;
    if (allowance === "UNLIMITED") {
      setValue("allowance", value.slice(-1));
    } else {
      setValue("allowance", value);
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
                Place a bid
              </Text>
              <Text className="text-secondary" variant="body-16">
                Creating bid for{" "}
                <span className="text-primary font-bold">{nft.name}</span> from{" "}
                <span className="text-primary font-bold">
                  {nft.collection.name}
                </span>{" "}
                collection
              </Text>
            </div>

            <div>
              <label className="text-body-14 text-secondary font-semibold mb-1">
                {nft.collection.type === "ERC721" ? "Price" : "Price per unit"}
              </label>
              <Input
                maxLength={18}
                size={18}
                error={!!errors.price}
                register={register("price", formRules.price)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-body-14 text-secondary font-semibold">
                  Bid using
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
              <Select
                options={tokenOptions}
                register={register("quoteToken")}
              />
            </div>

            {nft.collection.type === "ERC1155" ? (
              <>
                <div>
                  <Text className="text-secondary font-semibold mb-1">
                    Quantity
                  </Text>
                  <Input
                    maxLength={3}
                    size={3}
                    register={register("quantity", formRules.quantity)}
                    appendIcon={
                      <Text className="w-56 overflow-ellipsis whitespace-nowrap text-right">
                        Max:{" "}
                        {formatDisplayedNumber(marketData?.totalSupply || 0)}
                      </Text>
                    }
                  />
                </div>
                <div>
                  <Text className="text-secondary font-semibold mb-1">
                    Estimated cost:
                  </Text>
                  <Input
                    readOnly
                    value={Number(price) * Number(quantity) || 0}
                    appendIcon={<Text>{token?.symbol}</Text>}
                  />
                </div>
                <FeeCalculator
                  mode="buyer"
                  nft={nft}
                  price={parseUnits(
                    String(Number(price) * Number(quantity) || 0),
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
              </>
            ) : (
              <FeeCalculator
                mode="buyer"
                nft={nft}
                price={parseUnits(price || "0", token?.decimal)}
                quoteToken={token?.address}
                sellerFee={sellerFee}
                buyerFee={buyerFee}
                sellerFeeRatio={sellerFeeRatio}
                buyerFeeRatio={buyerFeeRatio}
                netReceived={netReceived}
                royaltiesFee={royaltiesFee}
              />
            )}

            {isTokenApproved ? (
              <Button
                disabled={!isTokenApproved}
                type={"submit"}
                className="w-full"
                loading={loading}
              >
                Place bid
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
