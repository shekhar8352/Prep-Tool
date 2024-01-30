import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import AddTopic from "./AddTopic";
import ViewTopic from "./ViewTopic";

const AdminTopic = () => {
  const [activeTab, setActiveTab] = useState("add-topic");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "add-topic":
        return <AddTopic />;
      case "view-topic":
        return <ViewTopic />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <div className="nav-item">
              <div
                className={`nav-link ${
                  activeTab === "add-topic" ? "active" : ""
                }`}
                onClick={() => handleTabClick("add-topic")}
              >
                Add Topic
              </div>
            </div>
            <div className="nav-item">
              <div
                className={`nav-link ${
                  activeTab === "view-topic" ? "active" : ""
                }`}
                onClick={() => handleTabClick("view-topic")}
              >
                Topics
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {renderActiveTab()}
    </Container>
  );
};

export default AdminTopic;
