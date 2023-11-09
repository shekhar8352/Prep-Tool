import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const AddQuestion = () => {
  // Example array of exam names (to be fetched from the database in the future)
  const examNames = ['JEE', 'NEET', 'CAT', 'GRE', 'TOEFL'];

  const [selectedExamName, setSelectedExamName] = useState(examNames[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState('');
  const [explanation, setExplanation] = useState('');

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission of the exam data, e.g., send to a server or update state.
    // You can add your logic here.
  };

  return (
    <Container>
      <h1>Add Question</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="examName">
          <Form.Label>Select Exam Name:</Form.Label>
          <Form.Control
            as="select"
            value={selectedExamName}
            onChange={(e) => setSelectedExamName(e.target.value)}
          >
            {examNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="difficulty">
          <Form.Label>Difficulty Level:</Form.Label>
          <Form.Control
            as="select"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="topic">
          <Form.Label>Topic:</Form.Label>
          <Form.Control
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="question">
          <Form.Label>Question:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="options">
          <Form.Label>Options:</Form.Label>
          {options.map((option, index) => (
            <Form.Control
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          ))}
        </Form.Group>

        <Form.Group controlId="correctOption">
          <Form.Label>Correct Option:</Form.Label>
          <Form.Control
            type="text"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="explanation">
          <Form.Label>Explanation:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Question 
        </Button>
      </Form>
    </Container>
  );
};

export default AddQuestion;
