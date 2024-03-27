import { Address } from "wagmi";
import { BigNumberish } from "ethers";
import { Collection, User } from "@/types/entitites";

export type MarketEventType =
  | "AskNew"
  | "AskCancel"
  | "Trade"
  | "AcceptBid"
  | "Bid"
  | "CancelBid"
  | "Mint"
  | "Transfer";

export interface MarketEvent {
  id: string;
  event: MarketEventType;

  NFT?: {
    animationUrl: string;
    id: string;
    image: string;
    name: string;
    u2uId: string;
  };

  collection?: Pick<
    Collection,
    | "address"
    | "id"
    | "isU2U"
    | "name"
    | "shortUrl"
    | "status"
    | "txCreationHash"
    | "type"
  >;
  price: BigNumberish;
  to: Partial<User> | null;
  from: Partial<User> | null;
  quoteToken: Address;
  operationId: string;
  quantity: string;
  timestamp: number;
}

export type Royalty = { account: Address; value: bigint };

export type Royalties = Royalty[];
