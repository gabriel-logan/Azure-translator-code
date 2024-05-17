import Link from "next/link";

export default function NotFound() {
	return (
		<main className="min-h-screen">
			<div className="mx-auto mt-32 max-w-md rounded bg-white p-5 text-center shadow-md">
				<h1 className="text-3xl text-red-500">404 - Page not found</h1>
				<p className="mt-5 text-lg text-black">
					The page you are looking for does not exist. 😩😩😩
				</p>
				<div className="mt-5">
					<Link
						className="mx-2 inline-block rounded bg-blue-500 px-5 py-2 text-white transition-colors duration-300 hover:bg-blue-700"
						href="https://gabriel-logan.github.io/Azure-translator-code/"
					>
						Back
					</Link>
					<Link
						className="mx-2 inline-block rounded bg-blue-500 px-5 py-2 text-white transition-colors duration-300 hover:bg-blue-700"
						href="https://github.com/gabriel-logan/Azure-translator-code"
					>
						Go to GitHub
					</Link>
				</div>
			</div>
		</main>
	);
}
