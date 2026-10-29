import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import './Dashboard.css';

const navItems = [
  { id: 'orders', icon: '📦', label: 'My Orders & Tracking' },
  { id: 'profile', icon: '👤', label: 'My Profile' },
  { id: 'wishlist', icon: '❤️', label: 'Saved Favourites' },
  { id: 'addresses', icon: '📮', label: 'Saved Addresses' },
];

export default function Dashboard() {
  const { user, orders, logoutUser } = useStore();
  const [activeSection, setActiveSection] = useState('orders');
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState(orders[0] || null);

  const displayName = user ? user.name : 'Vijay Kumar';
  const displayEmail = user ? user.email : 'vijay@example.com';
  const displayMethod = user ? user.authMethod : 'Google OAuth';

  // Tracking milestones (1: Placed, 2: Packed, 3: Shipped / In Transit, 4: Delivered)
  const steps = [
    { num: 1, title: 'Order Confirmed', desc: 'Payment verified & order accepted' },
    { num: 2, title: 'Packed & Dispatched', desc: 'Item packed at Bangalore fulfillment hub' },
    { num: 3, title: 'In Transit with Courier', desc: 'Out for fast surface/air logistics' },
    { num: 4, title: 'Delivered', desc: 'Delivered securely to your address' },
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-logo">
          <h2>VK <span>STORE</span></h2>
          <small style={{ color: '#94a3b8' }}>Customer Portal</small>
        </div>
        <nav className="dashboard-sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`dashboard-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <Link to="/wishlist" className="dashboard-nav-item">
            <span className="nav-icon">♡</span>
            Browse Wishlist
          </Link>
          <button className="dashboard-nav-item logout" onClick={logoutUser}>
            <span className="nav-icon">🚪</span>
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Top Bar */}
        <div className="dashboard-topbar">
          <div className="dashboard-search">
            <span className="dashboard-search-icon">🔍</span>
            <input type="text" placeholder="Search orders, tracking numbers, items..." />
          </div>
          <div className="dashboard-topbar-right">
            <span className="dashboard-greeting">Hello, {displayName}!</span>
            <div className="dashboard-user-icon">{displayName.charAt(0)}</div>
          </div>
        </div>

        {/* Content */}
        <div className="dashboard-content">
          {/* Welcome Card */}
          <div className="dashboard-welcome-card">
            <div className="dashboard-avatar">{displayName.charAt(0)}</div>
            <div className="dashboard-welcome-info">
              <h2>Welcome, {displayName}!</h2>
              <p>
                {displayEmail} &nbsp;•&nbsp;{' '}
                <span style={{ color: '#2563eb', fontWeight: 600 }}>{displayMethod}</span>
              </p>
            </div>
          </div>

          {/* SECTION: ORDERS & TRACKING */}
          {activeSection === 'orders' && (
            <div>
              {/* Live Tracking Showcase for Selected Order */}
              {selectedTrackingOrder && (
                <div className="tracking-showcase-card">
                  <div className="tracking-header">
                    <div>
                      <span className="badge badge-primary">LIVE TRACKING SYSTEM</span>
                      <h3 style={{ marginTop: '6px' }}>
                        Tracking Order #{selectedTrackingOrder.id}
                      </h3>
                      <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
                        Carrier: <strong>{selectedTrackingOrder.courier || 'BlueDart Logistics'}</strong> • Tracking AWB: <strong>{selectedTrackingOrder.trackingNumber || 'VKT-BLR-892301'}</strong>
                      </p>
                    </div>
                    <div className="tracking-status-badge">
                      Status: <strong>{selectedTrackingOrder.orderStatus}</strong>
                    </div>
                  </div>

                  {/* 4-Step Visual Stepper */}
                  <div className="tracking-stepper">
                    {steps.map((st) => {
                      const currentStep = selectedTrackingOrder.trackingStep || 2;
                      const isCompleted = st.num <= currentStep;
                      const isCurrent = st.num === currentStep;

                      return (
                        <div key={st.num} className={`step-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                          <div className="step-circle">
                            {isCompleted ? '✓' : st.num}
                          </div>
                          <div className="step-content">
                            <div className="step-title">{st.title}</div>
                            <div className="step-desc">{st.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Order History Table */}
              <div className="dashboard-orders">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3>All Placed Orders ({orders.length})</h3>
                  <small style={{ color: '#64748b' }}>Click any order below to load its live tracking progress</small>
                </div>

                <table className="dashboard-orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Products</th>
                      <th>Total Amount</th>
                      <th>Payment Gateway</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((ord) => (
                      <tr
                        key={ord.id}
                        className={selectedTrackingOrder && selectedTrackingOrder.id === ord.id ? 'active-row' : ''}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedTrackingOrder(ord)}
                      >
                        <td><strong>#{ord.id}</strong></td>
                        <td>{ord.date || 'Today'}</td>
                        <td>
                          {ord.items && ord.items.length > 0
                            ? `${ord.items[0].name} ${ord.items.length > 1 ? `+${ord.items.length - 1} more` : ''}`
                            : 'Assorted Item'}
                        </td>
                        <td><strong>₹{ord.totalAmount.toLocaleString('en-IN')}</strong></td>
                        <td>
                          <span className="gateway-mini-tag">{ord.paymentMethod || 'PhonePe'}</span>
                        </td>
                        <td>
                          <span className={`status-badge ${(ord.orderStatus || 'Delivered').toLowerCase().replace(' ', '-')}`}>
                            {ord.orderStatus || 'Delivered'}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTrackingOrder(ord);
                            }}
                          >
                            Track Live 📍
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION: PROFILE */}
          {activeSection === 'profile' && (
            <div className="dashboard-orders" style={{ maxWidth: '600px' }}>
              <h3>Customer Profile Details</h3>
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div><strong>Full Name:</strong> {displayName}</div>
                <div><strong>Email Address:</strong> {displayEmail}</div>
                <div><strong>Phone Number:</strong> {user ? user.phone : '+91 98765 43210'}</div>
                <div><strong>Account Type:</strong> Verified Customer (VK Club Member)</div>
                <div><strong>Default Address:</strong> Flat 402, Royal Residency, Indiranagar, Bangalore, KA - 560038</div>
              </div>
            </div>
          )}

          {/* SECTION: ADDRESSES */}
          {activeSection === 'addresses' && (
            <div className="dashboard-orders">
              <h3>Saved Delivery Addresses</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span className="badge badge-primary">HOME (DEFAULT)</span>
                  <p style={{ marginTop: '10px', fontWeight: 600 }}>{displayName}</p>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
                    Flat 402, Royal Residency, 100ft Road, Indiranagar, Bangalore, Karnataka - 560038
                  </p>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '6px' }}>Phone: +91 98765 43210</p>
                </div>

                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <span className="badge">OFFICE</span>
                  <p style={{ marginTop: '10px', fontWeight: 600 }}>{displayName} (Tech Park)</p>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '4px' }}>
                    Floor 3, Cyber Gateway, Electronic City Phase 1, Bangalore, Karnataka - 560100
                  </p>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '6px' }}>Phone: +91 98765 43210</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
