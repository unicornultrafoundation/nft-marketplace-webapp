import Text from "@/components/Text";
import { classNames } from "@/utils/string";
import CheckCircleIcon from "../Icon/CheckCircle";
import MultiSelectIcon from "../Icon/MultiSelect";
import Link from "next/link";

interface Props {
  title: string;
  mode: "collection" | "nft";
}

export default function AssetTypeSelection({ title, mode }: Props) {
  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center py-10 tablet:py-10 tablet:px-20 desktop:py-10 desktop:px-20">
      <div className="w-full flex flex-col items-center gap-2 tablet:gap-4 desktop:gap-4 justify-center">
        <Text className="text-primary font-semibold text-body-32 desktop:text-body-40 tablet:text-body-40">
          {title}
        </Text>
        <Text
          className="text-secondary w-[190px] desktop:w-full tablet:w-full text-center"
          variant="body-14"
        >
          Choose “Single” for one of a kind or “Multiple” if you want to sell
          one collectible multiple times
        </Text>
      </div>

      <div className="flex flex-col tablet:flex-row desktop:flex-row gap-6 justify-center items-center w-full py-0 tablet:p-0 desktop:py-4 desktop:px-20">
        <div>
          <Link
            href={`${mode}/ERC721`}
            className={classNames(
              "flex flex-col justify-center items-center gap-2 flex-1 cursor-pointer rounded-2xl p-6",
              "border hover:border-primary hover:bg-surface-soft text-tertiary",
            )}
          >
            <CheckCircleIcon width={34} height={34} />
            <Text className="text-heading-xs font-bold text-primary text-center">
              Single Item
            </Text>
            <Text className="text-body-14 font-bold text-secondary text-center w-[200px]">
              If you want to highlight the uniqueness and individuality of your
              item
            </Text>
          </Link>
        </div>
        <div>
          <Link
            href={`${mode}/ERC1155`}
            className={classNames(
              "flex flex-col justify-center items-center gap-2 flex-1 cursor-pointer rounded-2xl p-6",
              "border hover:border-primary hover:bg-surface-soft text-tertiary",
            )}
          >
            <MultiSelectIcon width={34} height={34} />
            <Text className="text-heading-xs font-bold text-primary text-center">
              Multiple Editions
            </Text>
            <Text className="text-body-14 font-bold text-secondary text-center w-[200px]">
              If you want to share your NFT with a large number of community
              members
            </Text>
          </Link>
        </div>
      </div>
    </div>
  );
}
