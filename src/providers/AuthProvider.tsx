import { createContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import useSupabaseBrowser from "../database/client";
import { Tables } from "@/database/schema.gen";

// auth provider

type TUserProile = Tables<"UserProfile">;

export const AuthContext = createContext<{
  user: User | null;
  userProfile: TUserProile | null;
  loading: boolean;
}>({
  user: null,
  userProfile: null,
  loading: true,
});

const AuthProvider = function ({ children }: { children: React.ReactNode }) {
  const supabase = useSupabaseBrowser();
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<TUserProile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);

        // Fetch user profile

        if (!session?.user) {
          setUserProfile(null);
          setLoading(false);
          return;
        }

        const { data: userProfile, error } = await supabase
          .from("UserProfile")
          .select("*")
          .eq("id", session?.user?.id);
        console.log("userProfile", userProfile);

        if (error) {
          console.error("Error getting user profile", error);
          setUserProfile(null);
          // setLoading(false);
        } else {
          setUserProfile(userProfile?.[0] ?? null);
          // setLoading(false);
        }

        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
