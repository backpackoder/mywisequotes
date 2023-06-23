/** @type {import('next').NextConfig} */

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
};
