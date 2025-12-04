"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
	return (
		<main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4 py-12">
			<div className="card w-full max-w-md p-8 text-center">
				<div className="mb-4 text-5xl">⚠️</div>
				<h2 className="gradient-text text-2xl font-bold">
					Something went wrong
				</h2>
				<p className="mt-3 text-slate-600">
					An error occurred while trying to load the page. Please try again.
				</p>
				<button onClick={() => reset()} className="btn-primary mt-6 w-full">
					Try Again
				</button>
			</div>
		</main>
	);
}
