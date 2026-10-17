import React from 'react';
import { Search, MapPin, ShieldCheck, ArrowRight, Sparkles, TrendingUp, Bug } from 'lucide-react';
import { RWANDA_DISTRICTS } from '../data/mockData';

export default function Hero({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  selectedDistrict,
  setSelectedDistrict,
  onSearchSubmit,
}) {
  return (
    <section className="hero-section">
      <div className="hero-pattern" />
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Rwanda Digital Agri-Trade & Crop Health Initiative</span>
          </div>

          <h1 className="hero-title">
            Connect Directly to <span className="highlight-market">Food Markets</span> &{' '}
            <span className="highlight-defense">Prevent Crop Diseases</span>
          </h1>

          <p className="hero-subtitle">
            Eliminate middlemen exploitation: farmers list fresh harvests at transparent farm-gate prices, 
            while accessing accredited agro-vets and disease prevention agencies to protect crops from 
            destructive blights and pests.
          </p>

          {/* Dual Search Box */}
          <div className="hero-search-box">
            <div className="search-toggle-pills">
              <button
                type="button"
                className={`toggle-pill ${activeTab === 'market' ? 'active' : ''}`}
                onClick={() => setActiveTab('market')}
              >
                🌾 Food Produce Market
              </button>
              <button
                type="button"
                className={`toggle-pill ${activeTab === 'defense' ? 'active' : ''}`}
                onClick={() => setActiveTab('defense')}
              >
                🛡️ Disease Prevention Hub
              </button>
              <button
                type="button"
                className={`toggle-pill ${activeTab === 'doctor' ? 'active' : ''}`}
                onClick={() => setActiveTab('doctor')}
              >
                🔬 AI Symptom Doctor
              </button>
            </div>

            <div className="hero-search-inputs">
              <div className="input-field-wrap">
                <Search size={18} />
                <input
                  type="text"
                  placeholder={
                    activeTab === 'defense'
                      ? 'Search disease threats (e.g. Late Blight, Fall Armyworm, Copper)...'
                      : 'Search crops (e.g. Kinigi Potatoes, Avocados, Maize, Beans)...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit && onSearchSubmit()}
                />
              </div>

              <div className="input-field-wrap">
                <MapPin size={18} />
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                >
                  {RWANDA_DISTRICTS.map((dist, idx) => (
                    <option key={idx} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              <button className="btn-search-action" onClick={onSearchSubmit}>
                <span>Search Hub</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="hero-stats-row">
            <div className="stat-card">
              <div className="stat-value">15,400+</div>
              <div className="stat-label">Verified Farmers & Co-ops</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">98.4%</div>
              <div className="stat-label">Crop Disease Defense Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">30 Districts</div>
              <div className="stat-label">Nationwide Farm-to-City Delivery</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">0%</div>
              <div className="stat-label">Middleman Price Gouging</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
