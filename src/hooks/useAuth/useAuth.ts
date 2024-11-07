// useAuth hook using useContext and AuthContext

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const useAuth = () => {
  const { user, userProfile, loading } = useContext(AuthContext);
  return {
    user,
    userProfile,
    loading,
  };
};
export default useAuth;
