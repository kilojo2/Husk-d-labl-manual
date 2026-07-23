"use client";

import { useState, type ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TableOfContents from "./TableOfContents";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex flex-1 flex-col min-w-0">
        <Header
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-10">
            {children}
          </div>
        </main>
      </div>

      {/* Right side Table of Contents - xl screens only */}
      <TableOfContents contentRef={undefined} />
    </div>
  );
}
