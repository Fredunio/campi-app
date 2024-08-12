import { supabaseClient } from "../database/client";

export async function signInWithFacebook() {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "facebook",
  });
}

export async function signInWithGoogle() {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
  });
}

export async function signInWithDiscord() {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "discord",
  });
}
