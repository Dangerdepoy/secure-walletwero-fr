import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  default: {
    bundler: {
      esbuild: {
        external: ["sharp", "@img/*"],
      },
    },
  },
});