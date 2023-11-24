import React from "react";
import { IconProps } from '@/components/Icon/index'
import { classNames } from '@/utils/string'

export default function SearchIcon({ color, className, width, height }: IconProps) {

  return (
    <svg
      className={classNames(`text-${color}`, className)}
      width={width}
      height={height}
      viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="search">
        <path id="Vector (Stroke)" fillRule="evenodd" clipRule="evenodd"
              d="M11.5435 4C7.67746 4 4.54346 7.13401 4.54346 11C4.54346 14.866 7.67746 18 11.5435 18C15.4095 18 18.5435 14.866 18.5435 11C18.5435 7.13401 15.4095 4 11.5435 4ZM2.54346 11C2.54346 6.02944 6.57289 2 11.5435 2C16.514 2 20.5435 6.02944 20.5435 11C20.5435 15.9706 16.514 20 11.5435 20C6.57289 20 2.54346 15.9706 2.54346 11Z"
              fill="currentColor"/>
        <path id="Vector (Stroke)_2" fillRule="evenodd" clipRule="evenodd"
              d="M16.4867 15.9428C16.8773 15.5523 17.5104 15.5523 17.901 15.9428L22.251 20.2928C22.6415 20.6833 22.6415 21.3165 22.251 21.707C21.8604 22.0975 21.2273 22.0975 20.8367 21.707L16.4867 17.357C16.0962 16.9665 16.0962 16.3333 16.4867 15.9428Z"
              fill="currentColor"/>
      </g>
    </svg>

  )
    ;
};

