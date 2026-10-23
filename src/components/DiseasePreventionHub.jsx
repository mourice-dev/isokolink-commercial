import React, { useMemo, useState } from 'react';
import { AlertTriangle, Beaker, CheckCircle2, ChevronRight, Phone, Search, ShieldCheck, Stethoscope, Truck } from 'lucide-react';
import { DISEASE_CATEGORIES, DISEASE_PREVENTION_PRODUCTS } from '../data/mockData';

export default function DiseasePreventionHub({ onAddToCart, onConsultDoctor, searchQuery = '', setSearchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const products = useMemo(() => DISEASE_PREVENTION_PRODUCTS.filter((product) => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const term = searchQuery.trim().toLowerCase();
    const searchMatch = !term || [product.name, product.kinyarwandaTitle, product.activeIngredient, ...product.targetedDiseases].some((value) => value?.toLowerCase().includes(term));
    return categoryMatch && searchMatch;
  }), [selectedCategory, searchQuery]);

  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      <section className="rounded-3xl bg-[#17291e] p-6 text-white sm:p-9">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl"><span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#c2d19e]"><ShieldCheck size={15} /> Plant health & prevention</span><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Protect your crops with confidence</h1><p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">Browse crop protection supplies, review their intended use, and connect with suppliers. Follow label directions and consult a qualified agronomist before treatment.</p></div>
          <button type="button" onClick={onConsultDoctor} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#6B8E23] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#556B2F]"><Stethoscope size={17} /> Get crop advice <ChevronRight size={15} /></button>
        </div>
      </section>

      <section className="rounded-2xl border border-amber-300/70 bg-amber-50 p-4 sm:p-5"><div className="flex items-start gap-3"><AlertTriangle size={19} className="mt-0.5 shrink-0 text-amber-700" /><div><h2 className="text-sm font-semibold text-amber-950">Use plant protection products responsibly</h2><p className="mt-1 text-sm leading-6 text-amber-900/80">Confirm the product is appropriate for your crop and location. Wear the protective equipment listed on the label, observe pre-harvest intervals, and ask a local extension officer if you are unsure.</p></div></div></section>

      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B8E23]">Prevention supplies</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">Crop protection products</h2><p className="mt-1 text-sm text-black/60">Compare target threats, supplier, and listed price.</p></div><label className="relative block sm:w-72"><span className="sr-only">Search prevention products</span><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" /><input value={searchQuery} onChange={(event) => setSearchQuery?.(event.target.value)} placeholder="Search product or crop concern" className="w-full rounded-lg border border-black/12 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-2 focus:ring-[#6B8E23]/15" /></label></div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">{DISEASE_CATEGORIES.map((category) => <button key={category.id} type="button" onClick={() => setSelectedCategory(category.id)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${selectedCategory === category.id ? 'border-[#556B2F] bg-[#556B2F] text-white' : 'border-black/12 bg-white text-black/70 hover:border-[#6B8E23]'}`}>{category.label}</button>)}</div>
        {products.length ? <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{products.map((product) => <article key={product.id} className="overflow-hidden rounded-2xl border border-black/8 bg-white transition duration-200 hover:-translate-y-1 hover:border-[#6B8E23]/40 hover:shadow-lg">
          <div className="relative h-48 bg-[#edf0e6]"><img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover" /><span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-[#416320]"><CheckCircle2 size={13} />{product.stockStatus}</span></div>
          <div className="p-5"><div className="flex items-center gap-1.5 text-xs font-semibold text-[#556B2F]"><ShieldCheck size={14} /> Supplier listing</div><h3 className="mt-2 text-lg font-semibold leading-6">{product.name}</h3><p className="mt-1 text-xs text-black/50">{product.kinyarwandaTitle}</p>
            <div className="mt-4 rounded-xl bg-[#f5f7f1] p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-black/45">Listed target concerns</p><p className="mt-1 text-sm font-medium text-black/80">{product.targetedDiseases.join(' · ')}</p></div>
            <div className="mt-3 space-y-2 text-xs text-black/65"><p className="flex items-start gap-2"><Beaker size={14} className="mt-0.5 shrink-0 text-[#6B8E23]" /><span><strong>Active ingredient:</strong> {product.activeIngredient}</span></p><p className="flex items-start gap-2"><Truck size={14} className="mt-0.5 shrink-0 text-[#6B8E23]" /><span><strong>Supplier:</strong> {product.agencySupplier}</span></p></div>
            <p className="mt-3 text-sm leading-6 text-black/60">{product.description}</p><div className="mt-4 flex items-center justify-between border-t border-black/8 pt-4"><div><div className="text-lg font-semibold">{product.price.toLocaleString()} RWF</div><div className="text-xs text-black/50">per {product.unit}</div></div><a href={`tel:${product.supplierContact}`} aria-label={`Call supplier at ${product.supplierContact}`} className="rounded-lg border border-black/12 p-2.5 text-[#556B2F] transition hover:border-[#6B8E23] hover:bg-[#f4f6ee]"><Phone size={17} /></a></div><button type="button" onClick={() => onAddToCart({ id: product.id, title: product.name, price: product.price, unit: product.unit, type: 'disease-defense', supplier: product.agencySupplier })} className="mt-4 w-full rounded-lg bg-[#556B2F] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3f5221]">Add prevention product</button>
          </div>
        </article>)}</div> : <div className="mt-6 rounded-2xl border border-dashed border-black/20 bg-white p-10 text-center text-sm text-black/55">No products match this search. Try a different crop or concern.</div>}
      </section>
    </div>
  );
}
