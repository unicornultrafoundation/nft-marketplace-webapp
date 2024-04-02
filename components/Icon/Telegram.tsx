import { IconProps } from "./index";
import { classNames } from "@/utils/string";

export default function TelegramIcon({
  color,
  className,
  width,
  height,
}: IconProps) {
  return (
    <svg
      className={classNames(className, `text-${color || "[#252525]"}`)}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.75"
        y="0.75"
        width="22.5"
        height="22.5"
        rx="11.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4.37193 12.3382C4.40443 12.3219 4.43694 12.3065 4.46862 12.2918C5.01941 12.0368 5.57751 11.7979 6.1348 11.5591C6.16486 11.5591 6.21522 11.5242 6.24365 11.5128C6.28671 11.4941 6.32977 11.4762 6.37282 11.4576C6.45569 11.4218 6.53855 11.3869 6.6206 11.3511C6.78633 11.2804 6.95123 11.2098 7.11695 11.1391C7.44759 10.9977 7.77822 10.8564 8.10886 10.7142C8.77013 10.4315 9.43223 10.148 10.0935 9.86529C10.7548 9.58258 11.4169 9.29907 12.0781 9.01636C12.7394 8.73365 13.4015 8.45014 14.0628 8.16743C14.724 7.88473 15.3861 7.60119 16.0474 7.31848C16.1945 7.25512 16.3537 7.16088 16.5113 7.13326C16.6437 7.1097 16.7728 7.06422 16.9061 7.03903C17.1587 6.9911 17.4374 6.9716 17.6795 7.0764C17.7631 7.11295 17.8403 7.16414 17.9045 7.22832C18.2116 7.53215 18.1685 8.03094 18.1035 8.45825C17.651 11.4364 17.1985 14.4154 16.7452 17.3936C16.6835 17.8022 16.599 18.2506 16.2765 18.509C16.0035 18.7275 15.6152 18.7519 15.2781 18.6593C14.9409 18.5658 14.6436 18.3701 14.352 18.1775C13.1423 17.3765 11.9319 16.5755 10.7223 15.7745C10.4347 15.5844 10.1146 15.3358 10.1179 14.9906C10.1195 14.7826 10.2438 14.5974 10.3705 14.4325C11.4217 13.0612 12.9384 12.1188 14.0668 10.8109C14.2261 10.6265 14.3512 10.2934 14.1326 10.187C14.0027 10.1236 13.8532 10.2097 13.7346 10.2918C12.243 11.3276 10.7523 12.3642 9.26082 13.3999C8.77421 13.7379 8.26404 14.0856 7.6775 14.1684C7.15271 14.2432 6.62467 14.097 6.11693 13.9475C5.69125 13.8224 5.26636 13.694 4.84311 13.5616C4.61809 13.4917 4.38575 13.4162 4.2119 13.2578C4.03805 13.0994 3.93814 12.8329 4.04294 12.6217C4.10874 12.4893 4.23628 12.4056 4.37033 12.3373L4.37193 12.3382Z"
        fill="currentColor"
      />
    </svg>
  );
}
