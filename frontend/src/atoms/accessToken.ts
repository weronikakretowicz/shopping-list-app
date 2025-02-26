import { useAtom } from "jotai/react";
import { atomWithStorage } from "jotai/utils";

const ACCESS_TOKEN_KEY = "access_token" as const;

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const accessTokenAtom = atomWithStorage<string | undefined>(
  ACCESS_TOKEN_KEY,
  getAccessTokenFromLocalStorage() ?? undefined,
);

export const useAccessToken = () => {
  return useAtom(accessTokenAtom);
};
