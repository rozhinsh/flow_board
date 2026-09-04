import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/config";

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);
  const summaryCards = [
    { label: t.activeProjects, value: "4", helper: t.activeProjectsHelper },
    { label: t.openTasks, value: "18", helper: t.openTasksHelper },
    { label: t.completed, value: "32", helper: t.completedHelper },
  ];
  const recentProjects = [
    { name: t.websiteRedesign, progress: 72, status: t.inProgress },
    { name: t.mobileApp, progress: 48, status: t.inProgress },
    { name: t.designSystem, progress: 91, status: t.review },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <section>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t.welcome}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t.overview}</p>
          </div>
          <button type="button" className="mt-3 w-fit rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 sm:mt-0 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">
            {t.newProject}
          </button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map((card) => (
          <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
            <p className="mt-4 text-3xl font-semibold tracking-tight">{card.value}</p>
            <p className="mt-2 text-xs text-slate-400">{card.helper}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">{t.recentProjects}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.recentProjectsDescription}</p>
          </div>
          <button type="button" className="text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">{t.viewAll}</button>
        </div>

        <div className="mt-6 divide-y divide-slate-100 dark:divide-slate-800">
          {recentProjects.map((project) => (
            <div key={project.name} className="grid gap-3 py-4 sm:grid-cols-[1fr_120px_2fr] sm:items-center">
              <div>
                <p className="text-sm font-medium">{project.name}</p>
                <p className="mt-1 text-xs text-slate-400">{project.status}</p>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{project.progress}%</p>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full rounded-full bg-slate-900 dark:bg-slate-200" style={{ width: `${project.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
