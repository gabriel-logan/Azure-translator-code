import Link from "next/link";

import { getScopedI18n } from "@/locales/server";

export default async function Footer() {
	const scopedT = await getScopedI18n("HomeLayout");

	return (
		<footer className="mt-12 w-full bg-gray-100 py-6">
			<div className="mx-auto max-w-4xl px-4 text-center text-sm text-gray-600">
				<p>
					{scopedT("Created by")}{" "}
					<Link
						href="https://github.com/gabriel-logan"
						target="_blank"
						className="font-medium text-blue-600 hover:underline"
					>
						Gabriel Logan &copy; 2024
					</Link>
				</p>
			</div>
		</footer>
	);
}
