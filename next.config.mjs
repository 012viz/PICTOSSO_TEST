/** @type {import('next').NextConfig} */
import MillionCompiler from '@million/lint';
const nextConfig = {
  // reactStrictMode: true, // set true if using million ?
  reactStrictMode: false,
  compiler: {
    // removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    swcPlugins: [["@preact-signals/safe-react/swc", { mode: "auto" }]]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};


// export default MillionCompiler.next({ 
//   rsc: true // if used in the app router mode
// })(nextConfig);


export default nextConfig;
