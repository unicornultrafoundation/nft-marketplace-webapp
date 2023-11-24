import { Address } from 'wagmi'
import erc721MarketABI from '@/abi/ERC721Marketplace.json'
import erc721Factory from '@/abi/ERC721Factory.json'
import erc721ABI from '@/abi/ERC721Rarible.json'
import erc1155MarketABI from '@/abi/ERC1155Marketplace.json'
import erc1155FactoryABI from '@/abi/ERC1155Factory.json'
import erc1155ABI from '@/abi/ERC1155.json'

export type Contract = {
  address: Address,
  abi: any
}

export const contracts: Record<string, Contract> = {
  erc721Market: { address: '0x01F99D2713303Ed26f6ad5de64Dd5997A592669d', abi: erc721MarketABI },
  erc721Factory: { address: '0x346d828a9CD9f72ed967c18538196Ca64468805d', abi: erc721Factory },
  erc721Proxy: { address: '0x73039bafa89e6f17f9a6b0b953a01af5ecabacd2', abi: erc721ABI },
  erc721: { address: '0x3cD13281Ae21ff33A9a6f397b73dC2FC4fe794Ce', abi: erc721ABI },
  erc1155Market: { address: '0x80827083556A13c1F092a5c30A282C571A76DCb8', abi: erc1155MarketABI },
  erc1155Factory: { address: '0x9e8Fd98d43c5Ef66D8e8472bbDD3CF57Eecd1A3c', abi: erc1155FactoryABI },
  erc1155Proxy: { address: '0x4b1AAC431446D84e238784F8Ad4e31712A7Aeb1B', abi: erc1155ABI },
  erc1155: { address: '0xc2587c1b945b1a7be4be5423c24f1bbf54495daa', abi: erc1155ABI },
  exchange: { address: '0x', abi: [] }
}