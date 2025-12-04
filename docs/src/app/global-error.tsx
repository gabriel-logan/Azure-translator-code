"use client";

export default function GlobalError({
	reset,
}: Readonly<{
	reset: () => void;
}>) {
	return (
		<html>
			<body className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white">
				<div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
					<div className="mb-4 text-5xl">⚠️</div>
					<h2 className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent">
						Something went wrong!
					</h2>
					<p className="mt-3 text-slate-600">
						An unexpected error occurred. Please try again.
					</p>
					<button
						onClick={reset}
						className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
					>
						Try again
					</button>
				</div>
			</body>
		</html>
	);
}
