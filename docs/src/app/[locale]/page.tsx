import FormTransUnicJson from "@/components/FormTransUnicJson";
import { getScopedI18n } from "@/locales/server";

export default async function Home() {
	const scopedT = await getScopedI18n("HomePage");

	return (
		<main className="mx-auto w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12">
			<div className="m-auto w-full rounded-xl bg-white p-2 shadow-md sm:p-8 xl:max-w-[1780px]">
				<h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
					{scopedT("Test the translator")}
				</h2>
				<FormTransUnicJson />
			</div>
		</main>
	);
}
