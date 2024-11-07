import { supportsLocalStorage } from "@/lib/helpers/supportsLocalStorage";
import { SupportedStorage } from "@supabase/supabase-js";

// NOTE: This is a custom storage adapter that can be used on server-side, but I doubt it's necessary
// https://supabase.com/docs/guides/auth/sessions/pkce-flow

export const customStorageAdapter: SupportedStorage = {
  getItem: (key) => {
    if (!supportsLocalStorage()) {
      // TODO: Configure alternate storage
      return null;
    }
    return globalThis.localStorage.getItem(key);
  },
  setItem: (key, value) => {
    if (!supportsLocalStorage()) {
      // TODO: Configure alternate storage here
      return;
    }
    globalThis.localStorage.setItem(key, value);
  },
  removeItem: (key) => {
    if (!supportsLocalStorage()) {
      // TODO: Configure alternate storage here
      return;
    }
    globalThis.localStorage.removeItem(key);
  },
};
