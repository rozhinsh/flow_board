import Link from "next/link";

const navigationItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Tasks", href: "/tasks" },
];

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white px-4 py-6 md:flex md:flex-col dark:border-slate-800 dark:bg-slate-950">
      <Link href="/dashboard" className="mb-8 flex items-center gap-3 px-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white dark:bg-white dark:text-slate-900">
          FB
        </span>
        <div>
          <p className="font-semibold text-slate-950 dark:text-white">FlowBoard</p>
          <p className="text-xs text-slate-500">Project workspace</p>
        </div>
      </Link>

      <nav className="space-y-1">
        {navigationItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              index === 0
                ? "bg-slate-100 text-slate-950 dark:bg-slate-900 dark:text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
        <p className="text-sm font-medium text-slate-900 dark:text-white">Personal workspace</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Manage projects, tasks and team progress from one place.
        </p>
      </div>
    </aside>
  );
}
