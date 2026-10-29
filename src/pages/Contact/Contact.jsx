import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import './Contact.css';

export default function Contact() {
  const { showToast } = useStore();
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to VK Support! 📨');
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <span className="badge badge-accent">24/7 CUSTOMER SUPPORT</span>
          <h1>Contact VK Store</h1>
          <p className="contact-subtitle">
            Have questions about an order, shipment, or bulk inquiry? Our team is here to assist you.
          </p>
        </div>

        <div className="contact-layout">
          {/* Form */}
          <div className="contact-card">
            <h2>Send us a message</h2>

            {submitted ? (
              <div className="contact-success">
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✉️</div>
                <h3>Message Received!</h3>
                <p>Thank you for reaching out, <strong>{form.name}</strong>. A support executive will respond to <strong>{form.email}</strong> within 4 hours.</p>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: '16px' }}
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', subject: '', message: '' });
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="contact-form-grid">
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="Vijay Kumar"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Email *</label>
                    <input
                      type="email"
                      required
                      className="form-input"
                      placeholder="vijay@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Order inquiry, tracking, or feedback"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    rows="5"
                    required
                    className="form-input"
                    placeholder="How can we help you today?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg btn-full">
                  Send Message 🚀
                </button>
              </form>
            )}
          </div>

          {/* Contact Direct Info */}
          <div className="contact-info-panel">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h4>Store Headquarters</h4>
              <p>VK Store Plaza, Tech Hub 4th Phase, Bangalore, Karnataka - 560100</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <h4>Call & WhatsApp Support</h4>
              <p><strong>+91 98765 43210</strong></p>
              <small>Mon - Sat (9:00 AM - 8:00 PM IST)</small>
            </div>

            <div className="info-card">
              <div className="info-icon">✉️</div>
              <h4>Direct Email Support</h4>
              <p><strong>support@vkstore.in</strong></p>
              <small>Average response time: 2 hours</small>
            </div>

            <div className="info-card highlight">
              <h4>🚀 Order Tracking Instant Link</h4>
              <p>Already have an order ID? View immediate status updates right inside your dashboard.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
