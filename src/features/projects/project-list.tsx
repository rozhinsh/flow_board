"use client";

import { useId, useMemo, useState } from "react";

export type ProjectStatus = "in-progress" | "review" | "planning" | "completed";

export type Project = {
  id: string;
  name: string;
  description: string;
  owner: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
};

type ProjectListLabels = {
  searchLabel: string;
  searchPlaceholder: string;
  statusLabel: string;
  allStatuses: string;
  statusNames: Record<ProjectStatus, string>;
  owner: string;
  due: string;
  progress: string;
  noResults: string;
  noResultsDescription: string;
  clearFilters: string;
};

type ProjectListProps = {
  projects: Project[];
  labels: ProjectListLabels;
};

const statusStyles: Record<ProjectStatus, string> = {
  "in-progress": "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  review: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  planning: "bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300",
  completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
};

export function ProjectList({ projects, labels }: ProjectListProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");
  const searchId = useId();
  const statusId = useId();

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return projects.filter((project) => {
      const matchesStatus = status === "all" || project.status === status;
      const searchableText = `${project.name} ${project.description} ${project.owner}`.toLocaleLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [projects, query, status]);

  const hasFilters = query.trim().length > 0 || status !== "all";

  function clearFilters() {
    setQuery("");
    setStatus("all");
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[minmax(0,1fr)_220px] dark:border-slate-800 dark:bg-slate-900">
        <div>
          <label htmlFor={searchId} className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            {labels.searchLabel}
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-500 dark:focus:ring-slate-800"
          />
        </div>

        <div>
          <label htmlFor={statusId} className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            {labels.statusLabel}
          </label>
          <select
            id={statusId}
            value={status}
            onChange={(event) => setStatus(event.target.value as ProjectStatus | "all")}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-500 dark:focus:ring-slate-800"
          >
            <option value="all">{labels.allStatuses}</option>
            {(Object.entries(labels.statusNames) as [ProjectStatus, string][]).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {filteredProjects.map((project) => (
            <article key={project.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{project.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{project.description}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[project.status]}`}>
                  {labels.statusNames[project.status]}
                </span>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-sm dark:border-slate-800">
                <div>
                  <dt className="text-xs text-slate-400">{labels.owner}</dt>
                  <dd className="mt-1 font-medium text-slate-700 dark:text-slate-200">{project.owner}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">{labels.due}</dt>
                  <dd className="mt-1 font-medium text-slate-700 dark:text-slate-200">{project.dueDate}</dd>
                </div>
              </dl>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500 dark:text-slate-400">{labels.progress}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-200">{project.progress}%</span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                  role="progressbar"
                  aria-label={`${labels.progress}: ${project.name}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={project.progress}
                >
                  <div className="h-full rounded-full bg-slate-900 dark:bg-slate-200" style={{ width: `${project.progress}%` }} />
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">{labels.noResults}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">{labels.noResultsDescription}</p>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {labels.clearFilters}
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
