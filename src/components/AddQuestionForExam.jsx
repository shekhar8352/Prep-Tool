import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddQuestion = ({ onAddQuestion }) => {
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctOption: 0,
    explanation: '',
  });

  const handleOptionChange = (index, text) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = text;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const addOption = () => {
    if (newQuestion.options.length < 4) {
      setNewQuestion({ ...newQuestion, options: [...newQuestion.options, ''] });
    }
  };

  return (
    <div>
      <h3>Add Question</h3>
      <Form>
        <Form.Group controlId="question">
          <Form.Label>Question:</Form.Label>
          <Form.Control
            type="text"
            value={newQuestion.question}
            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="options">
          <Form.Label>Options:</Form.Label>
          {newQuestion.options.map((option, index) => (
            <Form.Control
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          ))}
          <Button variant="secondary" onClick={addOption}>
            Add Option
          </Button>
        </Form.Group>

        <Form.Group controlId="correctOption">
          <Form.Label>Correct Option:</Form.Label>
          <Form.Control
            as="select"
            value={newQuestion.correctOption}
            onChange={(e) => setNewQuestion({ ...newQuestion, correctOption: parseInt(e.target.value, 10) })}
          >
            {newQuestion.options.map((_, index) => (
              <option key={index} value={index}>
                Option {index + 1}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="explanation">
          <Form.Label>Explanation:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={newQuestion.explanation}
            onChange={(e) => setNewQuestion({ ...newQuestion, explanation: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" onClick={() => onAddQuestion(newQuestion)}>
          Add Question
        </Button>
      </Form>
    </div>
  );
};

export default AddQuestion;
