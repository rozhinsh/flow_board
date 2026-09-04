"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationItem = {
  label: string;
  href: string;
};

type NavLinksProps = {
  items: NavigationItem[];
};

export function NavLinks({ items }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1" aria-label="Primary navigation">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-slate-100 text-slate-950 dark:bg-slate-900 dark:text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
