import Link from "next/link";
import Image from "next/image";


export default function Navbar() {
    return (
        <nav className="flex w-full items-center bg-black px-8 py-4">
            <Link href="/" className="logo">
            <Image src="/logo.svg" alt="logo" width={64} height={64} />
            </Link>
            <ul className="flex items-center gap-x-2">
                <NavbarItem href="/">Home</NavbarItem>
                <NavbarItem href="/projects">Projects</NavbarItem>
                <NavbarItem href="/resume">Resume</NavbarItem>
                <NavbarItem href="/contact">Contact</NavbarItem>
                <NavbarItem href="/interests">Stuff I Like</NavbarItem>
            </ul>
        </nav>
    )
}

function NavbarItem({href,children}: {href: string, children: React.ReactNode}) {
    return(
        <li className="rounded px-4 py-2 text-lg font-medium text-white transition-all hover:bg-white/10">
            <Link href={href}>
            {children}
            </Link>
        </li>
    );
}

