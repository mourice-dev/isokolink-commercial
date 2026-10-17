import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutComplete,
}) {
  const [deliveryLocation, setDeliveryLocation] = useState('Musanze Sector SACCO Agro-Dealers');
  const [phoneNumber, setPhoneNumber] = useState('+250 78');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleMomoCheckout = () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderDone(true);
      setTimeout(() => {
        onCheckoutComplete();
        setOrderDone(false);
        onClose();
      }, 1800);
    }, 1500);
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)' }}>
              Agri-Supply & Produce Cart
            </h3>
          </div>
          <button className="btn-close-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {orderDone ? (
          <div style={{ textAlign: 'center', padding: '3rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={56} style={{ color: '#16a34a', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>
              Payment Push Sent via MTN MoMo!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 300 }}>
              Check your mobile phone ({phoneNumber}) and enter your MoMo PIN to authorize order #{Math.floor(100000 + Math.random() * 900000)}.
            </p>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
                  <ShoppingBag size={48} style={{ opacity: 0.3, margin: '0 auto 1rem' }} />
                  <p style={{ fontWeight: 600 }}>Your cart is empty.</p>
                  <p style={{ fontSize: '0.82rem', marginTop: '0.25rem' }}>
                    Browse disease prevention kits or food harvests to add items.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    <div className="cart-item-icon">
                      {item.type === 'disease-defense' ? '🛡️' : '🌾'}
                    </div>

                    <div className="cart-item-details">
                      <div className="cart-item-title">{item.title}</div>
                      <div className="cart-item-price">
                        {item.price.toLocaleString()} RWF / {item.unit}
                      </div>
                      {item.supplier && (
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>
                          Dispatched by: {item.supplier}
                        </div>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <button
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 4,
                          background: 'var(--surface-2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                      >
                        <Minus size={12} />
                      </button>

                      <span style={{ fontWeight: 700, fontSize: '0.85rem', minWidth: 20, textAlign: 'center' }}>
                        {item.quantity || 1}
                      </span>

                      <button
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 4,
                          background: 'var(--surface-2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                      >
                        <Plus size={12} />
                      </button>

                      <button
                        style={{ color: '#ef4444', marginLeft: '0.4rem', padding: '0.2rem' }}
                        onClick={() => onRemoveItem(item.id)}
                        title="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label style={{ fontSize: '0.78rem' }}>Pickup / Delivery Depot in Rwanda</label>
                  <select
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    style={{ fontSize: '0.82rem', padding: '0.5rem' }}
                  >
                    <option value="Musanze Sector SACCO Agro-Dealers">Musanze Sector SACCO Agro-Dealers Hub</option>
                    <option value="Nyabugogo Agro-Inputs Wholesale Depot">Nyabugogo Agro-Inputs Wholesale Depot (Kigali)</option>
                    <option value="Nyagatare Farmers Union Depot">Nyagatare Farmers Union Collection Center</option>
                    <option value="Huye University Extension Depot">Huye University Extension Depot</option>
                    <option value="Rubavu Lake Kivu Agro-Station">Rubavu Lake Kivu Agro-Station</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '0.9rem' }}>
                  <label style={{ fontSize: '0.78rem' }}>MTN / Airtel Mobile Money Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    style={{ fontSize: '0.82rem', padding: '0.5rem' }}
                    placeholder="+250 788 000 000"
                  />
                </div>

                <div className="cart-total-row">
                  <span>Grand Total:</span>
                  <span>{totalAmount.toLocaleString()} RWF</span>
                </div>

                <button
                  className="btn-checkout-momo"
                  onClick={handleMomoCheckout}
                  disabled={isProcessing}
                >
                  <span>{isProcessing ? 'Connecting to MoMo Gateway...' : 'Pay with MTN MoMo / Airtel Money'}</span>
                  {!isProcessing && <ArrowRight size={16} />}
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '0.4rem' }}>
                  🔒 Escrow protection: Funds held until input delivery verification
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
