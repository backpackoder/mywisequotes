/** @type {import('next').NextConfig} */

const { execSync } = require("child_process");

module.exports = {
  images: {
    // domains: ["upload.wikimedia.org", "lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    execSync("prisma generate");
    return [];
  },
};
