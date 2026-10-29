import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { cartCount, wishlistCount, user, products } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Instant live search handler
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const q = searchQuery.toLowerCase().trim();
    const matches = products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    ).slice(0, 6);

    setSearchResults(matches);
    setShowSearchDropdown(true);
  }, [searchQuery, products]);

  // Click outside search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectProduct = (id) => {
    setShowSearchDropdown(false);
    setSearchQuery('');
    navigate(`/product/${id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchDropdown(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="navbar">
      {/* Brand Logo */}
      <Link to="/" className="navbar__logo">
        <span className="navbar__logo-vk">VK</span>
        <span className="navbar__logo-store">&nbsp;STORE</span>
      </Link>

      {/* Top Search Bar with Instant Results Dropdown */}
      <div className="navbar__search" ref={searchRef}>
        <form onSubmit={handleSearchSubmit} className="search-form-wrap">
          <span className="navbar__search-icon">🔍</span>
          <input
            type="text"
            className="navbar__search-input"
            placeholder="Search products, brands, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (searchResults.length > 0) setShowSearchDropdown(true);
            }}
          />
        </form>

        {showSearchDropdown && (
          <div className="navbar__search-dropdown">
            <div className="search-dropdown-header">
              <span>Matching Results ({searchResults.length})</span>
              <button onClick={() => setShowSearchDropdown(false)} className="close-search-btn">✕</button>
            </div>

            {searchResults.length === 0 ? (
              <div className="no-search-results">
                No items found for "<strong>{searchQuery}</strong>"
              </div>
            ) : (
              <div className="search-results-list">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    className="search-item-row"
                    onClick={() => handleSelectProduct(item.id)}
                  >
                    <img src={item.image} alt={item.name} className="search-item-thumb" />
                    <div className="search-item-details">
                      <div className="search-item-name">{item.name}</div>
                      <div className="search-item-cat">{item.category}</div>
                    </div>
                    <div className="search-item-price">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
                <div
                  className="search-see-all"
                  onClick={() => {
                    setShowSearchDropdown(false);
                    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
                  }}
                >
                  See all matching products in catalog →
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Navigation */}
      <div className="navbar__right">
        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="navbar__link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action icons */}
        <div className="navbar__icons">
          {/* Wishlist Heart with Counter */}
          <Link to="/wishlist" className="navbar__icon-btn" title="Favourites">
            ❤️
            {wishlistCount > 0 && (
              <span className="navbar__badge">{wishlistCount}</span>
            )}
          </Link>

          {/* Cart Icon with Counter */}
          <Link to="/cart" className="navbar__icon-btn" title="Cart">
            🛒
            {cartCount > 0 && (
              <span className="navbar__badge">{cartCount > 99 ? '99+' : cartCount}</span>
            )}
          </Link>

          {/* Account Icon */}
          <Link
            to={user ? "/dashboard" : "/account"}
            className="navbar__icon-btn user-btn"
            title={user ? `${user.name} (Account)` : "Login / Account"}
          >
            👤
            {user && <span className="nav-user-firstname">{user.name.split(' ')[0]}</span>}
          </Link>

          {/* Discreet Admin Lock Link (Owner Only) */}
          <Link to="/admin" className="navbar__admin-lock" title="Admin Portal (Password Protected)">
            🔒
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
          <span className="navbar__hamburger-line" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="navbar__mobile-menu">
          <ul className="navbar__mobile-links">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/wishlist" onClick={() => setMobileOpen(false)}>
                ❤️ Favourites ({wishlistCount})
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={() => setMobileOpen(false)}>
                🛒 Shopping Cart ({cartCount})
              </Link>
            </li>
            <li>
              <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                📦 My Orders & Tracking
              </Link>
            </li>
            <li>
              <Link to="/admin" onClick={() => setMobileOpen(false)}>
                🔒 Admin Portal
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
