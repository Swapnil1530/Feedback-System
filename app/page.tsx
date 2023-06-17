"use client"
import { useState, useEffect } from 'react';
import facultyData from '../data/facultyData.json'; // Path to your JSON file containing faculty details
import questionsData from '../data/question.json'; // Path to your JSON file containing questions data
import { useSession } from 'next-auth/react';

const FeedbackPage = () => {
  const {data :session} = useSession();
  const prnNumber = session?.user?.prnNumber;
  const [message , setMessage] = useState("");
  const [facultyIndex, setFacultyIndex]:any = useState(0);
  const [selectedFaculty, setSelectedFaculty]:any = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted]:any = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setSelectedFaculty(facultyData[facultyIndex]);
   
  }, [facultyIndex]);

 
 
  const handleNextFaculty = () => {
    if (facultyIndex < facultyData.length - 1) {
      setFacultyIndex(facultyIndex + 1);
     
      setSelectedFaculty(null);
      setAnswers([]);

    } 
  };

  const handleAnswerChange = (questionIndex:any, answer:any) => {
    const updatedAnswers :any = [...answers];
    updatedAnswers[questionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e:any) => {
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
          subject : selectedFaculty.Subject,
          answers : questionsData.map((question, index) => ({
            question: question.text,
            answer: answers[index],
          }))
        }),
      });
      const res = await response.json();

      if (res.ok) {
        // Feedback saved successfully
        setMessage(res.message);
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
    setAnswers([]);
    handleNextFaculty();
  };

  return (
    <div>
      {message && <p>{message}</p>}
     
        <form onSubmit={handleSubmit}>
          <h2>Faculty Feedback</h2>
          <div>
            <h3>PrnNumber : {prnNumber}</h3>
            <h3>{selectedFaculty?.name}</h3>
            <p>{selectedFaculty?.Subject}</p>
          </div>
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
                        required
                      />
                      {option}
                    </label>
                  ))}
                </>
              )}
            </div>
          ))}
          <br />
          
          <button type="submit">
           {facultyData.length - 1 === facultyIndex ? "Submit" : "Next"}
            
          </button>
         
        </form>
      
    </div>
  );
};

export default FeedbackPage;
