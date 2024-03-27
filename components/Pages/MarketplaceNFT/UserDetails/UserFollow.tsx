import React, { useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useMarketplaceApi } from "@/hooks/useMarketplaceApi";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import { useAuth } from "@/hooks/useAuth";
import ConnectWalletButton from "@/components/Button/ConnectWalletButton";

export interface Props {
  isFollowed?: boolean;
  userId: string;
  onRefresh: () => void;
}

export default function UserFollow({ isFollowed, userId, onRefresh }: Props) {
  const api = useMarketplaceApi();
  const { isValidSession } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isFollowing = useMemo(() => {
    if (!isValidSession) return false;
    return isFollowed;
  }, [isFollowed, isValidSession]);

  const handleFollow = async (accessToken?: string) => {
    try {
      setLoading(true);
      await api.followUser({
        userId: userId,
        accessToken,
      });
      onRefresh();
      toast.success(
        `${isFollowing ? "Unfollowed" : "Followed"} artist successfully`,
      );
    } catch (e: any) {
      console.error(e);
      toast.error(`Failed to ${isFollowing ? "unfollow" : "follow"} artist`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConnectWalletButton action={(accessToken) => handleFollow(accessToken)}>
      <Button
        variant={isFollowing ? "secondary" : "primary"}
        scale="sm"
        className={`flex justify-center items-center transition-all`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {loading && <Spinner size="sm" />}
        {!isFollowing && <Icon name="plus" width={16} height={16} />}
        {isFollowing ? (isHovered ? "Unfollow" : "Following") : "Follow"}
      </Button>
    </ConnectWalletButton>
  );
}
