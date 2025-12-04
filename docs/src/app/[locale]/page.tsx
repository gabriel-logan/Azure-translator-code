import FormTransUnicJson from "@/components/FormTransUnicJson";
import { getScopedI18n } from "@/locales/server";

export default async function Home() {
	const scopedT = await getScopedI18n("HomePage");

	return (
		<main className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8 text-center">
					<h2 className="section-title gradient-text inline-block">
						{scopedT("Test the translator")}
					</h2>
					<p className="mt-2 text-slate-500">
						Enter your JSON and select languages to translate
					</p>
				</div>

				<div className="animate-fade-in">
					<FormTransUnicJson />
				</div>
			</div>
		</main>
	);
}
