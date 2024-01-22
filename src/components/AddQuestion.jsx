import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Select from "react-select";

const AddQuestion = () => {
  const [questionData, setQuestionData] = useState({
    statement: "",
    options: [""],
    answer: "",
    explanation: "",
    difficulty: "Easy",
    exam_ids: [],
    topic_ids: [],
    subject_ids: [],
    exams: [],
    subjects: [],
    topics: [],
  });

  useEffect(() => {
    fetchExams();
    fetchSubjects();
    fetchTopics();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/exam", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setQuestionData((prevData) => ({
        ...prevData,
        exams: data,
      }));
    } catch (error) {
      console.error("Error fetching exams:", error.message);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/subject", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setQuestionData((prevData) => ({
        ...prevData,
        subjects: data,
      }));
    } catch (error) {
      console.error("Error fetching subjects:", error.message);
    }
  };

  const fetchTopics = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/topic", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
          // Add any additional headers as needed
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setQuestionData((prevData) => ({
        ...prevData,
        topics: data,
      }));
    } catch (error) {
      console.error("Error fetching topics:", error.message);
    }
  };

  const handleChange = (e, field, index) => {
    const { name, value } = e.target;

    if (name === field) {
      const updatedArray = [...questionData[field]];
      updatedArray[index] = value;
      setQuestionData((prevData) => ({
        ...prevData,
        [field]: updatedArray,
      }));
    } else {
      setQuestionData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (selectedOption, field) => {
    setQuestionData((prevData) => ({
      ...prevData,
      [field]: selectedOption,
    }));
  };

  const handleAddItem = (field) => {
    setQuestionData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], ""],
    }));
  };

  const handleRemoveItem = (field, index) => {
    const updatedArray = [...questionData[field]];
    updatedArray.splice(index, 1);
    setQuestionData((prevData) => ({
      ...prevData,
      [field]: updatedArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      statement: questionData.statement,
      options: questionData.options,
      answer: questionData.answer,
      explanation: questionData.explanation,
      difficulty: questionData.difficulty,
      exam_ids: questionData.exam_ids.map((exam) => exam.value),
      topic_ids: questionData.topic_ids.map((topic) => topic.value),
      subject_ids: questionData.subject_ids.map((subject) => subject.value),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/question/createQuestion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Question added successfully:", data);

      // Clear form fields after successful submission
      setQuestionData({
        statement: "",
        options: [""],
        answer: "",
        explanation: "",
        difficulty: "Easy",
        exam_ids: [],
        topic_ids: [],
        subject_ids: [],
        exams: questionData.exams,
        subjects: questionData.subjects,
        topics: questionData.topics,
      });

      // Add any additional logic or state updates as needed
    } catch (error) {
      console.error("Error adding question:", error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Question</h2>
      <Form onSubmit={handleSubmit}>
        {/* Statement */}
        <Form.Group controlId="statement">
          <Form.Label>Statement</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the question statement"
            name="statement"
            value={questionData.statement}
            onChange={(e) => handleChange(e)}
            required
          />
        </Form.Group>

        {/* Options */}
        <Form.Group controlId="options">
          <Form.Label>Options</Form.Label>
          {questionData.options.map((option, index) => (
            <div key={index} className="d-flex mb-2">
              <Form.Control
                type="text"
                placeholder={`Option ${index + 1}`}
                name="options"
                value={option}
                onChange={(e) => handleChange(e, "options", index)}
                required
              />
              {index > 0 && (
                <Button
                  variant="danger"
                  className="ml-2"
                  onClick={() => handleRemoveItem("options", index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button variant="primary" onClick={() => handleAddItem("options")}>
            Add Option
          </Button>
        </Form.Group>

        {/* Answer */}
        <Form.Group controlId="answer">
          <Form.Label>Answer</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the correct answer"
            name="answer"
            value={questionData.answer}
            onChange={(e) => handleChange(e)}
            required
          />
        </Form.Group>

        {/* Explanation */}
        <Form.Group controlId="explanation">
          <Form.Label>Explanation</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter the explanation"
            name="explanation"
            value={questionData.explanation}
            onChange={(e) => handleChange(e)}
            required
          />
        </Form.Group>

        {/* Difficulty */}
        <Form.Group controlId="difficulty">
          <Form.Label>Difficulty</Form.Label>
          <Form.Control
            as="select"
            name="difficulty"
            value={questionData.difficulty}
            onChange={(e) => handleChange(e)}
            required
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </Form.Control>
        </Form.Group>

        {/* Exam IDs */}
        <Form.Group controlId="exam_ids">
          <Form.Label>Exam IDs</Form.Label>
          <Select
            isMulti
            name="exam_ids"
            options={questionData.exams.map((exam) => ({
              value: exam._id,
              label: exam.name,
            }))}
            value={questionData.exam_ids}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "exam_ids")
            }
          />
        </Form.Group>

        {/* Topic IDs */}
        <Form.Group controlId="topic_ids">
          <Form.Label>Topic IDs</Form.Label>
          <Select
            isMulti
            name="topic_ids"
            options={questionData.topics.map((topic) => ({
              value: topic._id,
              label: topic.name,
            }))}
            value={questionData.topic_ids}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "topic_ids")
            }
          />
        </Form.Group>

        {/* Subject IDs */}
        <Form.Group controlId="subject_ids">
          <Form.Label>Subject IDs</Form.Label>
          <Select
            isMulti
            name="subject_ids"
            options={questionData.subjects.map((subject) => ({
              value: subject._id,
              label: subject.name,
            }))}
            value={questionData.subject_ids}
            onChange={(selectedOption) =>
              handleSelectChange(selectedOption, "subject_ids")
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddQuestion;
