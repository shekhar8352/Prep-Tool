import React from 'react';

function QuizAnalysis({
  score,
  questions,
  userResponses,
}) {
  function countUnattemptedQuestions() {
    return userResponses.filter((response) => !response.attempted).length;
  }

  return (
    <div>
      <h2>Quiz Analysis</h2>
      <p>Total Score: {score}</p>
      <p>Correct Answers: {score}</p>
      <p>Incorrect Answers: {questions.length - score - countUnattemptedQuestions()}</p>
      <p>Unattempted Questions: {countUnattemptedQuestions()}</p>
      <h3>Question-wise Analysis:</h3>
      <ul className="list-group">
        {questions.map((question, index) => (
          <li key={index} className="list-group-item">
            <p>Question {index + 1}: {question.question}</p>
            <p>Correct Answer: {question.correctAnswer}</p>
            {question.explanation && (
              <p>Explanation: {question.explanation}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizAnalysis;
