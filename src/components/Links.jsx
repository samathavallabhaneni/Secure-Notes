import React, { useState } from "react";
import axios from "axios";

const Links = () => {
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:5000/data/links",
        { link },
        { headers: { Authorization: token } }
      );
      alert("Link saved successfully!");
      setLink("");
    } catch (error) {
      console.error(error);
      alert("Failed to save link");
    }
  };

  const handleRetrieve = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/data/links", {
        headers: { Authorization: token },
      });
      setLinks(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to retrieve links");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Links</h2>
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Enter a secret link"
        style={{ display: "block", margin: "10px auto", padding: "10px", width: "300px" }}
      />
      <button onClick={handleSave} style={{ padding: "10px 20px", margin: "10px" }}>
        Save Link
      </button>
      <button onClick={handleRetrieve} style={{ padding: "10px 20px", margin: "10px" }}>
        Retrieve Links
      </button>
      <div>
        {links.map((link, index) => (
          <p key={index}>{link}</p>
        ))}
      </div>
    </div>
  );
};

export default Links;
