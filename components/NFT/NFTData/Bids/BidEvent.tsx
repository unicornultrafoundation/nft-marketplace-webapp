import { MarketEvent, NFT } from "@/types";
import {
  getUserAvatarImage,
  getUserLink,
  shortenAddress,
} from "@/utils/string";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { formatDisplayedNumber } from "@/utils";
import { formatUnits } from "ethers";
import { findTokenByAddress } from "@/utils/token";
import AcceptBidNFTModal from "@/components/Modal/AcceptBidNFTModal";
import React, { useMemo, useState } from "react";
import Button from "@/components/Button";
import useAuthStore from "@/store/auth/store";
import CancelBidNFTModal from "@/components/Modal/CancelBidNFTModal";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isOwner: boolean;
  event: MarketEvent;
  nft: NFT;
}

export default function NFTBidEvent({ isOwner, event, nft, ...rest }: Props) {
  const token = findTokenByAddress(event.quoteToken);
  const wallet = useAuthStore((state) => state.profile?.publicKey);
  const isBidder = useMemo(() => {
    if (!event.to || !wallet) return false;
    return event.to.signer?.toLowerCase() === wallet.toLowerCase();
  }, [event, wallet]);
  const [showAcceptBid, setShowAcceptBid] = useState(false);
  const [showCancelBid, setShowCancelBid] = useState(false);

  if (!event) {
    return null;
  }

  return (
    <div className="flex items-center justify-between" {...rest}>
      <div className="flex items-center gap-2">
        <Link href={getUserLink(event.to)}>
          <Image
            className="w-10 h-10 rounded-full"
            src={getUserAvatarImage(event.to)}
            alt="user"
            width={40}
            height={40}
          />
        </Link>

        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-body-14">
            <Link
              href={getUserLink(event.to)}
              className="font-semibold hover:underline"
            >
              {event.to?.username ||
                shortenAddress(event.to?.signer ?? event.to?.publicKey)}
            </Link>
            <p className="text-secondary">
              Bid
              {nft.collection.type === "ERC1155"
                ? ` ${event.quantity} edition(s) for`
                : " for"}
              <span className="font-semibold text-primary">
                &nbsp;
                {formatDisplayedNumber(
                  formatUnits(event.price, token?.decimal),
                )}
              </span>
            </p>
            <Image
              width={24}
              height={24}
              className="w-5 h-5 rounded-full"
              src={token?.logo || ""}
              alt="logo"
            />
            <p className="text-secondary">
              {token?.symbol}
              {nft.collection.type === "ERC1155" && ` each`}
            </p>
          </div>
          <p className="font-semibold text-secondary text-body-12">
            {format((event.timestamp || 0) * 1000, "yyyy/dd/M - hh:mm a")}
          </p>
        </div>
      </div>

      {isOwner && !isBidder && (
        <Button onClick={() => setShowAcceptBid(true)} variant="text">
          Accept
        </Button>
      )}
      {isBidder && (
        <Button onClick={() => setShowCancelBid(true)} variant="text">
          Cancel
        </Button>
      )}

      <AcceptBidNFTModal
        nft={nft}
        bid={event}
        show={showAcceptBid}
        onClose={() => setShowAcceptBid(false)}
      />
      <CancelBidNFTModal
        nft={nft}
        bid={event}
        show={showCancelBid}
        onClose={() => setShowCancelBid(false)}
      />
    </div>
  );
}
