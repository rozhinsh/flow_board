import { CurrentSectionTitle } from "@/components/layout/current-section-title";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

type HeaderProps = { locale: Locale };

export function Header({ locale }: HeaderProps) {
  const t = getDictionary(locale);

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 dark:border-slate-800 dark:bg-slate-950">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">{t.workspace}</p>
        <h1 className="text-lg font-semibold text-slate-950 dark:text-white">
          <CurrentSectionTitle dashboard={t.dashboard} projects={t.projects} tasks={t.tasks} />
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSwitcher locale={locale} label={t.switchLanguage} />
        <button
          type="button"
          className="hidden rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 sm:block dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
        >
          {t.search}
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-white dark:text-slate-900"
          aria-label={t.openUserMenu}
        >
          RS
        </button>
      </div>
    </header>
  );
}
