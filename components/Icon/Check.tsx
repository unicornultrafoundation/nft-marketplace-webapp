import React from "react";
import { IconProps } from "@/components/Icon/index";
import { classNames } from "@/utils/string";

export default function CheckIcon({
  color,
  className,
  width,
  height,
}: IconProps) {
  return (
    <svg
      className={classNames(`text-${color || "white"}`, className)}
      width={width || 19}
      height={height || 20}
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.1054 4.78335C16.4092 5.08709 16.4092 5.57955 16.1054 5.88329L7.54989 14.4388C7.24615 14.7426 6.75369 14.7426 6.44995 14.4388L2.56106 10.55C2.25732 10.2462 2.25732 9.75376 2.56106 9.45001C2.8648 9.14627 3.35726 9.14627 3.661 9.45001L6.99992 12.7889L15.0055 4.78335C15.3092 4.47961 15.8017 4.47961 16.1054 4.78335Z"
        fill="white"
      />
    </svg>
  );
}
