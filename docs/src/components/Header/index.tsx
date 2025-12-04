import Image from "next/image";
import Link from "next/link";
import { FaHome, FaLanguage, FaRobot, FaKey, FaReadme } from "react-icons/fa";

import { getScopedI18n } from "@/locales/server";

import NavItems from "./NavItems";

export default async function Header() {
	const scopedT = await getScopedI18n("HomePage");

	const navItems = [
		{ href: "/", label: scopedT("Home"), icon: <FaHome size={16} /> },
		{
			href: "/multi",
			label: scopedT("Test Multingual"),
			icon: <FaLanguage size={16} />,
		},
		{
			href: "/live",
			label: scopedT("Live Translator"),
			icon: <FaRobot size={16} />,
		},
		{
			href: "/mykey",
			label: scopedT("Test Your Own Key"),
			icon: <FaKey size={16} />,
		},
	];

	return (
		<header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-lg">
			<div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
					<Link
						href="/"
						className="group flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02]"
					>
						<div className="relative">
							<div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 opacity-20 blur-sm transition-opacity group-hover:opacity-40" />
							<Image
								src="/logo.png"
								alt="Gabriel Logan Translator Logo"
								width={48}
								height={48}
								className="relative rounded-full border-2 border-white shadow-soft"
							/>
						</div>
						<h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
							{scopedT("Title")}
						</h1>
					</Link>

					<nav
						aria-label="Main navigation"
						className="flex flex-wrap items-center justify-center gap-2"
					>
						<NavItems navItems={navItems} />
					</nav>
				</div>
			</div>

			<div className="border-t border-slate-100 bg-gradient-to-r from-blue-50/50 to-violet-50/50">
				<div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
					<div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
						<div className="flex items-center gap-2 rounded-lg border border-blue-200/80 bg-blue-50/80 px-4 py-2.5 text-sm text-blue-800 shadow-sm">
							<span className="text-lg">📘</span>
							<span>{scopedT("Read the")}</span>
							<Link
								href="https://github.com/gabriel-logan/Azure-translator-code/blob/main/README.md"
								target="_blank"
								className="inline-flex items-center gap-1 font-semibold text-blue-700 underline-offset-2 transition-colors hover:text-blue-900 hover:underline"
							>
								<FaReadme size={14} />
								README.md
							</Link>
							<span className="hidden sm:inline">
								{scopedT(
									"to know how to use the library in your JS/TS project",
								)}
							</span>
						</div>

						<iframe
							src="https://github.com/sponsors/gabriel-logan/button"
							title="Sponsor gabriel-logan"
							height="32"
							width="114"
							className="rounded-md"
							style={{ border: 0 }}
						/>
					</div>
				</div>
			</div>
		</header>
	);
}
