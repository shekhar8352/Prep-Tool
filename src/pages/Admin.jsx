import React from 'react';
// import { BrowserRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
// import CreateExam from '../components/CreateExam';
// import AddQuestion from '../components/AddQuestion';
// import AddExamType from '../components/AddExamType';


const Admin = () => {
  return (
      <div>
        <h1>Admin Dashboard</h1>
        <ul>
          <li>
            <Link to="/create-exam">Create Exam</Link>
          </li>
          <li>
            <Link to="/add-question">Add Question</Link>
          </li>
          <li>
            <Link to="/add-exam-type">Add Exam Type</Link>
          </li>
        </ul>
        <hr />

      </div>

  );
};

export default Admin;
