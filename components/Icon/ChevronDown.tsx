import { classNames } from "@/utils/string";
import { IconProps } from "./index";

export default function ChevronDownIcon({
  color,
  className,
  width,
  height,
}: IconProps) {
  return (
    <svg
      className={classNames(`text-${color}`, className)}
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.08754 4.83736C3.31535 4.60955 3.68469 4.60955 3.9125 4.83736L7.00002 7.92488L10.0875 4.83736C10.3153 4.60955 10.6847 4.60955 10.9125 4.83736C11.1403 5.06516 11.1403 5.43451 10.9125 5.66232L7.4125 9.16232C7.18469 9.39012 6.81535 9.39012 6.58754 9.16232L3.08754 5.66232C2.85974 5.43451 2.85974 5.06516 3.08754 4.83736Z"
        fill="currentColor"
      />
    </svg>
  );
}
