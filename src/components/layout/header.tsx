"use client";

import { usePathname } from "next/navigation";

type CurrentSectionTitleProps = {
  dashboard: string;
  projects: string;
  tasks: string;
};

export function CurrentSectionTitle({ dashboard, projects, tasks }: CurrentSectionTitleProps) {
  const pathname = usePathname();
  const section = pathname.split("/").filter(Boolean)[1];

  if (section === "projects") {
    return projects;
  }

  if (section === "tasks") {
    return tasks;
  }

  return dashboard;
}
