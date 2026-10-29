import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import './Cart.css';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Start Shopping Now →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)} items)</h1>

        <div className="cart-layout">
          {/* Items List */}
          <div className="cart-items-box">
            <div className="cart-header-row">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span>Action</span>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-product-info">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div>
                    <Link to={`/product/${item.id}`} className="cart-item-name">
                      {item.name}
                    </Link>
                    <span className="cart-item-cat">{item.category}</span>
                  </div>
                </div>

                <div className="cart-price">₹{item.price.toLocaleString('en-IN')}</div>

                <div className="cart-qty-control">
                  <button onClick={() => updateQuantity(item.id, -1)} className="cart-qty-btn">
                    −
                  </button>
                  <span className="cart-qty-val">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="cart-qty-btn">
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="cart-delete-btn"
                  title="Remove item"
                >
                  🗑️
                </button>
              </div>
            ))}

            <div className="cart-table-footer">
              <button onClick={clearCart} className="btn btn-outline btn-sm">
                Clear Cart
              </button>
              <Link to="/products" className="btn-link">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="cart-summary-box">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="summary-row">
              <span>Shipping Estimate</span>
              <span>{shipping === 0 ? <strong style={{ color: '#22c55e' }}>FREE</strong> : `₹${shipping}`}</span>
            </div>

            {shipping === 0 && (
              <div className="free-shipping-tag">
                🎉 Free delivery applied on orders over ₹999!
              </div>
            )}

            <hr className="summary-divider" />

            <div className="summary-row summary-total">
              <span>Total Amount</span>
              <span className="total-price">₹{total.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-full btn-lg checkout-btn"
            >
              Proceed to Checkout 💳 →
            </button>

            <div className="trust-secure">
              <span>🔒 256-bit Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
