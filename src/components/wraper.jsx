import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './wraper.css';

const Wrapper = ({ token, handlelogout, username, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="app-wrapper">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">🚌 BusBuddy</h1>

        {/* Hamburger for small screens */}
        <div className="hamburger" onClick={toggleSidebar}>☰</div>

        {/* Navigation for large screens */}
        <nav className="nav-large">
          {token ? (
            <>
              <span className="welcome-text">Welcome, {username}</span>
              <Link to="/all">Home</Link>
              <Link to="/my_bookings">My Bookings</Link>
              <button onClick={handlelogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>

      {/* Sidebar for small screens */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="close-btn" onClick={closeSidebar}>✖</div>
        {token ? (
          <>
            <span className="welcome-text">Welcome, {username}</span>
            <Link to="/all" onClick={closeSidebar}>Home</Link>
            <Link to="/my_bookings" onClick={closeSidebar}>My Bookings</Link>
            <button onClick={() => { handlelogout(); closeSidebar(); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={closeSidebar}>Login</Link>
            <Link to="/register" onClick={closeSidebar}>Register</Link>
          </>
        )}
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="overlay" onClick={closeSidebar}></div>}

      <main className="app-main">{children}</main>
    </div>
  );
};

export default Wrapper;
