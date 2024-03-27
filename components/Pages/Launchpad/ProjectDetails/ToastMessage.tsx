import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { Address, Hash } from "viem";
import { BLOCK_EXPLORER_URL, MARKETPLACE_URL } from "@/config/constants";
import Button from "@/components/Button";

interface PropsMessageClaimSuccess {
  profileAddress: Address;
  txHash: Hash;
}
export default function MessageClaimSuccess({
  profileAddress,
  txHash,
}: PropsMessageClaimSuccess) {
  return (
    <div>
      <p className="mb-2">Your NFT(s) has been successfully claimed!</p>
      <div className="flex items-center gap-1">
        <Link
          href={`${MARKETPLACE_URL}/user/${profileAddress}`}
          className="hover:underline text-primary"
          target="_blank"
        >
          <Button scale="sm">View your profile</Button>
        </Link>
        <Link
          href={`${BLOCK_EXPLORER_URL}/tx/${txHash}`}
          className="hover:underline text-primary"
          target="_blank"
        >
          <Button variant="secondary" scale="sm">
            View transaction
          </Button>
        </Link>
      </div>
    </div>
  );
}
