import Link from "next/link";

import FormTransLiveText from "@/components/FormTransLiveText";
import { getScopedI18n } from "@/locales/server";
import { LocaleParams } from "@/types/params";

export default async function LiveTranslator({
	params: { locale },
}: Readonly<LocaleParams>) {
	const scopedT = await getScopedI18n("HomePage");
	return (
		<main className="flex min-h-screen flex-col bg-gray-100 p-2 sm:p-6 md:p-10">
			<div className="">
				<FormTransLiveText locale={locale} />
			</div>
			<div className="mt-4 flex justify-center">
				<Link className="text-blue-500 hover:underline" href="/">
					{scopedT("Back")}
				</Link>
			</div>
		</main>
	);
}
