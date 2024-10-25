import Link from "next/link";

import { getScopedI18n } from "@/locales/server";

export const dynamic = "force-dynamic";

export default async function NotFound() {
	const scopedT = await getScopedI18n("NotFoundPage");
	return (
		// eslint-disable-next-line prettier/prettier
		<html> {/* nosonar */}
			<body>
				<main className="min-h-screen">
					<div className="mx-auto mt-32 max-w-md rounded bg-white p-5 text-center shadow-md">
						<h1 className="text-3xl text-red-500">{scopedT("Title")}</h1>
						<p className="mt-5 text-lg text-black">{scopedT("Description")}</p>
						<div className="mt-5">
							<Link
								className="mx-2 inline-block rounded bg-blue-500 px-5 py-2 text-white transition-colors duration-300 hover:bg-blue-700"
								href="/"
							>
								{scopedT("Back")}
							</Link>
							<Link
								className="mx-2 inline-block rounded bg-blue-500 px-5 py-2 text-white transition-colors duration-300 hover:bg-blue-700"
								href="/"
							>
								{scopedT("Go to GitHub")}
							</Link>
						</div>
					</div>
					<div className="mt-4">
						<iframe
							src="https://github.com/sponsors/gabriel-logan/card"
							title="Sponsor gabriel-logan"
							height="225"
							width="600"
							style={{
								border: 0,
								borderRadius: 4,
								alignSelf: "center",
								margin: "auto",
							}}
						></iframe>
					</div>
				</main>
			</body>
		</html>
	);
}
