import Link from "next/link";
import { FaGithub } from "react-icons/fa";

import { getScopedI18n } from "@/locales/server";

export default async function Footer() {
	const scopedT = await getScopedI18n("HomeLayout");

	return (
		<footer className="mt-20 w-full bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 shadow-inner">
			<div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 sm:grid-cols-2">
				<div className="space-y-2 text-center sm:text-left">
					<p className="text-base font-semibold text-white">
						{scopedT("Created by")} Gabriel Logan
					</p>
					<p className="text-sm text-gray-400">
						&copy; 2024 – {scopedT("All rights reserved")}
					</p>
					<p className="text-xs text-gray-500">
						{scopedT("Footer.Description")}
					</p>
				</div>

				<div className="flex items-center justify-center sm:justify-end">
					<Link
						href="https://github.com/gabriel-logan"
						target="_blank"
						className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-600"
					>
						<FaGithub className="h-4 w-4" />
						GitHub
					</Link>
				</div>
			</div>

			<div className="border-t border-gray-700 px-6 py-4 text-center text-xs text-gray-500">
				{scopedT("Footer.Built with")}
			</div>
		</footer>
	);
}
