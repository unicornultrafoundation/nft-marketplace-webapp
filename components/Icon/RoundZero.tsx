import React from "react";
import { IconProps } from "@/components/Icon/index";
import { classNames } from "@/utils/string";

export default function RoundZeroIconZ({
  color,
  className,
  width,
  height,
}: IconProps) {
  return (
    <svg
      className={classNames(`text-${color || "white"}`, className)}
      width={width || 20}
      height={height || 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.88889 11.1011C4.58399 11.6102 3 12.6673 3 13.8888C3 15.6071 6.13401 16.9999 10 16.9999C13.866 16.9999 17 15.6071 17 13.8888C17 12.6673 15.416 11.6102 13.1111 11.1011M10 13.8888V8.3992M10 8.3992V2.48548C10 2.29665 10.1942 2.16933 10.3687 2.24372L16.8397 5.00113C17.0534 5.09223 17.0534 5.39356 16.8397 5.48465L10 8.3992Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
