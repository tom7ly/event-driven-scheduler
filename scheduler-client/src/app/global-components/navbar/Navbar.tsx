"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }: any) => {
  const pathname = usePathname();
  const className =
    pathname === href ? `${styles.link} ${styles.selected}` : styles.link;
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};

export default function Navbar() {
  return (
    <nav>
      <NavLink href="/dashboard">Dashboard</NavLink>
      <NavLink href="/events">Events</NavLink>
      <NavLink href="/reminders">Reminders</NavLink>
    </nav>
  );
}
