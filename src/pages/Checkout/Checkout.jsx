import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import './Checkout.css';

export default function Checkout() {
  const { cart, user, placeOrder } = useStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user ? user.name : '',
    email: user ? user.email : '',
    phone: user ? (user.phone || '+91 98765 43210') : '+91 98765 43210',
    address: '402 Sunrise Heights, MG Road',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    deliveryMethod: 'Cash on Delivery (Pay upon Receipt)'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrderInfo, setPlacedOrderInfo] = useState(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Direct Order Placement Without Any Third-Party Payment Gateway
  const handlePlaceOrderDirect = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Please fill in your delivery contact and address details.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOrder({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        items: cart,
        totalAmount: total,
        shippingFee: shipping,
        paymentMethod: formData.deliveryMethod
      });

      setIsSubmitting(false);
      setPlacedOrderInfo(order);
    }, 600);
  };

  // VIEW: Order Confirmation Screen
  if (placedOrderInfo) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="order-success-card">
            <div className="success-icon-wrap">
              <span className="success-check-anim">✓</span>
            </div>
            <h1 className="success-heading">Order Placed Successfully!</h1>
            <p className="order-id-tag">Order Tracking ID: <strong>#{placedOrderInfo.id}</strong></p>
            <p className="order-msg">
              Thank you, <strong>{placedOrderInfo.customerName}</strong>! Your order of{' '}
              <strong>₹{placedOrderInfo.totalAmount.toLocaleString('en-IN')}</strong> has been confirmed and queued for fulfillment.
            </p>

            <div className="order-receipt">
              <div className="receipt-row">
                <span>Payment Mode:</span>
                <strong style={{ color: '#16a34a' }}>{placedOrderInfo.paymentMethod}</strong>
              </div>
              <div className="receipt-row">
                <span>Contact Phone:</span>
                <strong>{placedOrderInfo.customerPhone}</strong>
              </div>
              <div className="receipt-row">
                <span>Tracking Number:</span>
                <strong>{placedOrderInfo.trackingNumber}</strong>
              </div>
              <div className="receipt-row">
                <span>Assigned Courier:</span>
                <span>{placedOrderInfo.courier} (Express Delivery)</span>
              </div>
              <div className="receipt-row">
                <span>Delivery Address:</span>
                <span>{placedOrderInfo.address}</span>
              </div>
            </div>

            <div className="success-actions">
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                View Live Tracking in Dashboard 📦
              </Link>
              <Link to="/products" className="btn btn-outline btn-lg">
                Continue Shopping 🛍️
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // View: Empty cart
  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h2>Your cart is currently empty</h2>
          <p style={{ margin: '14px 0', color: '#64748b' }}>Please add a product to proceed to checkout.</p>
          <Link to="/products" className="btn btn-primary">Browse Catalog →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-breadcrumbs">
          <Link to="/cart">Cart</Link> &nbsp;›&nbsp; <span>Direct Checkout (No Gateway Required)</span>
        </div>
        <h1 className="checkout-title">Review & Place Your Order</h1>

        <form onSubmit={handlePlaceOrderDirect} className="checkout-layout">
          {/* Left Form: Delivery details */}
          <div className="checkout-section-box">
            <h2 className="section-title-sm">1. Delivery Address & Contact</h2>

            <div className="form-group-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="form-input"
                  placeholder="Vijay Kumar"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="form-input"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                className="form-input"
                placeholder="vijay@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Flat / House No. & Street *</label>
              <input
                type="text"
                name="address"
                required
                className="form-input"
                placeholder="e.g. 402 Royal Palms, 5th Cross"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-grid three">
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-input"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  className="form-input"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  className="form-input"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Direct Order Payment Mode */}
            <h2 className="section-title-sm" style={{ marginTop: '36px' }}>
              2. Order Settlement Mode
            </h2>

            <div className="payment-options-list">
              <label className="payment-method-card active" style={{ borderColor: '#2563eb', background: '#eff6ff' }}>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="Cash on Delivery (Pay upon Receipt)"
                  checked={formData.deliveryMethod === 'Cash on Delivery (Pay upon Receipt)'}
                  onChange={handleChange}
                />
                <div className="payment-method-info">
                  <div className="payment-head">
                    <span className="gateway-brand" style={{ color: '#2563eb' }}>
                      📦 Cash on Delivery / Pay on Delivery (Direct Settlement)
                    </span>
                    <span className="badge badge-success">No Gateway Required</span>
                  </div>
                  <p className="payment-sub">
                    Direct order placement without any bank or third-party payment gateway redirect. Pay via cash or QR when the delivery agent arrives at your door.
                  </p>
                </div>
              </label>

              <label className="payment-method-card" style={{ opacity: 0.9 }}>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="Direct Store UPI (Pay upon Dispatch)"
                  checked={formData.deliveryMethod === 'Direct Store UPI (Pay upon Dispatch)'}
                  onChange={handleChange}
                />
                <div className="payment-method-info">
                  <div className="payment-head">
                    <span className="gateway-brand">
                      📲 Direct Store Billing (Invoice on Dispatch)
                    </span>
                  </div>
                  <p className="payment-sub">
                    Your invoice will be emailed with tracking. Settle directly with the courier partner upon parcel handover.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Right Summary */}
          <div className="checkout-summary-box">
            <h3 className="summary-title">Order Summary ({cart.length} items)</h3>

            <div className="checkout-items-mini">
              {cart.map((item) => (
                <div key={item.id} className="checkout-item-mini">
                  <img src={item.image} alt={item.name} />
                  <div className="checkout-item-detail">
                    <div className="item-name">{item.name}</div>
                    <div className="item-qty">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</div>
                  </div>
                  <div className="item-price">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="summary-row">
              <span>Express Delivery</span>
              <span>{shipping === 0 ? <strong style={{ color: '#22c55e' }}>FREE</strong> : `₹${shipping}`}</span>
            </div>

            <hr className="summary-divider" />

            <div className="summary-row summary-total">
              <span>Total Payable</span>
              <span className="total-price">₹{total.toLocaleString('en-IN')}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-full btn-lg pay-now-btn"
              style={{ background: '#2563eb', borderColor: '#2563eb' }}
            >
              {isSubmitting ? 'Placing Order... ⏳' : `Confirm & Place Order (₹${total.toLocaleString('en-IN')}) ✓`}
            </button>

            <div className="gateway-badges">
              <span>✓ Instant 1-Click Order Confirmation • No Third-Party Payment Redirection</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
