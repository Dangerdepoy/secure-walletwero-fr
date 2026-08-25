/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  // Les secrets (token bot, chat id) ne sont jamais exposés ici :
  // ils restent lus via process.env uniquement dans les routes API (côté serveur).
};

module.exports = nextConfig;
