import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import './ProductCard.css';

function formatPrice(price) {
  if (price == null) return '';
  return price.toLocaleString('en-IN');
}

function StarRating({ rating = 0 }) {
  const stars = [];
  const roundedRating = Math.round(rating);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={i <= roundedRating ? 'product-card__star--filled' : 'product-card__star--empty'}
      >
        {i <= roundedRating ? '★' : '☆'}
      </span>
    );
  }
  return <div className="product-card__stars">{stars}</div>;
}

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isFavorite, showToast } = useStore();
  const navigate = useNavigate();

  const {
    id,
    name,
    price,
    originalPrice,
    discount,
    rating = 0,
    reviews = 0,
    image,
    category,
  } = product;

  const hasDiscount = discount != null && discount > 0;
  const favorited = isFavorite(id);

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    navigate('/checkout');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    const productUrl = `${window.location.origin}${window.location.pathname}#/product/${id}`;
    const shareText = `Check out ${name} on VK Store for ₹${formatPrice(price)}!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${name} | VK Store`,
          text: shareText,
          url: productUrl,
        });
        showToast('Shared successfully! 📤', 'success');
        return;
      } catch (err) {
        // Fallback to clipboard if user dismissed or unsupported
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${productUrl}`);
      showToast('Product link copied to clipboard! 📋', 'success');
    } catch (err) {
      showToast(`Link: ${productUrl}`, 'info');
    }
  };

  return (
    <div className="product-card">
      {/* Image Section */}
      <div className="product-card__image-wrapper">
        <Link to={`/product/${id}`} className="product-card__image-link">
          <img
            src={image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'}
            alt={name}
            className="product-card__image"
            loading="lazy"
          />
        </Link>

        {hasDiscount && (
          <span className="product-card__discount-badge">-{discount}%</span>
        )}

        {/* Action icons on image top right */}
        <div className="product-card__top-actions">
          {/* Share Button */}
          <button
            type="button"
            className="product-card__icon-btn"
            title="Share Product"
            onClick={handleShare}
          >
            🔗
          </button>

          {/* Dynamic Favourites Heart Button */}
          <button
            type="button"
            className={`product-card__icon-btn ${favorited ? 'favorited' : ''}`}
            title={favorited ? 'Remove from Favourites' : 'Add to Favourites'}
            onClick={handleWishlist}
          >
            {favorited ? '❤️' : '♡'}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="product-card__body">
        {category && <span className="product-card__category">{category}</span>}

        <Link to={`/product/${id}`} className="product-card__name-link">
          <h3 className="product-card__name">{name}</h3>
        </Link>

        {/* Rating */}
        <div className="product-card__rating">
          <StarRating rating={rating} />
          <span className="product-card__rating-text">
            {rating.toFixed(1)} ({reviews.toLocaleString('en-IN')})
          </span>
        </div>

        {/* Price */}
        <div className="product-card__price-row">
          <span className="product-card__price">₹{formatPrice(price)}</span>
          {hasDiscount && originalPrice && (
            <>
              <span className="product-card__original-price">₹{formatPrice(originalPrice)}</span>
              <span className="product-card__discount-text">{discount}% off</span>
            </>
          )}
        </div>

        {/* Dual Actions: Buy Now & Add to Cart */}
        <div className="product-card__actions">
          <button
            type="button"
            className="product-card__buynow-btn"
            onClick={handleBuyNow}
          >
            ⚡ Buy Now
          </button>
          <button
            type="button"
            className="product-card__add-btn"
            onClick={handleAddToCart}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
