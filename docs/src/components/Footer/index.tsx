import Link from "next/link";

import { getScopedI18n } from "@/locales/server";

export default async function Footer() {
	const scopedT = await getScopedI18n("HomeLayout");

	return (
		<footer>
			<p className="p-1 text-center text-gray-600">
				{scopedT("Created by")}{" "}
				<Link
					className="text-blue-500 hover:underline"
					href="https://github.com/gabriel-logan"
					target="_blank"
				>
					Gabriel Logan &copy; 2024
				</Link>
			</p>
		</footer>
	);
}
