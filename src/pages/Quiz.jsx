import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import QuizAnalysis from "../components/QuizAnalysis";
import DirectionPanel from "../components/DirectionPanel";
import Question from "../components/Question";
import Instructions from "../components/Instructions";

import jeeQuestions from "../Sample Data/question.json";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userResponses, setUserResponses] = useState(
    jeeQuestions.map(() => ({
      response: "",
      attempted: false,
      flagged: false,
      visited: false,
    }))
  );
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [quizStarted, setQuizStarted] = useState(false);

  // Timer function to update timeLeft every second
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        // Time's up, finish the quiz
        handleQuizFinish();
        clearInterval(timer);
      }
    }, 1000);


    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, [timeLeft]);


  useEffect(() => {
    // Add an event listener for the exit fullscreen action
    document.addEventListener('fullscreenchange', handleExitFullscreen);
    return () => {
      document.removeEventListener('fullscreenchange', handleExitFullscreen);
    };
  }, []);
  
  const handleExitFullscreen = () => {
    if (!document.fullscreenElement) {
      // If the user exits fullscreen, end the quiz immediately
      handleQuizFinish();
    }
  };
  

  const handleOptionSelect = (option) => {
    const updatedResponses = [...userResponses];
    updatedResponses[currentQuestion].response = option;
    updatedResponses[currentQuestion].attempted = true;
    setUserResponses(updatedResponses);
  };

  const handleDirectQuestion = (questionNumber) => {
    if (questionNumber >= 0 && questionNumber < jeeQuestions.length) {
      setCurrentQuestion(questionNumber);

      const updatedResponses = [...userResponses];
      updatedResponses[currentQuestion].visited = true;
      setUserResponses(updatedResponses);
    }
  };

  const handleFlagQuestion = () => {
    const updatedResponses = [...userResponses];
    updatedResponses[currentQuestion].flagged =
      !updatedResponses[currentQuestion].flagged;
    setUserResponses(updatedResponses);
  };

  // const handleQuestionSubmit = () => {
  //   if (currentQuestion < jeeQuestions.length - 1) {
  //     setCurrentQuestion(currentQuestion + 1);
  //   } else {
  //     handleQuizFinish();
  //   }
  // };

  const handleQuizFinish = () => {
    let totalScore = 0;

    for (let i = 0; i < jeeQuestions.length; i++) {
      if (userResponses[i].response === jeeQuestions[i].correctAnswer) {
        totalScore++;
      }
    }

    setScore(totalScore);
    setQuizOver(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < jeeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // const handleStartQuiz = () => {
  //   // Start the quiz when the "Start Quiz" button is clicked
  //   setQuizStarted(true);
  // };

  const handleStartQuiz = () => {
    // Request fullscreen mode when the quiz starts
    const element = document.documentElement; // Fullscreen the entire page
    if (element.requestFullscreen) {
      element.requestFullscreen().then(() => {
        setQuizStarted(true); // Start the quiz when fullscreen request is accepted
      });
    }
  };

  const handleClearResponse = () => {
    const updatedResponses = [...userResponses];
    updatedResponses[currentQuestion].response = ''; 
    updatedResponses[currentQuestion].attempted = false;// Clear the selected option
    setUserResponses(updatedResponses);
  };

  return (
    <div className="container">
      <h1 className="mt-3 mb-4">Quiz App</h1>

      {!quizStarted ? ( // Display instructions and "Start Quiz" button before the quiz starts
        <div>
          <Instructions />
          <button onClick={handleStartQuiz} className="btn btn-primary">
            Start Quiz
          </button>
        </div>
      ) : (

      <div>
        {quizOver ? (
          <QuizAnalysis
            score={score}
            questions={jeeQuestions}
            userResponses={userResponses}
          />
        ) : (
          <>
            <div className="row">
              <div className="col-lg-9 col-md-12">
                <div className="question-panel"></div>
                <p className="mb-3">Time Left: {timeLeft} seconds</p>
                <Question
                 questionNumber={currentQuestion + 1}
                  question={jeeQuestions[currentQuestion].question}
                  options={jeeQuestions[currentQuestion].options}
                  selectedOption={userResponses[currentQuestion].response}
                  onOptionSelect={handleOptionSelect}
                  onClearResponse={handleClearResponse}
                />
                <div className="mt-3">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    className="btn btn-primary mr-2"
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleFlagQuestion}
                    className={`btn ${
                      userResponses[currentQuestion].flagged
                        ? "btn-warning"
                        : "btn-info"
                    } mr-2`}
                  >
                    {userResponses[currentQuestion].flagged ? "Unflag" : "Flag"}
                  </button>
                  {currentQuestion === jeeQuestions.length - 1 ? (
                    <button
                      onClick={handleQuizFinish}
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="btn btn-primary"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
              <div className="col-lg-3 d-lg-block d-md-none">
                <DirectionPanel
                  questions={jeeQuestions}
                  userResponses={userResponses}
                  onDirectQuestion={handleDirectQuestion}
                  currentQuestion={currentQuestion}
                />
              </div>
            </div>
          </>
        )}
      </div>
      )}
    </div>
    // </div>
  );
}

export default Quiz;
