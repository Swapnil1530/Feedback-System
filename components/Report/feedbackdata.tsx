"use client"
import React, {useState} from "react";

const Data = ({data}:any) => {
    const [selectedFaculty , setSelectedFaculty]:any = useState("");
    const filteredFeedback= data.filter((feedback:any) => feedback.faculty === selectedFaculty);
    return (
        <>
    <div>
        <label htmlFor="faculty">Select Faculty:{selectedFaculty}</label>
        <select id="faculty" value={selectedFaculty} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedFaculty(e.target.value)}>
            <option value="">All Faculties</option>
            <option value="Faculty 1">Faculty 1</option>
            <option value="Faculty 2">Faculty 2</option>
            <option value="Faculty 3">Faculty 3</option>
            <option value="Faculty 4">Faculty 4</option>
            <option value="Faculty 5">Faculty 5</option>
        </select>
    </div>

    {
        filteredFeedback.length > 0 ? (
            <div>
                {/*<h2>Faculty: {selectedFaculty}</h2>*/}
                {filteredFeedback.map((feedback: any) => (
                    <div key={feedback.id}>
                        <h3>PrnNumber : {feedback.prnNumber}</h3>
                        <h3>Subject: {feedback.subject}</h3>
                        <ul>
                            {feedback.feedback.map((question: any) => (
                                <li key={question.question} className="gap-4">
                                    <strong>Question:</strong> {question.question}<br/>
                                    <strong>Answer:</strong> {question.answer}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        ) : (
            <p>No feedback available for the selected faculty.</p>
        )

    }
    </>
)
}
export default Data;