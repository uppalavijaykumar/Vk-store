import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { collections } from '../../data/products';
import { useStore } from '../../context/StoreContext';
import './Home.css';

// 5 Banner Carousel slides that change every 3 seconds
const carouselSlides = [
  {
    id: 1,
    tag: '⚡ MEGA ELECTRONICS SALE',
    title: 'Smart Tech & Wearables',
    highlight: 'Up to 50% Off',
    subtitle: 'Track your health, calls, and workout metrics with next-gen OLED smartwatches.',
    cta: 'Shop Smart Watches →',
    link: '/product/2',
    bg: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
    image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=450&fit=crop'
  },
  {
    id: 2,
    tag: '🍳 HOME & CHEF ESSENTIALS',
    title: 'Smart 5L Air Fryer',
    highlight: '80% Less Oil',
    subtitle: 'Healthy crispy cooking with rapid hot air technology and touch presets.',
    cta: 'Explore Kitchen Deals →',
    link: '/product/1',
    bg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
    image: 'https://images.unsplash.com/photo-1626509653291-18d9a934b9db?w=600&h=450&fit=crop'
  },
  {
    id: 3,
    tag: '🎧 WIRELESS IMMERSION',
    title: 'Active Noise Cancelling',
    highlight: 'Pure Studio Sound',
    subtitle: 'Up to 30 hours playback, dynamic drivers, and crystal-clear voice clarity.',
    cta: 'Shop Audio Gear →',
    link: '/product/5',
    bg: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&h=450&fit=crop'
  },
  {
    id: 4,
    tag: '✨ GLOW & REJUVENATE',
    title: 'Organic Vitamin C Glow',
    highlight: 'Derma Approved',
    subtitle: 'Natural ingredients formulated for radiant, healthy, and deeply nourished skin.',
    cta: 'Explore Skincare →',
    link: '/product/4',
    bg: 'linear-gradient(135deg, #4c0519 0%, #881337 100%)',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=450&fit=crop'
  },
  {
    id: 5,
    tag: '🎒 TRAVEL & ADVENTURE',
    title: 'Waterproof Commute Packs',
    highlight: 'Anti-Theft Design',
    subtitle: 'Padded laptop sleeves, USB charging ports, and water-repellent ballistic nylon.',
    cta: 'Shop Bags & Travel →',
    link: '/product/3',
    bg: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=450&fit=crop'
  }
];

function Home() {
  const { products } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto horizontal carousel change every 3 seconds (3000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = products.slice(0, 4);

  const trustBadges = [
    {
      icon: '🎯',
      title: 'Thoughtful Product Picks',
      description: 'Handpicked for quality & value'
    },
    {
      icon: '🤝',
      title: 'Helpful Support',
      description: "We're here for you 24/7"
    },
    {
      icon: '🛍️',
      title: 'Shopping Made Simple',
      description: 'Fast, secure, and easy checkout'
    }
  ];

  return (
    <div className="home">
      {/* 5-Slide Horizontal Continuous Carousel (3s interval) */}
      <section className="hero-carousel-container">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="carousel-slide"
              style={{ background: slide.bg }}
            >
              <div className="container slide-content-grid">
                <div className="slide-text">
                  <span className="slide-tag">{slide.tag}</span>
                  <h1 className="slide-title">
                    {slide.title} <span className="highlight-badge">{slide.highlight}</span>
                  </h1>
                  <p className="slide-subtitle">{slide.subtitle}</p>
                  <div className="slide-actions">
                    <Link to={slide.link} className="hero-cta">
                      {slide.cta}
                    </Link>
                    <Link to="/products" className="hero-cta-secondary">
                      View All Products
                    </Link>
                  </div>
                </div>

                <div className="slide-image-box">
                  <img src={slide.image} alt={slide.title} className="slide-img" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicators */}
        <div className="carousel-indicators">
          {carouselSlides.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${currentSlide === i ? 'active' : ''}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Next / Prev Buttons */}
        <button
          className="carousel-arrow prev"
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1))}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          className="carousel-arrow next"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)}
          aria-label="Next slide"
        >
          ›
        </button>
      </section>

      {/* Featured Products */}
      <section className="section featured-products">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="badge badge-primary">TOP RATED</span>
              <h2 className="section-title">Featured Products</h2>
            </div>
            <Link to="/products" className="view-all">
              View All ({products.length} Products) →
            </Link>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Explore the Collections */}
      <section className="section collections">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="badge badge-primary">CATEGORIES</span>
              <h2 className="section-title">Explore the Collections</h2>
            </div>
            <Link to="/products" className="view-all">
              View All →
            </Link>
          </div>
          <div className="collections-grid">
            {collections.map((collection) => (
              <Link
                to={`/products?category=${encodeURIComponent(collection.name)}`}
                className="collection-card"
                key={collection.name}
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="collection-image"
                />
                <div className="collection-overlay">
                  <h3 className="collection-name">{collection.name}</h3>
                  <span className="collection-count">
                    Total Items: {collection.totalItems}
                  </span>
                  <span className="collection-link">View Products →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="section trust-badges">
        <div className="container">
          <div className="trust-grid">
            {trustBadges.map((badge) => (
              <div className="trust-card" key={badge.title}>
                <span className="trust-icon">{badge.icon}</span>
                <h4 className="trust-title">{badge.title}</h4>
                <p className="trust-description">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section newsletter">
        <div className="container">
          <div className="newsletter-inner">
            <h2 className="newsletter-title">Good Finds, Delivered</h2>
            <p className="newsletter-subtitle">
              Subscribe to get exclusive member discounts and instant new arrival updates.
            </p>
            <form
              className="newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to VK Store deals! 🎉');
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
