import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddQuestion from '../components/AddQuestions';
import AddTopic from '../components/AddTopic';
import AddSubject from '../components/AddSubject';
import AddMockTest from '../components/AddMockTest';
import AddExam from '../components/AddExam';

function Admin() {
  const [activeTab, setActiveTab] = useState('add-question');
  const [statistics, setStatistics] = useState({
    totalExams: 10,
    totalMockTests: 5,
    totalUsers: 20,
    // Add more statistics as needed
  });

  const handleLogout = () => {
    // Perform logout logic
    console.log('Logout logic');
    // Navigate to the home route or any other route after logout
    // Implement your actual navigation logic here
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'add-question':
        return <AddQuestion />;
      case 'add-topic':
        return <AddTopic />;
      case 'add-subject':
        return <AddSubject />;
      case 'add-mock-test':
        return <AddMockTest />;
      case 'add-exam':
        return <AddExam />;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <div
                  className={`nav-link ${activeTab === 'add-question' ? 'active' : ''}`}
                  onClick={() => handleTabClick('add-question')}
                >
                  Add Question
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={`nav-link ${activeTab === 'add-topic' ? 'active' : ''}`}
                  onClick={() => handleTabClick('add-topic')}
                >
                  Add Topic
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={`nav-link ${activeTab === 'add-subject' ? 'active' : ''}`}
                  onClick={() => handleTabClick('add-subject')}
                >
                  Add Subject
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={`nav-link ${activeTab === 'add-mock-test' ? 'active' : ''}`}
                  onClick={() => handleTabClick('add-mock-test')}
                >
                  Add Mock Test
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={`nav-link ${activeTab === 'add-exam' ? 'active' : ''}`}
                  onClick={() => handleTabClick('add-exam')}
                >
                  Add Exam
                </div>
              </li>
            </ul>
            {/* Logout Button */}
            <button className="btn btn-danger mt-4" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Main content */}
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Admin Dashboard</h1>
          </div>

          {/* Display Statistics */}
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Exams</h5>
                  <p className="card-text">{statistics.totalExams}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Mock Tests</h5>
                  <p className="card-text">{statistics.totalMockTests}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text">{statistics.totalUsers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Render the active tab content */}
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
}

export default Admin;
