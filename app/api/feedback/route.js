import { NextResponse, NextRequest } from "next/server";
import { db } from "../../../lib/prisma";

export async function GET(req, res) {
  try {
    const data = await db.feedback.findMany({});
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    throw new Error(error);
  }
}

export async function POST(req, res) {
  const { prnNumber, feedbackData, questionsData } = await req.json();

  try {
    for (const feedbackEntry of feedbackData) {
      const { faculty, subject, answers } = feedbackEntry;

      const mappedFeedback = answers.map((answer, index) => ({
        question: questionsData[index].text,
        answer,
      }));

      await db.feedback.create({
        data: {
          prnNumber,
          faculty,
          subject,
          feedback: mappedFeedback,
        },
      });
    }

    await db.user.update({
      where: { prnNumber },
      data: { hasSubmitted: true },
    });

    return NextResponse.json({ message: "Feedback Saved Successfully" });
  } catch (error) {
    console.error("Failed to save feedback data:", error);
    return NextResponse.json({ message: "Failed to save feedback data" });
  }
}
