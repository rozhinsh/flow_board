import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { isLocale } from "@/i18n/config";

export default async function LocaleDashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const direction = locale === "fa" ? "rtl" : "ltr";

  return (
    <div dir={direction} lang={locale} className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="flex min-h-screen">
        <Sidebar locale={locale} />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header locale={locale} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
