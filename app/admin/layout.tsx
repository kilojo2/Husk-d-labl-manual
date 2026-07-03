import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Статистика — Husk'd Labl Manuals",
  robots: "noindex, nofollow",
};

/**
 * Admin layout — minimal wrapper without sidebar/header/effects.
 * The admin page is a standalone Client Component.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
