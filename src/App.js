// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
// import SignupPage from './pages/SignUp';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
