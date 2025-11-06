import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/contact", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message!");
    }
  };

  return (
    <div className="contact-background">
      <div className="overlay">
        {/* Quotes Section */}
        <div className="quotes-section">
          <h2>🩸 Donate Blood, Save Lives 🩸</h2>
          <p>"Your one donation can give someone a second chance."</p>
          <p>"Be a hero! Donate blood and spread hope."</p>
          <p>"Blood is life. Give it generously."</p>
        </div>

        <div className="contact-wrapper">
          {/* Info Card */}
          <div className="contact-info-side">
            <div className="contact-card">
              <h2 style={{ color: "crimson" }}>Contact Us</h2>
              <p>If you have any query, feel free to reach out to us.</p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:donatebloodsupport@example.com">
                  donatebloodsupport@example.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a href="tel:+919341721109">+91-9341721109</a>
              </p>
              <p>
                <strong>Address:</strong> 123 Blood Bank Street, Faridabad, Haryana, 121006
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send us a message</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="custom-input"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="custom-input"
            />
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              className="custom-input"
            ></textarea>
            <button type="submit" className="custom-btn">
              Send Message
            </button>
          </form>
        </div>

        {/* Floating Buttons */}
        <div className="floating-buttons">
          <a href="tel:+919341721109" className="floating-btn phone-btn" title="Call Us">
            📞
          </a>
          <a
            href="https://wa.me/919341721109"
            target="_blank"
            rel="noopener noreferrer"
            className="floating-btn whatsapp-btn"
            title="Chat on WhatsApp"
          >
            💬
          </a>
        </div>

        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default Contact;
