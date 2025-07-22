import Link from "next/link";

import FormTransMultiText from "@/components/FormTransMultiText";
import { getScopedI18n } from "@/locales/server";
import { LocaleParams } from "@/types/params";

export default async function MultiLangPage({
	params: { locale },
}: Readonly<LocaleParams>) {
	const scopedT = await getScopedI18n("HomePage");

	return (
		<main className="mx-auto w-full max-w-7xl bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12">
			<div className="relative rounded-xl bg-white p-6 shadow-md sm:p-10">
				<Link
					href="/"
					className="absolute right-6 top-6 rounded-lg bg-white px-3 py-1 text-sm text-blue-600 shadow-sm transition-colors hover:bg-blue-500 hover:text-white"
				>
					{scopedT("Back")}
				</Link>
				<h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
					{scopedT("Test the translator")}
				</h2>
				<FormTransMultiText locale={locale} />
			</div>
		</main>
	);
}
