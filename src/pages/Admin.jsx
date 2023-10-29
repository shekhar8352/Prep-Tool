import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Admin = () => {
  const [formData, setFormData] = useState({
    exam: '',
    subject: '',
    topic: '',
    difficulty: 'easy',
    question: '',
    options: ['', '', '', ''],
    correctOption: '',
    score: '',
    explanation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...formData.options];
    newOptions[index] = e.target.value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission (e.g., send data to the server)
    console.log(formData);
  };

  return (
    <Container>
      <h2>Add Question</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="exam">
          <Form.Label>Exam</Form.Label>
          <Form.Control
            type="text"
            name="exam"
            value={formData.exam}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="topic">
          <Form.Label>Topic</Form.Label>
          <Form.Control
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="difficulty">
          <Form.Label>Difficulty</Form.Label>
          <Form.Control
            as="select"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="question">
          <Form.Label>Question</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="options">
          <Form.Label>Options</Form.Label>
          {formData.options.map((option, index) => (
            <Form.Control
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(e, index)}
              required
            />
          ))}
        </Form.Group>

        <Form.Group controlId="correctOption">
          <Form.Label>Correct Option</Form.Label>
          <Form.Control
            as="select"
            name="correctOption"
            value={formData.correctOption}
            onChange={handleChange}
            required
          >
            {formData.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="score">
          <Form.Label>Score</Form.Label>
          <Form.Control
            type="number"
            name="score"
            value={formData.score}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="explanation">
          <Form.Label>Explanation</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="explanation"
            value={formData.explanation}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Question
        </Button>
      </Form>
    </Container>
  );
};

export default Admin;
