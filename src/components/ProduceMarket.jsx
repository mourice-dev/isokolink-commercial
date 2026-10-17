import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle,
  PhoneCall,
  Scale,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { PRODUCE_CATEGORIES } from '../data/mockData';

export default function ProduceMarket({
  listings,
  selectedCategory,
  setSelectedCategory,
  onOrderClick,
  onAddToCart,
  searchQuery,
  selectedDistrict,
}) {
  const [activeSort, setActiveSort] = useState('latest');

  // Filter listings
  const filteredListings = listings.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDistrict =
      selectedDistrict === 'All Rwanda' || item.district.includes(selectedDistrict.split(' ')[0]);
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kinyarwandaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cooperative.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDistrict && matchesSearch;
  });

  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (activeSort === 'price-low') return a.pricePerKg - b.pricePerKg;
    if (activeSort === 'price-high') return b.pricePerKg - a.pricePerKg;
    if (activeSort === 'volume') return b.quantityAvailable - a.quantityAvailable;
    return 0; // default latest
  });

  return (
    <section className="produce-market-section">
      {/* Section Header */}
      <div className="section-header">
        <div>
          <span className="section-tag">
            <Sparkles size={14} /> Fresh Harvest Supply Chain
          </span>
          <h2>Rwanda Farm Produce Marketplace</h2>
          <p className="section-subtitle">
            Buy high-quality, verified crops directly from agricultural cooperatives across Rwanda. 
            Transparent farm-gate rates, bulk delivery guarantees, and zero middleman markups.
          </p>
        </div>

        {/* Sort Controls */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Sort by:</span>
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            style={{
              padding: '0.4rem 0.8rem',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--surface-3)',
              background: '#fff',
              fontSize: '0.82rem',
              fontWeight: 600
            }}
          >
            <option value="latest">Latest Harvests</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="volume">Available Volume</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="category-filter-bar">
        {PRODUCE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`cat-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Results Count & Empty State */}
      {sortedListings.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1rem',
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px dashed var(--surface-3)',
          marginBottom: '3rem'
        }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
            No produce found matching your search.
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Try resetting your filters or selecting "All Rwanda" to see all available harvests.
          </p>
        </div>
      ) : (
        <div className="cards-grid">
          {sortedListings.map((produce) => (
            <article key={produce.id} className="produce-card">
              {/* Image & Badges */}
              <div className="produce-image-wrap">
                <img src={produce.image} alt={produce.name} loading="lazy" />
                <div className="badge-location">
                  <MapPin size={12} />
                  <span>{produce.district}</span>
                </div>
                {produce.rabCertified && (
                  <div className="badge-verified-rab">
                    <ShieldCheck size={12} />
                    <span>RAB Verified</span>
                  </div>
                )}
                <div className="badge-volume">
                  <Scale size={12} style={{ display: 'inline', marginRight: 4 }} />
                  {produce.quantityAvailable} {produce.unit} Available
                </div>
              </div>

              {/* Card Body */}
              <div className="produce-card-body">
                <div className="produce-card-header">
                  <h3 className="crop-title">{produce.name}</h3>
                  <p className="crop-kinya">{produce.kinyarwandaName}</p>
                </div>

                <div className="farmer-coop-bar">
                  <Award size={14} style={{ color: '#10805c', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600 }}>{produce.cooperative}</span>
                </div>

                <div className="produce-grade-tag">
                  🎯 {produce.grade} • Min Order: {produce.minOrder}
                </div>

                <p className="produce-desc">{produce.description}</p>

                <div className="tags-row">
                  {produce.tags.map((tag, idx) => (
                    <span key={idx} className="tag-badge">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Pricing Box */}
                <div className="produce-pricing-box">
                  <div className="price-main">
                    <span className="price-unit">{produce.pricePerKg.toLocaleString()} RWF</span>
                    <span className="price-sub">per kilogram (Farm-gate)</span>
                  </div>
                  <div className="market-estimate">
                    Kigali Wholesale: ~{produce.marketEstimate} RWF
                  </div>
                </div>

                {/* Actions */}
                <div className="card-actions-row">
                  <button
                    className="btn-card-primary"
                    onClick={() => onOrderClick(produce)}
                  >
                    <ShoppingBag size={16} />
                    <span>Bulk Order / Quote</span>
                  </button>

                  <a
                    href={`tel:${produce.farmerPhone}`}
                    className="btn-card-secondary"
                    title={`Call Farmer (${produce.farmerName})`}
                  >
                    <PhoneCall size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
