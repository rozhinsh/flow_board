import { notFound } from "next/navigation";
import { ProjectList, type Project } from "@/features/projects/project-list";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const t = getDictionary(locale);
  const projects: Project[] = [
    {
      id: "website-redesign",
      name: t.websiteRedesign,
      description: t.websiteRedesignDescription,
      owner: "Rozhin",
      status: "in-progress",
      progress: 72,
      dueDate: t.websiteRedesignDueDate,
    },
    {
      id: "mobile-app",
      name: t.mobileApp,
      description: t.mobileAppDescription,
      owner: "Nima",
      status: "planning",
      progress: 24,
      dueDate: t.mobileAppDueDate,
    },
    {
      id: "design-system",
      name: t.designSystem,
      description: t.designSystemDescription,
      owner: "Sara",
      status: "review",
      progress: 91,
      dueDate: t.designSystemDueDate,
    },
    {
      id: "security-audit",
      name: t.securityAudit,
      description: t.securityAuditDescription,
      owner: "Arman",
      status: "completed",
      progress: 100,
      dueDate: t.securityAuditDueDate,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <section>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t.projectsHeading}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">{t.projectsIntro}</p>
      </section>

      <ProjectList
        projects={projects}
        labels={{
          searchLabel: t.projectSearchLabel,
          searchPlaceholder: t.projectSearchPlaceholder,
          statusLabel: t.projectStatusLabel,
          allStatuses: t.allStatuses,
          statusNames: {
            "in-progress": t.inProgress,
            review: t.review,
            planning: t.planning,
            completed: t.completedStatus,
          },
          owner: t.ownerLabel,
          due: t.dueLabel,
          progress: t.progressLabel,
          noResults: t.noProjectsFound,
          noResultsDescription: t.noProjectsFoundDescription,
          clearFilters: t.clearFilters,
        }}
      />
    </div>
  );
}
