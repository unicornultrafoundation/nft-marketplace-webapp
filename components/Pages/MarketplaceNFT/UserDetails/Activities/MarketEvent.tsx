import React from "react";
import { MarketEvent } from "@/types";
import { findTokenByAddress } from "@/utils/token";
import { formatDisplayedNumber } from "@/utils";
import { formatUnits } from "ethers";
import Image from "next/image";
import Link from "next/link";
import {
  getDisplayedUserName,
  getUserLink,
  shortenAddress,
} from "@/utils/string";
import placeholderImage from "@/assets/images/placeholder-image.svg";
import { format } from "date-fns";
import { convertImageUrl } from "@/utils/nft";

interface MarketEventProps extends React.HTMLAttributes<HTMLDivElement> {
  event: MarketEvent;
}

interface MarketEventProps extends React.HTMLAttributes<HTMLDivElement> {
  event: MarketEvent;
}

interface RowProps {
  children: React.ReactNode;
  nft: MarketEvent["NFT"];
  collection: MarketEvent["collection"];
  timestamp: number;
}

const Row = ({ children, timestamp, nft, collection }: RowProps) => {
  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/item/${collection?.address}/${nft?.id}`}
        className="flex items-center gap-2"
      >
        <Image
          className="w-12 h-12 rounded-lg"
          src={convertImageUrl(nft?.image) || placeholderImage}
          alt="user"
          width={56}
          height={56}
        />
      </Link>

      <div className="flex flex-col text-body-14">
        <Link
          href={`/item/${collection?.address}/${nft?.id}`}
          className="font-semibold hover:underline"
        >
          {nft?.name ||
            shortenAddress(`${collection?.address} - ${nft?.id}`, 6, 10)}
        </Link>
        <div className="text-secondary">{children}</div>
        <p className="font-semibold text-secondary text-body-12">
          {format((timestamp || 0) * 1000, "yyyy/dd/M - hh:mm a")}
        </p>
      </div>
    </div>
  );
};

export default function UserMarketEvent({ event, ...rest }: MarketEventProps) {
  const renderEvent = () => {
    if (!event) {
      return null;
    }

    const token = findTokenByAddress(event.quoteToken);
    switch (event.event) {
      case "AskNew":
        return (
          <Row
            nft={event.NFT}
            collection={event.collection}
            timestamp={event.timestamp}
          >
            <div className="flex items-center gap-1">
              <Link
                className="text-primary hover:underline"
                href={getUserLink(event.from)}
              >
                {getDisplayedUserName(event.from)}
              </Link>
              Listed{" "}
              {event.collection?.type === "ERC1155" &&
                ` ${event.quantity} editions`}{" "}
              for
              <span className="font-semibold text-primary">
                {formatDisplayedNumber(
                  formatUnits(event.price, token?.decimal),
                )}
              </span>
              <Image
                width={20}
                height={20}
                className="w-6 h-6 rounded-full"
                src={token?.logo || ""}
                alt="logo"
              />
              {token?.symbol}
            </div>
          </Row>
        );
      case "AskCancel":
        return (
          <Row
            nft={event.NFT}
            collection={event.collection}
            timestamp={event.timestamp}
          >
            <Link
              className="text-primary hover:underline"
              href={getUserLink(event.from)}
            >
              {getDisplayedUserName(event.from)}
            </Link>{" "}
            Cancel Listing
          </Row>
        );
      case "Trade":
        return (
          <Row
            nft={event.NFT}
            collection={event.collection}
            timestamp={event.timestamp}
          >
            <div className="flex items-center gap-1">
              <Link
                className="text-primary hover:underline"
                href={getUserLink(event.from)}
              >
                {getDisplayedUserName(event.from)}
              </Link>
              Sold
              {event.collection?.type === "ERC1155" &&
                ` ${event.quantity} edition(s) `}
              <span className="font-semibold text-primary">
                {event.NFT?.name}
              </span>
              to
              <Link
                className="text-primary hover:underline"
                href={getUserLink(event.to)}
              >
                {getDisplayedUserName(event.to)}
              </Link>
              for
              <span className="font-semibold text-primary">
                {formatDisplayedNumber(
                  formatUnits(event.price, token?.decimal),
                )}
              </span>
              <Image
                width={20}
                height={20}
                className="w-6 h-6 rounded-full"
                src={token?.logo || ""}
                alt="logo"
              />
              {token?.symbol}
            </div>
          </Row>
        );
      case "Bid":
        return (
          <Row
            nft={event.NFT}
            collection={event.collection}
            timestamp={event.timestamp}
          >
            <div className="flex items-center gap-1">
              <Link
                className="font-semibold text-primary hover:underline"
                href={getUserLink(event.to)}
              >
                {getDisplayedUserName(event.to)}
              </Link>
              Bid{" "}
              {event.collection?.type === "ERC1155"
                ? `${event.quantity} edition(s) for`
                : "for"}
              <span className="font-semibold text-primary">
                &nbsp;
                {formatDisplayedNumber(
                  formatUnits(event.price, token?.decimal),
                )}
              </span>
              <Image
                width={20}
                height={20}
                className=" rounded-full"
                src={token?.logo || ""}
                alt="logo"
              />
              <p className="text-secondary">
                {token?.symbol}
                {event.collection?.type === "ERC1155" && ` each`}
              </p>
            </div>
          </Row>
        );
      case "AcceptBid":
        return (
          <Row
            nft={event.NFT}
            collection={event.collection}
            timestamp={event.timestamp}
          >
            <div className="flex items-center gap-1">
              <Link
                className="font-semibold text-primary hover:underline"
                href={getUserLink(event.from)}
              >
                {getDisplayedUserName(event.from)}
              </Link>
              Accepted bid from
              <Link
                className="font-semibold text-primary hover:underline"
                href={getUserLink(event.to)}
              >
                {getDisplayedUserName(event.to)}
              </Link>
              {event.collection?.type === "ERC1155"
                ? `For ${event.quantity} edition(s)`
                : "For"}
              <span className="font-semibold text-primary">
                {formatDisplayedNumber(
                  formatUnits(event.price, token?.decimal),
                )}
              </span>
              <Image
                width={20}
                height={20}
                className="w-5 h-5 rounded-full"
                src={token?.logo || ""}
                alt="logo"
              />
              {token?.symbol}
              {event.collection?.type === "ERC1155" && `Each`}
            </div>
          </Row>
        );
      case "CancelBid":
        return (
          <Row
            nft={event.NFT}
            collection={event.collection}
            timestamp={event.timestamp}
          >
            <Link
              className="font-semibold text-primary hover:underline"
              href={getUserLink(event.to)}
            >
              {getDisplayedUserName(event.to)}
            </Link>{" "}
            Cancelled bidding
          </Row>
        );
      case "Mint":
        return (
          <Row
            nft={event.NFT}
            collection={event.collection}
            timestamp={event.timestamp}
          >
            <Link
              className="font-semibold text-primary hover:underline"
              href={getUserLink(event.to)}
            >
              {getDisplayedUserName(event.to)}
            </Link>{" "}
            Minted{" "}
            {event.collection?.type === "ERC1155" &&
              ` ${event.quantity} edition(s)`}
          </Row>
        );
      case "Transfer":
        return (
          <Row
            nft={event.NFT}
            collection={event.collection}
            timestamp={event.timestamp}
          >
            <div className="flex items-center gap-1">
              <Link
                className="font-semibold text-primary hover:underline"
                href={getUserLink(event.from)}
              >
                {getDisplayedUserName(event.from)}
              </Link>
              Transferred{" "}
              {event.collection?.type === "ERC1155" &&
                `${event.quantity} edition(s)`}{" "}
              to
              <Link
                className="font-semibold text-primary hover:underline"
                href={getUserLink(event.to)}
              >
                {getDisplayedUserName(event.to)}
              </Link>
            </div>
          </Row>
        );
      default:
        return null;
    }
  };

  return <div {...rest}>{renderEvent()}</div>;
}
