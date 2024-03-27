"use client";

import Tabs from "@/components/Tabs";
import { useMemo, useState } from "react";
import HomePageProjectList from "./LaunchpadList";
import { useLaunchpadApi } from "@/hooks/useLaunchpadApi";
import useSWR from "swr";

export default function HomePageProjectTabs() {
  const api = useLaunchpadApi();
  const { data: mintingProjects } = useSWR(
    "mintingProjects",
    () => api.fetchProjects({ mode: "MINTING" }),
    { revalidateOnFocus: false },
  );

  const { data: comingProjects } = useSWR(
    "upcomingProjects",
    () => api.fetchProjects({ mode: "UPCOMING" }),
    { revalidateOnFocus: false },
  );

  const { data: endedProjects } = useSWR(
    "endedProjects",
    () => api.fetchProjects({ mode: "ENDED" }),
    { revalidateOnFocus: false },
  );

  const { data: claimableProjects } = useSWR(
    "claimProjects",
    () => api.fetchProjects({ mode: "CLAIM" }),
    { revalidateOnFocus: false },
  );

  const [current, setCurrent] = useState(1);

  const tabs = useMemo(
    () => [
      { label: "Minting", value: 1, quantity: mintingProjects?.length || "0" },
      { label: "Upcoming", value: 2, quantity: comingProjects?.length || "0" },
      { label: "Ended", value: 3, quantity: endedProjects?.length || "0" },
      { label: "Claim", value: 4, quantity: claimableProjects?.length || "0" },
    ],
    [mintingProjects, comingProjects, endedProjects, claimableProjects],
  );

  return (
    <div className="desktop:mt-10">
      <Tabs current={current} tabs={tabs} onChangeTab={setCurrent} />

      {current === 1 && <HomePageProjectList projects={mintingProjects} />}
      {current === 2 && <HomePageProjectList projects={comingProjects} />}
      {current === 3 && <HomePageProjectList projects={endedProjects} />}
      {current === 4 && <HomePageProjectList projects={claimableProjects} />}
    </div>
  );
}
