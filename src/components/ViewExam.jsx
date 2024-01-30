import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Spinner, Modal, Form } from 'react-bootstrap';

const ViewExams = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editExamData, setEditExamData] = useState({
    id: '',
    newName: '',
    newSubject_ids: [],
    newTest_ids: [],
    newAbout_exam: '',
  });

  const fetchExams = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }

      const response = await fetch('http://localhost:5000/api/exam', {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      if (!response.ok) {
        console.error('Fetch error:', response.status);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched Exams:', data);
      setExams(data);
    } catch (error) {
      console.error('Error fetching exams:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleEdit = (id) => {
    const examToEdit = exams.find((exam) => exam._id === id);
    setEditExamData({
      id: examToEdit._id,
      newName: examToEdit.name,
      newSubject_ids: examToEdit.subject_ids,
      newTest_ids: examToEdit.test_ids,
      newAbout_exam: examToEdit.about_exam,
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/exam/${editExamData.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify(editExamData),
        }
      );

      if (!response.ok) {
        console.error('Edit error:', response.status);
        console.error('Response body:', await response.text());
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Exam updated successfully');
      setShowEditModal(false);
      fetchExams();
    } catch (error) {
      console.error('Error updating exam:', error.message);
    }
  };

  const deleteExam = async (examId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this exam?');

    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found in local storage');
          return;
        }

        const response = await fetch(`http://localhost:5000/api/exam/${examId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });

        if (!response.ok) {
          console.error('Delete error:', response.status);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log('Exam deleted successfully');
        fetchExams();
      } catch (error) {
        console.error('Error deleting exam:', error.message);
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
          {exams.map((exam) => (
            <Col key={exam._id} md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{exam.name}</Card.Title>
                  <Card.Text>
                    <strong>Subject IDs:</strong> {exam.subject_ids.join(', ')}
                  </Card.Text>
                  <Card.Text>
                    <strong>Test IDs:</strong> {exam.test_ids.join(', ')}
                  </Card.Text>
                  <Card.Text>
                    <strong>About Exam:</strong> {exam.about_exam.join(', ')}
                  </Card.Text>
                  <Button variant="warning" onClick={() => handleEdit(exam._id)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() => deleteExam(exam._id)}
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
          <Modal.Title>Edit Exam</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editExamName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editExamData.newName}
                onChange={(e) =>
                  setEditExamData({
                    ...editExamData,
                    newName: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="editSubjectIds">
              <Form.Label>Subject IDs (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={editExamData.newSubject_ids.join(', ')}
                onChange={(e) =>
                  setEditExamData({
                    ...editExamData,
                    newSubject_ids: e.target.value.split(', '),
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="editTestIds">
              <Form.Label>Test IDs (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={editExamData.newTest_ids.join(', ')}
                onChange={(e) =>
                  setEditExamData({
                    ...editExamData,
                    newTest_ids: e.target.value.split(', '),
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="editAboutExam">
              <Form.Label>About Exam (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={editExamData.newAbout_exam}
                onChange={(e) =>
                  setEditExamData({
                    ...editExamData,
                    newAbout_exam: e.target.value,
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

export default ViewExams;
