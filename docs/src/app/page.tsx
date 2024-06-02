import Link from "next/link";

import Form from "@/components/Form";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center bg-gray-100 p-2 sm:p-6 md:p-10">
			<h1 className="mb-4 text-3xl font-bold text-gray-700">
				Azure translator code
			</h1>
			<p className="mb-4 text-center text-gray-600">
				Read the{" "}
				<Link
					className="mb-10 text-blue-500 hover:underline"
					href={
						"https://github.com/gabriel-logan/Azure-translator-code/blob/main/README.md"
					}
					target="_blank"
				>
					README.md{" "}
				</Link>
				to know how to use the library in your JS/TS project{" "}
			</p>
			<p>
				<iframe
					src="https://github.com/sponsors/gabriel-logan/button"
					title="Sponsor gabriel-logan"
					height="32"
					width="114"
					style={{ border: 0, borderRadius: 6 }}
				/>
			</p>
			<div className="mx-auto mt-5 w-full max-w-2xl rounded bg-white p-5 shadow">
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
