import Link from "next/link";

import FormTransMultiText from "@/components/FormTransMultiText";
import { getScopedI18n } from "@/locales/server";
import { LocaleParams } from "@/types/params";

export default async function MultiLangPage({
	params: { locale },
}: Readonly<LocaleParams>) {
	const scopedT = await getScopedI18n("HomePage");

	return (
		<main className="mx-auto w-full max-w-7xl py-12">
			<div className="relative rounded-xl bg-white p-6 shadow-md sm:p-10">
				<Link
					href="/"
					className="absolute right-6 top-6 text-sm text-blue-600 hover:underline"
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
