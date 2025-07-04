"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {

    const pathname = usePathname();

    return (
        <nav className="hidden md:flex relative justify-center mt-10" style={{backgroundColor: "var(--background)"}}>

            <ul className="flex">
                <NavbarItem href="/" activeLink={pathname}>Home</NavbarItem>
                <NavbarItem href="/projects" activeLink={pathname}>Projects</NavbarItem>
                <NavbarItem href="/interests" activeLink={pathname}>Stuff I Like</NavbarItem>
                <NavbarItem href="/resume" activeLink={pathname}>Resume</NavbarItem>
                <NavbarItem href="/treys-world" activeLink={pathname}>Trey's World</NavbarItem>
            </ul>
        </nav>
    )
}

type NavbarItemProps = {
    href: string;
    children: React.ReactNode;
    activeLink: string;
};

function NavbarItem({href, children, activeLink}: NavbarItemProps ) {

    const isActive = (activeLink === href);

    return(
        <li className={`px-5 content-end-safe text-2xl duration-1500 ${isActive ? 'rotate-540' : 'hover:scale-110'}`}>
            <Link href={href}>
                {children}
            </Link>
        </li>
    );
}