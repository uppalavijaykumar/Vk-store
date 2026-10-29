import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <div className="container">
        {/* Header */}
        <div className="about-header">
          <span className="badge badge-accent">OUR STORY</span>
          <h1>About VK STORE</h1>
          <p className="about-subtitle">
            Curating premium quality lifestyle, tech, and everyday essentials at honest prices.
          </p>
        </div>

        {/* Mission grid */}
        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon">🌟</div>
            <h3>Premium Curation</h3>
            <p>Every product is handpicked and tested for durability, performance, and aesthetic perfection before joining our catalog.</p>
          </div>

          <div className="about-card">
            <div className="about-icon">💎</div>
            <h3>Transparent Pricing</h3>
            <p>No hidden markups. We streamline supply chains directly from creators to you, guaranteeing true value for every rupee spent.</p>
          </div>

          <div className="about-card">
            <div className="about-icon">🛡️</div>
            <h3>Customer First Guarantee</h3>
            <p>Enjoy secure payments, easy 7-day hassle-free returns, and 24/7 dedicated customer assistance whenever you need us.</p>
          </div>
        </div>

        {/* Banner */}
        <div className="about-stats-banner">
          <div className="about-stat">
            <div className="num">50,000+</div>
            <div className="lbl">Happy Customers Across India</div>
          </div>
          <div className="about-stat">
            <div className="num">99.4%</div>
            <div className="lbl">On-Time Delivery Rate</div>
          </div>
          <div className="about-stat">
            <div className="num">4.8 ★</div>
            <div className="lbl">Average Verified Rating</div>
          </div>
        </div>

        {/* CTA */}
        <div className="about-cta">
          <h2>Ready to discover your next favourite?</h2>
          <Link to="/products" className="btn btn-primary btn-lg">
            Explore Collection →
          </Link>
        </div>
      </div>
    </div>
  );
}
