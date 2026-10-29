import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import './ProductDetail.css';

const dummyReviews = [
  {
    id: 1,
    name: 'Aarav Sharma',
    initials: 'AS',
    rating: 5,
    date: 'Oct 15, 2026',
    comment: 'Absolutely love this product! The quality is exceptional and it arrived well-packaged. Highly recommend to anyone looking for a reliable purchase.',
  },
  {
    id: 2,
    name: 'Priya Patel',
    initials: 'PP',
    rating: 4,
    date: 'Oct 8, 2026',
    comment: 'Great value for money. Works exactly as described. Delivery was prompt and customer service was helpful when I had a question.',
  },
  {
    id: 3,
    name: 'Rohan Mehta',
    initials: 'RM',
    rating: 5,
    date: 'Sep 28, 2026',
    comment: 'Premium quality product. I compared this with many other options and this one stands out. Will definitely buy again.',
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    initials: 'SG',
    rating: 4,
    date: 'Sep 20, 2026',
    comment: 'Very satisfied with my purchase. The build quality is solid and it looks even better in person than in the photos.',
  },
];

const renderStars = (rating, size = '1rem') => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.3;
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<span key={i}>★</span>);
    } else if (i === fullStars && hasHalf) {
      stars.push(<span key={i}>★</span>);
    } else {
      stars.push(
        <span key={i} className="pd-star-empty">
          ★
        </span>
      );
    }
  }
  return stars;
};

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isFavorite, showToast } = useStore();
  const product = products.find((p) => String(p.id) === String(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleShareProduct = async () => {
    const productUrl = window.location.href;
    const shareText = `Check out ${product?.name} on VK Store!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product?.name} | VK Store`,
          text: shareText,
          url: productUrl,
        });
        showToast('Shared successfully! 📤', 'success');
        return;
      } catch (err) {}
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${productUrl}`);
      showToast('Product link copied to clipboard! 📋', 'success');
    } catch (err) {
      showToast(`Link: ${productUrl}`, 'info');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="pd-not-found">
            <div className="pd-not-found-icon">📦</div>
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Generate thumbnail images (same image repeated for demo)
  const thumbnailImages = [
    product.image,
    product.image.replace('w=400', 'w=401'),
    product.image.replace('w=400', 'w=402'),
    product.image.replace('w=400', 'w=403'),
  ];

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pd-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/products">Products</Link>
          <span>›</span>
          <span>{product.name}</span>
        </nav>

        {/* Top Section */}
        <div className="pd-top">
          {/* Left Column - Images */}
          <div className="pd-images">
            <img
              src={thumbnailImages[selectedImage]}
              alt={product.name}
              className="pd-main-image"
            />
            <div className="pd-thumbnails">
              {thumbnailImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  className={`pd-thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="pd-info">
            <span className="pd-category">{product.category}</span>

            <h1 className="pd-name">{product.name}</h1>

            {/* Rating */}
            <div className="pd-rating">
              <div className="pd-stars">{renderStars(product.rating)}</div>
              <span className="pd-rating-number">{product.rating}</span>
              <span className="pd-review-count">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="pd-price-section">
              <span className="pd-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="pd-original-price">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discount > 0 && (
                <span className="pd-discount-badge">-{product.discount}%</span>
              )}
            </div>

            {/* Description */}
            <p className="pd-short-desc">{product.description}</p>

            {/* Key Features */}
            <div>
              <div className="pd-features-label">Key Features</div>
              <div className="pd-features-list">
                {product.features.slice(0, 5).map((feature, index) => (
                  <div key={index} className="pd-feature-item">
                    <div className="pd-feature-bullet"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div className={`pd-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
              {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
            </div>

            <hr className="pd-divider" />

            {/* Trust Badges */}
            <div className="pd-trust-badges">
              <div className="pd-trust-badge">
                <span className="pd-trust-icon">🚚</span>
                <span className="pd-trust-title">Free Shipping</span>
                <span className="pd-trust-subtitle">On orders above ₹999</span>
              </div>
              <div className="pd-trust-badge">
                <span className="pd-trust-icon">🔄</span>
                <span className="pd-trust-title">Easy Returns</span>
                <span className="pd-trust-subtitle">7 Days return</span>
              </div>
              <div className="pd-trust-badge">
                <span className="pd-trust-icon">🔒</span>
                <span className="pd-trust-title">Secure Payment</span>
                <span className="pd-trust-subtitle">100% secure</span>
              </div>
            </div>

            <hr className="pd-divider" />

            {/* Quantity & Add to Cart */}
            <div className="pd-actions">
              <div className="pd-quantity-row">
                <span className="pd-quantity-label">Quantity</span>
                <div className="pd-quantity-selector">
                  <button
                    className="pd-qty-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="pd-qty-input"
                    value={quantity}
                    min="1"
                    max="10"
                    readOnly
                  />
                  <button
                    className="pd-qty-btn"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: '#f97316',
                    color: 'white',
                    fontWeight: 700,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                  disabled={!product.inStock}
                  onClick={() => {
                    addToCart(product, quantity);
                    navigate('/checkout');
                  }}
                >
                  ⚡ Buy Now
                </button>
                <button
                  className="pd-add-to-cart"
                  style={{ flex: 1.2 }}
                  disabled={!product.inStock}
                  onClick={() => addToCart(product, quantity)}
                >
                  🛒 Add to Cart
                </button>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  onClick={handleShareProduct}
                >
                  🔗 Share with Friends
                </button>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                  onClick={() => toggleWishlist(product)}
                >
                  {isFavorite(product?.id) ? '❤️ In Favourites' : '♡ Add to Favourites'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="pd-tabs-section">
          <div className="pd-tabs-nav">
            <button
              className={`pd-tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`pd-tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button
              className={`pd-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviews})
            </button>
          </div>

          <div className="pd-tab-content">
            {/* Description Tab */}
            {activeTab === 'description' && (
              <div>
                <p className="pd-description-text">{product.description}</p>
                <h3 className="pd-desc-features-title">Key Features</h3>
                <div className="pd-desc-features">
                  {product.features.map((feature, index) => (
                    <div key={index} className="pd-desc-feature">
                      <span className="pd-desc-feature-icon">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specifications' && (
              <table className="pd-specs-table">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="pd-reviews-summary">
                  <span className="pd-reviews-score">{product.rating}</span>
                  <div className="pd-reviews-stars-wrap">
                    <div className="pd-reviews-stars-row">
                      {renderStars(product.rating, '1.125rem')}
                    </div>
                    <span className="pd-reviews-total">
                      Based on {product.reviews} reviews
                    </span>
                  </div>
                </div>

                <div className="pd-reviews-list">
                  {dummyReviews.map((review) => (
                    <div key={review.id} className="pd-review-card">
                      <div className="pd-review-avatar">{review.initials}</div>
                      <div className="pd-review-body">
                        <div className="pd-review-header">
                          <span className="pd-review-name">{review.name}</span>
                          <span className="pd-review-date">{review.date}</span>
                        </div>
                        <div className="pd-review-stars">
                          {renderStars(review.rating)}
                        </div>
                        <p className="pd-review-comment">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
