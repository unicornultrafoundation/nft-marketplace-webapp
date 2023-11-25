import React from "react";

type Props = {
    width?: number;
    height?: number;
};

const VerifySticker = ({ width, height }: Props) => {
    return (
        <div>
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5609 10.7401L20.2009 9.16006C19.9409 8.86006 19.7309 8.30006 19.7309 7.90006V6.20006C19.7309 5.14006 18.8609 4.27006 17.8009 4.27006H16.1009C15.7109 4.27006 15.1409 4.06006 14.8409 3.80006L13.2609 2.44006C12.5709 1.85006 11.4409 1.85006 10.7409 2.44006L9.17086 3.81006C8.87086 4.06006 8.30086 4.27006 7.91086 4.27006H6.18086C5.12086 4.27006 4.25086 5.14006 4.25086 6.20006V7.91006C4.25086 8.30006 4.04086 8.86006 3.79086 9.16006L2.44086 10.7501C1.86086 11.4401 1.86086 12.5601 2.44086 13.2501L3.79086 14.8401C4.04086 15.1401 4.25086 15.7001 4.25086 16.0901V17.8001C4.25086 18.8601 5.12086 19.7301 6.18086 19.7301H7.91086C8.30086 19.7301 8.87086 19.9401 9.17086 20.2001L10.7509 21.5601C11.4409 22.1501 12.5709 22.1501 13.2709 21.5601L14.8509 20.2001C15.1509 19.9401 15.7109 19.7301 16.1109 19.7301H17.8109C18.8709 19.7301 19.7409 18.8601 19.7409 17.8001V16.1001C19.7409 15.7101 19.9509 15.1401 20.2109 14.8401L21.5709 13.2601C22.1509 12.5701 22.1509 11.4301 21.5609 10.7401ZM16.1609 10.1101L11.3309 14.9401C11.1909 15.0801 11.0009 15.1601 10.8009 15.1601C10.6009 15.1601 10.4109 15.0801 10.2709 14.9401L7.85086 12.5201C7.56086 12.2301 7.56086 11.7501 7.85086 11.4601C8.14086 11.1701 8.62086 11.1701 8.91086 11.4601L10.8009 13.3501L15.1009 9.05006C15.3909 8.76006 15.8709 8.76006 16.1609 9.05006C16.4509 9.34006 16.4509 9.82006 16.1609 10.1101Z" fill="url(#paint0_linear_361_9355)"/>
                <defs>
                    <linearGradient id="paint0_linear_361_9355" x1="2.25085" y1="12.7501" x2="22.5009" y2="11.2501" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#5D96FF"/>
                        <stop offset="1" stop-color="#D466FF"/>
                    </linearGradient>
                </defs>
            </svg>

        </div>
    );
};

export default VerifySticker;