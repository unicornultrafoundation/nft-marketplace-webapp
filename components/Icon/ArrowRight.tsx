import { classNames } from "@/utils/string";
import { IconProps } from "./index";

export default function ArrowRightIcon({
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
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.3335 10.0002C3.3335 9.53993 3.70659 9.16683 4.16683 9.16683H15.8335C16.2937 9.16683 16.6668 9.53993 16.6668 10.0002C16.6668 10.4604 16.2937 10.8335 15.8335 10.8335H4.16683C3.70659 10.8335 3.3335 10.4604 3.3335 10.0002Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.41091 3.57757C9.73634 3.25214 10.264 3.25214 10.5894 3.57757L16.4228 9.41091C16.7482 9.73634 16.7482 10.264 16.4228 10.5894L10.5894 16.4228C10.264 16.7482 9.73634 16.7482 9.41091 16.4228C9.08547 16.0973 9.08547 15.5697 9.41091 15.2442L14.655 10.0002L9.41091 4.75609C9.08547 4.43065 9.08547 3.90301 9.41091 3.57757Z"
        fill="currentColor"
      />
    </svg>
  );
}
