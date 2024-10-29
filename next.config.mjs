import nextPwa from "next-pwa";
/** @type {import('next').NextConfig} */
const nextConfig = {};

// export default nextConfig;

const withPWA = nextPwa({
	dest: "public",
	register: true,
});

const config = withPWA({
	...nextConfig,
});

export default config;