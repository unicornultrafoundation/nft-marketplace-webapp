import { classNames } from "@/utils/string";
import { IconProps } from "./index";

export default function MoreHorizontalIcon({
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
        d="M10.418 11.667C11.1083 11.667 11.668 11.1073 11.668 10.417C11.668 9.72664 11.1083 9.16699 10.418 9.16699C9.72761 9.16699 9.16797 9.72664 9.16797 10.417C9.16797 11.1073 9.72761 11.667 10.418 11.667Z"
        fill="currentColor"
      />
      <path
        d="M16.25 11.667C16.9404 11.667 17.5 11.1073 17.5 10.417C17.5 9.72664 16.9404 9.16699 16.25 9.16699C15.5596 9.16699 15 9.72664 15 10.417C15 11.1073 15.5596 11.667 16.25 11.667Z"
        fill="currentColor"
      />
      <path
        d="M4.58203 11.667C5.27239 11.667 5.83203 11.1073 5.83203 10.417C5.83203 9.72664 5.27239 9.16699 4.58203 9.16699C3.89168 9.16699 3.33203 9.72664 3.33203 10.417C3.33203 11.1073 3.89168 11.667 4.58203 11.667Z"
        fill="currentColor"
      />
    </svg>
  );
}
