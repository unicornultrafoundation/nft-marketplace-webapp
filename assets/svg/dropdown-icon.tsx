import React from "react";

type Props = {
  width?: number;
  height?: number;
};

const DropdownIcon = ({ width, height }: Props) => {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="8" fill="#E3E3E3" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.08687 9.83736C8.31468 9.60955 8.68402 9.60955 8.91183 9.83736L11.9993 12.9249L15.0869 9.83736C15.3147 9.60955 15.684 9.60955 15.9118 9.83736C16.1396 10.0652 16.1396 10.4345 15.9118 10.6623L12.4118 14.1623C12.184 14.3901 11.8147 14.3901 11.5869 14.1623L8.08687 10.6623C7.85906 10.4345 7.85906 10.0652 8.08687 9.83736Z"
          fill="#929292"
        />
      </svg>
    </div>
  );
};

export default DropdownIcon;
