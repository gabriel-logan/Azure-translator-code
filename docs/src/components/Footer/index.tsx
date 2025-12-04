import Link from "next/link";
import { FaGithub, FaHeart } from "react-icons/fa";

import { getScopedI18n } from "@/locales/server";

export default async function Footer() {
	const scopedT = await getScopedI18n("HomeLayout");

	return (
		<footer className="mt-auto border-t border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100">
			<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
				<div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
					<div className="text-center sm:text-left">
						<p className="flex items-center justify-center gap-1.5 text-base font-semibold text-slate-900 sm:justify-start">
							{scopedT("Created by")}
							<span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
								Gabriel Logan
							</span>
							<FaHeart className="h-3.5 w-3.5 text-red-500" />
						</p>
						<p className="mt-1.5 text-sm text-slate-500">
							&copy; 2024 – {scopedT("All rights reserved")}
						</p>
						<p className="mt-2 max-w-md text-xs text-slate-400">
							{scopedT("Footer.Description")}
						</p>
					</div>

					<div className="flex items-center gap-4">
						<Link
							href="https://github.com/gabriel-logan/Azure-translator-code"
							target="_blank"
							className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
						>
							<FaGithub className="h-4 w-4" />
							View on GitHub
						</Link>
					</div>
				</div>
			</div>

			<div className="border-t border-slate-200 bg-white/50 px-4 py-4 text-center text-xs text-slate-500">
				{scopedT("Footer.Built with")}
			</div>
		</footer>
	);
}
