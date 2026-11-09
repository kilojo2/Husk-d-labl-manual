import { NextRequest, NextResponse } from "next/server";
import { getDb, saveDb } from "@/lib/db";

/**
 * POST /api/quiz/submit
 * Saves a quiz result to the database.
 * Body: { operatorName, quizSlug, quizTitle, score, total, incorrectIndices? }
 */
export async function POST(request: NextRequest) {
  try {
    const db = await getDb();
    const body = await request.json();
    const { operatorName, quizSlug, quizTitle, score, total, incorrectIndices } = body;

    if (
      typeof operatorName !== "string" ||
      typeof quizSlug !== "string" ||
      typeof quizTitle !== "string" ||
      !operatorName.trim() ||
      !quizSlug.trim() ||
      !quizTitle.trim() ||
      !Number.isInteger(score) ||
      !Number.isInteger(total) ||
      total < 1 ||
      total > 500 ||
      score < 0 ||
      score > total
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const safeIncorrectIndices = Array.isArray(incorrectIndices)
      ? incorrectIndices.filter(
          (index): index is number =>
            Number.isInteger(index) && index >= 0 && index < total,
        )
      : [];
    const percentage = Math.round((score / total) * 100);
    const incorrectJson = JSON.stringify(safeIncorrectIndices);

    db.run(
      `INSERT INTO quiz_results (operator_name, quiz_slug, quiz_title, score, total, percentage, incorrect_json, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      [
        operatorName.trim().slice(0, 100),
        quizSlug.trim().slice(0, 100),
        quizTitle.trim().slice(0, 200),
        score,
        total,
        percentage,
        incorrectJson,
      ]
    );

    saveDb();

    return NextResponse.json({ success: true, percentage });
  } catch (error) {
    console.error("[API] POST /api/quiz/submit error:", error);
    return NextResponse.json({ error: "Failed to save quiz result" }, { status: 500 });
  }
}
