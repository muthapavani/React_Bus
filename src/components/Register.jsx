import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

const Registration = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://django-bus-backend.onrender.com/api/register/", form);
      setMessage("✅ Registration Successful. Redirecting to Login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      if (error.response?.data?.username) {
        setMessage("⚠️ User already exists. Redirecting to Login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("Registration Failed");
      }
    }
  };

  return (
    <div className="login-container"> 
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="login-title">Register</h3>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="login-input"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="login-input"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="login-input"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button">
          Register
        </button>
        {message && <p className="login-footer">{message}</p>}
      </form>
    </div>
  );
};

export default Registration;
