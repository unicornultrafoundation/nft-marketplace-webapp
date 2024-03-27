import Button from "@/components/Button";
import ConnectWalletButton from "@/components/Button/ConnectWalletButton";
import { format } from "date-fns";
import { MessageRoundNotEligible } from "../EligibleMessage";
import Link from "next/link";
import { Round } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { useRoundZero } from "@/hooks/useRoundZero";
import { APIResponse } from "@/services/api/types";
import RoundZeroConditionStaking from "./RoundZeroConditionStaking";
import RoundZeroConditionHoldNFT from "./RoundZeroConditionHoldNFT";
import useLaunchpadStore from "@/store/launchpad/store";

interface Props {
  eligibleStatus: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  hasStaked: boolean;
  snapshot: APIResponse.Snapshot | undefined;
  balanceNFT: string;
  isHolder: boolean;
}

export default function RoundActionUpcoming({
  setLoading,
  loading,
  eligibleStatus,
  hasStaked,
  snapshot,
  balanceNFT,
  isHolder,
}: Props) {
  const { round } = useLaunchpadStore((state) => state);
  const { isSubscribed, onSubscribe } = useRoundZero(round);
  const handleSubscribe = async () => {
    try {
      setLoading(true);
      await onSubscribe();
      toast.success("Subscribed to this project");
    } catch (e: any) {
      toast.error(`Error report: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 tablet:flex-col justify-between">
      <div className="tablet:flex flex-row justify-between desktop:flex flex-row justify-between">
        <p className="text-body-14 text-secondary">
          Minting starts:{" "}
          <span className="text-primary font-semibold">
            {format(new Date(round.start || 0), "yyyy/M/dd - hh:mm a")}
          </span>
        </p>
        <MessageRoundNotEligible eligibleStatus={eligibleStatus} />
      </div>

      {round.type === "U2UPremintRoundZero" ||
      round.type === "U2UMintRoundZero" ? (
        <ConnectWalletButton showConnectButton className="w-full">
          {!isSubscribed ? (
            <Button
              scale="lg"
              className="w-full"
              onClick={handleSubscribe}
              loading={loading}
            >
              Subscribe now
            </Button>
          ) : (
            <div className="flex flex-col gap-3">
              {/* <MessageRoundNotEligible eligibleStatus={eligibleStatus} /> */}

              <div className="flex flex-col desktop:flex-row gap-2 items-stretch tablet:flex-row">
                <RoundZeroConditionStaking
                  hasStaked={hasStaked}
                  snapshot={snapshot}
                  round={round}
                />
                <RoundZeroConditionHoldNFT
                  isHolder={isHolder}
                  balanceNFT={balanceNFT}
                />
              </div>

              <Button scale="lg" disabled className="w-full">
                You have already subscribed!
              </Button>
            </div>
          )}
        </ConnectWalletButton>
      ) : round.type === "U2UPremintRoundWhitelist" ||
        round.type === "U2UMintRoundWhitelist" ? (
        <div>
          {/* <MessageRoundNotEligible eligibleStatus={eligibleStatus} /> */}
          {!eligibleStatus && (
            <p className="text-secondary italic text-body-12">
              Follow these{" "}
              <Link
                className="font-semibold text-primary hover:underline"
                href={round.instruction}
                target="_blank"
              >
                instructions
              </Link>{" "}
              to get whitelisted.
            </p>
          )}
        </div>
      ) : (
        <ConnectWalletButton showConnectButton className="w-full">
          <Button disabled scale="lg" className="w-full">
            Mint now
          </Button>
        </ConnectWalletButton>
      )}
    </div>
  );
}
