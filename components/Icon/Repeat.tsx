import { classNames } from '@/utils/string'
import { IconProps } from './index'

export default function RepeatIcon({ color, className, width, height }: IconProps) {
    return (
        <svg 
            width={width} 
            height={height} 
            className={classNames(className, `text-${color ? color : 'current'}`)}
            viewBox="0 0 18 18" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_537_13563)">
                <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M12.2197 0.21967C12.5126 -0.0732233 12.9874 -0.0732233 13.2803 0.21967L16.2803 3.21967C16.5732 3.51256 16.5732 3.98744 16.2803 4.28033L13.2803 7.28033C12.9874 7.57322 12.5126 7.57322 12.2197 7.28033C11.9268 6.98744 11.9268 6.51256 12.2197 6.21967L14.6893 3.75L12.2197 1.28033C11.9268 0.987437 11.9268 0.512563 12.2197 0.21967Z" 
                    fill="currentColor" />
                <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M5.25 4.5C4.65326 4.5 4.08097 4.73705 3.65901 5.15901C3.23705 5.58097 3 6.15326 3 6.75V8.25C3 8.66421 2.66421 9 2.25 9C1.83579 9 1.5 8.66421 1.5 8.25V6.75C1.5 5.75544 1.89509 4.80161 2.59835 4.09835C3.30161 3.39509 4.25544 3 5.25 3H15.75C16.1642 3 16.5 3.33579 16.5 3.75C16.5 4.16421 16.1642 4.5 15.75 4.5H5.25Z" 
                    fill="currentColor" />
                <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M5.78033 10.7197C6.07322 11.0126 6.07322 11.4874 5.78033 11.7803L3.31066 14.25L5.78033 16.7197C6.07322 17.0126 6.07322 17.4874 5.78033 17.7803C5.48744 18.0732 5.01256 18.0732 4.71967 17.7803L1.71967 14.7803C1.42678 14.4874 1.42678 14.0126 1.71967 13.7197L4.71967 10.7197C5.01256 10.4268 5.48744 10.4268 5.78033 10.7197Z" 
                    fill="currentColor" />
                <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M15.75 9C16.1642 9 16.5 9.33579 16.5 9.75V11.25C16.5 12.2446 16.1049 13.1984 15.4017 13.9016C14.6984 14.6049 13.7446 15 12.75 15H2.25C1.83579 15 1.5 14.6642 1.5 14.25C1.5 13.8358 1.83579 13.5 2.25 13.5H12.75C13.3467 13.5 13.919 13.2629 14.341 12.841C14.7629 12.419 15 11.8467 15 11.25V9.75C15 9.33579 15.3358 9 15.75 9Z" 
                    fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_537_13563">
                    <rect width="18" height="18" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}