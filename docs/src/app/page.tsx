import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center p-24">
			<h1 className="mb-4 text-lg">In comming ...</h1>
			<Link
				className="text-blue-500 hover:underline"
				href={
					"https://github.com/gabriel-logan/Azure-translator-code/blob/main/README.md"
				}
			>
				For now read the README.md
			</Link>
		</main>
	);
}
