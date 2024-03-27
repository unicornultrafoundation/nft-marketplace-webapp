export type SearchKey = "users";

export interface UserState {
  queryString: Record<SearchKey, string>;
}

export interface UserAction {
  setQueryString: (key: SearchKey, text: string) => void;
}
