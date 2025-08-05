// import React from 'react';
// import sea from '../assets/sea.jpg'; // Example image, replace with actual image path
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// const RoomCard = ({ room , checkInDate, checkOutDate }) => {
//   return (
//     <div className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition">
//       <div className="flex justify-between items-center mb-2">
//         <img src={sea} alt={room.roomType} className="w-full h-48 object-cover" />
//         <h3 className="text-xl font-bold text-blue-700">{room.roomType}</h3>
//         <span className="text-gray-500 text-sm">Room #{room.roomNumber}</span>
//         {/* <span className="text-gray-500 text-sm">Room #{room._id}</span> */}
//       </div>

//       <p className="text-gray-700 mb-1">👥 Capacity: {room.capacity} guest{room.capacity > 1 ? 's' : ''}</p>
//       <p className="text-gray-700 mb-1">💰 ৳{room.pricePerNight} per night</p>

//       <p className={`text-sm font-medium ${room.isAvailable ? 'text-green-600' : 'text-red-500'}`}>
//         {room.isAvailable ? 'Available' : 'Not Available'}
//       </p>

//       {/* Amenities */}
//       {room.amenities?.length > 0 && (
//         <div className="mt-2">
//           <h4 className="text-sm font-semibold text-gray-800">🛎️ Amenities:</h4>
//           <ul className="list-disc list-inside text-gray-600 text-sm">
//             {room.amenities.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Ratings */}
//       <div className="mt-3 text-sm text-gray-700">
//         ⭐ {room.ratings?.average?.toFixed(1) || 0} ({room.ratings?.count || 0} reviews)
//       </div>
//       <Link
//         to={`/confirm-booking/${room._id}?checkIn=${checkInDate}&checkOut=${checkOutDate}`}
//       >
//         <button>View & Book</button>
//       </Link>
//     </div>
//   );
// };

// export default RoomCard;



import React from 'react';
// import sea from '../assets/sea.jpg'; // Replace with dynamic image per roomType if you want
// import { Link } from 'react-router-dom';

// const RoomCard = ({ room, checkInDate, checkOutDate }) => {
//   return (
//     <div className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col">
      
//       <img
//         src={sea}
//         alt={room.roomType}
//         className="w-full h-48 object-cover rounded-md mb-4"
//       />

//       <div className="flex justify-between items-center mb-2">
//         <h3 className="text-xl font-bold text-blue-700">{room.roomType}</h3>
//         <span className="text-gray-500 text-sm">Room #{room.roomNumber}</span>
//       </div>

//       <p className="text-gray-700 mb-1">👥 Capacity: {room.capacity} guest{room.capacity > 1 ? 's' : ''}</p>
//       <p className="text-gray-700 mb-1 font-semibold">💰 ৳{room.pricePerNight} per night</p>

//       <p className={`text-sm font-medium mb-3 ${room.isAvailable ? 'text-green-600' : 'text-red-500'}`}>
//         {room.isAvailable ? 'Available' : 'Not Available'}
//       </p>

//       {room.amenities?.length > 0 && (
//         <div className="mb-3">
//           <h4 className="text-sm font-semibold text-gray-800 mb-1">🛎️ Amenities:</h4>
//           <ul className="list-disc list-inside text-gray-600 text-sm max-h-20 overflow-auto">
//             {room.amenities.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="mt-auto flex items-center justify-between">
//         <div className="text-sm text-gray-700">
//           ⭐ {room.ratings?.average?.toFixed(1) || 0} ({room.ratings?.count || 0} reviews)
//         </div>
//         <Link to={`/confirm-booking/${room._id}?checkIn=${checkInDate}&checkOut=${checkOutDate}`}>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
//             View & Book
//           </button>
//         </Link>
//       </div>

//     </div>
//   );
// };

// export default RoomCard;


import { Link } from "react-router-dom";
import { FaUsers, FaStar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdOutlineRoomPreferences } from "react-icons/md";
import sea from "../assets/sea.jpg"; // replace with your actual image

const RoomCard = ({ room, checkInDate, checkOutDate }) => {
  return (
    <div className="border rounded-xl p-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col gap-3">
      
      <img
        src={sea}
        alt={room.roomType}
        className="w-full h-48 object-cover rounded-md"
      />

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold text-blue-800">{room.roomType}</h3>
          <p className="text-sm text-gray-500">Room #{room.roomNumber}</p>
        </div>
        <div className="text-right text-blue-700 font-semibold text-lg">
          ৳{room.pricePerNight} <span className="text-sm text-gray-500">/night</span>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-700">
        <p className="flex items-center gap-1"><FaUsers /> {room.capacity} guest{room.capacity > 1 ? "s" : ""}</p>
        <p className={`flex items-center gap-1 font-medium ${room.isAvailable ? "text-green-600" : "text-red-500"}`}>
          {room.isAvailable ? <FaCheckCircle /> : <FaTimesCircle />}
          {room.isAvailable ? "Available" : "Not Available"}
        </p>
      </div>

      {room.amenities?.length > 0 && (
        <div className="text-sm text-gray-800 mt-2">
          <h4 className="font-semibold mb-1 flex items-center gap-1"><MdOutlineRoomPreferences /> Amenities:</h4>
          <ul className="list-disc list-inside text-gray-600 grid grid-cols-2 gap-1 max-h-24 overflow-auto pr-2">
            {room.amenities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between pt-3 border-t">
        <div className="text-sm text-yellow-600 font-medium flex items-center gap-1">
          <FaStar className="text-yellow-500" />
          {room.ratings?.average?.toFixed(1) || "0.0"} 
          <span className="text-gray-500">({room.ratings?.count || 0} reviews)</span>
        </div>

        <Link to={`/confirm-booking/${room._id}?checkIn=${checkInDate}&checkOut=${checkOutDate}`}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-md shadow transition">
            View & Book
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;



