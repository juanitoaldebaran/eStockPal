"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface NavLink {
    key: number,
    name: string;
    pathname: string;
}

const navLinks: NavLink[] = [
    {
        key: 1,
        name: "Market",
        pathname: "/market",
    },
    {
        key: 2,
        name: "Community",
        pathname: "/community",
    }
];


export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="fixed top-0 z-50 w-full backdrop-blur-md bg-black/90">
            <div className="flex items-center justify-between gap-3 p-4">
                <Link href={"/"} className="text-white text-xl">eStockPal</Link>
                    <div>
                        <ul className="flex items-center gap-4">
                            {navLinks.map((nav) => (
                                <li key={nav.key}>
                                    <Link
                                    href={nav.pathname}
                                    className={`border-transparent border-b ${pathname === nav.pathname ? "border-white" :  "hover:border-white"} text-white transition-all duration-200`}
                                    >
                                        <span className="text-white">{nav.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
            </div>
        </div>
    )
}