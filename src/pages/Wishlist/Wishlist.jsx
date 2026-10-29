import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Wishlist.css';

export default function Wishlist() {
  const { wishlist } = useStore();

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <span className="badge badge-primary">YOUR SAVED ITEMS</span>
          <h1>My Favourites ({wishlist.length})</h1>
          <p>All items you marked with ❤️ will be saved here for quick checkout anytime.</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="wishlist-empty">
            <div className="empty-icon">💔</div>
            <h2>No Favourites Added Yet</h2>
            <p>Click the ❤️ icon on any product in our store to save it to your wishlist.</p>
            <Link to="/products" className="btn btn-primary btn-lg" style={{ marginTop: '16px' }}>
              Explore Trending Products →
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
