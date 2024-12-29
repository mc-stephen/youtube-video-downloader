"use client";

import Link from "next/link";
import styles from "./header.module.css";
import Routes from "@/utils/services/route";

export default function Header() {
  const nav: Record<string, string>[] = [
    {
      label: "Donate",
      path: Routes.donate,
    },
    {
      label: "About Us",
      path: Routes.about_us,
    },
    {
      label: "Extensions",
      path: Routes.extension,
    },
    {
      label: "More Tools",
      path: Routes.more_tools,
    },
    {
      label: "Special Thanks",
      path: Routes.special_thanks,
    },
  ];

  return (
    <header>
      <div className={styles.logo}>
        <Link href="/" className={styles.link}>
          <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
        </Link>
      </div>
      <ul className={styles.other}>
        {nav.map((val, i) => {
          return (
            <li key={i}>
              <Link href={val.path} className={styles.link}>
                {val.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
