import { classNames } from "@/utils/string";
import { IconProps } from "./index";

export default function CircleIcon({
  color,
  className,
  width,
  height,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={classNames(`text-${color}`, className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
