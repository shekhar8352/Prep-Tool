import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AdminQuestion from "../components/AdminQuestions";
import AdminTopic from "../components/AdminTopic";
import AdminSubject from "../components/AdminSubject";
import AdminMockTest from "../components/AdminMockTest";
import AdminExam from "../components/AdminExam";

function Admin() {
  const [activeTab, setActiveTab] = useState("add-question");
  const [statistics, setStatistics] = useState({
    totalExams: 10,
    totalMockTests: 5,
    totalUsers: 20,
    // Add more statistics as needed
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    // Redirect the user to the home route
    navigate("/");
    window.location.reload();
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "add-question":
        return <AdminQuestion />;
      case "add-topic":
        return <AdminTopic />;
      case "add-subject":
        return <AdminSubject />;
      case "add-mock-test":
        return <AdminMockTest />;
      case "add-exam":
        return <AdminExam />;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div
          id="sidebar"
          className="col-md-3 col-lg-2 d-md-block bg-light sidebar"
        >
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <div
                  className={`nav-link ${
                    activeTab === "add-question" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("add-question")}
                >
                  Question
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={`nav-link ${
                    activeTab === "add-topic" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("add-topic")}
                >
                  Topic
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={`nav-link ${
                    activeTab === "add-subject" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("add-subject")}
                >
                  Subject
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={`nav-link ${
                    activeTab === "add-mock-test" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("add-mock-test")}
                >
                  Mock Test
                </div>
              </li>
              <li className="nav-item">
                <div
                  className={`nav-link ${
                    activeTab === "add-exam" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("add-exam")}
                >
                  Exam
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
