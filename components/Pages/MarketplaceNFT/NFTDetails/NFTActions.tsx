import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useNFTMarketStatus } from "@/hooks/useMarket";
import { useEffect, useMemo, useState } from "react";
import ConnectWalletButton from "@/components/Button/ConnectWalletButton";
import SellNFTModal from "@/components/Modal/SellNFTModal";
import BuyNFTModal from "@/components/Modal/BuyNFTModal";
import BidNFTModal from "@/components/Modal/BidNFTModal";
import CancelSellNFTModal from "@/components/Modal/CancelSellNFTModal";
import CancelBidNFTModal from "@/components/Modal/CancelBidNFTModal";
import useAuthStore from "@/store/auth/store";
import { NFT } from "@/types";
import { APIResponse } from "@/services/api/types";
import TransferNFTModal from "@/components/Modal/TransferNFT";

export default function NFTActions({
  nft,
  marketData,
}: {
  nft: NFT;
  marketData?: APIResponse.NFTMarketData;
}) {
  const wallet = useAuthStore((state) => state.profile?.publicKey);
  const { isOwner, isOnSale, saleData, isSeller } = useNFTMarketStatus(
    nft.collection.type,
    marketData,
  );
  const myBid = useMemo(() => {
    if (!marketData) return;
    return marketData.bidInfo?.find((bid) => {
      return (
        !!bid.to?.publicKey &&
        !!wallet &&
        bid.to?.publicKey?.toLowerCase() === wallet?.toLowerCase()
      );
    });
  }, [marketData, wallet]);

  const [showSellModal, setShowSellModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [showCancelSellModal, setShowCancelSellModal] = useState(false);
  const [showCancelBidModal, setShowCancelBidModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);

  if (isOwner) {
    return (
      <div className="w-full">
        <p className="text-secondary text-body-16 font-medium text-center mb-2">
          You own this NFT
        </p>
        <ConnectWalletButton showConnectButton className="w-full">
          {isOnSale && isSeller ? (
            <Button
              className="w-full"
              onClick={() => setShowCancelSellModal(true)}
            >
              Cancel listing
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              <Button className="w-full" onClick={() => setShowSellModal(true)}>
                Put on sale
              </Button>
              <Button
                variant="outlined"
                className="w-full"
                onClick={() => setShowTransferModal(true)}
              >
                Transfer
              </Button>
            </div>
          )}
          <SellNFTModal
            marketData={marketData}
            nft={nft}
            show={showSellModal}
            onClose={() => setShowSellModal(false)}
          />
          <CancelSellNFTModal
            nft={nft}
            marketData={marketData}
            show={showCancelSellModal}
            onClose={() => setShowCancelSellModal(false)}
          />
          <TransferNFTModal
            nft={nft}
            marketData={marketData}
            show={showTransferModal}
            onClose={() => setShowTransferModal(false)}
          />
        </ConnectWalletButton>
      </div>
    );
  }

  return (
    <ConnectWalletButton showConnectButton className="w-full">
      {isOnSale ? (
        <div className="flex items-center gap-3 mb-3">
          <Button className="flex-1" onClick={() => setShowBuyModal(true)}>
            Buy Now
          </Button>
          <Button className="w-12 !min-w-0 !p-2" disabled>
            <Icon name="shoppingBag" width={16} height={16} />
          </Button>
        </div>
      ) : !!myBid ? (
        <Button
          className="w-full"
          variant="outlined"
          onClick={() => setShowCancelBidModal(true)}
        >
          Cancel bidding
        </Button>
      ) : (
        <Button
          className="w-full"
          variant="outlined"
          onClick={() => setShowBidModal(true)}
        >
          Place a bid
        </Button>
      )}

      <BuyNFTModal
        saleData={saleData}
        nft={nft}
        show={showBuyModal}
        onClose={() => setShowBuyModal(false)}
      />
      <BidNFTModal
        marketData={marketData}
        nft={nft}
        show={showBidModal}
        onClose={() => setShowBidModal(false)}
      />
      <CancelBidNFTModal
        bid={myBid}
        nft={nft}
        show={showCancelBidModal}
        onClose={() => setShowCancelBidModal(false)}
      />
    </ConnectWalletButton>
  );
}
