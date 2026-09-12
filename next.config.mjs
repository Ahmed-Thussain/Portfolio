/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // The Hero avatar starts as an SVG placeholder (Task 5) and may
    // remain SVG or become a raster photo later — allow both through
    // next/image's optimizer rather than special-casing one format.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
};

export default nextConfig;
