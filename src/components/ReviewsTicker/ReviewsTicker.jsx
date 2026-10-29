import React from 'react';
import { reviewsData } from '../../data/reviewsData';
import './ReviewsTicker.css';

export default function ReviewsTicker() {
  // Multiply reviews array to create infinite seamless horizontal scroll loop
  const displayReviews = [...reviewsData, ...reviewsData.slice(0, 50)];

  return (
    <section className="reviews-ticker-section">
      <div className="container">
        <div className="reviews-ticker-header">
          <div className="rating-pill">
            <span className="stars-gold">★★★★★</span>
            <strong>4.9 / 5.0 Star Rating</strong>
          </div>
          <h2 className="reviews-ticker-title">Loved by 50,000+ Happy Customers</h2>
          <p className="reviews-ticker-sub">
            Continuous real-time verified customer reviews from verified buyers across India (Showing 200+ Reviews)
          </p>
        </div>
      </div>

      {/* Infinite scrolling marquee track */}
      <div className="ticker-viewport">
        <div className="ticker-track">
          {displayReviews.map((rev, idx) => (
            <div key={`${rev.id}-${idx}`} className="review-card">
              <div className="review-card-top">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <div className="reviewer-name">
                      {rev.name}
                      <span className="verified-badge" title="Verified Customer">✓ Verified</span>
                    </div>
                    <div className="reviewer-location">📍 {rev.city}, India • {rev.timeAgo}</div>
                  </div>
                </div>
                <div className="review-stars">{'★'.repeat(Math.floor(rev.rating))}</div>
              </div>

              <div className="review-product-tag">
                🏷️ Bought: <strong>{rev.product}</strong>
              </div>

              <p className="review-comment">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
