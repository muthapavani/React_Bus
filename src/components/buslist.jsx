import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Buslist.css";

const Buslist = () => {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await axios.get("https://django-bus-backend.onrender.com/api/buses/");
        setBuses(res.data);
      } catch (error) {
        console.log("Error fetching buses", error);
      }
    };
    fetchBuses();
  }, []);

  const handleViewSeats = (id) => {
    navigate(`/bus/${id}`);
  };

  return (
    <div className="buslist-page">
      <h1 className="page-title">🚌 Available Buses</h1>
      <div className="buslist-container">
        {buses.length === 0 ? (
          <p className="no-buses">No buses available right now.</p>
        ) : (
          buses.map((bus) => (
            <div key={bus.id} className="bus-card">
              <h2>{bus.bus_name}</h2>
              <p><strong>Bus Number:</strong> {bus.number}</p>
              <p><strong>From:</strong> {bus.origin}</p>
              <p><strong>To:</strong> {bus.destination}</p>
              <p><strong>Type:</strong> {bus.features}</p>
              <p><strong>Departure:</strong> {bus.start_time}</p>
              <p><strong>Arrival:</strong> {bus.reach_time}</p>
              <button onClick={() => handleViewSeats(bus.id)}>
                View Seats
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Buslist;
