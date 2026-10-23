import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, CheckCircle2, ArrowRight, MapPin, CreditCard } from 'lucide-react';
import './CartDrawer.css';

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
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleMomoCheckout = (event) => {
    event.preventDefault();
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
      <div className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div className="cart-heading">
            <span className="cart-heading-icon"><ShoppingBag size={20} /></span>
            <div>
              <span className="cart-eyebrow">ISOKOLINK MARKETPLACE</span>
              <h3 id="cart-title">Agri-Supply &amp; Produce Cart</h3>
              <p>{totalItems} {totalItems === 1 ? 'item' : 'items'} ready for checkout</p>
            </div>
          </div>
          <button className="cart-close" type="button" aria-label="Close cart" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {orderDone ? (
          <div className="cart-success">
            <span className="cart-success-icon"><CheckCircle2 size={34} /></span>
            <h3>
              Payment Push Sent via MTN MoMo!
            </h3>
            <p>
              Check your mobile phone ({phoneNumber}) and enter your MoMo PIN to authorize order #{Math.floor(100000 + Math.random() * 900000)}.
            </p>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.length === 0 ? (
                <div className="cart-empty">
                  <span className="cart-empty-icon"><ShoppingBag size={26} /></span>
                  <h4>Your cart is empty</h4>
                  <p>Browse farm inputs or fresh harvests and add items here.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    <div className={`cart-item-icon ${item.type === 'disease-defense' ? 'cart-item-icon-supply' : 'cart-item-icon-produce'}`} aria-hidden="true">{item.type === 'disease-defense' ? '🛡️' : '🌾'}</div>

                    <div className="cart-item-details">
                      <div className="cart-item-title">{item.title}</div>
                      <div className="cart-item-price">{item.price.toLocaleString()} RWF <span>/ {item.unit}</span></div>
                      {item.supplier && <div className="cart-item-supplier">From {item.supplier}</div>}
                      <div className="cart-line-total">Line total <strong>{(item.price * (item.quantity || 1)).toLocaleString()} RWF</strong></div>
                    </div>

                    <div className="cart-item-actions">
                      <button
                        type="button"
                        className="cart-quantity-button"
                        aria-label={`Decrease quantity of ${item.title}`}
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                      >
                        <Minus size={12} />
                      </button>

                      <span className="cart-quantity-value" aria-label={`Quantity ${(item.quantity || 1)}`}>
                        {item.quantity || 1}
                      </span>

                      <button
                        type="button"
                        className="cart-quantity-button"
                        aria-label={`Increase quantity of ${item.title}`}
                        onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                      >
                        <Plus size={12} />
                      </button>

                      <button
                        type="button"
                        className="cart-remove-button"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <form className="cart-footer" onSubmit={handleMomoCheckout}>
                <div className="cart-section-title"><MapPin size={16} /><div><h4>Delivery details</h4><p>Choose where your order should go.</p></div></div>
                <div className="cart-field">
                  <label htmlFor="cart-delivery-location">Pickup / delivery depot</label>
                  <select
                    id="cart-delivery-location"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                  >
                    <option value="Musanze Sector SACCO Agro-Dealers">Musanze Sector SACCO Agro-Dealers Hub</option>
                    <option value="Nyabugogo Agro-Inputs Wholesale Depot">Nyabugogo Agro-Inputs Wholesale Depot (Kigali)</option>
                    <option value="Nyagatare Farmers Union Depot">Nyagatare Farmers Union Collection Center</option>
                    <option value="Huye University Extension Depot">Huye University Extension Depot</option>
                    <option value="Rubavu Lake Kivu Agro-Station">Rubavu Lake Kivu Agro-Station</option>
                  </select>
                </div>

                <div className="cart-field">
                  <label htmlFor="cart-phone-number">Mobile Money number</label>
                  <input
                    id="cart-phone-number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+250 788 000 000"
                    required
                  />
                </div>

                <div className="cart-total-row">
                  <span><span className="cart-total-caption">Order total</span><span className="cart-total-note">Delivery charges confirmed by supplier</span></span>
                  <span>{totalAmount.toLocaleString()} RWF</span>
                </div>

                <button
                  type="submit"
                  className="btn-checkout-momo"
                  disabled={isProcessing}
                >
                  <span className="cart-checkout-icon"><CreditCard size={17} /></span>
                  <span>{isProcessing ? 'Connecting to MoMo Gateway...' : 'Continue with Mobile Money'}</span>
                  {!isProcessing && <ArrowRight size={16} />}
                </button>

                <div className="cart-security-note">
                  <ShieldCheck size={15} /> Escrow protection holds funds until delivery is verified.
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
