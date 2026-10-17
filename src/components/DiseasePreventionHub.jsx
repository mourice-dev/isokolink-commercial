import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  ShoppingCart,
  Phone,
  FileCheck,
  Stethoscope,
  Info,
  Beaker,
  Truck
} from 'lucide-react';
import { DISEASE_CATEGORIES, DISEASE_PREVENTION_PRODUCTS } from '../data/mockData';

export default function DiseasePreventionHub({ onAddToCart, onConsultDoctor, searchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = DISEASE_PREVENTION_PRODUCTS.filter((prod) => {
    const matchesCat = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.kinyarwandaTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.targetedDiseases.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
      prod.activeIngredient.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  return (
    <section className="disease-prevention-section">
      {/* Section Header */}
      <div className="section-header">
        <div>
          <span className="section-tag" style={{ color: 'var(--amber-dark)' }}>
            <ShieldAlert size={14} /> Certified Crop Protection & Health Agency
          </span>
          <h2>Crop Disease Defense & Prevention Hub</h2>
          <p className="section-subtitle">
            Explore and buy laboratory-tested fungicides, pest biologicals, and equipment approved by 
            RAB (Rwanda Agriculture Board) to protect your fields from Late Blight, Fall Armyworm, BXW, and Rust.
          </p>
        </div>

        {/* Quick link to AI Doctor */}
        <button
          onClick={onConsultDoctor}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: '#15803d',
            color: '#fff',
            padding: '0.55rem 1.1rem',
            borderRadius: 'var(--radius-pill)',
            fontWeight: 700,
            fontSize: '0.86rem',
            boxShadow: '0 4px 12px rgba(21, 128, 61, 0.25)'
          }}
        >
          <Stethoscope size={16} />
          <span>Diagnose Crop Symptoms First</span>
        </button>
      </div>

      {/* Prevention Category Pills */}
      <div className="category-filter-bar">
        {DISEASE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`cat-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
            style={
              selectedCategory === cat.id
                ? { background: 'var(--amber-dark)', borderColor: 'var(--amber-dark)' }
                : {}
            }
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Disease Prevention Grid */}
      <div className="cards-grid">
        {filteredProducts.map((product) => (
          <article key={product.id} className="disease-card">
            {/* Threat indicator header */}
            <div className="disease-threat-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <AlertTriangle size={14} style={{ color: '#dc2626' }} />
                <span>Target Threat Defense</span>
              </div>
              <span className="threat-pill">RAB Certified</span>
            </div>

            {/* Image Preview */}
            <div style={{ height: '170px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 8,
                  left: 8,
                  background: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(4px)',
                  color: '#fff',
                  fontSize: '0.72rem',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '4px',
                  fontWeight: 600
                }}
              >
                {product.stockStatus}
              </div>
            </div>

            {/* Card Body */}
            <div className="disease-card-body">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-kinya">{product.kinyarwandaTitle}</p>

              {/* Target Diseases Box */}
              <div className="disease-target-box">
                <div className="target-label">Prevents / Eliminates:</div>
                <div className="target-diseases-list">
                  {product.targetedDiseases.join(' • ')}
                </div>
              </div>

              {/* Active Ingredient & Dosage */}
              <div className="dosage-info-line">
                <Beaker size={14} style={{ color: '#0284c7', flexShrink: 0 }} />
                <span><strong>Formula:</strong> {product.activeIngredient}</span>
              </div>

              <div className="dosage-info-line">
                <Info size={14} style={{ color: '#16a34a', flexShrink: 0 }} />
                <span><strong>Dosage:</strong> {product.dosage}</span>
              </div>

              {/* Agro-Dealer Supplier */}
              <div className="agency-supplier-line">
                <Truck size={14} style={{ flexShrink: 0 }} />
                <span><strong>Agency:</strong> {product.agencySupplier}</span>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                {product.description}
              </p>

              {/* Price and Cart Action */}
              <div className="product-price-row">
                <div>
                  <div className="price-prevention">
                    {product.price.toLocaleString()} RWF
                  </div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-light)' }}>
                    per {product.unit}
                  </span>
                </div>

                <a
                  href={`tel:${product.supplierContact}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: 'var(--surface-2)',
                    color: 'var(--primary-dark)',
                    border: '1px solid var(--surface-3)'
                  }}
                  title={`Call Agro-Dealer (${product.supplierContact})`}
                >
                  <Phone size={16} />
                </a>
              </div>

              <button
                className="btn-buy-prevention"
                onClick={() => onAddToCart({
                  id: product.id,
                  title: product.name,
                  price: product.price,
                  unit: product.unit,
                  type: 'disease-defense',
                  supplier: product.agencySupplier
                })}
              >
                <ShoppingCart size={16} />
                <span>Add to Cart / Buy Kit</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
