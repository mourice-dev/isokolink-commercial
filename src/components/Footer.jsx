import React from 'react';
import { Sprout, PhoneCall, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onSwitchTab, onOpenSellModal }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand info */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: '8px',
                background: '#15803d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <Sprout size={20} />
              </div>
              <h4 style={{ margin: 0 }}>IsokoLink Rwanda</h4>
            </div>
            <p>
              Digital agricultural exchange platform connecting Rwandan smallholders directly 
              to high-value food markets, certified crop disease defense products, and professional spraying agencies.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', color: '#34d399', padding: '0.2rem 0.5rem', borderRadius: 4 }}>
                RAB Accredited
              </span>
              <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', color: '#34d399', padding: '0.2rem 0.5rem', borderRadius: 4 }}>
                MINAGRI Compliant
              </span>
              <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.1)', color: '#34d399', padding: '0.2rem 0.5rem', borderRadius: 4 }}>
                Smart Africa Agri-Tech
              </span>
            </div>
          </div>

          {/* Quick Links Market */}
          <div className="footer-col">
            <h5>Produce Markets</h5>
            <ul>
              <li><a href="#market" onClick={() => onSwitchTab('market')}>Kinigi Irish Potatoes</a></li>
              <li><a href="#market" onClick={() => onSwitchTab('market')}>Nyagatare Grain Maize</a></li>
              <li><a href="#market" onClick={() => onSwitchTab('market')}>Hass Export Avocados</a></li>
              <li><a href="#market" onClick={() => onSwitchTab('market')}>Huye Highland Coffee</a></li>
              <li><a href="#sell" onClick={onOpenSellModal}>List Harvest (Farmers)</a></li>
            </ul>
          </div>

          {/* Crop Health Hub */}
          <div className="footer-col">
            <h5>Disease Defense</h5>
            <ul>
              <li><a href="#defense" onClick={() => onSwitchTab('defense')}>Late Blight Fungicides</a></li>
              <li><a href="#defense" onClick={() => onSwitchTab('defense')}>Fall Armyworm Bio-Defense</a></li>
              <li><a href="#defense" onClick={() => onSwitchTab('defense')}>Banana BXW Sanitation Kits</a></li>
              <li><a href="#doctor" onClick={() => onSwitchTab('doctor')}>AI Crop Symptom Doctor</a></li>
              <li><a href="#agencies" onClick={() => onSwitchTab('agencies')}>Certified Spraying Squads</a></li>
            </ul>
          </div>

          {/* Emergency Agronomy Hotline */}
          <div className="footer-col">
            <h5>Emergency Crop Hotline</h5>
            <div className="hotline-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
                <PhoneCall size={14} style={{ color: '#34d399' }} />
                <span>RAB Toll-Free Crop Outbreak:</span>
              </div>
              <div className="hotline-num">4127</div>
              <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.4rem' }}>
                Free calls from MTN & Airtel networks for swift field agronomist dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} IsokoLink Rwanda. Designed for Rwandan Smallholder Farmers and Bulk Food Buyers.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Built with <Heart size={14} fill="#ef4444" color="#ef4444" /> for Rwanda's Agricultural Transformation
          </div>
        </div>
      </div>
    </footer>
  );
}
