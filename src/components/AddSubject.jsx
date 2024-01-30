import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';

const AddSubject = () => {
    const [subjectData, setSubjectData] = useState({
        name: '',
        topic_ids: [],
    });

    const [topics, setTopics] = useState([]);

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/topic', {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                    // Add any additional headers as needed
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setTopics(data);
        } catch (error) {
            console.error('Error fetching topics:', error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubjectData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSelectChange = (selectedOptions) => {
        setSubjectData((prevData) => ({
            ...prevData,
            topic_ids: selectedOptions.map(option => option.value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            name: subjectData.name,
            topic_ids: subjectData.topic_ids,
        };

        try {
            const response = await fetch('http://localhost:5000/api/subject/createSubject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token'),
                    // Add any additional headers as needed
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Subject added successfully:', data);

            // Clear form fields after successful submission
            setSubjectData({
                name: '',
                topic_ids: [],
            });

            // Add any additional logic or state updates as needed
        } catch (error) {
            console.error('Error adding subject:', error.message);
            // Handle errors, display a message to the user, etc.
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Subject</h2>
            <Form onSubmit={handleSubmit}>
                {/* Name */}
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter the subject name"
                        name="name"
                        value={subjectData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Topic IDs */}
                <Form.Group controlId="topic_ids">
                    <Form.Label>Topic IDs</Form.Label>
                    <Select
                        isMulti
                        name="topic_ids"
                        options={topics.map((topic) => ({
                            value: topic._id,
                            label: topic.name,
                        }))}
                        value={subjectData.topic_ids.map((topic_id) => ({
                            value: topic_id,
                            label: topics.find(topic => topic._id === topic_id).name,
                        }))}
                        onChange={handleSelectChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default AddSubject;
