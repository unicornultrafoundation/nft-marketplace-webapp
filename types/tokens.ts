import { Address } from "wagmi";

export interface URC20Token {
  name: string;
  symbol: string;
  decimal: number;
  address: Address;
  logo: string;
}
