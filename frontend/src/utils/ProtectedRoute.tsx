import { useAccessToken } from "@/atoms/accessToken";
import { ROUTES } from "@/pages/routes";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: PropsWithChildren<unknown>) => {
  const [accessToken] = useAccessToken();

  if (!accessToken) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  return <>{children}</>;
};
