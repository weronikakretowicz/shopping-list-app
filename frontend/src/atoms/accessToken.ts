import { useAtom } from "jotai/react";
import { atomWithStorage } from "jotai/utils";

const ACCESS_TOKEN_KEY = "access_token" as const;

export const accessTokenAtom = atomWithStorage<string | undefined>(
  ACCESS_TOKEN_KEY,
  undefined,
);

export const useAccessToken = () => {
  return useAtom(accessTokenAtom);
};
