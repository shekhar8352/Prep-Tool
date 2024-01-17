import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import CreateExam from './components/CreateExam';

const isAuthenticated = !!localStorage.getItem('token');

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Home />
            )
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {isAuthenticated ? (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/create-exam" element={<CreateExam />} />
            <Route path="/add-question" element={<AddQuestion />} />
            <Route path="/add-exam-type" element={<AddExamType />} />
          </>
        ) : (
          // Placeholder route for unauthenticated users
          <Route path="*" element={<Navigate to="/" replace />} />
        )} */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/create-exam" element={<CreateExam />} />
      </Routes>
    </Router>
  );
}

export default App;
