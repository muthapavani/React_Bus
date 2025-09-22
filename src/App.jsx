import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Registration from './components/Register';
import Login from './components/Login';
import Buslist from './components/buslist';
import Busseats from './components/seats';
import Userbookings from './components/userbookings';
import Wrapper from './components/wraper';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/all");
  }, [token]);

  const handleLogin = (token, userId, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
    setToken(token);
    setUserId(userId);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUserId(null);
    setUsername(null);
    navigate("/login");
  };

  return (
    <>
      <Wrapper token={token} handlelogout={handleLogout} username={username}>
        <Routes>
          <Route path="/" element={<Buslist />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login onlogin={handleLogin} />} />
          <Route path="/all" element={<Buslist />} />
          <Route path="/bus/:busid" element={<Busseats token={token} />} />
          <Route path="/my_bookings" element={<Userbookings token={token} userId={userId} />} />
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;

