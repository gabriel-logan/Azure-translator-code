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
			"flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all";
		const activeClasses = "bg-blue-600 text-white shadow";
		const inactiveClasses =
			"bg-white/70 text-gray-800 hover:bg-blue-500 hover:text-white shadow-sm";

		return (
			<Link
				key={href}
				href={href}
				className={`${baseClasses} ${
					isActive ? activeClasses : inactiveClasses
				}`}
			>
				{icon}
				{label}
			</Link>
		);
	});
}
