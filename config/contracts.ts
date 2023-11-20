import { Address } from 'wagmi'
import erc721Factory from '@/abi/ERC721Factory.json'
import erc721MetaABI from '@/abi/ERC721RaribleMeta.json'
import erc1155FactoryABI from '@/abi/ERC1155Factory.json'
import erc1155MetaABI from '@/abi/ERC1155Meta.json'

export type Contract = {
  address: Address,
  abi: any
}

export const contracts: Record<string, Contract> = {
  erc721Factory: { address: '0x346d828a9CD9f72ed967c18538196Ca64468805d', abi: erc721Factory },
  erc721Meta: { address: '0x73039bafa89e6f17f9a6b0b953a01af5ecabacd2', abi: erc721MetaABI },
  erc1155Factory: { address: '0x9e8Fd98d43c5Ef66D8e8472bbDD3CF57Eecd1A3c', abi: erc1155FactoryABI },
  erc1155Meta: { address: '0xc2587c1b945b1a7be4be5423c24f1bbf54495daa', abi: erc1155MetaABI },
  exchange: { address: '0x', abi: [] }
}