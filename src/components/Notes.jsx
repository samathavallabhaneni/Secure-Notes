/*import React, { useState } from "react";
import axios from "axios";

const Notes = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:5000/data/notes",
        { note },
        { headers: { Authorization: token } }
      );
      alert("Note saved successfully!");
      setNote("");
    } catch (error) {
      console.error(error);
      alert("Failed to save note");
    }
  };

  const handleRetrieve = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/data/notes", {
        headers: { Authorization: token },
      });
      setNotes(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to retrieve notes");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Notes</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter your note"
        style={{ width: "300px", height: "100px", margin: "10px" }}
      ></textarea>
      <br />
      <button onClick={handleSave} style={{ padding: "10px 20px", margin: "10px" }}>
        Save Note
      </button>
      <button onClick={handleRetrieve} style={{ padding: "10px 20px", margin: "10px" }}>
        Retrieve Notes
      </button>

      <div>
        {notes.map((note, index) => (
          <p key={index}>{note}</p>
        ))}
      </div>
    </div>
  );
};

export default Notes;


import React, { useState } from "react";
import axios from "axios";

const Notes = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:5000/data/notes",
        { note },
        { headers: { Authorization: token } }
      );
      alert("Note saved successfully!");
      setNote(""); // Clear the input field after saving
    } catch (error) {
      console.error(error);
      alert("Failed to save note");
    }
  };

  const handleRetrieve = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/data/notes", {
        headers: { Authorization: token },
      });
      
      // Assuming the response data is an array of note objects with `content` field
      const decryptedNotes = response.data.map(note => note.content); // Decrypt content if needed
      setNotes(decryptedNotes); // Set the notes' content to display
    } catch (error) {
      console.error(error);
      alert("Failed to retrieve notes");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Notes</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter your note"
        style={{ width: "300px", height: "100px", margin: "10px" }}
      ></textarea>
      <br />
      <button onClick={handleSave} style={{ padding: "10px 20px", margin: "10px" }}>
        Save Note
      </button>
      <button onClick={handleRetrieve} style={{ padding: "10px 20px", margin: "10px" }}>
        Retrieve Notes
      </button>
      
      <div>
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={index} style={{ margin: "10px 0" }}>
              <p>{note}</p> 
            </div>
          ))
        ) : (
          <p>No notes available</p> // Display this if there are no notes
        )}
      </div>
    </div>
  );
};

export default Notes;
*/
import React, { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js"; // Importing crypto-js for decryption

const Notes = () => {
  const [note, setNote] = useState(""); // For the note input
  const [notes, setNotes] = useState([]); // For displaying notes after retrieval

  // Save note to the backend
  const handleSave = async () => {
    // Validate if the note is empty
    if (!note.trim()) {
      alert("Note cannot be empty!");
      return; // Prevent saving empty note
    }

    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:5000/data/notes",
        { note },
        { headers: { Authorization: token } }
      );
      alert("Note saved successfully!");
      setNote(""); // Clear the textarea after saving
    } catch (error) {
      console.error(error);
      alert("Failed to save note");
    }
  };

  // Decrypt the encrypted content
  const decryptContent = (encryptedContent) => {
    const bytes = CryptoJS.AES.decrypt(encryptedContent, process.env.REACT_APP_ENCRYPTION_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8); // Decrypt and return as UTF-8 string
  };

  // Retrieve notes from the backend
  const handleRetrieve = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:5000/data/notes", {
        headers: { Authorization: token },
      });

      // Ensure the response data is an array of note objects with 'content' field
      if (Array.isArray(response.data)) {
        const decryptedNotes = response.data.map((note) => {
          return decryptContent(note.content); // Decrypt the content of each note
        });
        setNotes(decryptedNotes); // Set notes for display
      } else {
        setNotes([]); // In case the response is not an array
        alert("No notes found");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to retrieve notes");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Notes</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter your note"
        style={{ width: "300px", height: "100px", margin: "10px" }}
      ></textarea>
      <br />
      <button onClick={handleSave} style={{ padding: "10px 20px", margin: "10px" }}>
        Save Note
      </button>
      <button onClick={handleRetrieve} style={{ padding: "10px 20px", margin: "10px" }}>
        Retrieve Notes
      </button>
      
      <div>
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={index} style={{ margin: "10px 0" }}>
              <p>{note}</p> {/* Render each decrypted note content */}
            </div>
          ))
        ) : (
          <p>No notes available</p> // Show this when no notes are available
        )}
      </div>
    </div>
  );
};

export default Notes;
