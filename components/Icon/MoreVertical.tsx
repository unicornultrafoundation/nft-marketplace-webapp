import React from "react";
import { IconProps } from '@/components/Icon/index'
import { classNames } from '@/utils/string'

export default function MoreVerticalIcon({ color, className, width, height }: IconProps) {
  return (
    <svg
      className={classNames(`text-${color}`, className)}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.416 11.6665C11.1064 11.6665 11.666 11.1069 11.666 10.4165C11.666 9.72615 11.1064 9.1665 10.416 9.1665C9.72566 9.1665 9.16602 9.72615 9.16602 10.4165C9.16602 11.1069 9.72566 11.6665 10.416 11.6665Z"
        fill="#252525"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <path
        d="M10.416 5.8335C11.1064 5.8335 11.666 5.27385 11.666 4.5835C11.666 3.89314 11.1064 3.3335 10.416 3.3335C9.72566 3.3335 9.16602 3.89314 9.16602 4.5835C9.16602 5.27385 9.72566 5.8335 10.416 5.8335Z"
        fill="#252525"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <path
        d="M10.416 17.5C11.1064 17.5 11.666 16.9404 11.666 16.25C11.666 15.5596 11.1064 15 10.416 15C9.72566 15 9.16602 15.5596 9.16602 16.25C9.16602 16.9404 9.72566 17.5 10.416 17.5Z"
        fill="#252525"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round" />
    </svg>
  );
};
