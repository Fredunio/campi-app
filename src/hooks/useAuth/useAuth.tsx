// useAuth hook using useContext and AuthContext

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const useAuth = () => {
  const { user, loading } = useContext(AuthContext);
  return {
    user,
    loading,
  };
};
export default useAuth;
