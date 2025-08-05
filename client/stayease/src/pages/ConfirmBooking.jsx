import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

import sea from '../assets/sea.jpg'; // Replace with dynamic image per roomType if you want

const ConfirmBooking = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const checkInDate = searchParams.get("checkIn");
  const checkOutDate = searchParams.get("checkOut");

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState("");

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/rooms/${roomId}`);// create this api endpoint
        setRoom(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch room details", err);
        setBookingStatus("Failed to load room data.");
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (!token) {
      alert("Please login to book a room.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/booking",
        {
          roomId,
          checkInDate,
          checkOutDate,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      setBookingStatus("Booking confirmed!");
      setTimeout(() => navigate("/my-bookings"), 2000);
    } catch (err) {
      console.error("Booking failed", err);
      setBookingStatus(
        err.response?.data?.message || "Booking failed. Try again."
      );
    }
  };

  if (loading) return <div>Loading room details...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto shadow-lg rounded-lg bg-white mt-6">
      <h2 className="text-2xl font-bold mb-4">Confirm Your Booking</h2>

      <img
        src={sea}
        alt={room.name}
        className="w-full h-64 object-cover rounded"
      />
      <h3 className="text-xl font-semibold mt-4">{room.name}</h3>
      <p className="text-gray-600">{room.description}</p>
      <p className="mt-2">Price per night: ${room.pricePerNight}</p>

      <div className="mt-4 border-t pt-4">
        <p>
          <strong>Check-in:</strong> {checkInDate}
        </p>
        <p>
          <strong>Check-out:</strong> {checkOutDate}
        </p>
        <p>
          <strong>Total Nights:</strong>{" "}
          {Math.ceil(
            (new Date(checkOutDate) - new Date(checkInDate)) /
              (1000 * 60 * 60 * 24)
          )}
        </p>
        <p className="mt-2 text-lg font-semibold">
          Total Price: $
          {Math.ceil(
            (new Date(checkOutDate) - new Date(checkInDate)) /
              (1000 * 60 * 60 * 24)
          ) * room.pricePerNight}
        </p>
      </div>

      <button
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={handleBooking}
      >
        Gpay & Book Now
      </button>

      {bookingStatus && (
        <div className="mt-4 text-red-600 font-medium">{bookingStatus}</div>
      )}
    </div>
  );
};

export default ConfirmBooking;
