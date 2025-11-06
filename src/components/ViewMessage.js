import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const ViewMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/contact")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="messages-wrapper">
      <h2 style={{ color: "crimson" }}>All Contact Messages</h2>
      <table className="messages-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id}>
              <td>{msg.id}</td>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewMessages;
