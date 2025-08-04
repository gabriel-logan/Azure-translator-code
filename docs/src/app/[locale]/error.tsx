"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
	return (
		<main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12">
			<div className="m-auto w-full rounded-xl bg-white p-2 shadow-md sm:p-8 xl:max-w-[1780px]">
				<h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
					Something went wrong
				</h2>
				<p className="text-center text-gray-600">
					An error occurred while trying to load the page. Please try again
					later.
				</p>
				<button
					onClick={() => reset()}
					className="mt-4 block w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
				>
					Try Again
				</button>
			</div>
		</main>
	);
}
