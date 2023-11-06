import React from 'react';

function Question({
  question,
  options,
  selectedOption,
  onOptionSelect,
}) {
  return (
    <div>
      <p>{question}</p>
      {options.map((option, index) => (
        <label key={index} className="form-check">
          <input
            type="radio"
            name="option"
            value={option}
            checked={selectedOption === option}
            onChange={() => onOptionSelect(option)}
            className="form-check-input"
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export default Question;
