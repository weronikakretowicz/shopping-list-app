import { useAccessToken } from "@/atoms/accessToken";
import { getAccessTokenFromLocalStorage } from "@/atoms/accessToken";
import { ROUTES } from "@/pages/routes";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: PropsWithChildren<unknown>) => {
  const [accessToken] = useAccessToken();
  const accessTokenFromLocalStorage = getAccessTokenFromLocalStorage();

  if (!accessToken && !accessTokenFromLocalStorage) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <>{children}</>;
};
