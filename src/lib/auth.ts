import { TypedSupabaseClient } from "./types";

export async function signUpWithEmail(
  supabaseClient: TypedSupabaseClient,
  email: string,
  password: string
) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data.user;
}

export async function signInWithPassword(
  supabaseClient: TypedSupabaseClient,
  email: string,
  password: string
) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data.user;
}

export async function signInWithFacebook(supabaseClient: TypedSupabaseClient) {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "facebook",
  });
}

export async function signInWithGoogle(supabaseClient: TypedSupabaseClient) {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
  });
}

export async function signInWithDiscord(supabaseClient: TypedSupabaseClient) {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "discord",
  });
}

export async function signOut(supabaseClient: TypedSupabaseClient) {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    throw error;
  }
}
