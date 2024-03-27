import { classNames } from "@/utils/string";
import { IconProps } from "./index";

export default function MinusIcon({
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
        d="M5 12H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
