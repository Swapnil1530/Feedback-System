import { NextRequest , NextResponse } from "next/server";
export async function GET(req, res) {
    const questionsData= [
        {
          id: 1,
          text: "How satisfied are you with the teaching methodology?",
          options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
        },
        {
            id: 2,
            text: "How satisfied are you with the faculty's knowledge of the subject?",
            options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
        }
        // Add more questions as needed
      ];
    return NextResponse.json(questionsData);
}
