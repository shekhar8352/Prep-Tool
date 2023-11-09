import React from 'react';

function Question({ questionNumber, question, options, selectedOption, onOptionSelect, onClearResponse }) {
  return (
    <div>
    <p>Question {questionNumber}:</p>
      <p>{question}</p>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            name="options"
            id={`option${index}`}
            value={option}
            checked={selectedOption === option}
            onChange={() => onOptionSelect(option)}
          />
          <label htmlFor={`option${index}`}>{option}</label>
        </div>
      ))}
      <button onClick={onClearResponse} className="btn btn-danger">
        Clear Response
      </button>
    </div>
  );
}

export default Question;
