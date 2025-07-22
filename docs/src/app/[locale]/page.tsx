import FormTransUnicJson from "@/components/FormTransUnicJson";
import { getScopedI18n } from "@/locales/server";

export default async function Home() {
	const scopedT = await getScopedI18n("HomePage");

	return (
		<main className="mx-auto w-full px-4 py-12">
			<div className="rounded-xl bg-white p-6 shadow-md sm:p-10">
				<h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
					{scopedT("Test the translator")}
				</h2>
				<FormTransUnicJson />
			</div>
		</main>
	);
}
