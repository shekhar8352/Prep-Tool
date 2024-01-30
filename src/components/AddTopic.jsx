import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddTopic = () => {
    const [topicData, setTopicData] = useState({
        name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTopicData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            name: topicData.name
        };

        try {
            const response = await fetch('http://localhost:5000/api/topic/createTopic', {
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
            console.log('Topic added successfully:', data);

            // Clear form fields after successful submission
            setTopicData({
                name: ''
            });

            // Add any additional logic or state updates as needed
        } catch (error) {
            console.error('Error adding topic:', error.message);
            // Handle errors, display a message to the user, etc.
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Topic</h2>
            <Form onSubmit={handleSubmit}>
                {/* Name */}
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter the topic name"
                        name="name"
                        value={topicData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default AddTopic;
