import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import examData from '../Sample Data/exam-name.json'; // Import your JSON file

const AddExamType = () => {
  const [examName, setExamName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentSection, setCurrentSection] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState({
    difficulty: '',
    question: '',
    options: ['', '', '', ''],
    correctOption: 0,
    explanation: '',
  });

  const handleExamNameChange = (value) => {
    setExamName(value);
  };

  const handleSectionChange = (sectionName) => {
    setCurrentSection(sectionName);
  };

  const handleDifficultyChange = (difficulty) => {
    setCurrentQuestion({
      ...currentQuestion,
      difficulty: difficulty,
    });
  };

  const handleQuestionChange = (question) => {
    setCurrentQuestion({
      ...currentQuestion,
      question: question,
    });
  };

  const handleOptionChange = (index, option) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = option;
    setCurrentQuestion({
      ...currentQuestion,
      options: updatedOptions,
    });
  };

  const handleCorrectOptionChange = (index) => {
    setCurrentQuestion({
      ...currentQuestion,
      correctOption: index,
    });
  };

  const handleExplanationChange = (explanation) => {
    setCurrentQuestion({
      ...currentQuestion,
      explanation: explanation,
    });
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { ...currentQuestion, examName: examName, sectionName: currentSection }]);
    setCurrentQuestion({
      difficulty: '',
      question: '',
      options: ['', '', '', ''],
      correctOption: 0,
      explanation: '',
    });
  };

  const handleSubmit = () => {
    // Handle the submission of the questions object, e.g., log it or send it to MongoDB.
    console.log(questions);
  };

  return (
    <Container>
      <h1>Create Exam</h1>
      <Form>
        <Form.Group controlId="examName">
          <Form.Label>Select Exam Name:</Form.Label>
          <Form.Control as="select" onChange={(e) => handleExamNameChange(e.target.value)}>
            <option value="">Select an Exam</option>
            {examData.map((exam) => (
              <option key={exam.examName} value={exam.examName}>
                {exam.examName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {examName && (
          <div>
            <Form.Group controlId="sectionName">
              <Form.Label>Select Section Name:</Form.Label>
              <Form.Control as="select" onChange={(e) => handleSectionChange(e.target.value)}>
                <option value="">Select a Section</option>
                {examData.find((exam) => exam.examName === examName).sections.map((section) => (
                  <option key={section.name} value={section.name}>
                    {section.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="difficulty">
              <Form.Label>Difficulty Level:</Form.Label>
              <Form.Control as="select" onChange={(e) => handleDifficultyChange(e.target.value)}>
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="question">
              <Form.Label>Question:</Form.Label>
              <Form.Control as="textarea" onChange={(e) => handleQuestionChange(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="options">
              <Form.Label>Options:</Form.Label>
              {currentQuestion.options.map((option, index) => (
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
              <Form.Control as="select" onChange={(e) => handleCorrectOptionChange(parseInt(e.target.value, 10))}>
                {currentQuestion.options.map((option, index) => (
                  <option key={index} value={index}>
                    Option {index + 1}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="explanation">
              <Form.Label>Explanation:</Form.Label>
              <Form.Control as="textarea" onChange={(e) => handleExplanationChange(e.target.value)} />
            </Form.Group>

            <Button variant="primary" onClick={handleAddQuestion}>
              Add Question
            </Button>
          </div>
        )}

        {questions.length > 0 && (
          <div>
            <h2>Questions Added:</h2>
            {questions.map((question, index) => (
              <div key={index}>
                <p>Exam: {question.examName}</p>
                <p>Section: {question.sectionName}</p>
                <p>Difficulty: {question.difficulty}</p>
                <p>Question: {question.question}</p>
                <p>Options: {question.options.join(', ')}</p>
                <p>Correct Option: Option {question.correctOption + 1}</p>
                <p>Explanation: {question.explanation}</p>
              </div>
            ))}
          </div>
        )}

        {questions.length > 0 && (
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default AddExamType;
