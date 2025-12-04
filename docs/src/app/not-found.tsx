import Link from "next/link";
import { FaHome, FaGithub } from "react-icons/fa";

import { getScopedI18n } from "@/locales/server";

export const dynamic = "force-dynamic";

export default async function NotFound() {
	const scopedT = await getScopedI18n("NotFoundPage");
	return (
		// eslint-disable-next-line prettier/prettier
		<html>
			{" "}
			{/* nosonar */}
			<body className="bg-gradient-to-b from-slate-50 to-white">
				<main className="flex min-h-screen items-center justify-center px-4 py-12">
					<div className="w-full max-w-md text-center">
						<div className="card p-8">
							<div className="mb-6 text-6xl">😔</div>
							<h1 className="gradient-text text-4xl font-bold">
								{scopedT("Title")}
							</h1>
							<p className="mt-4 text-slate-600">{scopedT("Description")}</p>
							<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
								<Link
									className="btn-primary inline-flex items-center gap-2"
									href="/"
								>
									<FaHome className="h-4 w-4" />
									{scopedT("Back")}
								</Link>
								<Link
									className="btn-secondary inline-flex items-center gap-2"
									href="https://github.com/gabriel-logan/Azure-translator-code"
									target="_blank"
								>
									<FaGithub className="h-4 w-4" />
									{scopedT("Go to GitHub")}
								</Link>
							</div>
						</div>

						<div className="mt-8">
							<iframe
								src="https://github.com/sponsors/gabriel-logan/card"
								title="Sponsor gabriel-logan"
								height="225"
								width="100%"
								className="max-w-[400px] rounded-lg"
								style={{
									border: 0,
									margin: "auto",
								}}
							/>
						</div>
					</div>
				</main>
			</body>
		</html>
	);
}
