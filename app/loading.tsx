"use client";

import { Spinner } from "flowbite-react";

export default function LoadingPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner size="xl" />
    </div>
  );
}
