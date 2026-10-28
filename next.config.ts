import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	async redirects() {
		return [
			{
				source: "/:path*",
				// Avoid a redirect loop if this project is also served on the new domain
				missing: [{ type: "host", value: "(www\\.)?marcelosm\\.com\\.br" }],
				destination: "https://marcelosm.com.br/",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
