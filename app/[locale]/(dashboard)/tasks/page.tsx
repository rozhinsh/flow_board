import { notFound } from "next/navigation";
import { TaskList, type Task } from "@/features/tasks/task-list";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function TasksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const t = getDictionary(locale);
  const tasks: Task[] = [
    {
      id: "finalize-homepage",
      title: t.finalizeHomepageTask,
      project: t.websiteRedesign,
      assignee: "Rozhin",
      status: "in-progress",
      priority: "high",
      dueDate: t.finalizeHomepageDueDate,
    },
    {
      id: "prepare-mobile-scope",
      title: t.prepareMobileScopeTask,
      project: t.mobileApp,
      assignee: "Nima",
      status: "todo",
      priority: "high",
      dueDate: t.prepareMobileScopeDueDate,
    },
    {
      id: "document-button-states",
      title: t.documentButtonStatesTask,
      project: t.designSystem,
      assignee: "Sara",
      status: "review",
      priority: "medium",
      dueDate: t.documentButtonStatesDueDate,
    },
    {
      id: "close-access-findings",
      title: t.closeAccessFindingsTask,
      project: t.securityAudit,
      assignee: "Arman",
      status: "completed",
      priority: "medium",
      dueDate: t.closeAccessFindingsDueDate,
    },
    {
      id: "audit-mobile-empty-states",
      title: t.auditMobileEmptyStatesTask,
      project: t.mobileApp,
      assignee: "Rozhin",
      status: "todo",
      priority: "low",
      dueDate: t.auditMobileEmptyStatesDueDate,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <section>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t.tasksHeading}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">{t.tasksIntro}</p>
      </section>

      <TaskList
        tasks={tasks}
        labels={{
          searchLabel: t.taskSearchLabel,
          searchPlaceholder: t.taskSearchPlaceholder,
          statusLabel: t.taskStatusLabel,
          priorityLabel: t.taskPriorityLabel,
          allStatuses: t.allTaskStatuses,
          allPriorities: t.allTaskPriorities,
          statusNames: {
            todo: t.toDo,
            "in-progress": t.inProgress,
            review: t.review,
            completed: t.completedStatus,
          },
          priorityNames: {
            high: t.highPriority,
            medium: t.mediumPriority,
            low: t.lowPriority,
          },
          project: t.projectLabel,
          assignee: t.assigneeLabel,
          due: t.dueLabel,
          results: t.taskResults,
          noResults: t.noTasksFound,
          noResultsDescription: t.noTasksFoundDescription,
          clearFilters: t.clearFilters,
        }}
      />
    </div>
  );
}
