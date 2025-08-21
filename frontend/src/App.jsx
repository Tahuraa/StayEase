// import React, { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


// Components
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import GuestDashboard from "./components/GuestDashboard";
import StaffDashboard from "./components/StaffDashboard";
import AdminDashboard from "./components/AdminDashboard";
import BookingPage from "./components/BookingPage";
import OrderFood from "./components/OrderFood";
import HousekeepingPage from "./components/HousekeepingPage";
import { Toaster } from "./components/ui/toaster";
// import Navbar from "./components/Navbar";

// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

  
//   useEffect(() => {
//   const fetchUser = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:3000/api/auth/getuser", {
//         method: "POST",
//         headers: { "auth-token": token }
//       });
//       const data = await res.json();
//       setUser({
//         id: data._id,
//         name: data.name,
//         email: data.email,
//         role: data.accountType,
//         number: data.number,
//         country: data.country,
//       });
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchUser();
// }, []);
  

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-amber-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading StayEase...</p>
//         </div>
//       </div>
//     );
//   }

//   const ProtectedRoute = ({ children, allowedRoles }) => {
//     if (!user) {
//       return <Navigate to="/login" replace />;
//     }
    
//     if (allowedRoles && !allowedRoles.includes(user.role)) {
//       return <Navigate to="/" replace />;
//     }
    
//     return children;
//   };

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={user ? <Navigate to={`/${user.role}-dashboard`} replace /> : <HomePage />} />
//           <Route path="/login" element={user ? <Navigate to={`/${user.role}-dashboard`} replace /> : <LoginPage setUser={setUser} />} />
//           <Route path="/signup" element={user ? <Navigate to={`/${user.role}-dashboard`} replace /> : <SignupPage setUser={setUser} />} />
//           <Route path="/booking" element={
//             <ProtectedRoute allowedRoles={['guest']}>
//               <BookingPage user={user} />
//             </ProtectedRoute>
//           } />
//           <Route path="/guest-dashboard" element={
//             <ProtectedRoute allowedRoles={['guest']}>
//               <GuestDashboard user={user} setUser={setUser} />
//             </ProtectedRoute>
//           } />
//           <Route path="/staff-dashboard" element={
//             <ProtectedRoute allowedRoles={['staff']}>
//               <StaffDashboard user={user} setUser={setUser} />
//             </ProtectedRoute>
//           } />
//           <Route path="/admin-dashboard" element={
//             <ProtectedRoute allowedRoles={['admin']}>
//               <AdminDashboard user={user} setUser={setUser} />
//             </ProtectedRoute>
//           } />
//         </Routes>
//         <Toaster />
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import GuestDashboard from "./pages/GuestDashboard";
// import StaffDashboard from "./pages/StaffDashboard";
// import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await fetch("http://localhost:3000/api/auth/getuser", {
            headers: { "auth-token": token },
          });
          if (res.ok) {
            const data = await res.json();
            //test code 

            // ✅ Base user info
            let userData = {
              id: data._id,
              name: data.name,
              email: data.email,
              role: data.accountType, // guest | staff | admin
              number: data.number,
              country: data.country,
            };

            // ✅ Extra fields for staff & admin
            if (data.accountType === "staff" ) {
              userData = {
                ...userData,
                salary: data.salary,
                department: data.department,
                departmentRole: data.departmentRole,
                floorNumber: data.floorNumber,
              };
            }

            setUser(userData);

            //test code
            // setUser({
            //   id: data._id,
            //   name: data.name,
            //   email: data.email,
            //   role: data.accountType, // ✅ must match backend field
            //   number: data.number,
            //   country: data.country,
            // });
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); // ✅ Always stop loading
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>; // ✅ Wait until we know

  return (
    <Router>
      <Toaster />  {/* ✅ This will render all toasts triggered by useToast() */}
      
      <Routes>
        <Route
          path="/"
          element={
            user && user.role
              ? <Navigate to={`/${user.role}-dashboard`} replace />
              : <HomePage />
          }
        />
        <Route
          path="/login"
          element={
            user && user.role
              ? <Navigate to={`/${user.role}-dashboard`} replace />
              : <LoginPage setUser={setUser} />
          }
        />
        <Route
          path="/signup"
          element={
            user && user.role
              ? <Navigate to={`/${user.role}-dashboard`} replace />
              : <SignupPage setUser={setUser} />
          }
        />
        <Route path="/guest-dashboard" element={<GuestDashboard user={user} setUser={setUser} />} />
        <Route path="/staff-dashboard" element={<StaffDashboard user={user} setUser={setUser} />} />
        <Route path="/admin-dashboard" element={<AdminDashboard user={user} setUser={setUser} />} />
        <Route path="/booking" element={<BookingPage user={user} />} />
        <Route path="/order-food" element={<OrderFood user={user} />} />
        <Route path="/housekeeping" element={<HousekeepingPage user={user} />} />
        
        {/* Redirect any unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
