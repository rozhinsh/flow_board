"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
};

export function LanguageSwitcher({ locale, label }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const targetLocale: Locale = locale === "en" ? "fa" : "en";
  const segments = pathname.split("/");

  if (segments[1] === "en" || segments[1] === "fa") {
    segments[1] = targetLocale;
  }

  const targetPath = segments[1] === targetLocale ? segments.join("/") : `/${targetLocale}/dashboard`;

  return (
    <Link
      href={targetPath}
      className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
    >
      {label}
    </Link>
  );
}
