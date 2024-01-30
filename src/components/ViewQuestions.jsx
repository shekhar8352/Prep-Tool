import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  Container,
  Row,
  Col,
  Spinner,
  Modal,
} from "react-bootstrap";

const ViewQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editQuestionData, setEditQuestionData] = useState({
    id: "",
    statement: "",
    options: [],
    answer: "",
    explanation: "",
    difficulty: "",
    exam_ids: [],
    topic_ids: [],
    subject_ids: [],
  });

  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in local storage");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/question/filter",
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      if (!response.ok) {
        console.error("Fetch error:", response.status);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Questions:", data);
      setQuestions(data);
      setFilteredQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleEdit = (id) => {
    const questionToEdit = questions.find((question) => question._id === id);
    setEditQuestionData({
      id: questionToEdit._id,
      statement: questionToEdit.statement,
      options: questionToEdit.options,
      answer: questionToEdit.answer,
      explanation: questionToEdit.explanation,
      difficulty: questionToEdit.difficulty,
      exam_ids: questionToEdit.exam_ids,
      topic_ids: questionToEdit.topic_ids,
      subject_ids: questionToEdit.subject_ids,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in local storage");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/question/${editQuestionData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify(editQuestionData),
        }
      );

      if (!response.ok) {
        console.error("Edit error:", response.status);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Question updated successfully");
      setShowEditModal(false);
      fetchQuestions();
    } catch (error) {
      console.error("Error updating question:", error.message);
    }
  };

  const deleteQuestion = async (questionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in local storage");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/question/${questionId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        if (!response.ok) {
          console.error("Delete error:", response.status);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log("Question deleted successfully");
        fetchQuestions();
      } catch (error) {
        console.error("Error deleting question:", error.message);
      }
    }
  };

  const handleSearch = () => {
    const filtered = questions.filter((question) =>
      question.statement.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuestions(filtered);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <Form.Group controlId="search">
            <Form.Control
              type="text"
              placeholder="Search by statement"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch} className="mt-2">
              Search
            </Button>
          </Form.Group>
        </Col>
      </Row>
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Row>
      ) : (
        <Row>
          {filteredQuestions.map((question) => (
            <Col key={question._id} md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{question.statement}</Card.Title>
                  <Card.Text>
                    <strong>Options:</strong> {question.options.join(", ")}
                  </Card.Text>
                  <Card.Text>
                    <strong>Answer:</strong> {question.answer}
                  </Card.Text>
                  <Card.Text>
                    <strong>Explanation:</strong> {question.explanation}
                  </Card.Text>
                  <Card.Text>
                    <strong>Difficulty:</strong> {question.difficulty}
                  </Card.Text>
                  <Card.Text>
                    <strong>Exam IDs:</strong> {question.exam_ids.join(", ")}
                  </Card.Text>
                  <Card.Text>
                    <strong>Subject IDs:</strong>{" "}
                    {question.subject_ids.join(", ")}
                  </Card.Text>
                  <Card.Text>
                    <strong>Topic IDs:</strong> {question.topic_ids.join(", ")}
                  </Card.Text>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(question._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() => deleteQuestion(question._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editStatement">
              <Form.Label>Statement</Form.Label>
              <Form.Control
                type="text"
                value={editQuestionData.statement}
                onChange={(e) =>
                  setEditQuestionData({
                    ...editQuestionData,
                    statement: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="editOptions">
              <Form.Label>Options (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={editQuestionData.options.join(", ")}
                onChange={(e) =>
                  setEditQuestionData({
                    ...editQuestionData,
                    options: e.target.value.split(", "),
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="editAnswer">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                value={editQuestionData.answer}
                onChange={(e) =>
                  setEditQuestionData({
                    ...editQuestionData,
                    answer: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="editExplanation">
              <Form.Label>Explanation</Form.Label>
              <Form.Control
                type="text"
                value={editQuestionData.explanation}
                onChange={(e) =>
                  setEditQuestionData({
                    ...editQuestionData,
                    explanation: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="editDifficulty">
              <Form.Label>Difficulty</Form.Label>
              <Form.Control
                type="text"
                value={editQuestionData.difficulty}
                onChange={(e) =>
                  setEditQuestionData({
                    ...editQuestionData,
                    difficulty: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ViewQuestions;