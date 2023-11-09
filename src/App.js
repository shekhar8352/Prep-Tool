// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
// import SignupPage from './pages/SignUp';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import CreateExam from './components/CreateExam';
import AddExamType from './components/AddExamType';
import AddQuestion from './components/AddQuestion';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/create-exam" element={<CreateExam />} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/add-exam-type" element={<AddExamType />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
