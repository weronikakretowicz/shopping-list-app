import { Navigate } from "react-router-dom";
import { ROUTES } from "./routes";
import { useLayoutEffect } from "react";
import { removeAccessToken, useAccessToken } from "@/atoms/accessToken";

export const Logout = () => {
  const [, setAccessToken] = useAccessToken();

  useLayoutEffect(() => {
    setAccessToken(undefined);
    removeAccessToken();
  }, []);

  return <Navigate to={ROUTES.LOGIN} />;
};
