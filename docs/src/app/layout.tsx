import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_WEBSITE_URL ||
			"https://azuretranslatorcode.vercel.app",
	),

	title: "Azure Translator Code",
	description: "Translate your json file directly in the page",
	authors: { name: "Gabriel Logan" },
	classification: "translator",
	generator: "Next.js",
	publisher: "Gabriel Logan",
	creator: "Gabriel Logan",

	openGraph: {
		title: "Azure Translator Code",
		description: "Translate your json file directly in the page",
		url: process.env.NEXT_PUBLIC_WEBSITE_URL,
		siteName: "Azure Translator Code",
		type: "website",
	},

	keywords: ["translator", "code", "azure", "microsoft"],

	manifest: "/manifest.webmanifest",

	category: "translator",

	verification: {
		google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_API_KEY,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
				<footer>
					<p className="text-center text-gray-600">
						Created by{" "}
						<a className="text-blue-500 hover:underline" href="#">
							Gabriel Logan &copy; 2024
						</a>
					</p>
				</footer>
				<Analytics />
			</body>
		</html>
	);
}
