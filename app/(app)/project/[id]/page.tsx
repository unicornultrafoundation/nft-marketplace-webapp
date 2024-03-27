"use client";

import ProjectPageBanner from "components/Pages/Launchpad/ProjectDetails/LauchpadBanner";
import ProjectPageDescriptions from "@/components/Pages/Launchpad/ProjectDetails/LaunchpadDescriptions";
import ProjectMintSchedule from "@/components/Pages/Launchpad/ProjectDetails/MintSchedule";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { useLaunchpadApi } from "@/hooks/useLaunchpadApi";
import { ClipLoader } from "react-spinners";
import { colors } from "@/config/theme";

export default function ProjectPage() {
  const { id } = useParams();
  const api = useLaunchpadApi();
  const { data, isLoading } = useSWR(
    !!id ? id : null,
    (id: string) => api.fetchProjectById(id),
    { revalidateOnFocus: false },
  );

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <ClipLoader color={colors.info} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-96 flex justify-center items-center">
        <p className="text-heading-sm">Project not found!</p>
      </div>
    );
  }

  return (
    <div className="px-4 tablet:px-7 desktop:px-20">
      <div className="mb-20 mt-10">
        <ProjectPageBanner project={data} />
      </div>

      <div className="flex items-start gap-6 flex-col desktop:flex-row tablet:flex-row w-full">
        <div className="flex-1 w-full desktop:w-auto tablet:w-auto">
          <ProjectPageDescriptions project={data} />
        </div>
        <div className="flex-1 w-full desktop:w-auto tablet:w-auto">
          <ProjectMintSchedule
            rounds={data.rounds}
            collection={data.collection}
          />
        </div>
      </div>
    </div>
  );
}
