import React, { useState } from 'react';
import { Truck, Check, Star, Shield, Phone, Calendar, MapPin, Sparkles } from 'lucide-react';
import { FARMING_AGENCIES } from '../data/mockData';

export default function AgencyServices({ onBookAgency }) {
  return (
    <section className="agency-services-section">
      <div className="section-header">
        <div>
          <span className="section-tag">
            <Truck size={14} /> Certified Field Teams & Support
          </span>
          <h2>Professional Farming Agencies & Services</h2>
          <p className="section-subtitle">
            Need on-field crop disease intervention or safe pesticide application? Hire certified 
            farming agencies equipped with motorized sprayers, soil testing equipment, and cold storage logistics.
          </p>
        </div>
      </div>

      <div className="agencies-grid">
        {FARMING_AGENCIES.map((agency) => (
          <div key={agency.id} className="agency-card">
            <div className="agency-header">
              <div>
                <h3 className="agency-name">{agency.name}</h3>
                <div className="agency-location">
                  <MapPin size={12} />
                  <span>{agency.headquarters}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: 700 }}>
                <Star size={14} fill="#f59e0b" />
                <span>{agency.rating}</span>
              </div>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.85rem', lineHeight: 1.5 }}>
              {agency.description}
            </p>

            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--primary-dark)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Specialized Services:
            </div>

            <ul className="agency-services-list">
              {agency.services.map((srv, idx) => (
                <li key={idx}>
                  <Check size={14} />
                  <span>{srv}</span>
                </li>
              ))}
            </ul>

            <div style={{ fontSize: '0.75rem', color: '#15803d', fontWeight: 600, marginBottom: '0.85rem' }}>
              📍 Covers: {agency.serviceArea}
            </div>

            <div className="agency-footer">
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Standard Tariff:</div>
                <div className="agency-fee">{agency.fee}</div>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <a
                  href={`tel:${agency.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'var(--surface-2)',
                    color: 'var(--primary-dark)',
                    border: '1px solid var(--surface-3)'
                  }}
                  title={`Call Agency (${agency.phone})`}
                >
                  <Phone size={14} />
                </a>

                <button
                  className="btn-book-agency"
                  onClick={() => onBookAgency(agency)}
                >
                  Book Agency
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
