// const Home = () => {
//   const email = localStorage.getItem('email');
//   const token = localStorage.getItem('token');

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Welcome to StayEase Dashboard</h1>
//       <p className="text-lg">Hello, <span className="font-semibold">{email}</span></p>
//       <p className="text-sm text-gray-600 mt-2">Your token: <code>{token}</code></p>
//     </div>
//   );
// };

// export default Home;
// import React from 'react';

// pages/Home.jsx
// import { useState } from 'react';
// import AvailabilityForm from '../components/AvailabilityForm';
// import RoomCard from '../components/RoomCard';


// const Home = () => {
//   const [availableRooms, setAvailableRooms] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchError, setSearchError] = useState('');
//   const [checkInDate, setCheckInDate] = useState('');
//   const [checkOutDate, setCheckOutDate] = useState('');


//   const handleSearch = async ({ checkInDate, checkOutDate }) => {
//     setLoading(true);
//     setSearchError('');
//     setAvailableRooms([]);

//     // 👇 store these dates in state
//     setCheckInDate(checkInDate);
//     setCheckOutDate(checkOutDate);
//     const dates = { checkInDate, checkOutDate };

//     try {
//       const res = await fetch('http://localhost:3000/api/availability', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(dates),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.message || 'Failed to fetch');
//       }

//       setAvailableRooms(data.availableRooms);
//     } catch (err) {
//       setSearchError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <AvailabilityForm onSearch={handleSearch} />
//       {loading && <p className="text-center mt-4">Loading available rooms...</p>}
//       {searchError && <p className="text-red-500 text-center mt-4">{searchError}</p>}
//       {availableRooms.length > 0 && (
//         <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
//           {availableRooms.map(room => (
//             <RoomCard
//     key={room._id}
//     room={room}
//     checkInDate={checkInDate}
//     checkOutDate={checkOutDate}
//   />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;



import hotel from '../assets/hotel.jpg'; // Replace with your actual image path

import { useState } from 'react';
import AvailabilityForm from '../components/AvailabilityForm';
import RoomCard from '../components/RoomCard';

const Home = () => {
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleSearch = async ({ checkInDate, checkOutDate }) => {
    setLoading(true);
    setSearchError('');
    setAvailableRooms([]);

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    try {
      const res = await fetch('http://localhost:3000/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkInDate, checkOutDate }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch');

      setAvailableRooms(data.availableRooms);
    } catch (err) {
      setSearchError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
  className="min-h-screen bg-cover bg-center bg-no-repeat p-4"
  style={{ backgroundImage: `url(${hotel})` }}
>


      
        <div className="max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg p-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-transparent bg-clip-text drop-shadow-xl">
            Find Your Perfect Room
          </h1>
          <AvailabilityForm onSearch={handleSearch} />
        </div>

        {loading && (
          <p className="text-center text-white text-xl mt-6 animate-pulse">
            Loading available rooms...
          </p>
        )}

        {searchError && (
          <p className="text-red-400 text-center mt-4 font-semibold">
            {searchError}
          </p>
        )}

        {availableRooms.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {availableRooms.map((room) => (
              <RoomCard
                key={room._id}
                room={room}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
              />
            ))}
          </div>
        )}
      </div>
    
  );
};

export default Home;
