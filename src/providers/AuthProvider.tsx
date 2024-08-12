import { createContext, useEffect, useState } from "react";
import { supabaseClient } from "../database/client";
import { User } from "@supabase/supabase-js";

// auth provider

export const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
}>({
  user: null,
  loading: true,
});

const AuthProvider = function ({ children }: { children: React.ReactNode }) {
  const supabase = supabaseClient;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
