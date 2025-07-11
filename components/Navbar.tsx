"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {

    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Close mobile menu on route change
        setIsOpen(false);
    }, [pathname]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Cleanup function to restore scrolling
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);


    return (
        <>
            {/* Desktop Navbar */}
            <nav className="hidden md:flex relative justify-center mt-10" style={{ backgroundColor: "var(--background)" }}>
                <ul className="flex">
                    <NavbarItem href="/" activeLink={pathname}>Home</NavbarItem>
                    <NavbarItem href="/projects" activeLink={pathname}>Projects</NavbarItem>
                    <NavbarItem href="/interests" activeLink={pathname}>Stuff I Like</NavbarItem>
                    <NavbarItem href="/resumé" activeLink={pathname}>Resume</NavbarItem>
                    <NavbarItem href="/treys-world" activeLink={pathname}>Trey's World</NavbarItem>
                </ul>
            </nav>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="fixed top-4 right-4 z-50 p-2"
                    aria-label="Toggle navigation menu"
                >
                    <div className="space-y-2">
                        <span className={`block w-8 h-0.5 bg-current transition-transform duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-2.5" : ""}`}></span>
                        <span className={`block w-8 h-0.5 bg-current transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-0" : ""}`}></span>
                        <span className={`block w-8 h-0.5 bg-current transition-transform duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`}></span>
                    </div>
                </button>

                {/* Mobile Menu */}
                <div
                    className={`fixed inset-0 z-40 transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                    style={{ backgroundColor: "var(--background)" }}
                >
                    <nav className="h-full">
                        <ul className="flex flex-col items-center justify-center h-full space-y-10">
                            <MobileNavbarItem href="/">Home</MobileNavbarItem>
                            <MobileNavbarItem href="/projects">Projects</MobileNavbarItem>
                            <MobileNavbarItem href="/interests">Stuff I Like</MobileNavbarItem>
                            <MobileNavbarItem href="/resume">Resume</MobileNavbarItem>
                            <MobileNavbarItem href="/treys-world">Trey's World</MobileNavbarItem>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

type NavbarItemProps = {
    href: string;
    children: React.ReactNode;
    activeLink: string;
};

function NavbarItem({ href, children, activeLink }: NavbarItemProps) {

    const isActive = (activeLink === href);

    return (
        <li className={` px-5 content-end-safe text-2xl transition-transform duration-1000 ${isActive ? 'rotate-540' : ''}`}>
            <Link href={href}>
                {children}
            </Link>
        </li>
    );
}

type MobileNavbarItemProps = {
    href: string;
    children: React.ReactNode;
};

function MobileNavbarItem({ href, children }: MobileNavbarItemProps) {
    const pathname = usePathname();
    const isActive = (pathname === href);

    return (
        <li>
            <Link href={href} className={`text-4xl transition-colors duration-300 ${isActive ? 'text-[var(--primary)] font-bold' : 'text-[var(--secondary)]'}`}>
                {children}
            </Link>
        </li>
    );
}