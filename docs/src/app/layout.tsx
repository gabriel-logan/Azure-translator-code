import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

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
		title: "Easily Translate JSON Files with Azure",
		description:
			"Use Azure Translator Code to translate your JSON files directly on the page quickly and easily.",
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
					<p className="p-1 text-center text-gray-600">
						Created by{" "}
						<Link
							className="text-blue-500 hover:underline"
							href="https://github.com/gabriel-logan"
							target="_blank"
						>
							Gabriel Logan &copy; 2024
						</Link>
					</p>
				</footer>
				<Analytics />
			</body>
		</html>
	);
}
