const summaryCards = [
  { label: "Active projects", value: "4", helper: "2 due this week" },
  { label: "Open tasks", value: "18", helper: "6 high priority" },
  { label: "Completed", value: "32", helper: "This month" },
];

const recentProjects = [
  { name: "Website redesign", progress: 72, status: "In progress" },
  { name: "Mobile app", progress: 48, status: "In progress" },
  { name: "Design system", progress: 91, status: "Review" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      <section>
        <p className="text-sm text-slate-500 dark:text-slate-400">Friday, September 4</p>
        <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Welcome back, Rozhin</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Here is a quick overview of your workspace.
            </p>
          </div>
          <button
            type="button"
            className="mt-3 w-fit rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 sm:mt-0 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            New project
          </button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
            <p className="mt-4 text-3xl font-semibold tracking-tight">{card.value}</p>
            <p className="mt-2 text-xs text-slate-400">{card.helper}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Recent projects</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Track the progress of your active work.</p>
          </div>
          <button type="button" className="text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
            View all
          </button>
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
