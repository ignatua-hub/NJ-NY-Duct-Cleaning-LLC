/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow missing before/after photos to fail gracefully via onError placeholders
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
