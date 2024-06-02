import Link from "next/link";

import Form from "@/components/Form";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-2 sm:p-6 md:p-10">
			<h1 className="mb-4 text-3xl font-bold text-gray-700">In comming ...</h1>
			<Link
				className="mb-10 text-blue-500 hover:underline"
				href={
					"https://github.com/gabriel-logan/Azure-translator-code/blob/main/README.md"
				}
			>
				For now read the README.md
			</Link>
			<div className="mx-auto mt-5 w-full max-w-md rounded bg-white p-5 shadow">
				<h2 className="mb-5 text-2xl font-bold text-black">
					Test the translator
				</h2>
				<div>
					<Form />
				</div>
			</div>
		</main>
	);
}
