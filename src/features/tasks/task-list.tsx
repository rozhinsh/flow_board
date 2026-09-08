"use client";

import { useId, useMemo, useState } from "react";

export type TaskStatus = "todo" | "in-progress" | "review" | "completed";
export type TaskPriority = "high" | "medium" | "low";

export type Task = {
  id: string;
  title: string;
  project: string;
  assignee: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
};

type TaskListLabels = {
  searchLabel: string;
  searchPlaceholder: string;
  statusLabel: string;
  priorityLabel: string;
  allStatuses: string;
  allPriorities: string;
  statusNames: Record<TaskStatus, string>;
  priorityNames: Record<TaskPriority, string>;
  project: string;
  assignee: string;
  due: string;
  results: string;
  noResults: string;
  noResultsDescription: string;
  clearFilters: string;
};

type TaskListProps = {
  tasks: Task[];
  labels: TaskListLabels;
};

const statusStyles: Record<TaskStatus, string> = {
  todo: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  "in-progress": "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
  review: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
};

const priorityStyles: Record<TaskPriority, string> = {
  high: "text-rose-700 dark:text-rose-300",
  medium: "text-amber-700 dark:text-amber-300",
  low: "text-slate-500 dark:text-slate-400",
};

export function TaskList({ tasks, labels }: TaskListProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<TaskStatus | "all">("all");
  const [priority, setPriority] = useState<TaskPriority | "all">("all");
  const searchId = useId();
  const statusId = useId();
  const priorityId = useId();

  const filteredTasks = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return tasks.filter((task) => {
      const matchesStatus = status === "all" || task.status === status;
      const matchesPriority = priority === "all" || task.priority === priority;
      const searchableText = `${task.title} ${task.project} ${task.assignee}`.toLocaleLowerCase();
      const matchesQuery = normalizedQuery.length === 0 || searchableText.includes(normalizedQuery);

      return matchesStatus && matchesPriority && matchesQuery;
    });
  }, [priority, query, status, tasks]);

  const hasFilters = query.trim().length > 0 || status !== "all" || priority !== "all";

  function clearFilters() {
    setQuery("");
    setStatus("all");
    setPriority("all");
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[minmax(0,1fr)_190px_190px] dark:border-slate-800 dark:bg-slate-900">
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
            onChange={(event) => setStatus(event.target.value as TaskStatus | "all")}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-500 dark:focus:ring-slate-800"
          >
            <option value="all">{labels.allStatuses}</option>
            {(Object.entries(labels.statusNames) as [TaskStatus, string][]).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={priorityId} className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            {labels.priorityLabel}
          </label>
          <select
            id={priorityId}
            value={priority}
            onChange={(event) => setPriority(event.target.value as TaskPriority | "all")}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-slate-500 dark:focus:ring-slate-800"
          >
            <option value="all">{labels.allPriorities}</option>
            {(Object.entries(labels.priorityNames) as [TaskPriority, string][]).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
        {filteredTasks.length} {labels.results}
      </p>

      {filteredTasks.length > 0 ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {filteredTasks.map((task) => (
            <article key={task.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-slate-950 dark:text-white">{task.title}</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{task.project}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[task.status]}`}>
                  {labels.statusNames[task.status]}
                </span>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-sm sm:grid-cols-3 dark:border-slate-800">
                <div>
                  <dt className="text-xs text-slate-400">{labels.assignee}</dt>
                  <dd className="mt-1 font-medium text-slate-700 dark:text-slate-200">{task.assignee}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">{labels.priorityLabel}</dt>
                  <dd className={`mt-1 font-medium ${priorityStyles[task.priority]}`}>{labels.priorityNames[task.priority]}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-400">{labels.due}</dt>
                  <dd className="mt-1 font-medium text-slate-700 dark:text-slate-200">{task.dueDate}</dd>
                </div>
              </dl>
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
