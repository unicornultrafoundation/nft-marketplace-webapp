import Icon from "@/components/Icon";
import { APIResponse } from "@/services/api/types";
import { Round } from "@/types";
import { formatDisplayedNumber } from "@/utils";
import { classNames } from "@/utils/string";
import { format } from "date-fns";
import { formatEther } from "ethers";
import Link from "next/link";

interface Props {
  round: Round;
  hasStaked: boolean;
  snapshot: APIResponse.Snapshot | undefined;
}

export default function RoundZeroConditionStaking({
  hasStaked,
  snapshot,
  round,
}: Props) {
  return (
    <div
      className={classNames(
        "desktop:w-1/2 tablet:w-1/2 border-2 rounded-2xl transition-all p-4 flex flex-col gap-1",
        hasStaked ? "border-success bg-white" : "bg-disabled",
      )}
    >
      <p className="font-semibold text-center text-body-18">
        Stake U2U to join
      </p>

      <div className="flex items-center justify-between text-body-12">
        <p className="text-secondary font-medium text-right">
          Current (snapshot at{" "}
          {new Date(snapshot?.lastDateRecord as Date).toLocaleDateString()}
          ):
        </p>

        <p className="text-primary font-semibold text-right">
          {formatDisplayedNumber(formatEther(snapshot?.stakingTotal || 0))} U2U
        </p>
      </div>

      <div className="flex items-center justify-between text-body-12">
        <p className="text-secondary font-medium">Required:</p>
        <p className="text-primary font-semibold text-right">
          {formatDisplayedNumber(formatEther(round.requiredStaking))} U2U
        </p>
      </div>

      <div className="flex items-center justify-between text-body-12">
        <p className="text-secondary font-medium">Stake before:</p>
        <p className="text-primary font-semibold text-right">
          {format(new Date(round.stakeBefore || 0), "yyyy/M/dd - hh:mm a O")}
        </p>
      </div>

      <div className="flex items-center justify-between text-body-12">
        <p className="text-secondary font-medium">Status:</p>
        <div className="text-primary font-semibold">
          {hasStaked ? (
            <div className="flex items-center gap-1">
              <Icon name="verified" />
              <span className="text-success">Qualified</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <span className="text-error">Not Qualified</span> |{" "}
              <Link
                href="https://staking.uniultra.xyz/"
                className="hover: underline"
                target="_blank"
              >
                Stake more
              </Link>
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-secondary italic">
        Update 12:00 AM UTC everyday
      </p>
    </div>
  );
}
