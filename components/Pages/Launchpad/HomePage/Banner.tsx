"use client";
import React from "react";
import ProjectSlide from "./LaunchpadSlide";
import useSWR from "swr";
import { useLaunchpadApi } from "@/hooks/useLaunchpadApi";
import Icon from "../../../Icon";
import { Carousel, CustomFlowbiteTheme } from "flowbite-react";

const carouselTheme: CustomFlowbiteTheme["carousel"] = {
  control: {
    base: "inline-flex h-5 w-5 items-center justify-center rounded-full bg-surface-soft group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-secondary sm:h-7 sm:w-7",
    icon: "h-4 w-4 text-secondary sm:h-5 sm:w-5",
  },
  indicators: {
    active: {
      off: "bg-white/50 hover:bg-white",
      on: "bg-white",
    },
    base: "h-1 w-5 rounded-full",
    wrapper: "absolute bottom-3 left-1/2 flex -translate-x-1/2 space-x-3 ",
  },
  root: {
    leftControl:
      "absolute top-0 tablet:left-0 flex h-full items-center justify-center tablet:px-4 focus:outline-none",
    rightControl:
      "absolute top-0 right-0 flex h-full items-center justify-center tablet:px-4 focus:outline-none",
  },
  item: {
    base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
  },
};

export default function HomePageBanner() {
  const api = useLaunchpadApi();
  const { data } = useSWR("comingProjects", () => api.fetchProjects(), {
    revalidateOnFocus: false,
  });

  return (
    <div className="w-full h-[530px] desktop:h-[500px] tablet:h-[500px] mx-auto p-2">
      {Array.isArray(data) && (
        <Carousel theme={carouselTheme}>
          {data.map((project) => (
            <div key={project.id}>
              <ProjectSlide project={project} />
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
}
