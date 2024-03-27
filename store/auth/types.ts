import { APIResponse } from "@/services/api/types";
import { User } from "@/types";

export interface AuthStoreState {
  credentials: APIResponse.Connect | null;
  profile: User | null;
}

export interface AuthStoreAction {
  setCredentials: (credentials: APIResponse.Connect) => void;
  setProfile: (profile: User) => void;
}
