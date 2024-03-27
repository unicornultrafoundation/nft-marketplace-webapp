import Icon from "@/components/Icon";
import { Collection, Round } from "@/types";
import { formatEther } from "ethers";
import { formatDisplayedNumber } from "@/utils";
import RoundAction from "./RoundAction";
import { useEffect } from "react";
import useLaunchpadStore from "@/store/launchpad/store";
import RoundStatusHeader from "./RoundStatusHeader";

interface Props {
  collection: Collection;
  round: Round;
  isSpecial: boolean;
}

export default function RoundContractInteractions({
  round,
  collection,
  isSpecial,
}: Props) {
  const { setCollection, setRound, setIsSpecial } = useLaunchpadStore();
  useEffect(() => {
    setCollection(collection);
    setRound(round);
    setIsSpecial(isSpecial);
  }, [round, collection, isSpecial, setCollection, setRound, setIsSpecial]);
  return (
    <div className="w-full rounded-lg bg-surface-soft flex flex-col gap-4 p-4">
      <div className="flex items-start justify-between flex-col tablet:flex-row desktop:flex-row gap-4 desktop:gap-0">
        <p className="text-heading-sm font-semibold">{round?.name}</p>
        <RoundStatusHeader round={round} />
      </div>

      <div className="w-full h-[1px] bg-gray-200" />

      <div className="flex px-0 desktop:p-0 justify-between desktop:gap-10 gap-4 desktop:flex-row">
        <div className="flex flex-col desktop:flex-col items-center desktop:items-start gap-2">
          <p className="text-body-16 text-secondary font-medium ">Items</p>
          <p className="text-primary desktop:text-heading-sm tablet:text-heading-sm text-heading-xs  font-semibold">
            {round?.totalNftt === 0
              ? "Open edition"
              : formatDisplayedNumber(round?.totalNftt)}
          </p>
        </div>

        <div className="flex flex-col desktop:flex-col items-center desktop:items-start gap-2">
          <p className="text-body-16 text-secondary font-medium">Price</p>
          <div className="flex items-center gap-2">
            <Icon name="u2u-logo" width={24} height={24} />
            <p className="font-semibold text-body-16">
              {formatDisplayedNumber(formatEther(round?.price))}
            </p>
            <p className="text-secondary text-body-16 font-semibold">U2U</p>
          </div>
        </div>

        <div className="flex flex-col desktop:flex-col items-center desktop:items-start gap-2">
          <p className="text-body-16 text-secondary font-medium">Max</p>
          <p className="text-primary text-body-16 font-semibold">
            {round?.maxPerWallet === 0 ? (
              "Unlimited"
            ) : (
              <>
                {round?.maxPerWallet} items{" "}
                <span className="text-secondary">per wallet</span>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-200" />

      <RoundAction />
    </div>
  );
}
