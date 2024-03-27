import { useWaitForTransaction } from "wagmi";
import { useState } from "react";

export const useTransactionStatus = () => {
  const [txHash, setTxHash] = useState<`0x${string}`>();
  const data = useWaitForTransaction({
    hash: txHash,
    enabled: !!txHash,
  });

  return {
    updateHash: setTxHash,
    txStatus: data,
  };
};
