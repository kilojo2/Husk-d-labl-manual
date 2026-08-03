import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

/**
 * GET /api/quiz/results
 * Returns all quiz results, sorted by date descending.
 * Query params: ?operator=name&quiz=slug (optional filters)
 */
export async function GET(request: NextRequest) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);
    const operator = searchParams.get("operator");
    const quiz = searchParams.get("quiz");

    let query = "SELECT * FROM quiz_results";
    const conditions: string[] = [];
    const params: string[] = [];

    if (operator) {
      conditions.push("operator_name = ?");
      params.push(operator);
    }
    if (quiz) {
      conditions.push("quiz_slug = ?");
      params.push(quiz);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }
    query += " ORDER BY created_at DESC LIMIT 100";

    const result = db.exec(query);
    const rows = result.length > 0 ? result[0].values : [];

    const results = rows.map((row: any) => ({
      id: row[0],
      operatorName: row[1],
      quizSlug: row[2],
      quizTitle: row[3],
      score: row[4],
      total: row[5],
      percentage: row[6],
      incorrectJson: row[7],
      createdAt: row[8],
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("[API] GET /api/quiz/results error:", error);
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}