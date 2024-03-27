import ProjectCard from "./LaunchpadCard";
import { Project } from "@/types";

interface Props {
  projects?: Project[];
}

export default function HomePageProjectList({ projects }: Props) {
  if (!projects || !projects.length) {
    return (
      <div className="w-full h-56 flex justify-center items-center p-7 rounded-2xl border border-disabled border-dashed mt-7">
        <p className="text-secondary font-semibold text-body-18">
          Nothing to show
        </p>
      </div>
    );
  }

  return (
    <div className="grid tablet:grid-cols-2 desktop:grid-cols-4 grid-cols-1 tablet:gap-8 gap-6 py-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
