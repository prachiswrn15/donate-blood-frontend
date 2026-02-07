import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ViewRequests.css";
function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");
  useEffect(() => {
    fetchRequests();
  }, []);
  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests");
    }
  };
  const handleAction = async (id, action) => {
    try {
      if (action === "Accepted") {
        const storedUser = localStorage.getItem("loggedInUser");
        const donorEmail = storedUser ? JSON.parse(storedUser).email : "";
        await axios.put(
          `http://localhost:8080/api/requests/${id}/accept?donorEmail=${donorEmail}`
        );
        toast.success("Request accepted");
      } else {
        await axios.put(`http://localhost:8080/api/requests/${id}/status`, {
          status: action,
        });
        toast.success(`Request marked as ${action}`);
      }
      fetchRequests(); // refresh list
    } catch (error) {
      console.error("Error updating request:", error);
      toast.error("Failed to update request");
    }
  };

  //Filter + Search + Sort
  const filteredRequests = requests
    .filter((req) =>
      [req.patientName, req.bloodGroup, req.location]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((req) => (filterStatus === "All" ? true : req.status === filterStatus))
    .sort((a, b) => (sortOrder === "latest" ? b.id - a.id : a.id - b.id));
  return (
    <div className="requests-page">
      <div className="overlay">
        <h2 className="text-center mb-4 title">🩸 Blood Requests 🩸</h2>
        <p className="text-center quote">
          "Donate blood, save lives. Your small act can be someone's second chance."
        </p>

        {/* Controls */}
        <div className="controls container mb-4">
          <input
            type="text"
            className="form-control search-bar"
            placeholder="Search by patient, blood group, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            className="form-select sort-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Request Cards */}
        <div className="container">
          <div className="row">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req) => (
                <div className="col-md-4 mb-4" key={req.id}>
                  <div className="card request-card shadow-lg">
                    <div className="card-body">
                      <h5 className="card-title">{req.patientName}</h5>
                      <p><strong>🩸 Blood Group:</strong> {req.bloodGroup}</p>
                      <p><strong>📍 Location:</strong> {req.location}</p>
                      <p><strong>❓ Reason:</strong> {req.reason}</p>
                      <p><strong>👤 Requested By:</strong> {req.requestedBy}</p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`badge ${
                            req.status === "Pending"
                              ? "bg-warning text-dark"
                              : req.status === "Accepted"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {req.status}
                        </span>
                      </p>
                      {/* Buttons */}
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-success btn-sm px-3"
                          onClick={() => handleAction(req.id, "Accepted")}
                        >
                          ✅ Accept
                        </button>
                        <button
                          className="btn btn-danger btn-sm px-3"
                          onClick={() => handleAction(req.id, "Rejected")}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-white fs-5">No requests found</p>
            )}
          </div>
        </div>
        <div className="text-center text-white mt-4 fst-italic">
          <p>"Donate blood and be the reason for someone’s heartbeat."</p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
export default ViewRequests;
