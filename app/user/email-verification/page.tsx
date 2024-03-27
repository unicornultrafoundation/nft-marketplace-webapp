"use client";
import Text from "@/components/Text";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";
import { APIParams } from "@/services/api/types";
import { Spinner } from "flowbite-react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

export default function EmailVerificationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();
  const api = useMarketplaceApi();

  // Set coutdown
  const [countdown, setCountdown] = useState(60);
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      router.push("/");
    }, 60000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimeout);
    };
  }, [router]);

  const {
    data: user,
    error,
    isLoading,
  } = useSWR(token || null, (verifyToken) =>
    api.fetchEmailVerify({ token: verifyToken } as APIParams.FetchEmailVerify),
  );

  const renderContent = () => {
    switch (true) {
      case !!error:
        return (
          <div className="flex flex-col p-10 justify-center items-center">
            <Text className="font-semibold text-error text-center text-heading-sm">
              {error.message}
            </Text>
            <span className="mt-4 text-tertiary">
              {" "}
              Please contact the following link{" "}
              <span className="underline cursor-pointer hover:text-primary">
                abc.com
              </span>{" "}
              for support
            </span>
          </div>
        );
      case !!user:
        const navigationHomepage = () => {
          router.push("/");
        };

        return (
          <div className="flex flex-col p-10 justify-center items-center">
            <Text className="font-semibold text-success text-center text-heading-sm">
              You have successfully verified your email.
            </Text>
            <span className="mt-4 text-tertiary">
              Please click on the link{" "}
              <span
                className="underline cursor-pointer hover:text-primary"
                onClick={navigationHomepage}
              >
                https://nebulas.u2nft.io/
              </span>{" "}
              to return to the home page
            </span>
            <span className="text-tertiary">
              Or after {countdown} seconds it will automatically return to the
              home page
            </span>
          </div>
        );
      case isLoading:
      default:
        return (
          <div className="w-screen h-screen flex justify-center items-center">
            <Spinner />
          </div>
        );
    }
  };

  return <div className="w-screen h-screen">{renderContent()}</div>;
}
