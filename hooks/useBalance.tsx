import useAuthStore from "@/store/auth/store";
import { useEffect, useState } from "react";
import { fetchBalance, FetchBalanceResult } from "@wagmi/core";
import { formatEther } from "ethers";
import { Address } from "wagmi";

export const useBalance = (token: Address) => {
  const address = useAuthStore((state) => state.profile?.publicKey);
  const [tokenBalance, setTokenBalance] = useState<FetchBalanceResult>();

  useEffect(() => {
    (async () => {
      if (!address) return;
      const balance = await fetchBalance({
        address,
        token,
      });
      setTokenBalance(balance);
    })();
  }, [address, token]);

  return {
    balance: tokenBalance,
    displayedBalance: formatEther(tokenBalance?.value || 0),
  };
};
