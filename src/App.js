import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AllRequests from './pages/AllRequests';
import RequestBlood from './pages/RequestBlood';
import UserProfile from './pages/UserProfile';
import ChangePassword from './pages/ChangePassword';
import ViewRequests from './pages/ViewRequests';
import ManageRequests from './pages/ManageRequests';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import RequestDetails from './pages/RequestDetails';
import ProtectedRoute from './components/ProtectedRoute';
import ViewMessage from "./components/ViewMessage";
import MyRequests from './pages/MyRequests';
import DonationHistory from './components/DonationHistory';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/message" element={<ViewMessage />} />
        <Route path="/donation-history" element={<DonationHistory />} />
        {/* Protected */}
        <Route path="/user-profile" element={
          <ProtectedRoute allowedRoles={["donor", "patient", "admin", "user"]}>
            <UserProfile />
          </ProtectedRoute>
        }/>
        <Route path="/change-password" element={
          <ProtectedRoute allowedRoles={["donor", "patient", "admin", "user"]}>
            <ChangePassword />
          </ProtectedRoute>
        }/>
        <Route path="/request-blood" element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <RequestBlood />
          </ProtectedRoute>
        }/>
        <Route path="/my-requests" element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyRequests />
          </ProtectedRoute>
        }/>
        <Route path="/view-requests" element={
          <ProtectedRoute allowedRoles={["donor", "admin"]}>
            <ViewRequests />
          </ProtectedRoute>
        }/>

        <Route path="/manage-requests" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageRequests />
          </ProtectedRoute>
        }/>

        <Route path="/all-requests" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AllRequests />
          </ProtectedRoute>
        }/>

        <Route path="/view-requests/:id" element={
          <ProtectedRoute allowedRoles={["donor", "admin"]}>
            <RequestDetails />
          </ProtectedRoute>
        }/>
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </Router>
  );
}
export default App;
