import { classNames } from '@/utils/string'
import { IconProps } from './index'

export default function TrendingUpIcon({ color, className, width, height }: IconProps) {
    return (
        <svg
            width={width}
            height={height}
            className={classNames(className, `text-${color ? color : 'current'}`)}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_537_13578)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.7803 3.96967C18.0732 4.26256 18.0732 4.73744 17.7803 5.03033L10.6553 12.1553C10.3624 12.4482 9.88756 12.4482 9.59467 12.1553L6.375 8.93566L1.28033 14.0303C0.987437 14.3232 0.512563 14.3232 0.21967 14.0303C-0.0732233 13.7374 -0.0732233 13.2626 0.21967 12.9697L5.84467 7.34467C6.13756 7.05178 6.61244 7.05178 6.90533 7.34467L10.125 10.5643L16.7197 3.96967C17.0126 3.67678 17.4874 3.67678 17.7803 3.96967Z"
                    fill="currentColor" />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 4.5C12 4.08579 12.3358 3.75 12.75 3.75H17.25C17.6642 3.75 18 4.08579 18 4.5V9C18 9.41421 17.6642 9.75 17.25 9.75C16.8358 9.75 16.5 9.41421 16.5 9V5.25H12.75C12.3358 5.25 12 4.91421 12 4.5Z"
                    fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_537_13578">
                    <rect width="18" height="18" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}