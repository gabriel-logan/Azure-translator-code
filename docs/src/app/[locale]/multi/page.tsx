import Link from "next/link";

import FormTransMultiText from "@/components/FormTransMultiText";
import { getScopedI18n } from "@/locales/server";

export default async function MultiLangPage() {
	const scopedT = await getScopedI18n("HomePage");

	return (
		<main className="flex min-h-screen flex-col items-center bg-gray-100 p-2 sm:p-6 md:p-10">
			<div className="relative mx-auto mt-5 w-full max-w-2xl rounded bg-white p-5 shadow">
				<Link
					className="absolute right-5 text-black hover:text-blue-500 hover:underline"
					href="/"
				>
					Back
				</Link>
				<h2 className="mb-5 text-2xl font-bold text-black">
					{scopedT("Test the translator")}
				</h2>
				<div>
					<FormTransMultiText />
				</div>
			</div>
		</main>
	);
}
