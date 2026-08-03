"use client";

import { useState } from "react";
import QuizModal from "./QuizModal";
import type { QuizQuestion } from "./QuizModal";

interface QuizButtonProps {
  title: string;
  quizSlug: string;
  questions: QuizQuestion[];
}

export default function QuizButton({ title, quizSlug, questions }: QuizButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="ghost-pill-sm flex items-center gap-1.5"
        style={{ fontSize: "13px" }}
        title="Пройти тест"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Пройти тест
      </button>

      <QuizModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        quizSlug={quizSlug}
        questions={questions}
      />
    </>
  );
}