import { TRedirectTo } from "@/lib/types";
import { useLocation } from "react-router";

export const useRedirectTo = () => {
  const location = useLocation<TRedirectTo>();

  return location.state?.redirectTo || "/dashboard";
};
