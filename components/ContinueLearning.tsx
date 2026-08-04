"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Progress {
  lastPath: string;
  lastTitle: string;
  section: string;
  progress: number;
}

export default function ContinueLearning() {
  const [progress, setProgress] = useState<Progress | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("learning_progress");
      if (stored) setProgress(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  if (!progress) return null;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text-muted/60 mb-4 text-center">
        Продолжить обучение
      </p>
      <Link
        href={progress.lastPath}
        className="block apple-card rounded-2xl p-5 group transition-all duration-300
                   hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 text-accent text-xs font-bold">
            {String(progress.progress).padStart(2, "0")}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-text-primary truncate">
              {progress.lastTitle}
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              {progress.section}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-bg-surface-hover overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-hover transition-all duration-500"
              style={{ width: `${progress.progress}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-accent">{progress.progress}%</span>
          <span className="text-xs text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
            Открыть →
          </span>
        </div>
      </Link>
    </div>
  );
}

/**
 * Call this from any page to save learning progress.
 */
export function saveLearningProgress(path: string, title: string, sectionName: string) {
  try {
    const existing = localStorage.getItem("learning_progress");
    const current = existing ? JSON.parse(existing) : { progress: 0 };
    const newProgress = Math.min(100, (current.progress || 0) + 1);
    localStorage.setItem(
      "learning_progress",
      JSON.stringify({
        lastPath: path,
        lastTitle: title,
        section: sectionName,
        progress: newProgress,
      })
    );
  } catch {
    // ignore
  }
}