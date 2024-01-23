import React from "react";
import { IconProps } from '@/components/Icon/index'
import { classNames } from '@/utils/string'

export default function AuctionIcon({ color, className, width, height }: IconProps) {

  return (
    <svg
      className={classNames(`text-${color || 'white'}`, className)}
      width={width || 20}
      height={height || 21}
      viewBox="0 0 20 21" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1035_1666)">
        <path
          d="M5.38634 7.70994C5.61513 7.93877 5.98619 7.9388 6.21501 7.70998L11.1869 2.7381C11.4156 2.50931 11.4157 2.13834 11.1869 1.90951L10.1158 0.838022C9.88701 0.609155 9.51595 0.609194 9.28716 0.837983L4.31529 5.80986C4.0865 6.03865 4.08646 6.40962 4.31525 6.63845L5.38634 7.70994Z"
          fill="currentColor" />
        <path
          d="M13.4302 14.9248L18.4021 9.95291C18.6309 9.72413 18.6308 9.35292 18.4021 9.12424L17.3306 8.05315C17.1018 7.8244 16.7308 7.8244 16.502 8.05319L11.5301 13.0247C11.3013 13.2535 11.3014 13.6247 11.5301 13.8533L12.6016 14.9248C12.8304 15.1537 13.2015 15.1536 13.4302 14.9248Z"
          fill="currentColor" />
        <path
          d="M15.7603 7.14312C15.1365 6.95405 14.1838 6.56343 13.4302 5.80991C12.681 5.06069 12.2888 4.10405 12.0982 3.47827C12.0323 3.55394 7.01787 8.56671 6.95642 8.62007C7.80521 8.87788 8.65779 9.32312 9.28689 9.95327C9.91587 10.5812 10.3571 11.4239 10.6193 12.2841C10.6852 12.2084 15.6982 7.19784 15.7603 7.14312Z"
          fill="currentColor" />
        <path
          d="M6.91316 9.84058L0.171753 16.582C-0.0567627 16.8109 -0.0567627 17.182 0.171753 17.4109L1.82917 19.0683C2.05808 19.2969 2.42917 19.2969 2.65808 19.0683L9.39832 12.3277C9.16941 11.7055 8.84167 11.1644 8.45886 10.7824C8.07406 10.3969 7.53308 10.0687 6.91316 9.84058Z"
          fill="currentColor" />
        <path
          d="M18.2861 16.6664H13.7147C12.7694 16.6664 12.0004 17.2645 12.0004 17.9997V18.8886C12.0004 19.1341 12.2562 19.333 12.5718 19.333H19.4289C19.7445 19.333 20.0004 19.1341 20.0004 18.8886V17.9997C20.0004 17.2645 19.2313 16.6664 18.2861 16.6664Z"
          fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_1035_1666">
          <rect width="20" height="20" fill="currentColor" transform="translate(0.00012207 0.666626)" />
        </clipPath>
      </defs>
    </svg>
  )
}
