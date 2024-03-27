This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

## Installation

### To use these contracts locally or in your project, follow these steps:

1. ##### Clone the repository:

   ```bash
   git clone https://github.com/unicornultrafoundation/nft-marketplace-webapp.git

   ```

2. ##### Install packages and dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Environment

**\*\***You need to set the below environment variables in the .env file or your deployment platforms. You can refer to the `env.example` file**\*\***

## Running the app

1. ##### Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. ### Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contracts

- #### `ERC721NFTMarketplace`: allows users to buy and sell ERC-721 NFT.
  - _**Mainnet**_: `0xB6D89fFb7B6d00db395cc4b7B8E9b9fD4774184d`
  - _**Testnet**_: `0x77700afc1183e520f6ce28e5ee95411cc88cf36b`
- #### `ERC1155NFTMarketplace`: allows users to buy and sell ERC-1155 NFTs.
  - _**Mainnet**_: `0x9a36F21be9D9895F1cB5A58895F5fF92c016B985`
  - _**Testnet**_: `0x46948c71e0b09ddddc8e7feed92332dd5b19b5fa`
- #### `RoyaltiesRegistry`: is responsible for retrieving royalties information of an NFT or a collection.
  - _**Mainnet**_: `0x2Ed0dA2fE3703081BdeE5aa69D7a5623be0B5CA0`
  - _**Testnet**_: `0xda14d191fbd1b962cbf58e09d4078071b9fda079`
- #### `FeeDistributor`: handles the task of distributing protocol fees, as well as royalties. The protocol fee is currently set at 2.5% of listing price per successful purchase, and is currently shared equally between seller and buyer. Though this fee can be changed, it is capped at 5% of the listing price.
  - _**Mainnet**_: `0x6ad68ef2aBf88e2048BBe3bfEE795972D2E477E7`
  - _**Testnet**_: `0xf8a69eb25d0cd84e2b0037b4b5957eb8f832e581`
- #### `RPC URL`:
  - _**Mainnet**_: `https://rpc-mainnet.uniultra.xyz`
  - _**Testnet**_: `https://rpc-nebulas-testnet.uniultra.xyz`
- #### `Explorer`:
  - _**Mainnet**_: `https://u2uscan.xyz`
  - _**Testnet**_: `https://testnet.u2uscan.xyz`
- #### `CHAIN_ID`:
  - _**Mainnet**_: `39`
  - _**Testnet**_: `2484`
- #### `Marketplace URL`:
  - _**Mainnet**_: `https://u2nft.io`
  - _**Testnet**_: `https://nebulas.u2nft.io`
- #### `ERC721_FACTORY`:
  - _**Mainnet**_: `0xbFfB662EA0cC38A47379D458b35d1becD6da9115`
  - _**Testnet**_: `0x2d710Bce9e3e9501d69f657bfA29F2Dc21CD5B14`
- #### `ERC721_PROXY`:
  - _**Mainnet**_: `0x7DDb1aCCb3160cf6Ba4fee23E26B6d9aD45bC824`
  - _**Testnet**_: `0x7e1ae9399cDA4CFA62714C0c1445bf75C39201bc`
- #### `ERC1155_FACTORY`:
  - _**Mainnet**_: `0xC8F6ADc33a1B4010cabbbacbBDF79AAAEe33fCD5`
  - _**Testnet**_: `0x562523950CF7889D0CcB040C8143D4F1596e4b9a`
- #### `ERC1155_PROXY`:
  - _**Mainnet**_: `0xDa4a022bBC044B8097159C8f4527FE7c6111a70C`
  - _**Testnet**_: `0x9E87754dAB31dAD057DCDF233000F71fF55fA37f`
- #### `Marketplace API`:
  - _**Mainnet**_: `https://marketplace-api.uniultra.xyz`
  - _**Testnet**_: `https://marketplace-api-stg.uniultra.xyz`

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
