// pages/FeedbackPage.js
"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import facultyData from '../../data/facultyData.json'; // Path to your JSON file containing faculty details
import subjectData from '../../data/subjectData.json'; // Path to your JSON file containing subject details
import questionsData from '../../data//question.json'; // Path to your JSON file containing questions data

const FeedbackPage = () => {
  const prnNumber = '2020095900009773';
  const router = useRouter();
  const [facultyIndex, setFacultyIndex] = useState(0);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setSelectedFaculty(facultyData[facultyIndex]);
  }, [facultyIndex]);

  const handleNextFaculty = () => {
    if (facultyIndex < facultyData.length - 1) {
      setFacultyIndex(facultyIndex + 1);
      setSelectedSubject('');
      setAnswers([]);
    } else {
      setFeedbackSubmitted(true);
    }
  };

  const handleAnswerChange = (questionIndex, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation here if needed

    // Save the feedback data to your desired storage (e.g., database, API, etc.)
    // Replace with your preferred implementation
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prnNumber,
          faculty: selectedFaculty.name,
          subject: selectedSubject,
          answers :questionsData.map((question, index) => ({
            question: question.text,
            answer: answers[index],
          }))
        }),
      });

      if (response.ok) {
        // Feedback saved successfully
        setSelectedSubject('');
        setAnswers([]);
        handleNextFaculty();
      } else {
        console.error('Failed to save feedback data');
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Failed to save feedback data:', error);
      // Handle the error as needed
    }
    // Reset the form and move to the next faculty
    setSelectedSubject('');
    setAnswers([]);
    handleNextFaculty();
  };

  return (
    <div>
      {feedbackSubmitted ? (
        <p>Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Faculty Feedback</h2>
          <h3>{selectedFaculty?.name}</h3>
          <p>{selectedFaculty?.department}</p>
          <label>
            Select Subject:
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjectData.map((subject, index) => (
                <option key={index} value={subject.name}>
                  {subject.name}
                </option>
              ))}
            </select>
          </label>
          <h3>Feedback Questions:</h3>
          {questionsData.map((question, index) => (
            <div key={index}>
              <p>{question.text}</p>
              {selectedFaculty && (
                <>
                  {question.options.map((option, optionIndex) => (
                    <label key={optionIndex}>
                      <input
                        type="radio"
                        name={`answer-${index}`}
                        checked={answers[index] === option}
                        onChange={() => handleAnswerChange(index, option)}
                      />
                      {option}
                    </label>
                  ))}
                </>
              )}
            </div>
          ))}
          <br />
          <button type="submit">Submit</button>
          <button type="button" onClick={handleNextFaculty}>
            Next Faculty
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackPage;
