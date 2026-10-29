import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard/ProductCard'
import { categories } from '../../data/products'
import { useStore } from '../../context/StoreContext'
import './Products.css'

const priceRanges = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹1,000', min: 500, max: 1000 },
  { label: '₹1,000 - ₹2,000', min: 1000, max: 2000 },
  { label: '₹2,000+', min: 2000, max: Infinity }
]

const discountOptions = [
  { label: '10% or more', value: 10 },
  { label: '20% or more', value: 20 },
  { label: '30% or more', value: 30 },
  { label: '50% or more', value: 50 }
]

function Products() {
  const { products } = useStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('All Products')
  const [selectedPrice, setSelectedPrice] = useState(null)
  const [selectedDiscounts, setSelectedDiscounts] = useState([])
  const [sortBy, setSortBy] = useState('popularity')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Sync category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam)
    }
  }, [searchParams])

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    if (category === 'All Products') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', category)
    }
    setSearchParams(searchParams)
  }

  const handlePriceChange = (index) => {
    setSelectedPrice(selectedPrice === index ? null : index)
  }

  const handleDiscountChange = (value) => {
    setSelectedDiscounts((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    )
  }

  const clearAllFilters = () => {
    setActiveCategory('All Products')
    setSelectedPrice(null)
    setSelectedDiscounts([])
    searchParams.delete('category')
    setSearchParams(searchParams)
  }

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Category filter
    if (activeCategory !== 'All Products') {
      result = result.filter((p) => p.category === activeCategory)
    }

    // Price filter
    if (selectedPrice !== null) {
      const range = priceRanges[selectedPrice]
      result = result.filter((p) => p.price >= range.min && p.price < range.max)
    }

    // Discount filter
    if (selectedDiscounts.length > 0) {
      const minDiscount = Math.min(...selectedDiscounts)
      result = result.filter((p) => p.discount >= minDiscount)
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => b.id - a.id)
        break
      case 'popularity':
      default:
        result.sort((a, b) => b.reviews - a.reviews)
        break
    }

    return result
  }, [activeCategory, selectedPrice, selectedDiscounts, sortBy])

  const hasActiveFilters =
    activeCategory !== 'All Products' ||
    selectedPrice !== null ||
    selectedDiscounts.length > 0

  const renderFilterSections = () => (
    <>
      {/* Categories */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Categories</h3>
        <div className="category-list">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-item${activeCategory === cat ? ' active' : ''}`}
              onClick={() => {
                handleCategoryChange(cat)
                setMobileFilterOpen(false)
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Price Range</h3>
        <div className="price-list">
          {priceRanges.map((range, index) => (
            <div className="price-item" key={range.label}>
              <input
                type="radio"
                id={`price-${index}`}
                name="price"
                checked={selectedPrice === index}
                onChange={() => handlePriceChange(index)}
              />
              <label htmlFor={`price-${index}`}>{range.label}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Discount */}
      <div className="sidebar-section">
        <h3 className="sidebar-title">Discount</h3>
        <div className="discount-list">
          {discountOptions.map((opt) => (
            <div className="discount-item" key={opt.value}>
              <input
                type="checkbox"
                id={`discount-${opt.value}`}
                checked={selectedDiscounts.includes(opt.value)}
                onChange={() => handleDiscountChange(opt.value)}
              />
              <label htmlFor={`discount-${opt.value}`}>{opt.label}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  )

  return (
    <div className="products-page">
      <div className="container products-layout">
        {/* Desktop Sidebar */}
        <aside className="products-sidebar">
          {renderFilterSections()}
        </aside>

        {/* Mobile Filter Toggle */}
        <div className="products-main">
          <button
            className="filter-toggle"
            onClick={() => setMobileFilterOpen(true)}
          >
            <span className="filter-toggle-icon">☰</span>
            Filters
          </button>

          {/* Mobile Filter Overlay */}
          <div
            className={`filter-overlay${mobileFilterOpen ? ' visible' : ''}`}
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className={`mobile-sidebar${mobileFilterOpen ? ' open' : ''}`}>
            <div className="mobile-sidebar-header">
              <h3>Filters</h3>
              <button
                className="mobile-sidebar-close"
                onClick={() => setMobileFilterOpen(false)}
              >
                ✕
              </button>
            </div>
            {renderFilterSections()}
          </div>

          {/* Header */}
          <div className="products-header">
            <div className="products-header-left">
              <h1>
                {activeCategory === 'All Products'
                  ? 'All Products'
                  : activeCategory}
              </h1>
              <p>
                Showing 1-{filteredProducts.length} of {filteredProducts.length}{' '}
                products
              </p>
            </div>
            <div className="products-header-right">
              <span className="sort-label">Sort by:</span>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="active-filters">
              {activeCategory !== 'All Products' && (
                <span className="active-filter-tag">
                  {activeCategory}
                  <button
                    className="active-filter-remove"
                    onClick={() => handleCategoryChange('All Products')}
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedPrice !== null && (
                <span className="active-filter-tag">
                  {priceRanges[selectedPrice].label}
                  <button
                    className="active-filter-remove"
                    onClick={() => setSelectedPrice(null)}
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedDiscounts.map((d) => (
                <span className="active-filter-tag" key={d}>
                  {d}%+ off
                  <button
                    className="active-filter-remove"
                    onClick={() => handleDiscountChange(d)}
                  >
                    ×
                  </button>
                </span>
              ))}
              <button className="clear-filters" onClick={clearAllFilters}>
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid */}
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="no-products">
                <span className="no-products-icon">🔍</span>
                <h3>No products found</h3>
                <p>Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
