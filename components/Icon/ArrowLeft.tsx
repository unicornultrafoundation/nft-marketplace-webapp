import { classNames } from "@/utils/string";
import { IconProps } from "./index";

export default function ArrowLeftIcon({
  color,
  className,
  width,
  height,
}: IconProps) {
  return (
    <svg
      className={classNames(className, `text-${color ? color : "current"}`)}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 12H5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 19L5 12L12 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
