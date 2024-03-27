import Button from "@/components/Button";
import { Collection } from "@/types";
import { getCollectionLink } from "@/utils/string";
import Link from "next/link";

interface Props {
  collection: Collection;
}

export default function RoundActionEnded({ collection }: Props) {
  return (
    <div className="w-full">
      <div className="text-error font-semidbold text-center text-body-18 p-4">
        Round has Ended
      </div>
      <Link href={getCollectionLink(collection)}>
        <Button className="w-full">Explore collection</Button>
      </Link>
    </div>
  );
}
