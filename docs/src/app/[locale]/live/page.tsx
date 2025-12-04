import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

import FormTransLiveText from "@/components/FormTransLiveText";
import { getScopedI18n } from "@/locales/server";
import { LocaleParams } from "@/types/params";

export default async function LiveTranslator({
	params: { locale },
}: Readonly<LocaleParams>) {
	const scopedT = await getScopedI18n("HomePage");

	return (
		<main className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
					<Link href="/" className="btn-secondary order-2 sm:order-1">
						<FaArrowLeft className="mr-2 h-3.5 w-3.5" />
						{scopedT("Back")}
					</Link>

					<h2 className="section-title gradient-text order-1 text-center sm:order-2">
						{scopedT("Live Translator")}
					</h2>

					<div className="order-3 hidden w-[100px] sm:block" />
				</div>

				<div className="animate-fade-in">
					<FormTransLiveText locale={locale} />
				</div>
			</div>
		</main>
	);
}
