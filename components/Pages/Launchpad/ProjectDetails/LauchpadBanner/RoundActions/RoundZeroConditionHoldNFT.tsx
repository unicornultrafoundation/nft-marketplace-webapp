import Icon from "@/components/Icon";
import { MARKETPLACE_URL, ZERO_COLLECTION } from "@/config/constants";
import { classNames } from "@/utils/string";
import Link from "next/link";

interface Props {
  balanceNFT: string;
  isHolder: boolean;
}

export default function RoundZeroConditionHoldNFT({
  isHolder,
  balanceNFT,
}: Props) {
  return (
    <div
      className={classNames(
        "desktop:w-1/2 tablet:w-1/2 order-1 border-2 rounded-2xl transition-all p-4",
        isHolder ? "border-success bg-white" : "bg-disabled",
      )}
    >
      <p className="font-semibold text-center text-body-18">Zero Collection</p>

      <div className="flex items-center justify-between text-body-12">
        <p className="text-secondary font-medium">Condition:</p>
        <p className="text-primary font-semibold">Own Zero Collection</p>
      </div>

      <div className="flex items-center justify-between text-body-12">
        <p className="text-secondary font-medium">Currently own:</p>
        <p className="text-primary font-semibold">{balanceNFT} items</p>
      </div>

      <div className="flex items-center justify-between text-body-12">
        <p className="text-secondary font-medium">Status:</p>
        <div className="text-primary font-semibold">
          {isHolder ? (
            <div className="flex items-center gap-1">
              <Icon name="verified" />
              <span className="text-success">Qualified</span> |{" "}
              <Link
                href={MARKETPLACE_URL + `/collection/${ZERO_COLLECTION}`}
                className="hover: underline"
                target="_blank"
              >
                Get more
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <span className="text-error">Not Qualified</span> |{" "}
              <Link
                href={MARKETPLACE_URL + `/collection/${ZERO_COLLECTION}`}
                className="hover: underline"
                target="_blank"
              >
                Get now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
