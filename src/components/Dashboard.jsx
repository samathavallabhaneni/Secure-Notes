import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Redirect to respective component
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Secure Notes Dashboard</h1>
      <div>
        <button
          onClick={() => handleNavigation("/dashboard/notes")}
          style={{ padding: "10px 20px", margin: "20px" }}
        >
          Notes
        </button>
        <button
          onClick={() => handleNavigation("/dashboard/passwords")}
          style={{ padding: "10px 20px", margin: "20px" }}
        >
          Passwords
        </button>
        <button
          onClick={() => handleNavigation("/dashboard/links")}
          style={{ padding: "10px 20px", margin: "20px" }}
        >
          Links
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
