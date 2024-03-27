import { Address, useAccount } from "wagmi";
import { disconnect } from "@wagmi/core";
import { sleep } from "@/utils";
import useAuthStore, { clearProfile } from "@/store/auth/store";
import { useCallback, useMemo, useState } from "react";
import { APIParams } from "@/services/api/types";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";

export const useAuth = () => {
  const api = useMarketplaceApi();
  const { setCredentials, setProfile, credentials } = useAuthStore();
  const bearerToken = credentials?.accessToken;

  const { isConnected, address } = useAccount();
  const acceptedTerms = useAuthStore((state) => state.profile?.acceptedTerms);
  const accessToken = useAuthStore((state) => state.credentials?.accessToken);
  const expiredDate = useAuthStore(
    (state) => state.credentials?.accessTokenExpire,
  );
  const userWallet = useAuthStore((state) => state.profile?.publicKey);

  const isCorrectWallet = useMemo(() => {
    if (!userWallet || !address) return false;
    return userWallet.toLowerCase() === address.toLowerCase();
  }, [userWallet, address, isConnected]);

  const isExpired = useMemo(() => {
    return !!expiredDate && expiredDate < Date.now();
  }, [expiredDate]);

  const isValidSession = useMemo(() => {
    return acceptedTerms && !!accessToken && !isExpired && isCorrectWallet;
  }, [acceptedTerms, accessToken, isExpired, isCorrectWallet]);

  if (typeof localStorage !== "undefined") {
    if (!isValidSession) {
      localStorage.removeItem("auth-storage");
    }
  }

  const onAuth = useCallback(
    async (date: string, message: Address) => {
      if (!address) return;

      const credentials = await api.connect({
        date,
        publicKey: address,
        signature: message,
        signer: address.toLocaleLowerCase(),
      });
      setCredentials(credentials);

      await sleep(1000);
      return credentials;
    },
    [address],
  );

  const onUpdateProfile = useCallback(
    async (params: APIParams.UpdateProfile) => {
      if (!bearerToken) return;
      const profile = await api.updateProfile(params);
      setProfile(profile);
    },
    [bearerToken, address],
  );

  const onVerifyAccount = useCallback(async () => {
    if (!bearerToken) return;
    return api.verifyAccount();
  }, [bearerToken, address]);

  const onResendEmail = useCallback(
    async (params: APIParams.ResendVerifyMail) => {
      if (!bearerToken) return;
      const email = await api.resendEmail(params);
    },
    [bearerToken, address],
  );

  const onLogout = async () => {
    await disconnect();
    clearProfile();
  };

  return {
    isValidSession,
    onAuth,
    onUpdateProfile,
    bearerToken,
    onLogout,
    onResendEmail,
    onVerifyAccount,
  };
};
