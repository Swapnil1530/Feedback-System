"use client";
import React, { useState, useEffect, useMemo } from "react";

const Data = ({ data }: any) => {
  const [selectedFaculty, setSelectedFaculty] = useState("");

  const filteredFeedback = useMemo(() => {
    return data.filter((feedback: any) => feedback.faculty === selectedFaculty);
  }, [data, selectedFaculty]);

  const subjects = useMemo(() => {
    if (filteredFeedback.length > 0) {
      const uniqueSubjects:any = Array.from(
        new Set(filteredFeedback.map((feedback: any) => feedback.subject))
      ).filter((subject) => typeof subject === "string");
      return uniqueSubjects;
    } else {
      return [];
    }
  }, [filteredFeedback]);

  return (
    <>
      <div>
        <label htmlFor="faculty" className="text-2xl text-black font-bold">
          Select Faculty
        </label>
        <select
          className="text-2xl text-black font-bold rounded border-blue-800 border-2 m-2 text-center"
          id="faculty"
          value={selectedFaculty}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSelectedFaculty(e.target.value)
          }
        >
          <option value="">Select</option>
          <option value="Faculty 1">Faculty 1</option>
          <option value="Faculty 2">Faculty 2</option>
          <option value="Faculty 3">Faculty 3</option>
          <option value="Faculty 4">Faculty 4</option>
          <option value="Faculty 5">Faculty 5</option>
        </select>
      </div>
      {selectedFaculty && (
        <div className="flex text-2xl bg-gray-900 text-white p-2 rounded border-2 border-blue-800 gap-4">
          <div>Faculty: {selectedFaculty}</div>
          {subjects.map((subject: string) => (
            <p key={subject}>Subject: {subject}</p>
          ))}
        </div>
      )}
      <div>
        {filteredFeedback.length > 0 ? (
          <div>
            {filteredFeedback.map((feedback: any) => (
              <div
                key={feedback.id}
                className="grid grid-cols-3 m-2 border-4 p-5 shadow-lg rounded-lg hover:bg-gray-900 hover:text-white hover:border-blue-800"
              >
                <h3>PrnNumber: {feedback.prnNumber}</h3>
                <ul>
                  {feedback.feedback.map((question: any) => (
                    <li key={question.question} className="gap-4">
                      <strong>Question:</strong> {question.question}
                      <br />
                      <strong>Answer:</strong> {question.answer}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>No feedback available for the selected faculty.</p>
        )}
      </div>
    </>
  );
};

export default Data;
