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

    if (!operatorName || !quizSlug || !quizTitle || score === undefined || !total) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    const incorrectJson = JSON.stringify(incorrectIndices || []);

    db.run(
      `INSERT INTO quiz_results (operator_name, quiz_slug, quiz_title, score, total, percentage, incorrect_json, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      [operatorName, quizSlug, quizTitle, score, total, percentage, incorrectJson]
    );

    saveDb();

    return NextResponse.json({ success: true, percentage });
  } catch (error) {
    console.error("[API] POST /api/quiz/submit error:", error);
    return NextResponse.json({ error: "Failed to save quiz result" }, { status: 500 });
  }
}