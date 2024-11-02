import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "campi",
  webDir: "dist",
  plugins: {
    // https://capacitorjs.com/docs/apis/cookies
    CapacitorCookies: {
      enabled: true,
    },
  },
};

export default config;
