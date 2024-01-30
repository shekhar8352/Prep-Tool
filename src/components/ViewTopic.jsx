import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Spinner, Modal, Form } from 'react-bootstrap';

const ViewTopics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTopicData, setEditTopicData] = useState({
    id: '',
    name: '',
  });

  const fetchTopics = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }

      const response = await fetch('http://localhost:5000/api/topic', {
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
      console.log('Fetched Topics:', data);
      setTopics(data);
    } catch (error) {
      console.error('Error fetching topics:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleEdit = (id, name) => {
    setEditTopicData({
      id,
      name,
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

      const response = await fetch(`http://localhost:5000/api/topic/${editTopicData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ Newname: editTopicData.name }),
      });

      if (!response.ok) {
        console.error('Edit error:', response.status);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Topic updated successfully');
      setShowEditModal(false);
      fetchTopics();
    } catch (error) {
      console.error('Error updating topic:', error.message);
    }
  };

  const deleteTopic = async (topicId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this topic?');

    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found in local storage');
          return;
        }

        const response = await fetch(`http://localhost:5000/api/topic/${topicId}`, {
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

        console.log('Topic deleted successfully');
        fetchTopics();
      } catch (error) {
        console.error('Error deleting topic:', error.message);
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
          {topics.map((topic) => (
            <Col key={topic._id} md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{topic.name}</Card.Title>
                  <Button variant="warning" onClick={() => handleEdit(topic._id, topic.name)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="ml-2"
                    onClick={() => deleteTopic(topic._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Edit Topic Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Topic</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editTopicName">
              <Form.Label>Topic Name</Form.Label>
              <Form.Control
                type="text"
                value={editTopicData.name}
                onChange={(e) =>
                  setEditTopicData({
                    ...editTopicData,
                    name: e.target.value,
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

export default ViewTopics;
