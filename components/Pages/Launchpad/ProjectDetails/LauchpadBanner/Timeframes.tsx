import useTimeframeStore from "@/store/timeframe/store";
import { Round } from "@/types";
import { getRoundAbi } from "@/utils";
import { format } from "date-fns";
import { useMemo } from "react";
import { useAccount, useContractRead, useContractReads } from "wagmi";

interface Timeframe {
  hourStart: number;
  minuteStart: number;
  hourEnd: number;
  minuteEnd: number;
}

interface Props {
  round: Round;
  isSpecial: boolean;
}

export default function Timeframes({ round, isSpecial }: Props) {
  const { address } = useAccount();
  const { setHasTimeframe, setIsInTimeframe } = useTimeframeStore();
  const { data: timeframesLength } = useContractRead({
    address: round.address,
    abi: getRoundAbi(round),
    functionName: "getTimeframesLength",
    enabled: !!address,
    watch: true,
  });

  const { data: timeframes } = useContractReads({
    contracts: Array.from(
      { length: Number(timeframesLength) },
      (_, index) => index,
    ).map((timeframeIndex) => {
      return {
        address: round.address,
        abi: getRoundAbi(round),
        functionName: "getTimeframes",
        args: [timeframeIndex],
      };
    }),
    enabled: !!address && Number(timeframesLength) > 0,
    watch: true,
    select: (data) => data.map((item) => item.result as unknown as Timeframe),
  });

  const hasTimeframe = useMemo(() => {
    if (timeframes?.length == 1 && timeframes[0]) {
      if (
        timeframes[0].hourStart == 0 &&
        timeframes[0].minuteStart == 0 &&
        timeframes[0].hourEnd == 23 &&
        timeframes[0].minuteEnd == 59
      ) {
        setHasTimeframe(false);
        return false;
      }
    }
    setHasTimeframe(true);
    return true;
  }, [timeframes, setHasTimeframe]);

  // const isInTimeframe = useMemo(() => {
  //   let result = false;
  //   if (hasTimeframe && timeframes && Array.isArray(timeframes)) {
  //     for (let timeframe of timeframes) {
  //       const start = timeframe.hourStart * 3600 + timeframe.minuteStart * 60;
  //       const end = timeframe.hourEnd * 3600 + timeframe.minuteEnd * 60;
  //       const currentTime =
  //         new Date().getUTCHours() * 3600 + new Date().getMinutes() * 60;
  //       if (currentTime > start && currentTime < end) {
  //         result = true;
  //         break;
  //       }
  //     }
  //   } else {
  //     result = false;
  //   }
  //   setIsInTimeframe(result);
  //   return result;
  // }, [hasTimeframe, timeframes]);

  return (
    <>
      {hasTimeframe && (
        <div className="desktop:flex desktop:flex-col items-center desktop:items-start gap-1">
          <div>
            <p className="text-body-18 font-semibold">
              <span className="text-secondary">Available from </span>
              {format(new Date(round?.start) || 0, "yyyy/M/dd")}
              <span className="text-secondary"> to </span>
              {format(new Date(round?.end) || 0, "yyyy/M/dd")}
            </p>
            <div>
              <p className="text-body-18 text-secondary font-semibold">
                Time frame:{" "}
              </p>
              {isSpecial && (
                <p className="text-secondary text-body-14 font-semibold">
                  (Timeframes can be changed)
                </p>
              )}
            </div>
          </div>

          {timeframes?.map((timeframe, index) => (
            <div
              className="w-full flex items-center justify-between"
              key={index}
            >
              <p className="text-primary text-body-16 font-semibold">
                {timeframe.hourStart < 10
                  ? `0${timeframe.hourStart}`
                  : timeframe.hourStart}
                :
                {timeframe.minuteStart < 10
                  ? `0${timeframe.minuteStart}`
                  : timeframe.minuteStart}{" "}
                -{" "}
                {timeframe.hourEnd < 10
                  ? `0${timeframe.hourEnd}`
                  : timeframe.hourEnd}
                :
                {timeframe.minuteEnd < 10
                  ? `0${timeframe.minuteEnd}`
                  : timeframe.minuteEnd}{" "}
                UTC{" "}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
