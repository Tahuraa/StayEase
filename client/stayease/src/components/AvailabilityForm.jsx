// components/AvailabilityForm.jsx
import { useState } from 'react';

const AvailabilityForm = ({ onSearch }) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!checkInDate || !checkOutDate) {
      setError('Both dates are required.');
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setError('Check-out must be after check-in.');
      return;
    }

    onSearch({ checkInDate, checkOutDate });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Check Room Availability</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Check-In Date</label>
          <input type="date" value={checkInDate} onChange={e => setCheckInDate(e.target.value)}
            className="w-full border px-3 py-2 rounded" required />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Check-Out Date</label>
          <input type="date" value={checkOutDate} onChange={e => setCheckOutDate(e.target.value)}
            className="w-full border px-3 py-2 rounded" required />
        </div>
      </div>
      <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Search Availability
      </button>
    </form>
  );
};

export default AvailabilityForm;
