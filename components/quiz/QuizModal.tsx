"use client";

import { useState, useCallback, useEffect } from "react";

export interface QuizQuestion {
  text: string;
  answers: string[];
  correctIndex: number;
  explanation?: string;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  quizSlug: string;
  questions: QuizQuestion[];
}

function getOperatorName(): string {
  if (typeof window === "undefined") return "";
  try {
    const stored = localStorage.getItem("quiz_operator_name");
    if (stored) return stored;
    const name = prompt("Введите ваше имя / ник оператора:")?.trim() || "Аноним";
    localStorage.setItem("quiz_operator_name", name);
    return name;
  } catch {
    return "Аноним";
  }
}

export default function QuizModal({ isOpen, onClose, title, quizSlug, questions }: QuizModalProps) {
  const [step, setStep] = useState<"name" | "quiz" | "results">("name");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);   // выбранный индекс для каждого вопроса
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      const name = getOperatorName();
      if (name && name !== "Аноним") {
        setStep("quiz");
      } else {
        setStep("name");
      }
      setCurrentIndex(0);
      setAnswers(new Array(questions.length).fill(-1));
      setScore(0);
      setSubmitted(false);
      setSaving(false);
    }
  }, [isOpen, questions.length]);

  // Save result to server
  const saveResult = useCallback(async (finalScore: number) => {
    setSaving(true);
    try {
      const name = getOperatorName();
      const incorrectIndices = answers
        .map((ans, idx) => (ans !== questions[idx]?.correctIndex ? idx : -1))
        .filter((i) => i !== -1);

      await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operatorName: name,
          quizSlug,
          quizTitle: title,
          score: finalScore,
          total: questions.length,
          incorrectIndices,
        }),
      });
    } catch {
      // ignore save errors — result still shown to user
    } finally {
      setSaving(false);
    }
  }, [answers, quizSlug, title, questions]);

  const handleAnswer = useCallback((answerIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = answerIndex;
      return next;
    });
  }, [currentIndex, submitted]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, questions.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleFinish = useCallback(async () => {
    const finalScore = answers.reduce((acc, ans, idx) => {
      return ans === questions[idx]?.correctIndex ? acc + 1 : acc;
    }, 0);
    setScore(finalScore);
    setSubmitted(true);
    setStep("results");
    await saveResult(finalScore);
  }, [answers, questions, saveResult]);

  const handleRetry = useCallback(() => {
    setCurrentIndex(0);
    setAnswers(new Array(questions.length).fill(-1));
    setScore(0);
    setSubmitted(false);
    setStep("quiz");
  }, [questions.length]);

  if (!isOpen) return null;

  const currentQuestion = questions[currentIndex];
  const total = questions.length;
  const answeredCount = answers.filter((a) => a !== -1).length;
  const progress = total > 0 ? (answeredCount / total) * 100 : 0;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          margin: "16px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Name step ── */}
        {step === "name" && (
          <div style={{
            background: "rgba(28,28,30,0.98)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "32px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
          }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#fff", marginBottom: "16px" }}>Введите имя</h2>
            <input
              autoFocus
              defaultValue={getOperatorName()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const val = (e.target as HTMLInputElement).value.trim() || "Аноним";
                  localStorage.setItem("quiz_operator_name", val);
                  setStep("quiz");
                }
              }}
              placeholder="Ваше имя / ник"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                fontSize: "16px",
                outline: "none",
                marginBottom: "16px",
              }}
            />
            <button
              onClick={() => setStep("quiz")}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "14px",
                border: "none",
                background: "#007AFF",
                color: "#fff",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Продолжить
            </button>
          </div>
        )}

        {/* ── Quiz step ── */}
        {step === "quiz" && (
          <div style={{
            background: "rgba(28,28,30,0.98)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "28px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
          }}>
            {/* Header */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                {title}
              </h3>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  color: "rgba(255,255,255,0.5)",
                  padding: "4px 10px",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{
                display: "flex", justifyContent: "space-between", marginBottom: "6px",
                fontSize: "12px", color: "rgba(255,255,255,0.4)",
              }}>
                <span>Вопрос {currentIndex + 1} из {total}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div style={{
                height: "4px", borderRadius: "2px",
                background: "rgba(255,255,255,0.1)", overflow: "hidden",
              }}>
                <div style={{
                  height: "100%", transition: "width 0.3s ease",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                  borderRadius: "2px",
                }} />
              </div>
            </div>

            {/* Question */}
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "18px", fontWeight: 500, color: "#fff", lineHeight: 1.4, margin: 0 }}>
                {currentQuestion?.text}
              </p>
            </div>

            {/* Answers */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
              {currentQuestion?.answers.map((answer, idx) => {
                const isSelected = answers[currentIndex] === idx;
                const isCorrect = idx === currentQuestion.correctIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={submitted}
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      borderRadius: "14px",
                      border: submitted
                        ? isCorrect
                          ? "2px solid #30d158"
                          : isSelected
                            ? "2px solid #ff453a"
                            : "1px solid rgba(255,255,255,0.08)"
                        : isSelected
                          ? "2px solid #6366f1"
                          : "1px solid rgba(255,255,255,0.08)",
                      background: isSelected
                        ? "rgba(99,102,241,0.12)"
                        : "rgba(255,255,255,0.03)",
                      color: "#fff",
                      fontSize: "15px",
                      cursor: submitted ? "default" : "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.25)", marginRight: "10px", fontWeight: 600 }}>
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {answer}
                    {submitted && isCorrect && (
                      <span style={{ marginLeft: "8px", color: "#30d158" }}>✓</span>
                    )}
                    {submitted && isSelected && !isCorrect && (
                      <span style={{ marginLeft: "8px", color: "#ff453a" }}>✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation after answering */}
            {submitted && currentQuestion?.explanation && (
              <div style={{
                padding: "12px 16px",
                borderRadius: "10px",
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.15)",
                marginBottom: "16px",
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.4,
              }}>
                💡 {currentQuestion.explanation}
              </div>
            )}

            {/* Navigation */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "8px",
            }}>
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                style={{
                  padding: "12px 20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  color: currentIndex === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.6)",
                  cursor: currentIndex === 0 ? "default" : "pointer",
                  fontSize: "14px",
                }}
              >
                ← Назад
              </button>

              {currentIndex < total - 1 ? (
                <button
                  onClick={handleNext}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "12px",
                    border: "none",
                    background: answers[currentIndex] !== -1 ? "#6366f1" : "rgba(255,255,255,0.06)",
                    color: answers[currentIndex] !== -1 ? "#fff" : "rgba(255,255,255,0.3)",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  Далее →
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  disabled={answeredCount < total || saving}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "12px",
                    border: "none",
                    background: saving ? "rgba(255,255,255,0.1)" : "#30d158",
                    color: "#fff",
                    cursor: answeredCount === total && !saving ? "pointer" : "default",
                    fontSize: "14px",
                    fontWeight: 700,
                    opacity: answeredCount === total ? 1 : 0.4,
                  }}
                >
                  {saving ? "Сохранение..." : "Завершить тест"}
                </button>
              )}
            </div>

            {/* Dot indicators */}
            <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginTop: "16px", flexWrap: "wrap" }}>
              {answers.map((ans, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: idx === currentIndex
                      ? "#6366f1"
                      : ans !== -1
                        ? "rgba(255,255,255,0.4)"
                        : "rgba(255,255,255,0.1)",
                    transition: "background 0.15s",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Results step ── */}
        {step === "results" && (
          <div style={{
            background: "rgba(28,28,30,0.98)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "32px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "64px", marginBottom: "12px" }}>
              {score / total >= 0.7 ? "🎉" : "😔"}
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
              {score / total >= 0.7 ? "Тест пройден!" : "Тест не пройден"}
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", marginBottom: "20px" }}>
              {score} / {total} ({Math.round((score / total) * 100)}%)
            </p>

            {/* Score bar */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{
                height: "8px",
                borderRadius: "4px",
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  width: `${(score / total) * 100}%`,
                  background: score / total >= 0.7
                    ? "linear-gradient(90deg, #30d158, #34c759)"
                    : "linear-gradient(90deg, #ff9f0a, #ff453a)",
                  borderRadius: "4px",
                  transition: "width 0.5s ease",
                }} />
              </div>
            </div>

            {/* Wrong answers list */}
            {answers.map((ans, idx) => {
              const isCorrect = ans === questions[idx]?.correctIndex;
              if (isCorrect) return null;
              return (
                <div key={idx} style={{
                  textAlign: "left",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: "rgba(255,69,58,0.06)",
                  border: "1px solid rgba(255,69,58,0.1)",
                  marginBottom: "8px",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.6)",
                }}>
                  <span style={{ color: "#ff453a", fontWeight: 600, marginRight: "6px" }}>Q{idx + 1}</span>
                  {questions[idx]?.text}
                  {questions[idx]?.answers && ans >= 0 && (
                    <span style={{ display: "block", marginTop: "4px", fontSize: "12px" }}>
                      Ваш ответ: <span style={{ color: "#ff453a" }}>{questions[idx].answers[ans]}</span>
                      {" · "}
                      Правильно: <span style={{ color: "#30d158" }}>{questions[idx].answers[questions[idx].correctIndex]}</span>
                    </span>
                  )}
                </div>
              );
            })}

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                onClick={handleRetry}
                style={{
                  padding: "12px 20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Пройти заново
              </button>
              <button
                onClick={onClose}
                style={{
                  padding: "12px 24px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#007AFF",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}