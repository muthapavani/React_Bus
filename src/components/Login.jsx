import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Custom styles

function Login({ onlogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://django-bus-backend.onrender.com/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        onlogin(data.token, data.user_id, username);
        navigate("/all");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login to BusBuddy</h2>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="login-input"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />

        <button type="submit" className="login-button">Login</button>

        <p className="login-footer">
          Don't have an account? <span onClick={() => navigate("/register")} className="register-link">Register</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
