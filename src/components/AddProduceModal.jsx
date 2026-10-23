import React, { useState } from 'react';
import { ImagePlus, Upload, X, Sprout } from 'lucide-react';
import { PRODUCE_CATEGORIES, RWANDA_DISTRICTS } from '../data/mockData';
import './AddProduceModal.css';

export default function AddProduceModal({ isOpen, onClose, onAddProduce }) {
  const [imageError, setImageError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    kinyarwandaName: '',
    category: 'tubers',
    district: 'Musanze (Northern)',
    cooperative: '',
    farmerName: '',
    farmerPhone: '+250 78',
    quantityAvailable: '',
    unit: 'Tons',
    minOrder: '500 kg',
    pricePerKg: '',
    harvestDate: 'Harvesting this week',
    grade: 'Grade 1 Quality Verified',
    description: '',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    rabCertified: true,
  });

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setImageError('Choose an image file to continue.');
      e.target.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError('Please choose an image smaller than 5 MB.');
      e.target.value = '';
      return;
    }

    setImageError('');
    const reader = new FileReader();
    reader.onload = () => setFormData((current) => ({ ...current, image: reader.result }));
    reader.onerror = () => setImageError('We couldn’t load that image. Please try another one.');
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.pricePerKg || !formData.quantityAvailable) {
      alert('Please fill out the crop name, price, and available quantity.');
      return;
    }

    const newProduce = {
      ...formData,
      id: `prod-${Date.now()}`,
      pricePerKg: Number(formData.pricePerKg),
      quantityAvailable: Number(formData.quantityAvailable),
      marketEstimate: Math.round(Number(formData.pricePerKg) * 1.25),
      rating: 5.0,
      reviewsCount: 1,
      verified: true,
      tags: ['Newly Listed', 'Fresh Harvest', 'Direct From Farm']
    };

    onAddProduce(newProduce);
    onClose();
  };

  return (
    <div className="modal-overlay harvest-overlay" onClick={onClose}>
      <div className="modal-content harvest-modal" onClick={(e) => e.stopPropagation()}>
        <div className="harvest-header">
          <div className="harvest-heading">
            <span className="harvest-icon"><Sprout size={22} /></span>
            <div className="modal-title">
              <span className="harvest-eyebrow">ISOKOLINK MARKETPLACE</span>
              <h3>List Your Harvest</h3>
              <p>Share your produce with trusted buyers across Rwanda.</p>
            </div>
          </div>
          <button className="btn-close-modal" type="button" aria-label="Close form" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form className="harvest-form" onSubmit={handleSubmit}>
          <div className="harvest-section-heading"><span>01</span><div><h4>Produce details</h4><p>Tell buyers what you’re offering.</p></div></div>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Crop / Produce Name (English)</label>
              <input
                type="text"
                placeholder="e.g. Kinigi Irish Potatoes"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Izina mu Kinyarwanda</label>
              <input
                type="text"
                placeholder="urugero: Ibirayi bya Kinigi"
                value={formData.kinyarwandaName}
                onChange={(e) => setFormData({ ...formData, kinyarwandaName: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Crop Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {PRODUCE_CATEGORIES.filter(c => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>District / Province in Rwanda</label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              >
                {RWANDA_DISTRICTS.filter(d => d !== 'All Rwanda').map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="harvest-photo-field">
            <div className="harvest-photo-copy">
              <label htmlFor="harvest-photo">Product photo</label>
              <p>Add a clear photo so buyers can see the appearance and quality of your produce.</p>
              <label className="harvest-photo-button" htmlFor="harvest-photo">
                <Upload size={16} /> Choose a photo
              </label>
              <input
                className="harvest-photo-input"
                id="harvest-photo"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <span className="harvest-photo-hint">JPG, PNG or WebP · Up to 5 MB</span>
              {imageError && <span className="harvest-photo-error" role="alert">{imageError}</span>}
            </div>
            <div className="harvest-photo-preview">
              {formData.image ? <img src={formData.image} alt="Preview of the produce listing" /> : <div className="harvest-photo-empty"><ImagePlus size={28} /><span>Photo preview</span></div>}
              <span className="harvest-preview-badge"><ImagePlus size={13} /> Listing preview</span>
            </div>
          </div>

          <div className="harvest-section-heading"><span>02</span><div><h4>Availability & pricing</h4><p>Set the quantity and your farm-gate price.</p></div></div>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Available Quantity</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="number"
                  placeholder="e.g. 15"
                  value={formData.quantityAvailable}
                  onChange={(e) => setFormData({ ...formData, quantityAvailable: e.target.value })}
                  required
                />
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  style={{ width: '110px' }}
                >
                  <option value="Tons">Tons</option>
                  <option value="Kg">Kg</option>
                  <option value="Bags">Bags (50kg)</option>
                  <option value="Bunches">Bunches</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Farm-Gate Price (RWF / Kg)</label>
              <input
                type="number"
                placeholder="e.g. 420"
                value={formData.pricePerKg}
                onChange={(e) => setFormData({ ...formData, pricePerKg: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="harvest-section-heading"><span>03</span><div><h4>Seller & quality</h4><p>Help buyers reach you and understand your harvest.</p></div></div>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Farmer Name or Cooperative</label>
              <input
                type="text"
                placeholder="e.g. COOPAMA Musanze"
                value={formData.cooperative}
                onChange={(e) => setFormData({ ...formData, cooperative: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Contact Phone (MoMo)</label>
              <input
                type="tel"
                placeholder="+250 788 123 456"
                value={formData.farmerPhone}
                onChange={(e) => setFormData({ ...formData, farmerPhone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Crop Description & Quality Standards</label>
            <textarea
              rows="3"
              placeholder="Describe soil type, moisture level, disease-free inspection, packaging..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <input
              type="checkbox"
              id="rab-cert"
              checked={formData.rabCertified}
              onChange={(e) => setFormData({ ...formData, rabCertified: e.target.checked })}
              style={{ width: 18, height: 18, accentColor: '#15803d' }}
            />
            <label htmlFor="rab-cert" style={{ fontSize: '0.86rem', color: 'var(--text-main)', cursor: 'pointer' }}>
              I confirm this harvest has been inspected and meets Rwanda Agriculture Board (RAB) health standards
            </label>
          </div>

          <div className="harvest-submit-row">
            <p>Your listing will be visible to marketplace buyers.</p>
            <button type="submit" className="btn-submit-form">
            Publish Harvest to Marketplace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
