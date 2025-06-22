"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="relative flex w-full items-center justify-between md:justify-start bg-black px-8 py-4">
            <Link href="/" className="logo z-50">
                <Image src="/logo.svg" alt="logo" width={64} height={64} />
            </Link>

            <ul className="hidden items-center gap-x-2 md:flex">
                <NavbarItem href="/">Home</NavbarItem>
                <NavbarItem href="/Projects">Projects</NavbarItem>
                <NavbarItem href="/Resume">Resume</NavbarItem>
                <NavbarItem href="/Contact">Contact</NavbarItem>
                <NavbarItem href="/Interests">Stuff I Like</NavbarItem>
            </ul>

            {/* This configures the mobile navbar */}
            <button
                className="z-50 md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? (
                    <svg
                        className="h-8 w-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    <svg
                        className="h-8 w-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                )}
            </button>


            {isOpen && (
                <div className="absolute inset-0 top-0 z-40 flex h-screen w-full flex-col items-center justify-center bg-black md:hidden">
                    <ul className="flex flex-col items-center gap-y-8">
                        <NavbarItem href="/">Home</NavbarItem>
                        <NavbarItem href="/Projects">Projects</NavbarItem>
                        <NavbarItem href="/Resume">Resume</NavbarItem>
                        <NavbarItem href="/Contact">Contact</NavbarItem>
                        <NavbarItem href="/Interests">Stuff I Like</NavbarItem>
                    </ul>
                </div>
            )}
        </nav>
    )
}

function NavbarItem({href,children}: {href: string, children: React.ReactNode}) {
    return(
        <li className="rounded px-4 py-2 text-2xl font-medium text-white transition-all hover:bg-white/10 md:text-lg">
            <Link href={href}>
            {children}
            </Link>
        </li>
    );
}

