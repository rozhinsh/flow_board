import Link from "next/link";
import { NavLinks } from "@/components/layout/nav-links";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type SidebarProps = { locale: Locale };

export function Sidebar({ locale }: SidebarProps) {
  const t = getDictionary(locale);
  const navigationItems = [
    { label: t.dashboard, href: `/${locale}/dashboard` },
    { label: t.projects, href: `/${locale}/projects` },
    { label: t.tasks, href: `/${locale}/tasks` },
  ];

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-e border-slate-200 bg-white px-4 py-6 md:flex md:flex-col dark:border-slate-800 dark:bg-slate-950">
      <Link href={`/${locale}/dashboard`} className="mb-8 flex items-center gap-3 px-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white dark:bg-white dark:text-slate-900">FB</span>
        <div>
          <p className="font-semibold text-slate-950 dark:text-white">{t.appName}</p>
          <p className="text-xs text-slate-500">{t.workspace}</p>
        </div>
      </Link>

      <NavLinks items={navigationItems} />

      <div className="mt-auto rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
        <p className="text-sm font-medium text-slate-900 dark:text-white">{t.personalWorkspace}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{t.workspaceDescription}</p>
      </div>
    </aside>
  );
}
