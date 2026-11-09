"use client";

import { useSyncExternalStore } from "react";

export type AnalyticsConsent = "accepted" | "rejected" | null;

const STORAGE_KEY = "hl_cookie_consent";
const CHANGE_EVENT = "hl-cookie-consent-change";

function readConsent(): AnalyticsConsent {
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "rejected" ? value : null;
}

function subscribe(onStoreChange: () => void): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onStoreChange();
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

export function useAnalyticsConsent(): AnalyticsConsent {
  return useSyncExternalStore(subscribe, readConsent, () => null);
}

export function setAnalyticsConsent(consent: Exclude<AnalyticsConsent, null>): void {
  window.localStorage.setItem(STORAGE_KEY, consent);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
