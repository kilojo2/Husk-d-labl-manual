"use client";

import { Suspense, type ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import AppShell from "./AppShell";
import CommandSearch from "./CommandSearch";
import VisitTracker from "./VisitTracker";
import CookieConsent from "./CookieConsent";
import SearchHighlight from "./SearchHighlight";
import TelegramContacts from "./TelegramContacts";
import FooterCredit from "./FooterCredit";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <VisitTracker />
      <CookieConsent />
      <Suspense fallback={null}>
        <SearchHighlight />
      </Suspense>
      <AppShell>{children}</AppShell>
      <CommandSearch />
      <TelegramContacts />
      <FooterCredit />
    </ThemeProvider>
  );
}
