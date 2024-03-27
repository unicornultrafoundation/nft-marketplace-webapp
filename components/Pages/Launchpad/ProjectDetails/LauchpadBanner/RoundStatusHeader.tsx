import { useRoundStatus } from "@/hooks/useRoundStatus";
import { Round, RoundStatus } from "@/types";
import { format } from "date-fns";

interface Props {
  round: Round;
}

export default function RoundStatusHeader({ round }: Props) {
  const status = useRoundStatus(round);
  return (() => {
    switch (status) {
      case "MINTING":
        return (
          <div className="flex items-start gap-2 w-full tablet:w-auto">
            <div className="w-2 h-2 mt-1 rounded-full bg-success" />

            <div className="flex w-full justify-between tablet:flex-col">
              <p className="text-body-16 font-medium leading-none flex flex-col gap-2.5 tablet:flex-row">
                <span>Minting:</span>
                <span className="text-success">Live</span>
              </p>
              <p className="text-body-14 text-secondary flex flex-col tablet:flex-row gap-1">
                <span>End:</span>
                <span className="text-secondary">
                  {format(new Date(round?.end) || 0, "yyyy/M/dd hh:mm a")}
                </span>
              </p>
            </div>
          </div>
        );

      case "UPCOMING":
        return (
          <div className="flex items-start gap-2 w-full tablet:w-auto">
            <div className="w-2 h-2 mt-1 rounded-full bg-warning" />
            <div className="flex w-full justify-between tablet:flex-col">
              <p className="text-body-16 font-medium leading-none flex flex-col gap-2.5 tablet:flex-row">
                <span>Minting:</span>
                <span className="text-warning">Upcoming</span>
              </p>
              <p className="text-body-14 text-secondary flex flex-col tablet:flex-row gap-1">
                <span>Start:</span>
                <span className="text-secondary">
                  {format(new Date(round?.start) || 0, "yyyy/M/dd hh:mm a")}
                </span>
              </p>
            </div>
          </div>
        );
      case "ENDED":
        return (
          <div className="flex items-start gap-2 w-full tablet:w-auto">
            <div className="w-2 h-2 mt-1 rounded-full bg-error" />

            <div className="flex w-full justify-between tablet:flex-col">
              <p className="text-body-16 font-medium leading-none flex flex-col gap-2.5 tablet:flex-row">
                <span>Minting:</span>
                <span className="text-error">Ended</span>
              </p>
              <p className="text-body-14 text-secondary flex flex-col tablet:flex-row gap-1">
                <span>End:</span>
                <span className="text-secondary">
                  {format(new Date(round?.end) || 0, "yyyy/M/dd hh:mm a")}
                </span>
              </p>
            </div>
          </div>
        );
    }
  })();
}
