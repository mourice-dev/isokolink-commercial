import React, { useEffect, useState } from 'react';
import { CheckCircle2, MapPin, ShieldCheck, ShoppingBag, Truck, X } from 'lucide-react';

function quantityInKg(value) {
  const raw = String(value ?? '').trim().toLowerCase();
  const amount = Number(raw.replace(/,/g, '').match(/[\d.]+/)?.[0] || 0);
  return /\b(ton|tons|tonne|tonnes|t)\b/.test(raw) ? amount * 1000 : amount;
}

export default function OrderModal({ isOpen, onClose, produce, onSubmitOrder }) {
  const [orderQuantity, setOrderQuantity] = useState(1000);
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('+250 78');
  const [deliveryType, setDeliveryType] = useState('kigali_delivery');
  const [notes, setNotes] = useState('');

  const availableKg = produce ? Number(produce.quantityAvailable || 0) * (String(produce.unit).toLowerCase().startsWith('ton') ? 1000 : 1) : 0;
  const minOrderKg = produce ? Math.max(1, quantityInKg(produce.minOrder) || 1) : 1;

  useEffect(() => {
    if (!isOpen || !produce) return;
    setOrderQuantity(Math.min(availableKg, Math.max(minOrderKg, Math.min(1000, availableKg))));
  }, [isOpen, produce?.id, availableKg, minOrderKg]);

  if (!isOpen || !produce) return null;

  const totalAmount = Number(orderQuantity || 0) * Number(produce.pricePerKg || 0);
  const stockBelowMinimum = availableKg < minOrderKg;
  const canSubmit = !stockBelowMinimum && orderQuantity >= minOrderKg && orderQuantity <= availableKg && Boolean(buyerName.trim()) && Boolean(buyerPhone.trim());

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmitOrder({
      id: `ord-${Date.now()}`,
      produceId: produce.id,
      produceName: produce.name,
      quantityKg: orderQuantity,
      pricePerKg: Number(produce.pricePerKg || 0),
      totalAmount,
      buyerName: buyerName.trim(),
      buyerPhone: buyerPhone.trim(),
      deliveryType,
      farmerPhone: produce.farmerPhone,
      cooperative: produce.cooperative,
      notes: notes.trim(),
      date: new Date().toLocaleDateString(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-[#07150d]/70 p-0 backdrop-blur-sm sm:items-center sm:p-5" onClick={onClose}>
      <section role="dialog" aria-modal="true" aria-labelledby="bulk-order-title" className="my-auto max-h-[96dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-[#f8faf5] text-[#17291e] shadow-2xl sm:rounded-3xl" onClick={(event) => event.stopPropagation()}>
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-[#17291e] px-5 py-5 text-white sm:px-7">
          <div>
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2d19e]"><ShoppingBag size={14} /> Secure order request</p>
            <h2 id="bulk-order-title" className="mt-1 text-xl font-semibold sm:text-2xl">Place Bulk Produce Order</h2>
            <p className="mt-1 text-sm text-white/65">Request {produce.name} from {produce.cooperative || 'this farmer'}.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close order form" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 text-white/80 transition hover:bg-white/10 hover:text-white"><X size={19} /></button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
          <div className="flex items-center gap-4 rounded-2xl border border-[#6B8E23]/15 bg-white p-3.5 shadow-sm sm:p-4">
            <img src={produce.image} alt={produce.name} className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold">{produce.name}</h3>{produce.verified && <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-800"><CheckCircle2 size={12} /> Verified</span>}</div>
              <p className="mt-1 flex items-center gap-1 text-xs text-black/55"><MapPin size={13} />{produce.district} · {produce.cooperative || produce.farmerName}</p>
              <p className="mt-2 text-sm font-semibold text-[#556B2F]">{Number(produce.pricePerKg || 0).toLocaleString()} RWF <span className="font-normal text-black/50">per kg</span></p>
            </div>
          </div>

          {stockBelowMinimum && <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">Available stock is below this listing’s minimum order ({produce.minOrder}). Please contact the seller for a smaller order.</p>}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium">Order quantity <span className="text-xs font-normal text-black/50">Kilograms (kg)</span>
              <input type="number" min={minOrderKg} max={availableKg} step="1" value={orderQuantity} onChange={(event) => setOrderQuantity(Number(event.target.value))} required className="w-full rounded-xl border border-black/12 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-2 focus:ring-[#6B8E23]/15" />
              <span className="text-xs font-normal text-black/50">Minimum {minOrderKg.toLocaleString()} kg · {availableKg.toLocaleString()} kg available</span>
            </label>
            <label className="grid gap-1.5 text-sm font-medium">Buyer or company name
              <input type="text" autoComplete="organization" placeholder="Your name or business" value={buyerName} onChange={(event) => setBuyerName(event.target.value)} required className="w-full rounded-xl border border-black/12 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-2 focus:ring-[#6B8E23]/15" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">Contact phone <span className="text-xs font-normal text-black/50">For order coordination</span>
              <input type="tel" autoComplete="tel" placeholder="+250 788 000 000" value={buyerPhone} onChange={(event) => setBuyerPhone(event.target.value)} required className="w-full rounded-xl border border-black/12 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-2 focus:ring-[#6B8E23]/15" />
            </label>
          </div>

          <label className="grid gap-1.5 text-sm font-medium">Delivery method
            <span className="relative"><Truck size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#556B2F]" /><select value={deliveryType} onChange={(event) => setDeliveryType(event.target.value)} className="w-full appearance-none rounded-xl border border-black/12 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-2 focus:ring-[#6B8E23]/15"><option value="kigali_delivery">Delivery to Kigali hub</option><option value="direct_farmgate">Pickup at the farm in {produce.district}</option><option value="cold_chain">Cold-chain delivery to my warehouse</option></select></span>
          </label>

          <label className="grid gap-1.5 text-sm font-medium">Special instructions <span className="text-xs font-normal text-black/50">Optional</span>
            <textarea rows="3" placeholder="Packaging, delivery date, or other requirements" value={notes} onChange={(event) => setNotes(event.target.value)} className="w-full resize-y rounded-xl border border-black/12 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-2 focus:ring-[#6B8E23]/15" />
          </label>

          <div className="flex flex-col gap-3 rounded-2xl border border-[#6B8E23]/20 bg-[#edf3e3] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div><p className="text-xs font-semibold uppercase tracking-wide text-[#556B2F]">Estimated order total</p><p className="mt-1 text-2xl font-bold tracking-tight text-[#17291e]">{totalAmount.toLocaleString()} <span className="text-sm font-semibold">RWF</span></p><p className="mt-1 text-xs text-black/55">{Number(orderQuantity || 0).toLocaleString()} kg × {Number(produce.pricePerKg || 0).toLocaleString()} RWF/kg</p></div>
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#556B2F]"><ShieldCheck size={17} />Payment is selected at the next step</div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-black/8 pt-4 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="rounded-xl border border-black/12 bg-white px-5 py-3 text-sm font-semibold text-[#344638] transition hover:bg-[#f1f4ec]">Cancel</button>
            <button type="submit" disabled={!canSubmit} className="rounded-xl bg-[#6B8E23] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#556B2F] disabled:cursor-not-allowed disabled:opacity-45">Continue to checkout</button>
          </div>
        </form>
      </section>
    </div>
  );
}
