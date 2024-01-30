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

const ViewSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSubjectData, setEditSubjectData] = useState({
    id: "",
    name: "",
    topic_ids: [],
  });

  const fetchSubjects = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in local storage");
        return;
      }

      const response = await fetch("http://localhost:5000/api/subject", {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      if (!response.ok) {
        console.error("Fetch error:", response.status);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Subjects:", data);
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleEdit = (id) => {
    const subjectToEdit = subjects.find((subject) => subject._id === id);
    setEditSubjectData({
      id: subjectToEdit._id,
      name: subjectToEdit.name,
      topic_ids: subjectToEdit.topic_ids,
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
      console.log(editSubjectData);
      const response = await fetch(
        `http://localhost:5000/api/subject/${editSubjectData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify(editSubjectData),
        }
      );

      if (!response.ok) {
        console.error("Edit error:", response.status);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Subject updated successfully");
      setShowEditModal(false);
      fetchSubjects();
    } catch (error) {
      console.error("Error updating subject:", error.message);
    }
  };

  const deleteSubject = async (subjectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );

    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in local storage");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/subject/${subjectId}`,
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

        console.log("Subject deleted successfully");
        fetchSubjects();
      } catch (error) {
        console.error("Error deleting subject:", error.message);
      }
    }
  };

  return (
    <Container className="mt-4">
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Row>
      ) : (
        <Row>
          {subjects.map((subject) => (
            <Col key={subject._id} md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{subject.name}</Card.Title>
                  <Card.Text>
                    <strong>Topic IDs:</strong> {subject.topic_ids.join(", ")}
                  </Card.Text>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(subject._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() => deleteSubject(subject._id)}
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
          <Modal.Title>Edit Subject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editSubjectName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editSubjectData.name}
                onChange={(e) =>
                  setEditSubjectData({
                    ...editSubjectData,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="editTopicIds">
              <Form.Label>Topic IDs (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={editSubjectData.topic_ids.join(", ")}
                onChange={(e) =>
                  setEditSubjectData({
                    ...editSubjectData,
                    topic_ids: e.target.value.split(", "),
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

export default ViewSubjects;
