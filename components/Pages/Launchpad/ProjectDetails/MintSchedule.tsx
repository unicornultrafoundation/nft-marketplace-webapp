import Collapsible from "@/components/Collapsible";
import { formatDisplayedNumber, getRoundAbi } from "@/utils";
import Icon from "@/components/Icon";
import { Collection, Round, RoundStatus } from "@/types";
import { formatEther } from "ethers";
import { useRoundsWithStatus } from "@/hooks/useRoundStatus";
import Button from "@/components/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useWriteRoundContract } from "@/hooks/useRoundContract";
import { Address, useAccount, useContractRead } from "wagmi";
import MessageClaimSuccess from "./ToastMessage";
import { classNames } from "@/utils/string";

interface ScheduleProp extends React.HTMLAttributes<HTMLDivElement> {
  round: Round;
  collection: Collection;
  claimable: boolean;
  status: RoundStatus;
  isCompleted: boolean;
  isActive: boolean;
  showSeparator: boolean;
}

const RoundSchedule = ({
  round,
  collection,
  isCompleted,
  isActive,
  claimable,
  status,
  showSeparator,
  ...rest
}: ScheduleProp) => {
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const { onClaimNFT } = useWriteRoundContract(round, collection);
  const { data: claimableAmount } = useContractRead({
    address: round?.address,
    abi: getRoundAbi(round),
    functionName: "getClaimableAmount",
    args: [address],
    enabled: !!address && !!round?.address,
    watch: true,
    select: (data) => data,
  });

  const handleClaimNFT = async () => {
    setLoading(true);
    try {
      const txHash = await onClaimNFT();
      toast.success(
        <MessageClaimSuccess
          txHash={txHash.hash}
          profileAddress={address as Address}
        />,
        {
          style: { width: "110%", marginLeft: "-3vw" },
        },
      );
    } catch (e: any) {
      console.error(e);
      toast.error(`Error report: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-stretch gap-2 w-full" {...rest}>
      <div className="flex flex-col items-center">
        <div
          className={classNames(
            "w-8 h-8 rounded-full flex items-center justify-center",
            status === "ENDED" && "bg-success/50",
            status === "MINTING" && "bg-success/50",
            status === "UPCOMING" &&
              (isActive ? "bg-warning/50" : "bg-surface-medium"),
          )}
        >
          <div
            className={classNames(
              "w-6 h-6 rounded-full flex items-center justify-center",
              status === "ENDED" && "bg-success",
              status === "MINTING" && "bg-white",
              status === "UPCOMING" &&
                (isActive ? "bg-white" : "bg-surface-soft"),
            )}
          >
            {isCompleted && (
              <Icon color="white" name="check" width={16} height={16} />
            )}
          </div>
        </div>
        {showSeparator && (
          <div
            className={classNames(
              "flex-1 min-h-[20px] w-[2px]",
              isCompleted ? "bg-success" : "bg-surface-soft",
            )}
          />
        )}
      </div>

      <Collapsible
        // defaultOpen={isActive || claimable}
        className="flex-1 !px-0 !py-1"
        header={<p className="text-body-16 font-medium">{round?.name}</p>}
      >
        <div className="rounded-2xl bg-surface-soft p-4 my-4 flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <p className="text-body-16 font-medium">Minting</p>
            {status === "UPCOMING" && (
              <p className="text-body-16 text-warning">Upcoming</p>
            )}
            {status === "MINTING" && (
              <p className="text-body-16 text-success">Live</p>
            )}
            {status === "ENDED" && (
              <p className="text-body-16 text-error">Ended</p>
            )}
          </div>

          <p className="text-body-12 text-secondary">
            Start: {format(new Date(round?.start || 0), "yyyy/M/dd - hh:mm a")}
          </p>
          <p className="text-body-12 text-secondary">
            End: {format(new Date(round?.end || 0), "yyyy/M/dd - hh:mm a")}
          </p>

          <div className="w-full h-[1px] bg-gray-200" />

          <div className="flex items-center gap-1">
            <p className="text-body-12 text-secondary">Price:</p>
            <Icon name="u2u-logo" width={16} height={16} />
            <p className="text-body-12 font-medium">
              {formatDisplayedNumber(formatEther(round?.price || 0))} U2U
            </p>
          </div>

          <div className="flex items-center gap-1">
            <p className="text-body-12 text-secondary">Total mintable:</p>
            <p className="text-body-12 font-medium">
              {round?.totalNftt === 0
                ? "Open edition"
                : formatDisplayedNumber(round?.totalNftt)}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <p className="text-body-12 text-secondary">Max mint:</p>
            <p className="text-body-12 font-medium">
              {round?.maxPerWallet === 0 ? "Open edition" : round?.maxPerWallet}
            </p>
          </div>

          <p className="text-body-12 text-secondary">
            Claimable at:{" "}
            {format(
              new Date(round?.claimableStart || 0),
              "yyyy/M/dd - hh:mm a",
            )}
          </p>

          {claimable && Number(claimableAmount) > 0 && (
            <Button scale="sm" onClick={handleClaimNFT} loading={loading}>
              Claim now
            </Button>
          )}
        </div>
      </Collapsible>
    </div>
  );
};

export default function ProjectMintSchedule({
  rounds,
  collection,
}: {
  rounds: Round[];
  collection: Collection;
}) {
  const { roundsWithStatus: schedule, activeRoundIndex } =
    useRoundsWithStatus(rounds);

  return (
    <div className="w-full">
      <h1 className="text-heading-sm font-medium mb-6">Mint schedule</h1>

      <div className="flex flex-col">
        {schedule.map((round, index) => {
          const isCompleted = index < activeRoundIndex;
          const isActive = index === activeRoundIndex;
          const showSeparator = index < rounds.length - 1;

          return (
            <RoundSchedule
              collection={collection}
              key={round?.id}
              round={round}
              claimable={round?.claimable}
              status={round?.status}
              isCompleted={isCompleted}
              isActive={isActive}
              showSeparator={showSeparator}
            />
          );
        })}
      </div>
    </div>
  );
}
