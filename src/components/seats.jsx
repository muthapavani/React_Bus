import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Seats.css";

const Busseats = ({ token }) => {
  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const { busid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const res = await axios.get(`https://django-bus-backend.onrender.com/api/buses/${busid}/`);
        setBus(res.data);
        setSeats(res.data.Seats || []);
      } catch (error) {
        console.error("Error fetching bus:", error);
      }
    };
    fetchBus();
  }, [busid]);

  const handleBook = async (seatId, seatNumber) => {
    if (!token) {
      alert("Please login to book a seat.");
      navigate("/login");
      return;
    }

    const confirmBooking = window.confirm(
      `Do you want to book Seat No: ${seatNumber}?`
    );
    if (!confirmBooking) return;

    try {
      await axios.post(
        "https://django-bus-backend.onrender.com/api/booking/",
        { seat: seatId },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      alert(`✅ Seat ${seatNumber} booked successfully!`);
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === seatId ? { ...seat, is_booked: true } : seat
        )
      );
    } catch (error) {
      alert(error.response?.data?.error || "Booking failed. Please try again.");
    }
  };

  // Group seats into rows of 4 (2 left + aisle + 2 right)
  const renderBusLayout = () => {
    if (!Array.isArray(seats) || seats.length === 0) {
      return <p>No seat information available for this bus.</p>;
    }

    const sortedSeats = [...seats].sort(
      (a, b) => a.seat_number - b.seat_number
    );

    const rows = [];
    for (let i = 0; i < sortedSeats.length; i += 4) {
      const leftSeats = sortedSeats.slice(i, i + 2);
      const rightSeats = sortedSeats.slice(i + 2, i + 4);

      rows.push(
        <div className="seat-row" key={i}>
          <div className="seat-side">
            {leftSeats.map((seat) => (
              <button
                key={seat.id}
                onClick={() => handleBook(seat.id, seat.seat_number)}
                disabled={seat.is_booked}
                className={`seat-btn ${seat.is_booked ? "booked" : "available"}`}
              >
                {seat.is_booked
                  ? ` ${seat.seat_number}\nBooked`
                  : ` ${seat.seat_number}\nAvailable`}
              </button>
            ))}
          </div>
          <div className="aisle"></div>
          <div className="seat-side">
            {rightSeats.map((seat) => (
              <button
                key={seat.id}
                onClick={() => handleBook(seat.id, seat.seat_number)}
                disabled={seat.is_booked}
                className={`seat-btn ${seat.is_booked ? "booked" : "available"}`}
              >
                {seat.is_booked
                  ? `${seat.seat_number}\nBooked`
                  : `${seat.seat_number}\nAvailable`}
              </button>
            ))}
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="busseats-container">
      {bus ? (
        <>
          <div className="bus-info">
            <h2>🚌 {bus.bus_name}</h2>
            <p><strong>Bus Number:</strong> {bus.number}</p>
            <p><strong>From:</strong> {bus.origin}</p>
            <p><strong>To:</strong> {bus.destination}</p>
            <p><strong>Bus Type:</strong> {bus.features}</p>
            <p><strong>Departure Time:</strong> {bus.start_time}</p>
            <p><strong>Arrival Time:</strong> {bus.reach_time}</p>
          </div>

          <h3 className="seat-heading">🎟️ Select Your Seat</h3>
          <div className="bus-layout">{renderBusLayout()}</div>
        </>
      ) : (
        <p>⏳ Loading bus details, please wait...</p>
      )}
    </div>
  );
};

export default Busseats;
