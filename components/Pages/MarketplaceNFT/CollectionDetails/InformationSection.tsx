import Icon from "@/components/Icon";
import Text from "@/components/Text";
import { APIResponse } from "@/services/api/types";
import Link from "next/link";
import { formatEther } from "ethers";
import { useMemo, useState } from "react";
import { formatDisplayedNumber } from "@/utils";
import { useReadCollectionRoyalties } from "@/hooks/useRoyalties";
import { Royalty } from "@/types";
import UpdateRoyaltiesModal from "@/components/Modal/UpdateRoyaltiesModal";
import useAuthStore from "@/store/auth/store";
import { NFT_COLLECTION_VERIFICATION_REQUEST } from "@/config/constants";

interface Props {
  data: APIResponse.CollectionDetails;
}

export default function InformationSectionCollection({ data }: Props) {
  const [showRoyaltiesModal, setShowRoyaltiesModal] = useState(false);
  const wallet = useAuthStore((state) => state.profile?.publicKey);
  const { floorPrice, volumn, totalNft, totalOwner } = useMemo(
    () => data.generalInfo,
    [data.generalInfo],
  );

  const creator = useMemo(() => {
    if (!data.collection.creators[0]) return undefined;
    return data.collection.creators[0].user;
  }, [data.collection]);

  const isOwner = useMemo(() => {
    if (!data.collection.creators || !wallet) return false;
    return (
      data.collection.creators.some(
        (creator) =>
          creator.user.publicKey.toLowerCase() === wallet.toLowerCase(),
      ) ?? false
    );
  }, [data, wallet]);

  const { data: royalties } = useReadCollectionRoyalties(
    data.collection.address,
  );
  const totalRoyalties = useMemo(() => {
    if (!royalties?.length) return 0;

    const totalRoyaltiesValue = royalties.reduce(
      (accumulator: bigint, current: Royalty) =>
        BigInt(current.value) + BigInt(accumulator),
      BigInt(0),
    );
    return Number(totalRoyaltiesValue) / 100;
  }, [royalties]);

  return (
    <>
      <div className="w-full flex justify-between pt-20 desktop:px-20 tablet:px-20 px-4 mb-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Text
              showTooltip
              labelTooltip={data.collection.name}
              className="font-semibold text-primary desktop:text-body-32 tablet:text-body-32 text-body-24 w-auto desktop:max-w-[500px] tablet:max-w-[500px] max-w-[300px]"
            >
              {data.collection.name}
            </Text>
            {creator?.accountStatus && data.collection.isVerified ? (
              <Icon name="verify-active" width={24} height={24} />
            ) : (
              <Link
                className="text-secondary hover:text-primary flex justify-center items-center gap-1"
                href={NFT_COLLECTION_VERIFICATION_REQUEST}
                target="_blank"
              >
                <Icon name="verify-disable" width={24} height={24} />
                <Text className="text-body-16">Get Verified</Text>
              </Link>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/user/${creator?.id}`}
              className="font-semibold text-secondary text-body-16 hover:underline"
            >
              Creator:{" "}
              <span className="text-primary font-bold">
                {creator?.username}
              </span>
            </Link>
          </div>
          <Text className="text-secondary text-body-16 font-semibold">
            Symbol:{" "}
            <span className="text-primary font-bold">
              {data.collection.symbol}
            </span>
          </Text>
          <Text className="text-secondary">{data.collection.description}</Text>
        </div>
      </div>

      <div className="bg-surface-soft p-2 rounded-2xl desktop:mx-20 tablet:mx-20 mx-4">
        <div className="flex justify-around flex-wrap">
          <div className="flex flex-1 flex-col items-center py-3 px-6">
            <Text className="text-secondary">Floor</Text>
            <Text
              className="text-primary font-bold flex items-center gap-1"
              variant="body-16"
            >
              {formatDisplayedNumber(data?.collection.floorPrice)}
              <span className="text-secondary font-normal">U2U</span>
            </Text>
          </div>
          <div className="flex flex-1 flex-col items-center py-3 px-6">
            <Text className="text-secondary">Volume</Text>
            <Text
              className="text-primary font-bold flex items-center gap-1"
              variant="body-16"
            >
              {formatDisplayedNumber(formatEther(volumn || 0))}
              <span className="text-secondary font-normal">U2U</span>
            </Text>
          </div>
          <div className="flex flex-1 flex-col items-center py-3 px-6">
            <Text className="text-secondary">Items</Text>
            <Text className="text-primary font-bold" variant="body-16">
              {totalNft}
            </Text>
          </div>
          <div className="flex flex-1 flex-col items-center py-3 px-6">
            <Text className="text-secondary">Owner</Text>
            <Text className="text-primary font-bold" variant="body-16">
              {totalOwner}
            </Text>
          </div>
          <div
            className="flex flex-1 flex-col items-center py-3 px-6 cursor-pointer rounded-lg hover:shadow-sm hover:bg-white"
            onClick={() => isOwner && setShowRoyaltiesModal(true)}
          >
            <div className="flex items-center gap-1">
              <Text className="text-secondary">Royalties</Text>
              {isOwner && <Icon name="settings" width={12} height={12} />}
            </div>
            <Text
              className="text-primary font-bold flex items-center gap-1"
              variant="body-16"
            >
              {totalRoyalties}%
            </Text>
          </div>
        </div>
      </div>

      <UpdateRoyaltiesModal
        show={showRoyaltiesModal}
        onClose={() => setShowRoyaltiesModal(false)}
        collection={data.collection}
      />
    </>
  );
}
