import { IconProps } from "./index";
import { classNames } from "@/utils/string";

export default function CommandIcon({
  width,
  height,
  color,
  className,
}: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      className={classNames(`text-${color}`, className)}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.95433 1.7873C9.25598 1.90042 9.40882 2.23666 9.2957 2.53831L5.7957 11.8716C5.68258 12.1733 5.34634 12.3261 5.04469 12.213C4.74303 12.0999 4.59019 11.7637 4.70332 11.462L8.20332 2.12867C8.31644 1.82702 8.65268 1.67418 8.95433 1.7873Z"
        fill="currentColor"
      />
    </svg>
  );
}
