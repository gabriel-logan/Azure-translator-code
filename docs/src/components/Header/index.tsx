import Image from "next/image";
import Link from "next/link";

import { getScopedI18n } from "@/locales/server";

export default async function Header() {
	const scopedT = await getScopedI18n("HomePage");

	const navItems = [
		{ href: "/", label: scopedT("Title") },
		{ href: "/multi", label: scopedT("Test Multingual") },
		{ href: "/live", label: scopedT("Live Translator") },
		{ href: "/mykey", label: scopedT("Test Your Own Key") },
	];

	return (
		<header className="w-full bg-white shadow-sm">
			<div className="mx-auto max-w-6xl px-4 py-6 sm:flex sm:items-center sm:justify-between sm:py-8">
				<div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
					<Link href="/" className="flex items-center gap-3">
						<Image
							src="/logo.png"
							alt="Gabriel Logan Translator Logo"
							width={56}
							height={56}
							className="rounded-full border border-gray-200 shadow"
						/>
						<h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
							{scopedT("Title")}
						</h1>
					</Link>
				</div>

				<nav
					aria-label="Main navigation"
					className="mt-6 flex flex-col items-center gap-3 sm:mt-0 sm:flex-row sm:gap-6"
				>
					{navItems.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							className="text-gray-700 transition-colors hover:text-blue-600"
						>
							{label}
						</Link>
					))}
				</nav>
			</div>

			<div className="mx-auto max-w-4xl px-4 pb-6 text-center">
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
