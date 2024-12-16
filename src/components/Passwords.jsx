import React, { useState } from "react";
import axios from "axios";

const Passwords = () => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [passwords, setPasswords] = useState([]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:5000/data/passwords",
        { title, password },
        { headers: { Authorization: token } }
      );
      alert("Password saved successfully!");
      setTitle("");
      setPassword("");
    } catch (error) {
      console.error(error);
      alert("Failed to save password");
    }
  };

  const handleRetrieve = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/data/passwords", {
        headers: { Authorization: token },
      });
      setPasswords(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to retrieve passwords");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Passwords</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title (e.g., LinkedIn)"
        style={{ display: "block", margin: "10px auto", padding: "10px", width: "300px" }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{ display: "block", margin: "10px auto", padding: "10px", width: "300px" }}
      />
      <button onClick={handleSave} style={{ padding: "10px 20px", margin: "10px" }}>
        Save Password
      </button>
      <button onClick={handleRetrieve} style={{ padding: "10px 20px", margin: "10px" }}>
        Retrieve Passwords
      </button>
      <div>
        {passwords.map((item, index) => (
          <p key={index}>
            {item.title}: {item.password}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Passwords;
