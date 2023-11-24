import React from "react";
import { IconProps } from '@/components/Icon/index'
import { classNames } from '@/utils/string'

type Props = {
  width?: number;
  height?: number;
};

export default function TrendingUpIcon({ color, className, width, height }: IconProps) {
  return (
    <svg
      className={classNames(`text-${color}`, className)}
      width={width}
      height={height}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect width="34" height="34" rx="12" fill="#F5F5F5" />
      <g clipPath="url(#clip0_361_13577)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25.7803 11.9697C26.0732 12.2626 26.0732 12.7374 25.7803 13.0303L18.6553 20.1553C18.3624 20.4482 17.8876 20.4482 17.5947 20.1553L14.375 16.9357L9.28033 22.0303C8.98744 22.3232 8.51256 22.3232 8.21967 22.0303C7.92678 21.7374 7.92678 21.2626 8.21967 20.9697L13.8447 15.3447C14.1376 15.0518 14.6124 15.0518 14.9053 15.3447L18.125 18.5643L24.7197 11.9697C25.0126 11.6768 25.4874 11.6768 25.7803 11.9697Z"
          fill="#252525" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 12.5C20 12.0858 20.3358 11.75 20.75 11.75H25.25C25.6642 11.75 26 12.0858 26 12.5V17C26 17.4142 25.6642 17.75 25.25 17.75C24.8358 17.75 24.5 17.4142 24.5 17V13.25H20.75C20.3358 13.25 20 12.9142 20 12.5Z"
          fill="#252525" />
      </g>
      <defs>
        <clipPath id="clip0_361_13577">
          <rect width="18" height="18" fill="white" transform="translate(8 8)" />
        </clipPath>
      </defs>
    </svg>
  );
};
