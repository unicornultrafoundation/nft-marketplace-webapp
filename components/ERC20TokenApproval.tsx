import { formatUnits } from "ethers";
import Text from "./Text";
import Image from "next/image";
import Button from "./Button";
import Input from "./Form/Input";
import { Address } from "wagmi";
import { useMemo } from "react";
import { findTokenByAddress } from "@/utils/token";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  allowanceBalance?: bigint;
  quoteToken?: Address;
  onApproveMinAmount?: () => void;
  onAllowanceInput?: () => void;
  onApproveMaxAmount?: () => void;
  onApproveToken?: () => void;
  loading?: boolean;
  registerAllowanceInput?: UseFormRegisterReturn;
}

export default function ERC20TokenApproval({
  allowanceBalance = BigInt(0),
  quoteToken,
  onAllowanceInput,
  onApproveMinAmount,
  onApproveMaxAmount,
  onApproveToken,
  loading,
  registerAllowanceInput,
}: Props) {
  const token = useMemo(() => findTokenByAddress(quoteToken), [quoteToken]);
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <Text className="font-semibold text-secondary">Current allowance:</Text>
        <div className="flex items-center gap-2">
          <Text className="font-semibol">
            {formatUnits(allowanceBalance || "0", token?.decimal)}
          </Text>
          <Image
            className="w-6 h-6 rounded-full"
            width={40}
            height={40}
            src={token?.logo || ""}
            alt={token?.symbol || ""}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          onClick={onApproveMinAmount}
          className="!min-w-fit p-3"
        >
          Min
        </Button>
        <Input
          className="text-center"
          containerClass="flex-1"
          register={registerAllowanceInput}
          onChange={onAllowanceInput}
        />
        <Button
          variant="secondary"
          onClick={onApproveMaxAmount}
          className="!min-w-fit p-3"
        >
          Max
        </Button>
      </div>

      <Button loading={loading} onClick={onApproveToken} className="w-full">
        Approve Token contract
      </Button>
    </div>
  );
}
