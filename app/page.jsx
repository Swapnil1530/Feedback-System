"use client";
import React, { useState, useEffect } from "react";
import facultyData from "../data/facultyData.json";
import questionsData from "../data/question.json";
import { signOut, useSession } from "next-auth/react";
import LoadingDots from "../components/loading-dots";
import { useRouter } from "next/navigation"; 

const FeedbackPage = () => {
  const { data: session } = useSession();
  const prnNumber = session?.user?.prnNumber;
  const [facultyIndex, setFacultyIndex] = useState(0);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const handleAnswerChange = (questionIndex, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const submitAllFeedback = async (updatedFeedbackData) => {
  setLoading(true);

  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prnNumber,
        feedbackData: updatedFeedbackData, 
        questionsData: questionsData,
      }),
    });

    const res = await response.json();

    if (res.message) {
      setLoading(false);
      router.push("/thank");
      signOut();
    } else {
      console.error("Failed to save feedback data");
    }
  } catch (error) {
    console.error("Failed to save feedback data:", error);
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const facultyFeedback = {
    faculty: selectedFaculty.name,
    subject: selectedFaculty.Subject,
    answers: answers,
  };

  setFeedbackData((prevFeedbackData) => [
    ...prevFeedbackData,
    facultyFeedback,
  ]);

  if (facultyIndex === facultyData.length - 1) {
    
    const updatedFeedbackData = [
      ...feedbackData,
      facultyFeedback,
    ];

    await submitAllFeedback(updatedFeedbackData);
  } else {
    handleNextFaculty();
  }
};

  return (
    <div className="flex flex-col w-full pl-10 pr-10 md:pl-40 md:pr-40 bg-[#1A1A1A]">
      <form onSubmit={handleSubmit}>
        <div className="text-white flex justify-center items-center gap-4 text-center p-2 mt-2 bg-blue-900 rounded ">
          <h3>PrnNumber : {prnNumber}</h3>
          <h3>Faculty : {selectedFaculty?.name}</h3>
          <p>Subject : {selectedFaculty?.Subject}</p>
        </div>

        <div className="text-white">
          {questionsData.map((question, index) => (
            <div key={index}>
              <p>
                {question.id}  {question.text}
              </p>
              {selectedFaculty && (
                <div className="flex flex-col ">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex items-center  py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl"
                    >
                      <label
                        htmlFor={`answer-${index}-${optionIndex}`}
                        className="flex w-full items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          id={`answer-${index}-${optionIndex}`}
                          className="h-5 bg-black"
                          name={`answer-${index}`}
                          checked={answers[index] === option}
                          onChange={() => handleAnswerChange(index, option)}
                          required
                        />
                        <div className="ml-6 text-white">{option}</div>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <br />
        <button
          disabled={loading}
          className={`${
            loading
              ? "cursor-not-allowed border-gray-200 bg-gray-100 mb-5"
              : "mb-5 border-black bg-blue-500 text-white hover:bg-white hover:text-black"
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
        >
          {loading ? (
            <LoadingDots color="#808080" />
          ) : (
            <p>{facultyData.length - 1 === facultyIndex ? "Submit" : "Next"}</p>
          )}
        </button>
       
      </form>
    </div>
  );
};

export default FeedbackPage;
