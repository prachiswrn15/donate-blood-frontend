import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userRole = (localStorage.getItem("role") || "").toLowerCase();
  const currentUser = localStorage.getItem("username");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/requests");
      setRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError("Failed to load requests. Please try again later.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/requests/${id}`);
      setRequests(requests.filter((req) => req.id !== id));
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("Failed to delete request. Try again!");
    }
  };

  return (
    <div className="manage-requests-background">
      <div className="container">
        <div className="manage-requests-card shadow-lg p-4">
          <h2 className="mb-4 text-center text-danger fw-bold heading-glow">
            🩸 Manage Blood Requests
          </h2>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-danger" role="status"></div>
              <p className="mt-2">Loading requests...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center">{error}</div>
          ) : requests.length === 0 ? (
            <div className="alert alert-info text-center">
              No blood requests found.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table custom-table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Patient Name</th>
                    <th>Blood Group</th>
                    <th>Location</th>
                    <th>Reason</th>
                    <th>Requested By</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.patientName}</td>
                      <td>
                        <span className="badge bg-danger">
                          {request.bloodGroup}
                        </span>
                      </td>
                      <td>{request.location}</td>
                      <td>{request.reason}</td>
                      <td>{request.requestedBy}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            request.status.toLowerCase()
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                      <td>
                        {(userRole === "admin" ||
                          (userRole === "patient" &&
                            request.requestedBy === currentUser)) && (
                          <button
                            className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                            onClick={() => handleDelete(request.id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageRequests;
