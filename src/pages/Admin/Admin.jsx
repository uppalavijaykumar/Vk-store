import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import './Admin.css';

const navItems = [
  { id: 'dashboard', icon: '📊', label: 'Financial Dashboard' },
  { id: 'add-product', icon: '➕', label: 'Add Product' },
  { id: 'products', icon: '📦', label: 'Manage Products' },
  { id: 'orders', icon: '📋', label: 'Orders & Net Profit' },
];

function Admin() {
  const {
    products,
    addProduct,
    deleteProduct,
    orders,
    totalRevenue,
    totalSupplierCost,
    totalNetProfit,
    totalOrdersCount,
    isAdminAuthenticated,
    adminLogin,
    adminLogout
  } = useStore();

  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');

  const [formData, setFormData] = useState({
    productName: '',
    supplierPrice: '',
    sellingPrice: '',
    discount: '',
    shippingCost: '0',
    packagingCost: '0',
    otherCosts: '0',
    category: 'Home & Kitchen',
    description: '',
    image: '',
  });

  // Handle Passcode Unlock
  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    const success = adminLogin(passcodeInput);
    if (!success) {
      setAuthError('Incorrect Admin Passcode! Access restricted to store owner only.');
    } else {
      setAuthError('');
      setPasscodeInput('');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const supplierPrice = parseFloat(formData.supplierPrice) || 0;
  const shippingCost = parseFloat(formData.shippingCost) || 0;
  const packagingCost = parseFloat(formData.packagingCost) || 0;
  const otherCosts = parseFloat(formData.otherCosts) || 0;
  const sellingPrice = parseFloat(formData.sellingPrice) || 0;
  const totalCost = supplierPrice + shippingCost + packagingCost + otherCosts;
  const estimatedProfit = sellingPrice - totalCost;

  const handlePublish = (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.sellingPrice) {
      alert('Please enter at least a Product Name and Selling Price!');
      return;
    }

    addProduct({
      name: formData.productName,
      price: parseFloat(formData.sellingPrice),
      originalPrice: formData.discount ? Math.round(parseFloat(formData.sellingPrice) * (1 + parseFloat(formData.discount) / 100)) : null,
      discount: parseFloat(formData.discount) || 0,
      category: formData.category,
      image: formData.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
      description: formData.description || 'Premium quality product curated by VK Store.',
      supplierCost: supplierPrice
    });

    setFormData({
      productName: '',
      supplierPrice: '',
      sellingPrice: '',
      discount: '',
      shippingCost: '0',
      packagingCost: '0',
      otherCosts: '0',
      category: 'Home & Kitchen',
      description: '',
      image: '',
    });

    setActiveSection('products');
  };

  // IF NOT AUTHENTICATED: Show Owner Password Lock Screen
  if (!isAdminAuthenticated) {
    return (
      <div className="admin-lock-screen">
        <div className="admin-lock-card">
          <div className="lock-icon">🔒</div>
          <h2>Store Owner Portal</h2>
          <p className="lock-subtitle">
            This dashboard is private and strictly restricted to the store owner. Regular customers cannot access this area.
          </p>

          {authError && (
            <div className="admin-error-box">
              ⚠️ {authError}
            </div>
          )}

          <form onSubmit={handlePasscodeSubmit} className="admin-lock-form">
            <div className="form-group">
              <label>Enter Admin Passcode</label>
              <input
                type="password"
                required
                className="form-input"
                placeholder="Enter passcode (e.g. admin123)"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg">
              Unlock Admin Portal 🛡️
            </button>

            <div style={{ marginTop: '16px', fontSize: '0.8rem', color: '#64748b' }}>
              Default Owner Passcode: <code style={{ color: '#2563eb' }}>admin123</code>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => window.location.href = '#/'}
              >
                ← Return to Store
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <h2>VK <span>STORE</span></h2>
          <p>Owner Dashboard (Private)</p>
        </div>
        <nav className="admin-sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`admin-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <button className="admin-nav-item logout" onClick={adminLogout}>
            <span className="nav-icon">🔒</span>
            Lock Admin Session
          </button>
          <button className="admin-nav-item" onClick={() => window.location.href = '#/'}>
            <span className="nav-icon">🚪</span>
            Exit to Store
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Top Bar */}
        <div className="admin-topbar">
          <h2>
            {activeSection === 'dashboard' && '📈 Owner Financial Ledger & Net Profits'}
            {activeSection === 'add-product' && '➕ Add New Product to Store'}
            {activeSection === 'products' && `📦 Store Catalog (${products.length} Products)`}
            {activeSection === 'orders' && `📋 Customer Orders (${orders.length} Orders)`}
          </h2>
          <div className="admin-topbar-right">
            <span className="admin-badge">Owner Mode Active</span>
            <div className="admin-user-icon">👑</div>
          </div>
        </div>

        {/* Content */}
        <div className="admin-content">
          {/* SECTION 1: DASHBOARD METRICS */}
          {activeSection === 'dashboard' && (
            <div className="admin-analytics-view">
              <div className="admin-stats-grid">
                <div className="admin-stat-card revenue">
                  <div className="stat-card-title">Total Revenue</div>
                  <div className="stat-card-num">₹{totalRevenue.toLocaleString('en-IN')}</div>
                  <div className="stat-card-sub">Gross sales from all orders</div>
                </div>

                <div className="admin-stat-card cost">
                  <div className="stat-card-title">Total Product Cost</div>
                  <div className="stat-card-num">₹{totalSupplierCost.toLocaleString('en-IN')}</div>
                  <div className="stat-card-sub">Supplier & fulfillment expenses</div>
                </div>

                <div className="admin-stat-card profit">
                  <div className="stat-card-title">Net Profit 💰</div>
                  <div className="stat-card-num profit-green">
                    ₹{totalNetProfit.toLocaleString('en-IN')}
                  </div>
                  <div className="stat-card-sub">
                    Margin: {totalRevenue > 0 ? ((totalNetProfit / totalRevenue) * 100).toFixed(1) : 0}%
                  </div>
                </div>

                <div className="admin-stat-card orders-card">
                  <div className="stat-card-title">Total Orders Placed</div>
                  <div className="stat-card-num">{totalOrdersCount}</div>
                  <div className="stat-card-sub">Delivered & processing</div>
                </div>
              </div>

              {/* Profit breakdown table */}
              <div className="admin-panel-card" style={{ marginTop: '28px' }}>
                <h3 style={{ marginBottom: '16px' }}>Order-by-Order Net Profit Breakdown</h3>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Sale Amount</th>
                        <th>Cost of Goods</th>
                        <th>Net Profit</th>
                        <th>Gateway</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((ord) => (
                        <tr key={ord.id}>
                          <td><strong>#{ord.id}</strong></td>
                          <td>{ord.customerName}</td>
                          <td>₹{ord.totalAmount.toLocaleString('en-IN')}</td>
                          <td>₹{(ord.supplierCost || 0).toLocaleString('en-IN')}</td>
                          <td>
                            <strong style={{ color: '#22c55e' }}>
                              +₹{(ord.netProfit || 0).toLocaleString('en-IN')}
                            </strong>
                          </td>
                          <td>{ord.paymentMethod || 'UPI'}</td>
                          <td>
                            <span className="badge badge-success">{ord.orderStatus || 'Paid'}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: ADD PRODUCT FORM */}
          {activeSection === 'add-product' && (
            <div className="admin-form-container">
              <h3 className="admin-form-title">Add New Product to VK Store</h3>

              <form onSubmit={handlePublish}>
                <div className="admin-form-grid">
                  <div className="admin-form-left">
                    <div className="admin-form-group">
                      <label>Product Name *</label>
                      <input
                        type="text"
                        name="productName"
                        required
                        placeholder="e.g. Wireless Smart Speaker"
                        value={formData.productName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Supplier Cost (₹) *</label>
                      <input
                        type="number"
                        name="supplierPrice"
                        required
                        placeholder="e.g. 1200"
                        value={formData.supplierPrice}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Discount Badge (%)</label>
                      <input
                        type="number"
                        name="discount"
                        placeholder="e.g. 15"
                        value={formData.discount}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Estimated Shipping Cost (₹)</label>
                      <input
                        type="number"
                        name="shippingCost"
                        placeholder="0"
                        value={formData.shippingCost}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Product Image URL</label>
                      <input
                        type="url"
                        name="image"
                        placeholder="https://images.unsplash.com/..."
                        value={formData.image}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Product Description</label>
                      <textarea
                        name="description"
                        rows="4"
                        placeholder="Detailed product highlights..."
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="admin-form-right">
                    <div className="admin-form-group">
                      <label>Category</label>
                      <select name="category" value={formData.category} onChange={handleChange}>
                        <option value="Home & Kitchen">Home & Kitchen</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Electronics">Electronics</option>
                      </select>
                    </div>

                    <div className="admin-form-group">
                      <label>Selling Price (₹) *</label>
                      <input
                        type="number"
                        name="sellingPrice"
                        required
                        placeholder="e.g. 2499"
                        value={formData.sellingPrice}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="admin-form-group">
                      <label>Packaging & Handling (₹)</label>
                      <input
                        type="number"
                        name="packagingCost"
                        placeholder="0"
                        value={formData.packagingCost}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Price Breakdown Card */}
                    <div className="admin-price-breakdown">
                      <h4>💰 Live Profit Calculation</h4>

                      <div className="admin-price-row">
                        <span>Supplier Cost:</span>
                        <span>₹{supplierPrice.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="admin-price-row">
                        <span>Shipping Cost:</span>
                        <span>₹{shippingCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="admin-price-row">
                        <span>Packaging:</span>
                        <span>₹{packagingCost.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="admin-price-row total">
                        <strong>Total Cost:</strong>
                        <strong>₹{totalCost.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="admin-price-row selling">
                        <span>Selling Price:</span>
                        <strong>₹{sellingPrice.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="admin-price-row profit">
                        <strong>Estimated Net Profit:</strong>
                        <strong style={{ color: estimatedProfit >= 0 ? '#22c55e' : '#ef4444', fontSize: '1.2rem' }}>
                          ₹{estimatedProfit.toLocaleString('en-IN')}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="admin-form-actions">
                  <button type="button" className="admin-btn-draft" onClick={() => setActiveSection('products')}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-btn-publish">
                    🚀 Publish Product to Store
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SECTION 3: PRODUCTS MANAGEMENT */}
          {activeSection === 'products' && (
            <div className="admin-panel-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h3>Active Store Products</h3>
                <button
                  onClick={() => setActiveSection('add-product')}
                  className="btn btn-primary btn-sm"
                >
                  ➕ Add New Product
                </button>
              </div>

              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }}
                          />
                        </td>
                        <td><strong>{p.name}</strong></td>
                        <td>{p.category}</td>
                        <td>₹{p.price.toLocaleString('en-IN')}</td>
                        <td>
                          <span className={`badge ${p.inStock ? 'badge-success' : 'badge-danger'}`}>
                            {p.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                          >
                            Delete 🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SECTION 4: ORDERS */}
          {activeSection === 'orders' && (
            <div className="admin-panel-card">
              <h3 style={{ marginBottom: '16px' }}>Store Order Fulfillment</h3>
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Net Profit</th>
                      <th>Payment</th>
                      <th>Tracking AWB</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((ord) => (
                      <tr key={ord.id}>
                        <td><strong>#{ord.id}</strong></td>
                        <td>{ord.date}</td>
                        <td>
                          <div>{ord.customerName}</div>
                          <small style={{ color: '#64748b' }}>{ord.customerPhone}</small>
                        </td>
                        <td>{ord.items ? ord.items.length : 1} item(s)</td>
                        <td><strong>₹{ord.totalAmount.toLocaleString('en-IN')}</strong></td>
                        <td>
                          <strong style={{ color: '#22c55e' }}>
                            +₹{(ord.netProfit || 0).toLocaleString('en-IN')}
                          </strong>
                        </td>
                        <td>{ord.paymentMethod}</td>
                        <td><code>{ord.trackingNumber || 'VKT-BLR-001'}</code></td>
                        <td>
                          <span className="badge badge-success">{ord.orderStatus}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Admin;
