import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    passkey: "",
    confirmPasskey: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.passkey !== userData.confirmPasskey) {
      alert("Passkeys do not match!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/auth/register", userData);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Registration failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input type="password" name="passkey" placeholder="Passkey" onChange={handleChange} required />
      <input type="password" name="confirmPasskey" placeholder="Confirm Passkey" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
