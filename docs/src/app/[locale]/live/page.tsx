import Link from "next/link";

import FormTransLiveText from "@/components/FormTransLiveText";
import { getScopedI18n } from "@/locales/server";
import { LocaleParams } from "@/types/params";

export default async function LiveTranslator({
	params: { locale },
}: Readonly<LocaleParams>) {
	const scopedT = await getScopedI18n("HomePage");

	return (
		<main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-12">
			<div className="rounded-xl bg-white p-6 shadow-md sm:p-10">
				<h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
					{scopedT("Live Translator")}
				</h2>
				<FormTransLiveText locale={locale} />

				<div className="mt-6 text-center">
					<Link href="/" className="text-blue-600 hover:underline">
						{scopedT("Back")}
					</Link>
				</div>
			</div>
		</main>
	);
}
