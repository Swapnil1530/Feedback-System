"use client";
import { useState, useEffect } from "react";
import facultyData from "../data/facultyData.json"; // Path to your JSON file containing faculty details
import questionsData from "../data/question.json"; // Path to your JSON file containing questions data
import { signOut, useSession } from "next-auth/react";
import LoadingDots from "../components/loading-dots";
import { useRouter } from "next/navigation";

const FeedbackPage = () => {
  const { data: session } = useSession();
  const prnNumber = session?.user?.prnNumber;
  const [message, setMessage] = useState("");
  const [facultyIndex, setFacultyIndex]: any = useState(0);
  const [selectedFaculty, setSelectedFaculty]: any = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted]: any = useState(false);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSelectedFaculty(facultyData[facultyIndex]);
  }, [facultyIndex]);

  const handleNextFaculty = () => {
    if (facultyIndex < facultyData.length - 1) {
      setFacultyIndex(facultyIndex + 1);
      setLoading(false);
      setSelectedFaculty(null);
      setAnswers([]);
    }
    else{
      router.push('/thank');
      setTimeout(()=>signOut(),3000);
    }
  };

  const handleAnswerChange = (questionIndex: any, answer: any) => {
    const updatedAnswers: any = [...answers];
    updatedAnswers[questionIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prnNumber,
          faculty: selectedFaculty.name,
          subject: selectedFaculty.Subject,
          answers: questionsData.map((question, index) => ({
            question: question.text,
            answer: answers[index],
          })),
        }),
      });
      const res = await response.json();

      if (res.ok) {
        // Feedback saved successfully
        setMessage(res.message);
        setAnswers([]);
        setLoading(false);
        handleNextFaculty();
      } else {
        console.error("Failed to save feedback data");
        // Handle the error as needed
      }
    } catch (error) {
      console.error("Failed to save feedback data:", error);
    }

    setAnswers([]);
    handleNextFaculty();
  };

  return (
    <div className="flex flex-col w-full pl-10 pr-10 md:pl-40 md:pr-40  bg-[#1A1A1A]">
      <form onSubmit={handleSubmit}>
        <div className="text-white flex justify-center items-center gap-4 text-center p-2 mt-2 bg-blue-900 rounded ">
          <h3>PrnNumber : {prnNumber}</h3>
          <h3>{selectedFaculty?.name}</h3>
          <p>{selectedFaculty?.Subject}</p>
        </div>

        <div className="text-white">
          {questionsData.map((question, index) => (
            <div key={index}>
              <p>{question.text}</p>
              {selectedFaculty && (
                <div className="flex flex-col ">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex items-center  py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer bg-white/5 border-white/10 rounded-xl"
                    >
                      <input
                        type="radio"
                        className="w-5 h-5 bg-black"
                        name={`answer-${index}`}
                        checked={answers[index] === option}
                        onChange={() => handleAnswerChange(index, option)}
                        required
                      />
                      <div className="ml-6 text-white">{option}</div>
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
        {/* <div className="flex items-center justify-center">
        <button type="submit"className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded">
          {facultyData.length - 1 === facultyIndex ? "Submit" : "Next"}
        </button>
        </div> */}
      </form>
    </div>
  );
};

export default FeedbackPage;
