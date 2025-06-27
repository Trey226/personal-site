"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {

    const [activeLink, setActiveLink] = useState('');

    return (
        <nav className="hidden md:flex relative justify-center py-5" style={{backgroundColor: "var(--background)"}}>

            <ul className="flex">
                <NavbarItem href="/" activeLink={activeLink} setActiveLink={setActiveLink}>Home</NavbarItem>
                <NavbarItem href="/projects" activeLink={activeLink} setActiveLink={setActiveLink}>Projects</NavbarItem>
                <NavbarItem href="/interests" activeLink={activeLink} setActiveLink={setActiveLink}>Stuff I Like</NavbarItem>
                <NavbarItem href="/resume" activeLink={activeLink} setActiveLink={setActiveLink}>Resume</NavbarItem>
            </ul>
        </nav>
    )
}

type NavbarItemProps = {
    href: string;
    children: React.ReactNode;
    activeLink: string;
    setActiveLink: (href: string) => void;
  };

function NavbarItem({href, children, activeLink, setActiveLink}: NavbarItemProps ) {

    const isActive = (activeLink === href);

    return(
        <li className={`px-5 py-5 text-2xl ${isActive ? 'rotate-540 duration-1500' : ''}`}>
            <Link href={href} onClick={() => setActiveLink(href)}>
                {children}
            </Link>
        </li>
    );
}