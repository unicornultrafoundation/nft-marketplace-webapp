import HomePageBanner from "@/components/Pages/Launchpad/HomePage/Banner";
import HomePageProjects from "@/components/Pages/Launchpad/HomePage/Projects";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen px-4 tablet:px-7 desktop:px-20">
      <HomePageBanner />
      <HomePageProjects />
    </div>
  );
}
