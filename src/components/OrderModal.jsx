import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, Truck, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function OrderModal({ isOpen, onClose, produce, onSubmitOrder }) {
  const [orderQuantity, setOrderQuantity] = useState(1000); // 1000 kg default
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('+250 78');
  const [deliveryType, setDeliveryType] = useState('kigali_delivery');
  const [notes, setNotes] = useState('');

  const availableKg = produce ? Number(produce.quantityAvailable) * (String(produce.unit).toLowerCase().startsWith('ton') ? 1000 : 1) : 0;
  const minOrderKg = produce ? Math.max(1, Number(String(produce.minOrder).match(/[\d.]+/)?.[0] || 1)) : 1;
  useEffect(() => {
    if (produce) setOrderQuantity(Math.min(1000, availableKg));
  }, [produce?.id, availableKg]);

  if (!isOpen || !produce) return null;

  const totalAmount = orderQuantity * produce.pricePerKg;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerPhone.trim() || orderQuantity < minOrderKg || orderQuantity > availableKg) return;

    const orderPayload = {
      id: `ord-${Date.now()}`,
      produceId: produce.id,
      produceName: produce.name,
      quantityKg: orderQuantity,
      pricePerKg: produce.pricePerKg,
      totalAmount,
      buyerName,
      buyerPhone,
      deliveryType,
      farmerPhone: produce.farmerPhone,
      cooperative: produce.cooperative,
      date: new Date().toLocaleDateString()
    };

    onSubmitOrder(orderPayload);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <h3>Place Bulk Produce Order</h3>
            <p>Direct purchase agreement with {produce.cooperative} ({produce.district})</p>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Produce Summary Card */}
          <div style={{
            background: 'var(--surface-2)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <img
              src={produce.image}
              alt={produce.name}
              style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
            />
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--primary-dark)' }}>{produce.name}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {produce.kinyarwandaName} • Grade: {produce.grade}
              </p>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-600)', marginTop: '0.2rem' }}>
                {produce.pricePerKg.toLocaleString()} RWF / kg
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Order Quantity in Kilograms (Kg)</label>
            <input
              type="number"
              min={minOrderKg}
              max={availableKg}
              step="1"
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(Number(e.target.value))}
              required
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.2rem', display: 'block' }}>
              Minimum bulk threshold: {produce.minOrder}. Available: {availableKg.toLocaleString()} kg
            </span>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Buyer / Company Name</label>
              <input
                type="text"
                placeholder="e.g. Kigali Wholesale Foods / Hotel des Mille Collines"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Contact Phone (MoMo / WhatsApp)</label>
              <input
                type="tel"
                placeholder="+250 788 000 000"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Logistics & Delivery Method</label>
            <select
              value={deliveryType}
              onChange={(e) => setDeliveryType(e.target.value)}
            >
              <option value="kigali_delivery">IsokoLink Haulage Truck to Kigali Hub (Kimironko / Nyabugogo)</option>
              <option value="direct_farmgate">Self-Pickup at Farm-gate Collection Center in {produce.district}</option>
              <option value="cold_chain">Cold-Chain Reefer Truck Direct to Buyer Warehouse</option>
            </select>
          </div>

          <div className="form-group">
            <label>Special Instructions or Packaging Requirements</label>
            <textarea
              rows="2"
              placeholder="e.g. Pack in 50kg ventilated mesh bags, delivery required by Friday morning"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Pricing Total Breakdown */}
          <div style={{
            background: 'var(--primary-subtle)',
            border: '1px solid var(--primary-border)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.76rem', color: 'var(--primary-dark)', fontWeight: 600 }}>
                Total Order Value (Escrow Secured):
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-dark)', fontFamily: 'var(--font-heading)' }}>
                {totalAmount.toLocaleString()} RWF
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#15803d', fontSize: '0.78rem', fontWeight: 700 }}>
              <ShieldCheck size={16} />
              <span>MoMo Escrow Protection</span>
            </div>
          </div>

          <button type="submit" disabled={orderQuantity < minOrderKg || orderQuantity > availableKg || !buyerName.trim() || !buyerPhone.trim()} className="btn-submit-form">
            Confirm Bulk Purchase Request
          </button>
        </form>
      </div>
    </div>
  );
}
