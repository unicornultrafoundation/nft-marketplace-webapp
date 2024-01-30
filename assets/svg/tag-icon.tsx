import React from "react";

type Props = {
  width?: number;
  height?: number;
};

const TagIcon = ({ width, height }: Props) => {
  return (
    <div>
      <svg
        width={width}
        height={height}
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="34" height="34" rx="12" fill="#F5F5F5" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.75 9.5C8.75 9.08579 9.08579 8.75 9.5 8.75H17C17.1989 8.75 17.3897 8.82902 17.5303 8.96967L23.9744 15.4137C24.3935 15.8353 24.6287 16.4056 24.6287 17C24.6287 17.5944 24.3935 18.1647 23.9744 18.5863L23.9728 18.5878L18.5956 23.965C18.5955 23.9651 18.5957 23.9649 18.5956 23.965C18.3867 24.1741 18.1384 24.3402 17.8654 24.4534C17.5922 24.5667 17.2994 24.6249 17.0037 24.6249C16.7081 24.6249 16.4153 24.5667 16.1421 24.4534C15.8691 24.3402 15.621 24.1743 15.412 23.9652C15.412 23.9651 15.4121 23.9652 15.412 23.9652L8.96998 17.5306C8.82914 17.39 8.75 17.1991 8.75 17V9.5ZM10.25 10.25V16.6891L16.4725 22.9044L16.4731 22.905C16.5428 22.9747 16.6255 23.03 16.7165 23.0678C16.8076 23.1055 16.9052 23.1249 17.0037 23.1249C17.1023 23.1249 17.1999 23.1055 17.291 23.0678C17.382 23.03 17.4647 22.9747 17.5344 22.905L22.9106 17.5287C22.9108 17.5285 22.9111 17.5283 22.9113 17.5281C23.0505 17.3876 23.1287 17.1978 23.1287 17C23.1287 16.8022 23.0505 16.6124 22.9113 16.4719C22.9111 16.4717 22.9108 16.4715 22.9106 16.4713L16.6893 10.25H10.25Z"
          fill="#252525"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.5 13.25C12.5 12.8358 12.8358 12.5 13.25 12.5H13.2575C13.6717 12.5 14.0075 12.8358 14.0075 13.25C14.0075 13.6642 13.6717 14 13.2575 14H13.25C12.8358 14 12.5 13.6642 12.5 13.25Z"
          fill="#252525"
        />
      </svg>
    </div>
  );
};

export default TagIcon;
