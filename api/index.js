import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
// import roomRoutes from './routes/rooms.js';
// import bookingRoutes from './routes/booking.js';
// import availabilityRoutes from './routes/availability.js'; // Assuming you have this route
// import myBookingRoutes from './routes/mybooking.js'; // Assuming you have this route
import roomTypeRoutes from './routes/roomTypeRoutes.js'; 
import roomRoutes from './routes/roomRoutes.js'; // Assuming you have this route

import bookingRoutes from "./routes/bookingRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import serviceRequestRoutes from "./routes/serviceRequestRoutes.js";
import assignRoomRouter from './routes/assignroomRouter.js'; // Import the assign room router


const app = express();
dotenv.config();


// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.mongo);
    console.log('Database connected successfullyyy');
  } catch (error) {
    throw new Error('Database connection failed');
  }
};
mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});
mongoose.connection.on('connected', () => {
  console.log('Database connected');
});

app.use(cors());
app.get('/', (req, res) => {
  res.send('Welcome to StayEase');
});

//middleware to parse JSON
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/rooms', roomRoutes);
// app.use('/api/booking', bookingRoutes);
// app.use('/api/availability', availabilityRoutes); // Assuming you have this route
// // app.use('/api/rooms', roomRoutes);
// app.use('/api/booking/my', myBookingRoutes); // Assuming you have this route

app.use('/api/roomtypes', roomTypeRoutes);
app.use('/api/rooms', roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/service-requests", serviceRequestRoutes);
app.use('/api/staff', assignRoomRouter); // Use the assign room router


// Start the server
app.listen(3000, () => {
    connect();
  console.log('Server is running on port 3000 yahooo0o ');
});



