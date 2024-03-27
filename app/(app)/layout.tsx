import MainLayout from "@/components/Layout/MainLayout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
