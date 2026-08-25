import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  edgeExternals: [
    "sharp",
    "@img/sharp-win32-x64",
    "@img/sharp-linux-x64",
    "@img/sharp-linuxmusl-x64"
  ]
});