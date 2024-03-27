import { IconProps } from "@/components/Icon/index";

export default function TwitterIcon({ className, width, height }: IconProps) {
  return (
    <svg
      className={className}
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
        stroke="#252525"
        strokeWidth="1.5"
      />
      <path
        d="M16.0256 5.50024H18.1724L13.4824 11.0069L18.9998 18.5002H14.6797L11.296 13.9556L7.42433 18.5002H5.27627L10.2927 12.6102L4.99982 5.50024H9.42961L12.4882 9.65424L16.0256 5.50024ZM15.2722 17.1802H16.4617L8.78325 6.75091H7.50675L15.2722 17.1802Z"
        fill="#252525"
      />
    </svg>
  );
}
