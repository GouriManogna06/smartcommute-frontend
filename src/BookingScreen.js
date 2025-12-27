import React from "react";
import "./BookingScreen.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMotorcycle, FaCarSide, FaWheelchair, FaDog, FaChild } from "react-icons/fa";

const BookingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");

  const vehicles = {
    general: [
      { name: "Bike", icon: <FaMotorcycle />, price: "₹25/km" },
      { name: "Auto", icon: <FaCarSide />, price: "₹18/km" }
    ],
    special: [
      { name: "Wheelchair Van", icon: <FaWheelchair />, price: "₹30/km" },
      { name: "Low-floor Auto", icon: <FaWheelchair />, price: "₹22/km" }
    ],
    helper: [
      { name: "Helper Auto", icon: <FaCarSide />, price: "₹25/km" },
      { name: "Helper Van", icon: <FaWheelchair />, price: "₹35/km" }
    ],
    pet: [
      { name: "Pet-Friendly Auto", icon: <FaDog />, price: "₹20/km" },
      { name: "Pet Van", icon: <FaDog />, price: "₹32/km" }
    ],
    child: [
      { name: "Child-Safe Auto", icon: <FaChild />, price: "₹20/km" },
      { name: "Family Van", icon: <FaCarSide />, price: "₹28/km" }
    ],
    infant: [
      { name: "Infant-Safe Auto", icon: <FaChild />, price: "₹20/km" },
      { name: "Baby Carrier Van", icon: <FaCarSide />, price: "₹30/km" }
    ]
  };

  const list = vehicles[category] || [];

  return (
    <div className="booking-page">
      <h2 className="booking-title">Choose Your Vehicle</h2>

      <div className="vehicle-list">
        {list.map((v, index) => (
          <div key={index} className="vehicle-card">
            <div className="vehicle-icon">{v.icon}</div>
            <div className="vehicle-info">
              <p className="vehicle-name">{v.name}</p>
              <p className="vehicle-price">{v.price}</p>
            </div>
            <button className="book-btn">Book</button>
          </div>
        ))}
      </div>

      <button className="back-btn" onClick={() => navigate("/")}>⬅ Back</button>
    </div>
  );
};

export default BookingScreen;
