import { useLaunchpadApi } from "@/hooks/useLaunchpadApi";
import { Round } from "@/types";
import { useAccount } from "wagmi";
import useSWR from "swr";

export const useRoundZero = (round: Round) => {
  const api = useLaunchpadApi();
  const { address } = useAccount();

  const { data: isSubscribed } = useSWR(
    !!address &&
      (round.type === "U2UMintRoundZero" ||
        round.type === "U2UPremintRoundZero")
      ? {
          projectId: round.projectId,
          walletAddress: address,
        }
      : null,
    (params) => api.checkIsSubscribed(params),
    { refreshInterval: 3000 },
  );

  const onSubscribe = () => {
    if (!address) return;
    return api.subscribeRoundZero({
      projectId: round.projectId,
      walletAddress: address,
    });
  };

  return { isSubscribed, onSubscribe };
};
