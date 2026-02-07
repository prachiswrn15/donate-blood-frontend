import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function MyRequests() {
  const [rows, setRows] = useState([]);
  const prevMap = useRef(new Map());
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const email = user?.email;
  const load = async () => {
    if (!email) return;
    try {
      const res = await axios.get(`http://localhost:8080/api/requests/user/${encodeURIComponent(email)}`);
      const data = res.data || [];
      data.forEach(r => {
        const old = prevMap.current.get(r.id);
        if (old && old !== r.status) {
          if (r.status === "Accepted") {
            toast.info(`Request #${r.id} accepted${r.acceptedBy ? ` by ${r.acceptedBy}` : ""}`);
          } else if (r.status === "Completed") {
            toast.success(`Request #${r.id} marked Completed`);
          }
        }
      });

      prevMap.current = new Map(data.map(r => [r.id, r.status]));
      setRows(data);
    } catch (err) {
      console.error("Error loading requests:", err);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/requests/${id}`);
      setRows(rows.filter(r => r.id !== id));
      toast.success("Request deleted successfully");
    } catch (err) {
      console.error("Error deleting request:", err);
      toast.error("Failed to delete request");
    }
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 10000); // 10s poll
    return () => clearInterval(t);
  }, [email]);
  if (!email) return <div className="container mt-4">Please login to view your requests.</div>;
  return (
    <div className="container mt-5">
      <h3 className="text-danger mb-3">My Blood Requests</h3>
      {rows.length === 0 ? (
        <p>No past requests.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>age</th>
              <th>gender</th>
              <th>Blood Group</th>
              <th>Location</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Accepted By</th>
              <th>Action</th> {/* New Column */}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.patientName}</td>
                <td>{r.age}</td>
                <td>{r.gender}</td>
                <td>{r.bloodGroup}</td>
                <td>{r.location}</td>
                <td>{r.reason}</td>
                <td>
                  <span className={`badge ${
                    r.status === 'Completed'
                      ? 'bg-success'
                      : r.status === 'Accepted'
                      ? 'bg-info text-dark'
                      : 'bg-warning text-dark'
                  }`}>{r.status}</span>
                </td>
                <td>{r.acceptedBy || '-'}</td>
                <td>
  {(user?.role?.toLowerCase() === "admin" || user?.role?.toLowerCase() === "patient") && (
    <button
      className="btn btn-sm btn-danger"
      onClick={() => handleDelete(r.id)}
    >
      Delete
    </button>
  )}
</td>
   </tr>
 ))}
  </tbody>
  </table>
      )}
 <small className="text-muted">Auto-refresh every 10 seconds</small>
    </div>
  );
}
