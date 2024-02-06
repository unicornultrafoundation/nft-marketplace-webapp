import { Round, Timeframe } from "@/types";
import { getRoundAbi } from "@/utils";
import { useMemo } from "react";
import { useContractRead, useContractReads } from "wagmi";

export const useTimeframe = (round: Round) => {
  const { data: timeframesLength } = useContractRead({
    address: round.address,
    abi: getRoundAbi(round),
    functionName: "getTimeframesLength",
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
    enabled: Number(timeframesLength) > 0,
    watch: true,
    select: (data) => data.map((item) => {
      return item.result as unknown as Timeframe}),
  });

  const hasTimeframe = useMemo(() => {
    if (timeframes?.length == 1 && timeframes[0]) {
      if (
        timeframes[0].hourStart == 0 &&
        timeframes[0].minuteStart == 0 &&
        timeframes[0].hourEnd == 23 &&
        timeframes[0].minuteEnd == 59
      ) {
        return false;
      }
    }
    return true;
  }, [timeframes]);

  const currentTimeframe = useMemo(() => {
    let current = { index: 0, isInTimeframe: false };
    if (!!timeframes) {
      const timeframesStart =
        timeframes[0]?.hourStart * 3600 + timeframes[0]?.minuteStart * 60;
      const timeframesEnd =
        timeframes[timeframes.length - 1]?.hourEnd * 3600 +
        timeframes[timeframes.length - 1]?.minuteEnd * 60;
      const currentTime =
        new Date().getUTCHours() * 3600 + new Date().getMinutes() * 60;
      if (currentTime < timeframesStart) {
        return { index: 0, isInTimeframe: false };
      }

      for (let i = 0; i < timeframes.length; i++) {
        const start =
          timeframes[i]?.hourStart * 3600 + timeframes[i]?.minuteStart * 60;
        const end =
          timeframes[i]?.hourEnd * 3600 + timeframes[i]?.minuteEnd * 60;

        if (currentTime >= start && currentTime <= end) {
          current = { index: i, isInTimeframe: true };
          break;
        }
        if (i < timeframes.length - 1) {
          const startNext =
            timeframes[i + 1]?.hourStart * 3600 +
            timeframes[i + 1]?.minuteStart * 60;
          if (currentTime > end && currentTime < startNext) {
            current = { index: i + 1, isInTimeframe: false };
            break;
          }
        }
      }

      if (currentTime > timeframesEnd) {
        return { index: timeframes.length - 1, isInTimeframe: false };
      }
    }
    return current;
  }, [timeframes]);

  return { timeframes, hasTimeframe, currentTimeframe };
}