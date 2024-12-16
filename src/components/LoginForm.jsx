import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    passkey: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", credentials);
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token); // Store token for authorization
        alert("Login successful!");
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      setErrorMessage("Invalid credentials, please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px auto", padding: "10px", width: "300px" }}
        />
        <input
          type="password"
          name="passkey"
          placeholder="Passkey"
          onChange={handleChange}
          required
          style={{ display: "block", margin: "10px auto", padding: "10px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", margin: "20px" }}>
          Login
        </button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default LoginForm;
