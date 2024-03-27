import Image from "next/image";
import Icon from "@/components/Icon";
import RoundContractInteractions from "./RoundContractInteractions";
import Link from "next/link";
import { Project } from "@/types";
import { useEffect, useMemo } from "react";
import { useContractRead } from "wagmi";
import { formatDisplayedNumber, getRoundAbi } from "@/utils";
import { SPECIAL_ROUND } from "@/config/constants";
import { format } from "date-fns";
import TimeframeDropdown from "./TimeframeDropdown";
import useTimeframeStore from "@/store/timeframe/store";

export default function ProjectPageBanner({ project }: { project: Project }) {
  const activeRound = useMemo(() => {
    const active = project.rounds.find((round) => {
      return (
        Date.now() >= new Date(round.start).getTime() &&
        Date.now() <= new Date(round.end).getTime()
      );
    });
    const next = project.rounds.find((round) => {
      return Date.now() < new Date(round.start).getTime();
    });
    return active || next || project.rounds[0];
  }, [project]);

  const { timeframes, setHasTimeframe, hasTimeframe } = useTimeframeStore(
    (state) => state,
  );

  useEffect(() => {
    if (timeframes?.length == 1 && timeframes[0]) {
      if (
        timeframes[0].hourStart == 0 &&
        timeframes[0].minuteStart == 0 &&
        timeframes[0].hourEnd == 23 &&
        timeframes[0].minuteEnd == 59
      ) {
        setHasTimeframe(false);
        return;
      }
    }
    setHasTimeframe(true);
    return;
  }, [timeframes, setHasTimeframe]);

  const { data: roundData } = useContractRead({
    address: activeRound.address,
    abi: getRoundAbi(activeRound),
    functionName: "getRound",
    args: [],
    enabled: !!activeRound,
    watch: true,
  });

  return (
    <div className="flex w-full desktop:items-stretch gap-10 justify-between flex-col desktop:flex-row tablet:flex-col">
      <div className="flex-shrink-0 w-full tablet:w-[380px] self-center desktop:self-start desktop:w-[515px]">
        <Image
          className="w-full tablet:min-w-[380px] desktop:min-w-[515px] desktop:w-auto rounded-2xl object-fill"
          width={512}
          height={512}
          src={project.banner}
          alt=""
        />
      </div>
      <div className="flex-1 flex flex-col w-full">
        <div className="flex flex-col gap-4 mb-8">
          <p className="font-semibold text-heading-lg leading-none">
            Project: {project.name}
          </p>

          <p className="text-secondary text-body-16">
            By{" "}
            <span className="text-primary font-medium">
              {project.organization}
            </span>
          </p>

          <div className="w-full flex desktop:items-center items-start gap-4 desktop:gap-0 justify-between flex-col desktop:flex-row tablet:flex-row">
            <div className="flex items-center gap-2">
              <Icon name="u2u-logo" width={24} height={24} />
              <div className="h-7 w-[1px] bg-surface-hard" />
              <p className="text-secondary text-body-16">
                Total Items:{" "}
                <span className="text-primary font-medium">
                  {formatDisplayedNumber(activeRound?.totalNftt) ||
                    "Open Edition"}
                </span>
              </p>
              <p className="text-secondary text-body-16">
                Total Minted:{" "}
                <span className="text-primary font-medium">
                  {formatDisplayedNumber(
                    (roundData as any)?.soldAmountNFT || 0,
                  )}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              {!!project.twitter && (
                <Link href={project.twitter} target="_blank">
                  <Icon name="twitter" width={24} height={24} />
                </Link>
              )}
              {!!project.discord && (
                <Link href={project.discord} target="_blank">
                  <Icon name="discord" width={24} height={24} />
                </Link>
              )}
              {!!project.telegram && (
                <Link href={project.telegram} target="_blank">
                  <Icon name="telegram" width={24} height={24} />
                </Link>
              )}
              {!!project.website && (
                <Link href={project.website} target="_blank">
                  <Icon name="website" width={24} height={24} />
                </Link>
              )}
            </div>
          </div>

          <p className="text-secondary text-body-14">{project.description}</p>
        </div>

        {hasTimeframe && (
          <div className="mb-10 w-full rounded-lg bg-surface-soft flex gap-4 desktop:gap-20 p-4 flex-col desktop:flex-row tablet:flex-row gap-x-10">
            <div className="flex justify-between desktop:gap-20 tablet:gap-x-10">
              <div className="flex flex-col">
                <p className="text-lg text-secondary font-medium">
                  Available From
                </p>
                <p className="text-lg mt-2">
                  {format(new Date(activeRound.start), "dd/MM/yyyy")}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-lg text-secondary font-medium">To</p>
                <p className="text-lg mt-2">
                  {format(new Date(activeRound.end), "dd/MM/yyyy")}
                </p>
              </div>
            </div>
            <div className="flex flex-col grow gap-2">
              <div className="flex justify-between items-baseline">
                <p className="text-lg text-primary font-bold">Timeframes</p>
                <p className="text-sm text-tertiary font-thin">
                  Available at these hours everyday
                </p>
              </div>
              <div className="text-body-16 text-secondary font-medium">
                <TimeframeDropdown round={activeRound} />
              </div>
            </div>
          </div>
        )}

        <RoundContractInteractions
          round={activeRound}
          collection={project.collection}
          isSpecial={activeRound.address == SPECIAL_ROUND}
        />
      </div>
    </div>
  );
}
