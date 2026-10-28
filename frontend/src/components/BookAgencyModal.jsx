import React, { useState } from 'react';
import { X, Truck, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { RWANDA_DISTRICTS } from '../data/mockData';

export default function BookAgencyModal({ isOpen, onClose, agency, onConfirmBooking }) {
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('+250 78');
  const [district, setDistrict] = useState('Musanze (Northern)');
  const [farmSizeHectares, setFarmSizeHectares] = useState('1');
  const [cropType, setCropType] = useState('Irish Potatoes (Ibirayi)');
  const [scheduledDate, setScheduledDate] = useState('');

  if (!isOpen || !agency) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!farmerName || !farmerPhone) {
      alert('Please fill out your contact details.');
      return;
    }

    onConfirmBooking({
      agencyId: agency.id,
      agencyName: agency.name,
      farmerName,
      farmerPhone,
      district,
      farmSizeHectares,
      cropType,
      scheduledDate: scheduledDate || 'Immediate Priority Service',
      estimatedCost: agency.fee
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <h3>Book Certified Field Agency</h3>
            <p>{agency.name} • {agency.fee}</p>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Farmer / Cooperative Representative</label>
              <input
                type="text"
                placeholder="Full Name"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number (MoMo / SMS)</label>
              <input
                type="tel"
                placeholder="+250 788 000 000"
                value={farmerPhone}
                onChange={(e) => setFarmerPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Farm Location / District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                {RWANDA_DISTRICTS.filter(d => d !== 'All Rwanda').map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Farm Size (Hectares or Arpents)</label>
              <input
                type="text"
                placeholder="e.g. 1.5 Hectares"
                value={farmSizeHectares}
                onChange={(e) => setFarmSizeHectares(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Target Crop</label>
              <input
                type="text"
                placeholder="e.g. Irish Potatoes, Coffee, Maize"
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Preferred Visit Date</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
            </div>
          </div>

          <div style={{
            background: 'var(--surface-2)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.25rem',
            fontSize: '0.84rem',
            color: 'var(--text-muted)'
          }}>
            <p><strong>🛡️ Agency Guarantee:</strong> All field operatives arrive with certified protective equipment (PPE), calibrated nozzles, and will submit an official RAB-compliant spray inspection sheet.</p>
          </div>

          <button type="submit" className="btn-submit-form">
            Request Field Agent Visit
          </button>
        </form>
      </div>
    </div>
  );
}
