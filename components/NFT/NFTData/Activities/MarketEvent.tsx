import { MarketEvent } from "@/types";
import {
  getDisplayedUserName,
  getUserAvatarImage,
  getUserLink,
  shortenAddress,
} from "@/utils/string";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { formatUnits } from "ethers";
import { formatDisplayedNumber } from "@/utils";
import { findTokenByAddress } from "@/utils/token";
import React from "react";
import { Tooltip } from "flowbite-react";
import Icon from "@/components/Icon";

interface MarketEventProps extends React.HTMLAttributes<HTMLDivElement> {
  event: MarketEvent;
}

interface RowProps {
  children: React.ReactNode;
  maker: MarketEvent["to" | "from"];
  timestamp: number;
}

const Row = ({ children, timestamp, maker }: RowProps) => {
  return (
    <div className="flex items-center gap-3 w-max">
      <Link
        href={getUserLink(maker)}
        className="flex items-center gap-2 relative"
      >
        <Image
          className="w-10 h-10 rounded-full"
          src={getUserAvatarImage(maker)}
          alt="user"
          width={40}
          height={40}
        />
        <div className="absolute bottom-[-7px] right-[-4px]">
          {maker?.accountStatus ? (
            <Icon name="verified" width={16} height={16} />
          ) : (
            <Icon name="verify-disable" width={16} height={16} />
          )}
        </div>
      </Link>

      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-body-14">
          <Link
            href={getUserLink(maker)}
            className="font-semibold hover:underline"
          >
            {getDisplayedUserName(maker)}
          </Link>
          <div className="text-secondary">{children}</div>
        </div>
        <p className="font-semibold text-secondary text-body-12">
          {format((timestamp || 0) * 1000, "yyyy/dd/M - hh:mm a")}
        </p>
      </div>
    </div>
  );
};

export default function NFTMarketEvent({ event, ...rest }: MarketEventProps) {
  const renderEvent = () => {
    if (!event) {
      return null;
    }
    const token = findTokenByAddress(event.quoteToken);
    switch (event.event) {
      case "AskNew":
        return (
          <Row maker={event.from} timestamp={event.timestamp}>
            <div className="flex items-center gap-1">
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
                className="w-5 h-5 rounded-full"
                src={token?.logo || ""}
                alt="logo"
              />
              {token?.symbol}
            </div>
          </Row>
        );
      case "AskCancel":
        return (
          <Row maker={event.from} timestamp={event.timestamp}>
            Cancel Listing
          </Row>
        );
      case "Trade":
        return (
          <Row maker={event.from} timestamp={event.timestamp}>
            <div className="flex items-center gap-1 w-full">
              Sold
              {event.collection?.type === "ERC1155" &&
                ` ${event.quantity} edition(s) `}
              <Tooltip
                content={
                  event.NFT?.name || shortenAddress(`${event.id}`, 6, 10)
                }
                placement="bottom"
              >
                <span className="font-semibold text-primary w-auto overflow-hidden whitespace-nowrap block max-w-[100px] text-ellipsis">
                  {event.NFT?.name || shortenAddress(`${event.id}`, 6, 10)}
                </span>
              </Tooltip>
              to
              <Tooltip
                content={getDisplayedUserName(event.to)}
                placement="bottom"
              >
                <Link
                  className="font-semibold text-primary w-auto overflow-hidden whitespace-nowrap block max-w-[100px] text-ellipsis"
                  href={getUserLink(event.to)}
                >
                  {getDisplayedUserName(event.to)}
                </Link>
              </Tooltip>
              for
              <Tooltip
                content={formatDisplayedNumber(
                  formatUnits(event.price, token?.decimal),
                )}
                placement="bottom"
              >
                <span className="font-semibold text-primary w-auto overflow-hidden whitespace-nowrap block max-w-[100px] text-ellipsis">
                  {formatDisplayedNumber(
                    formatUnits(event.price, token?.decimal),
                  )}
                </span>
              </Tooltip>
              <Image
                width={20}
                height={20}
                className="w-5 h-5 rounded-full"
                src={token?.logo || ""}
                alt="logo"
              />
              {token?.symbol}
            </div>
          </Row>
        );
      case "Bid":
        return (
          <Row maker={event.to} timestamp={event.timestamp}>
            <div className="flex items-center gap-1">
              <p className="text-secondary">
                Bid&nbsp;
                {event.collection?.type === "ERC1155"
                  ? `${event.quantity} edition(s) for`
                  : "for"}
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
                {event.collection?.type === "ERC1155" && ` each`}
              </p>
            </div>
          </Row>
        );
      case "AcceptBid":
        return (
          <Row maker={event.from} timestamp={event.timestamp}>
            <div className="flex items-center gap-1">
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
          <Row maker={event.to} timestamp={event.timestamp}>
            Cancelled bidding
          </Row>
        );
      case "Mint":
        return (
          <Row maker={event.to} timestamp={event.timestamp}>
            Minted{" "}
            {event.collection?.type === "ERC1155" &&
              ` ${event.quantity} edition(s)`}
          </Row>
        );
      case "Transfer":
        return (
          <Row maker={event.from} timestamp={event.timestamp}>
            <div className="flex items-center gap-1">
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

  return (
    <div className="" {...rest}>
      {renderEvent()}
    </div>
  );
}
