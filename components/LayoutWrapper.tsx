"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import AppShell from "./AppShell";
import CommandSearch from "./CommandSearch";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AppShell>{children}</AppShell>
      <CommandSearch />
    </ThemeProvider>
  );
}
