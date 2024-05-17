/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	basePath:
		process.env.NODE_ENV === "production"
			? "/Azure-translator-code"
			: undefined,
};

export default nextConfig;
