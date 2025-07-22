import Image from "next/image";
import Link from "next/link";

import { getScopedI18n } from "@/locales/server";

export default async function Header() {
	const scopedT = await getScopedI18n("HomePage");

	return (
		<header className="mb-4 w-full bg-white shadow-sm">
			<div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-6 sm:flex-row sm:justify-between sm:py-8">
				<div className="flex flex-col items-center sm:flex-row sm:gap-4">
					<Image
						src="/logo.png"
						alt="Logo"
						width={64}
						height={64}
						className="rounded-full border border-gray-200 shadow-md"
					/>
					<h1 className="mt-4 text-2xl font-bold text-gray-800 sm:mt-0 sm:text-3xl">
						{scopedT("Title")}
					</h1>
				</div>

				<nav className="mt-6 flex flex-col items-center gap-2 sm:mt-0 sm:flex-row sm:gap-6">
					<Link href="/" className="text-gray-700 hover:text-blue-600">
						{scopedT("Title")}
					</Link>
					<Link href="/multi" className="text-gray-700 hover:text-blue-600">
						{scopedT("Test Multingual")}
					</Link>
					<Link href="/live" className="text-gray-700 hover:text-blue-600">
						{scopedT("Live Translator")}
					</Link>
					<Link href="/mykey" className="text-gray-700 hover:text-blue-600">
						{scopedT("Test Your Own Key")}
					</Link>
				</nav>
			</div>

			<div className="mx-auto max-w-4xl px-4 text-center">
				<p className="text-sm text-gray-600 sm:text-base">
					{scopedT("Read the")}{" "}
					<Link
						href="https://github.com/gabriel-logan/Azure-translator-code/blob/main/README.md"
						target="_blank"
						className="text-blue-500 hover:underline"
					>
						README.md
					</Link>{" "}
					{scopedT("to know how to use the library in your JS/TS project")}
				</p>

				<div className="mt-4 flex justify-center">
					<iframe
						src="https://github.com/sponsors/gabriel-logan/button"
						title="Sponsor gabriel-logan"
						height="32"
						width="114"
						style={{ border: 0, borderRadius: 6 }}
					/>
				</div>
			</div>
		</header>
	);
}
