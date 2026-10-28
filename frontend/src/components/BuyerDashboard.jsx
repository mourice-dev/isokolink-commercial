import React, { useEffect, useState } from 'react';
import { ArrowRight, PackageCheck, ShoppingBasket, Store } from 'lucide-react';
import { apiFetch } from '../lib/api';

export default function BuyerDashboard({ user, onBrowseMarket }) {
  const [dashboard, setDashboard] = useState(null);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    let active = true;
    apiFetch('/api/buyer/dashboard')
      .then(async (response) => {
        if (!response.ok) throw new Error('Could not load your buyer workspace.');
        return response.json();
      })
      .then((data) => { if (active) setDashboard(data); })
      .catch((error) => { if (active) setLoadError(error.message); });
    return () => { active = false; };
  }, []);

  const orders = dashboard?.orders || [];
  return <div className="mx-auto max-w-[1000px] py-8 text-[#17291e]">
    <section className="flex flex-col gap-5 rounded-3xl bg-[#17291e] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div><p className="text-xs font-semibold uppercase tracking-widest text-[#c2d19e]">Buyer workspace</p><h1 className="mt-2 text-2xl font-semibold">Welcome, {user?.fullName || 'buyer'}</h1><p className="mt-1 text-sm text-white/65">{user?.organization || user?.details?.organization || 'Find produce and track your order requests.'}</p></div>
      <button type="button" onClick={onBrowseMarket} className="inline-flex items-center gap-2 self-start rounded-xl bg-[#9eb65b] px-4 py-3 text-sm font-semibold text-[#17291e] transition hover:bg-[#b2c778]">Browse produce <ArrowRight size={16} /></button>
    </section>
    <div className="mt-5 grid gap-4 sm:grid-cols-3">
      {[{ label: 'Order requests', value: dashboard ? dashboard.orderCount : '…', icon: ShoppingBasket }, { label: 'Account type', value: 'Buyer', icon: Store }, { label: 'Account status', value: 'Secure', icon: PackageCheck }].map(({ label, value, icon: Icon }) => <article key={label} className="rounded-2xl border border-black/8 bg-white p-5"><Icon size={18} className="text-[#6B8E23]" /><p className="mt-4 text-xs text-black/50">{label}</p><p className="mt-1 text-xl font-semibold">{value}</p></article>)}
    </div>
    <section className="mt-7 rounded-2xl border border-black/8 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex items-center justify-between gap-3"><div><h2 className="text-lg font-semibold">Your order requests</h2><p className="mt-1 text-sm text-black/55">Track requests submitted from your buyer account.</p></div><ShoppingBasket size={20} className="text-[#6B8E23]" /></div>
      {loadError && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">{loadError}</p>}
      {!loadError && !dashboard && <p className="mt-5 text-sm text-black/50">Loading your orders…</p>}
      {dashboard && orders.length === 0 && <div className="mt-5 rounded-xl border border-dashed border-black/15 bg-[#fafbf8] p-8 text-center"><ShoppingBasket className="mx-auto text-[#6B8E23]" /><p className="mt-2 text-sm font-semibold">No orders yet</p><p className="mt-1 text-xs text-black/50">Your produce order requests will appear here.</p><button type="button" onClick={onBrowseMarket} className="mt-4 rounded-lg bg-[#556B2F] px-4 py-2 text-sm font-semibold text-white">Explore the market</button></div>}
      {orders.length > 0 && <div className="mt-5 divide-y divide-black/8">{orders.map((order) => <article key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><h3 className="text-sm font-semibold">{order.productName}</h3><p className="mt-1 text-xs text-black/50">{Number(order.quantityKg).toLocaleString()} kg · {new Date(order.createdAt).toLocaleDateString()}</p></div><div className="text-right"><p className="text-sm font-semibold">{Number(order.totalAmount).toLocaleString()} RWF</p><p className="mt-1 text-xs capitalize text-[#556B2F]">{order.status}</p></div></article>)}</div>}
    </section>
  </div>;
}
