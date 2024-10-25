import FormTransUnicJson from "@/components/FormTransUnicJson";
import { getScopedI18n } from "@/locales/server";

export default async function Home() {
	const scopedT = await getScopedI18n("HomePage");
	return (
		<main className="flex min-h-screen flex-col items-center bg-gray-100 p-2 sm:p-6 md:p-10 md:pt-0">
			<div className="relative mx-auto w-full max-w-[1768px] rounded bg-white p-5 shadow">
				<h2 className="mb-5 text-2xl font-bold text-black">
					{scopedT("Test the translator")}
				</h2>
				<FormTransUnicJson />
			</div>
		</main>
	);
}
