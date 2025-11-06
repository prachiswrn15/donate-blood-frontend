// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUserCircle, FaSignInAlt, FaSignOutAlt, FaPhoneAlt, FaUserPlus, FaTint, FaList } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  let loggedInUser = null;
  let role = null;

  try {
    const storedUser = localStorage.getItem("loggedInUser");
    loggedInUser = storedUser ? JSON.parse(storedUser) : null;
    role = loggedInUser?.role;
  } catch (error) {
    console.error("Invalid JSON in localStorage:", error);
    localStorage.removeItem("loggedInUser");
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 100);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-danger" to="/">Donate Blood, Save Lives</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse mt-2 mt-lg-0" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            {!loggedInUser && (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/register") ? "active text-primary fw-bold" : ""}`} to="/register">
                    <FaUserPlus className="me-2" /> Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/login") ? "active text-primary fw-bold" : ""}`} to="/login">
                    <FaSignInAlt className="me-2" /> Login
                  </Link>
                </li>
              </>
            )}

            {loggedInUser && role === "patient" && (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/request-blood") ? "active text-primary fw-bold" : ""}`} to="/request-blood">
                    <FaTint className="me-2" /> Request Blood
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/my-requests") ? "active text-primary fw-bold" : ""}`} to="/my-requests">
                    <FaList className="me-2" /> My Requests
                  </Link>
                </li>
              </>
            )}

            {loggedInUser && role === "donor" && (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/view-requests") ? "active text-primary fw-bold" : ""}`} to="/view-requests">
                    <FaTint className="me-2" /> View Requests
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/donation-history") ? "active text-primary fw-bold" : ""}`} to="/donation-history">
                    <FaList className="me-2" /> Donation History
                  </Link>
                </li>
              </>
            )}

            {loggedInUser && role === "admin" && (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/view-requests") ? "active text-primary fw-bold" : ""}`} to="/view-requests">
                    View Requests
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/manage-requests") ? "active text-primary fw-bold" : ""}`} to="/manage-requests">
                    Manage Requests
                  </Link>
                </li>
              </>
            )}

            {loggedInUser && (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/user-profile") ? "active text-primary fw-bold" : ""}`} to="/user-profile">
                    <FaUserCircle className="me-2" /> Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/change-password") ? "active text-primary fw-bold" : ""}`} to="/change-password">
                    Change Password
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger rounded-pill ms-2" onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" /> Logout
                  </button>
                </li>
              </>
            )}

            <li className="nav-item">
              <Link className={`nav-link ${isActive("/contact") ? "active text-primary fw-bold" : ""}`} to="/contact">
                <FaPhoneAlt className="me-2" /> Contact Us
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
