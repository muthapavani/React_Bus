import React, { useState, useEffect } from "react";
import axios from "axios";
import "./userbookings.css";

const Userbookings = ({ token, userId }) => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token || !userId) return;
      try {
        const res = await axios.get(
          `https://django-bus-backend.onrender.com/api/user/${userId}/bookings/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setBookings(res.data);
      } catch (error) {
        setError("Error fetching bookings");
        console.error(error);
      }
    };
    fetchBookings();
  }, [userId, token]);

  return (
    <div className="bookings-container">
      <h2 className="bookings-heading">🚌 My Bus Bookings</h2>
      {error && <p className="error-text">{error}</p>}
      {bookings.length > 0 ? (
        <div className="booking-cards">
          {bookings.map((item) => (
            <div className="booking-card" key={item.id}>
              <h3 className="bus-name">{item.bus?.bus_name || "N/A"}</h3>
              <p><strong>Seat:</strong> {item.seat?.seat_number || "N/A"}</p>
              <p><strong>From:</strong> {item.bus?.origin || "N/A"}</p>
              <p><strong>To:</strong> {item.bus?.destination || "N/A"}</p>
              <p><strong>Start Time:</strong> {item.bus?.start_time || "N/A"}</p>
              <p><strong>Reach Time:</strong> {item.bus?.reach_time || "N/A"}</p>
              <p><strong>Booked At:</strong> {item.booking_time}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-bookings">No bookings found.</p>
      )}
    </div>
  );
};

export default Userbookings;
