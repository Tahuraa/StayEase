// src/pages/MyBookings.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import sea from '../assets/sea.jpg'; // Replace with dynamic image per roomType if you want

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/booking/my', {
        headers: {
          "auth-token": token,
        },
      });
      setBookings(res.data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading your bookings...</div>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-6">
//       <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
//       {bookings.length === 0 ? (
//         <p>You have no bookings yet.</p>
//       ) : (
//         bookings.map((booking) => (
//           <div key={booking._id} className="mb-4 p-4 shadow-md rounded-xl">
//             <img
//                     src={sea}
//                     alt={booking.roomId?.name}
//                     className="w-full h-48 object-cover rounded-md mb-4"
//                   />
//             <h3 className="text-lg font-semibold">{booking.roomId?.name}</h3>
//             <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
//             <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
//             <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden"
            >
              <img
                src={sea}
                alt={booking.roomId?.name || "Room Image"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">{booking.roomType}</h3>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Check-in: {new Date(booking.checkInDate).toLocaleDateString()}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-lg font-medium mt-2">Total Price: <span className="text-green-600">${booking.totalPrice}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
