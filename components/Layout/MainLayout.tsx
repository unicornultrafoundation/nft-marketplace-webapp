"use client";

import MainHeader from "@/components/Layout/MainHeader";
import MainFooter from "@/components/Layout/MainFooter";
import MainBody from "@/components/Layout/MainBody";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <MainHeader />
      <MainBody>{children}</MainBody>
      <MainFooter />
    </main>
  );
}
