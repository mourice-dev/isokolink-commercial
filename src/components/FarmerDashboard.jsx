import React, { useEffect, useState } from 'react';
import { ArrowRight, Package, ShoppingBasket, Sprout } from 'lucide-react';

export default function FarmerDashboard({ listings, profile, onAddProduce, onBrowseMarket }) {
  const [dashboard, setDashboard] = useState(null);
  useEffect(() => {
    if (!profile?.email) return;
    fetch(`/api/farmer/dashboard?email=${encodeURIComponent(profile.email)}`).then((r) => r.ok ? r.json() : null).then((data) => { if (data) setDashboard(data); }).catch(() => {});
  }, [profile?.email]);
  const farmerListings = dashboard?.listings?.length ? dashboard.listings : listings.filter((item) => !profile?.email || item.farmerEmail === profile.email);
  return <div className="mx-auto max-w-[1000px] py-8 text-[#17291e]">
    <section className="flex flex-col gap-5 rounded-3xl bg-[#17291e] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="flex items-center gap-4"><div className="h-16 w-16 overflow-hidden rounded-full border-2 border-[#c2d19e] bg-white/10">{profile?.avatarUrl ? <img src={profile.avatarUrl} alt="Farmer profile" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-[#c2d19e]"><Sprout size={27}/></div>}</div><div><p className="text-xs font-semibold uppercase tracking-widest text-[#c2d19e]">Farmer workspace</p><h1 className="mt-1 text-2xl font-semibold">{profile?.fullName || 'Welcome, farmer'}</h1><p className="mt-1 text-sm text-white/65">{profile?.farmName || profile?.district || 'Manage your harvest and reach buyers.'}</p></div></div>
      <div className="flex gap-2"><button onClick={onAddProduce} className="rounded-xl bg-[#9eb65b] px-4 py-3 text-sm font-semibold text-[#17291e]">List produce</button><button onClick={onBrowseMarket} className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold">Market <ArrowRight size={15}/></button></div>
    </section>
    <div className="mt-5 grid gap-4 sm:grid-cols-3">{[{label:'My listings',value:farmerListings.length,icon:Package},{label:'Orders to review',value:dashboard?.orders?.count ?? 0,icon:ShoppingBasket},{label:'Profile status',value:profile?.email?'Ready':'Complete profile',icon:Sprout}].map(({label,value,icon:Icon})=><article key={label} className="rounded-2xl border border-black/8 bg-white p-5"><Icon size={18} className="text-[#6B8E23]"/><p className="mt-4 text-xs text-black/50">{label}</p><p className="mt-1 text-xl font-semibold">{value}</p></article>)}</div>
    <section className="mt-7"><h2 className="text-lg font-semibold">Your produce listings</h2>{farmerListings.length ? <div className="mt-3 grid gap-3 sm:grid-cols-2">{farmerListings.map((p)=><article key={p.id} className="flex items-center gap-3 rounded-2xl border border-black/8 bg-white p-3"><img src={p.image} alt="" className="h-16 w-16 rounded-xl object-cover"/><div className="min-w-0 flex-1"><h3 className="truncate text-sm font-semibold">{p.name}</h3><p className="mt-1 text-xs text-black/55">{p.quantityAvailable} {p.unit} · {Number(p.pricePerKg).toLocaleString()} RWF/kg</p></div></article>)}</div> : <div className="mt-3 rounded-2xl border border-dashed border-black/15 bg-white p-8 text-center"><Package className="mx-auto text-[#6B8E23]"/><p className="mt-2 text-sm font-semibold">No produce listed yet</p><p className="mt-1 text-xs text-black/50">Publish a harvest to start showing it to buyers.</p><button onClick={onAddProduce} className="mt-4 rounded-lg bg-[#556B2F] px-4 py-2 text-sm font-semibold text-white">Add first listing</button></div>}</section>
  </div>;
}
