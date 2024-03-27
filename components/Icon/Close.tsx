import { classNames } from "@/utils/string";
import { IconProps } from "./index";

export default function CloseIcon({
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
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5906 4.41058C15.916 4.73602 15.916 5.26366 15.5906 5.58909L5.59056 15.5891C5.26512 15.9145 4.73748 15.9145 4.41205 15.5891C4.08661 15.2637 4.08661 14.736 4.41205 14.4106L14.412 4.41058C14.7375 4.08514 15.2651 4.08514 15.5906 4.41058Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.41205 4.41058C4.73748 4.08514 5.26512 4.08514 5.59056 4.41058L15.5906 14.4106C15.916 14.736 15.916 15.2637 15.5906 15.5891C15.2651 15.9145 14.7375 15.9145 14.412 15.5891L4.41205 5.58909C4.08661 5.26366 4.08661 4.73602 4.41205 4.41058Z"
        fill="currentColor"
      />
    </svg>
  );
}
