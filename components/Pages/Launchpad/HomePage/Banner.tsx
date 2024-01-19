'use client'
import React from "react";
import ProjectSlide from './LaunchpadSlide';
import useSWR from 'swr'
import { useLaunchpadApi } from '@/hooks/useLaunchpadApi'
import Icon from "../../../Icon";
import { Carousel } from 'flowbite-react'

export default function HomePageBanner() {
  const api = useLaunchpadApi()
  const { data } = useSWR(
    'comingProjects',
    () => api.fetchProjects(),
    { revalidateOnFocus: false }
  )

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <Icon className="text-primary" name="arrow-right" width={32} height={32} />
    ),
    prevArrow: (
      <Icon className="text-primary" name="arrow-left" width={32} height={32} />
    )
  }

  return (
    <div className="w-full h-[500px] mx-auto">
      {Array.isArray(data) && (
        <Carousel pauseOnHover indicators={true} className="h-full w-full">
          {data.map(project => (
            <div key={project.id}>
              <ProjectSlide project={project} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  )
}