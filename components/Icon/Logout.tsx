import { classNames } from "@/utils/string";
import { IconProps } from "./index";

export default function LogoutIcon({
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
        d="M18.3601 6.64014C19.6185 7.89893 20.4754 9.50258 20.8224 11.2483C21.1694 12.9941 20.991 14.8035 20.3098 16.4479C19.6285 18.0923 18.4749 19.4977 16.9949 20.4865C15.515 21.4753 13.775 22.0031 11.9951 22.0031C10.2152 22.0031 8.47527 21.4753 6.99529 20.4865C5.51532 19.4977 4.36176 18.0923 3.68049 16.4479C2.99921 14.8035 2.82081 12.9941 3.16784 11.2483C3.51487 9.50258 4.37174 7.89893 5.63012 6.64014"
        stroke="#252525"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 2V12"
        stroke="#252525"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
