/** @type {import('next').NextConfig} */
const nextConfig = {
  // Domain: building-digital-career.stanceweb.us
  // Point your DNS CNAME → your hosting provider, then add the custom domain there.
  async redirects() {
    return [
      {
        source: "/",
        destination: "/register",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
