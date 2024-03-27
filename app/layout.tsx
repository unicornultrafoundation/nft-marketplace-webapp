import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";
import Providers from "@/components/Providers";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import React, { Suspense } from "react";
import LoadingPage from "./loading";

export const metadata: Metadata = {
  title: "U2U NFT Marketplace",
  description: "U2U NFT Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <Providers>
            <Suspense fallback={<LoadingPage />}>{children}</Suspense>
            <ToastContainer autoClose={5000} />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
