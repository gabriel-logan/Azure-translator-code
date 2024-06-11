import Image from "next/image";
import Link from "next/link";

import { getScopedI18n } from "@/locales/server";

export default async function Header() {
	const scopedT = await getScopedI18n("HomePage");

	return (
		<header className="flex flex-col items-center bg-gray-100 p-2 sm:p-6 md:p-10">
			<div className="mb-2">
				<Image
					src={"/logo.png"}
					alt="logo"
					width={64}
					height={64}
					className="rounded-full"
				/>
			</div>
			<h1 className="mb-4 text-3xl font-bold text-gray-700">
				{scopedT("Title")}
			</h1>
			<p className="mb-4 text-center text-gray-600">
				{scopedT("Read the")}{" "}
				<Link
					className="mb-10 text-blue-500 hover:underline"
					href={
						"https://github.com/gabriel-logan/Azure-translator-code/blob/main/README.md"
					}
					target="_blank"
				>
					README.md{" "}
				</Link>
				{scopedT("to know how to use the library in your JS/TS project")}{" "}
			</p>
			<p>
				<iframe
					src="https://github.com/sponsors/gabriel-logan/button"
					title="Sponsor gabriel-logan"
					height="32"
					width="114"
					style={{ border: 0, borderRadius: 6 }}
				/>
			</p>
		</header>
	);
}
