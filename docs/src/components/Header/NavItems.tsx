"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemsProps {
	navItems: {
		href: string;
		label: string;
		icon: JSX.Element;
	}[];
}

export default function NavItems({ navItems }: Readonly<NavItemsProps>) {
	const pathname = usePathname();

	return navItems.map(({ href, label, icon }) => {
		const isActive = pathname === href;
		const baseClasses =
			"flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200";
		const activeClasses =
			"bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/25";
		const inactiveClasses =
			"text-slate-600 hover:bg-slate-100 hover:text-slate-900";

		return (
			<Link
				key={href}
				href={href}
				className={`${baseClasses} ${
					isActive ? activeClasses : inactiveClasses
				}`}
			>
				{icon}
				<span className="hidden sm:inline">{label}</span>
			</Link>
		);
	});
}
