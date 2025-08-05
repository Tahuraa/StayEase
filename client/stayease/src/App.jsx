import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/navbar';
import './App.css'; // Assuming you have a CSS file for global styles
import Signup from './pages/signup';
import Login from './components/login';
import ConfirmBooking from './pages/ConfirmBooking';
import MyBookings from './pages/MyBookings'; // Importing MyBookings page



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirm-booking/:roomId" element={<ConfirmBooking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        
      </Routes>
    </Router>
  );
}

export default App;

        
