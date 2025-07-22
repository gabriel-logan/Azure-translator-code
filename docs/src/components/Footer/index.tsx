import Link from "next/link";

import { getScopedI18n } from "@/locales/server";

export default async function Footer() {
	const scopedT = await getScopedI18n("HomeLayout");

	return (
		<footer className="mt-12 w-full border-t border-gray-200 bg-gradient-to-r from-blue-50 via-white to-purple-50 py-6">
			<div className="mx-auto max-w-4xl px-4 text-center text-sm text-gray-600">
				<p>
					{scopedT("Created by")}{" "}
					<Link
						href="https://github.com/gabriel-logan"
						target="_blank"
						className="font-semibold text-blue-600 hover:underline"
					>
						Gabriel Logan &copy; 2024
					</Link>
				</p>
			</div>
		</footer>
	);
}
