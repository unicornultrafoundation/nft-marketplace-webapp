import { formatEther, formatUnits } from "ethers";
import Button from "@/components/Button";
import { MessageRoundNotEligible } from "../EligibleMessage";
import Icon from "@/components/Icon";
import ConnectWalletButton from "@/components/Button/ConnectWalletButton";
import useTimeframeStore from "@/store/timeframe/store";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { formatDisplayedNumber, getRoundAbi } from "@/utils";
import { useWriteRoundContract } from "@/hooks/useRoundContract";
import { toast } from "react-toastify";
import { useAccount, useBalance, useContractReads } from "wagmi";
import { useLaunchpadApi } from "@/hooks/useLaunchpadApi";
import useLaunchpadStore from "@/store/launchpad/store";

interface Props {
  eligibleStatus: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

export default function RoundActionMinting({
  eligibleStatus,
  setLoading,
  loading,
}: Props) {
  const { round, collection, isSpecial } = useLaunchpadStore((state) => state);
  const api = useLaunchpadApi();
  const { address } = useAccount();

  const { data: balanceInfo } = useBalance({
    address: address,
    watch: true,
    enabled: !!address,
  });
  const { onBuyNFT, onBuyNFTCustomized } = useWriteRoundContract(
    round,
    collection,
  );
  const [amount, setAmount] = useState(1);
  const { hasTimeframe, isInTimeframe } = useTimeframeStore((state) => state);

  const { data } = useContractReads({
    contracts: [
      {
        address: round.address,
        abi: getRoundAbi(round),
        functionName: "getAmountBought",
        args: [address],
      },
      {
        address: round.address,
        abi: getRoundAbi(round),
        functionName: "getRound",
      },
    ],
    watch: true,
    enabled: !!address,
    select: ([amountBought, roundInfo]) => [
      formatUnits(String(amountBought?.result), 0),
      roundInfo?.result,
    ],
  });
  const [amountBought, roundInfo] = useMemo(() => data || [], [data]);
  const maxAmountNFT = (roundInfo as any)?.maxAmountNFT;
  const soldAmountNFT = (roundInfo as any)?.soldAmountNFT;
  const roundType = (roundInfo as any)?.roundType;
  const maxAmountNFTPerWallet = (roundInfo as any)?.maxAmountNFTPerWallet;
  const startClaim = (roundInfo as any)?.startClaim;
  const price = (roundInfo as any)?.price;

  const estimatedCost = useMemo(() => {
    const totalCostBN = BigInt(round.price || 0) * BigInt(amount || 0);
    const totalCost = formatEther(totalCostBN);
    return formatDisplayedNumber(totalCost);
  }, [round, amount]);

  const handleAddAmount = (num: number) => {
    if (!isSpecial) {
      handleInputAmount(amount + num);
    }
  };

  const handleInputAmount = (value: number) => {
    if (!address) {
      toast.warning("Please connect your wallet first");
      return;
    }

    if (value < 0) return;

    if (value > amount) {
      if (
        !balanceInfo ||
        !balanceInfo?.value ||
        balanceInfo.value < BigInt(round.price) * BigInt(value)
      ) {
        toast.error("Not enough U2U balance");
        return;
      }
    }
    setAmount(value);
  };

  const handleBuyNFT = async () => {
    if (
      !balanceInfo ||
      !balanceInfo?.value ||
      balanceInfo.value < BigInt(round.price)
    ) {
      toast.error("Not enough U2U balance");
      return;
    }

    try {
      setLoading(true);
      const { waitForTransaction, hash } = isSpecial
        ? await onBuyNFTCustomized()
        : collection.type === "ERC721"
          ? await onBuyNFT()
          : await onBuyNFT(amount);
      await waitForTransaction();
      toast.success("Your item has been successfully purchased!");
      api.crawlNFTInfo({
        txCreation: hash,
        collectionAddress: collection.address,
      });
    } catch (e: any) {
      toast.error(`Error report: ${e?.message || e}`);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const disableMint = useMemo(() => {
    if (
      roundType == "2" &&
      Number(maxAmountNFT) == 0 &&
      Number(maxAmountNFTPerWallet) == 0 &&
      Number(startClaim) == 0 &&
      Number(price) == 0
    ) {
      return false;
    }
    return (
      (Number(amountBought) === round.maxPerWallet &&
        round.maxPerWallet != 0) ||
      (maxAmountNFT == soldAmountNFT && maxAmountNFT != 0) ||
      !eligibleStatus ||
      (!isInTimeframe && hasTimeframe)
    );
  }, [
    roundType,
    maxAmountNFT,
    maxAmountNFTPerWallet,
    startClaim,
    price,
    amountBought,
    round,
    soldAmountNFT,
    eligibleStatus,
    isInTimeframe,
    hasTimeframe,
  ]);

  return (
    <>
      {round.type != "U2UPremintRoundFCFS" &&
        round.type != "U2UMintRoundFCFS" && (
          <MessageRoundNotEligible eligibleStatus={eligibleStatus} />
        )}
      <div className="flex w-full gap-2 flex-col tablet:flex-row justify-between items-start">
        {collection.type === "ERC1155" ? (
          <div className="flex-1 flex items-center gap-3">
            <div className="flex max-w-fit items-center px-4 py-3 gap-4 bg-surface-medium rounded-lg">
              <div onClick={() => handleAddAmount(-1)}>
                <Icon
                  className="cursor-pointer text-secondary"
                  name="minus"
                  width={24}
                  height={24}
                />
              </div>

              <input
                disabled={isSpecial ? true : false}
                value={amount}
                onChange={(e) => handleInputAmount(Number(e.target.value))}
                className="border-none overflow-visible bg-transparent w-10 text-center p-0 outline-none text-body-18 font-medium"
              />
              <div onClick={() => handleAddAmount(1)}>
                <Icon
                  className="cursor-pointer text-secondary"
                  name="plus"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <p className="text-body-16 text-secondary">
              Total:{" "}
              <span className="text-primary font-semibold">
                {estimatedCost} U2U
              </span>
            </p>
          </div>
        ) : (
          <div className="flex-1">
            <p className="text-body-12 text-secondary">
              Minted: {amountBought}
              <span className="text-primary font-semibold">
                /{round.maxPerWallet}
              </span>
            </p>
          </div>
        )}
        <div className="flex-1 w-full">
          <ConnectWalletButton showConnectButton className="w-full">
            <Button
              disabled={disableMint}
              scale="lg"
              className="w-full"
              onClick={handleBuyNFT}
              loading={loading}
            >
              {Number(amountBought) > 0 &&
              Number(amountBought) < round.maxPerWallet
                ? "Mint another"
                : "Mint Now"}
            </Button>
          </ConnectWalletButton>
        </div>
      </div>
    </>
  );
}
