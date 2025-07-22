import Link from "next/link";

import FormTransLiveText from "@/components/FormTransLiveText";
import { getScopedI18n } from "@/locales/server";
import { LocaleParams } from "@/types/params";

export default async function LiveTranslator({
	params: { locale },
}: Readonly<LocaleParams>) {
	const scopedT = await getScopedI18n("HomePage");

	return (
		<main className="flex min-h-screen flex-col bg-gray-50 px-4 py-6 sm:px-6 lg:px-12">
			<h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
				{scopedT("Live Translator")}
			</h2>

			<div className="flex-1">
				<FormTransLiveText locale={locale} />
				<div className="mt-8 text-center">
					<Link href="/" className="text-blue-600 hover:underline">
						{scopedT("Back")}
					</Link>
				</div>
			</div>
		</main>
	);
}
