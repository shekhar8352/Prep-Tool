import React from 'react';

function DirectionPanel({
  questions,
  userResponses,
  onDirectQuestion,
  currentQuestion,
}) {
  // Create an object to group questions by subject
  const questionsBySubject = {};

  questions.forEach((question, index) => {
    if (!questionsBySubject[question.subject]) {
      questionsBySubject[question.subject] = [];
    }
    questionsBySubject[question.subject].push({
      index,
      isVisited: userResponses[index].attempted || userResponses[index].flagged,
      // isCorrect: userResponses[index].response === question.correctAnswer,
    });
  });

  const renderDirectionPanelButtons = (subject, subjectQuestions) => (
    <div key={subject} className="subject-section">
      <h4>{subject}</h4>
      {subjectQuestions.map(({ index, isVisited}) => {
        let buttonColorClass = 'btn ';
        if (!isVisited) {
        buttonColorClass += 'btn-light';
      } else if (userResponses[index].flagged) {
        buttonColorClass += 'btn-warning';
      }
      else if (userResponses[index].flagged && userResponses[index].attempted) {
       buttonColorClass += 'btn-danger';
      } 
      else {
        buttonColorClass += 'btn-success';
      }

      if (index === currentQuestion) {
        buttonColorClass += ' current-question'; // Add a custom class for the current question
      }

        return (
          <button
            key={index}
            onClick={() => onDirectQuestion(index)}
            className={buttonColorClass}
          >
             {index + 1}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="question-nav">
      <p className="mt-3 mb-2">Jump to Question:</p>
      {Object.entries(questionsBySubject).map(([subject, subjectQuestions]) => (
        renderDirectionPanelButtons(subject, subjectQuestions)
      ))}
    </div>
  );
}

export default DirectionPanel;
