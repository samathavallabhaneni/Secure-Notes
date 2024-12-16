import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import Notes from "./components/Notes";
import Passwords from "./components/Passwords";
import Links from "./components/Links";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/notes" element={<Notes />} />
        <Route path="/dashboard/passwords" element={<Passwords />} />
        <Route path="/dashboard/links" element={<Links />} />
      </Routes>
    </Router>
  );
}

export default App;
