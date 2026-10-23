import React, { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, BadgeCheck, MapPin, Search, ShieldPlus, SlidersHorizontal, Sprout, UserRound } from 'lucide-react';
import { MARKET_TICKER_ITEMS, PRODUCE_CATEGORIES, RWANDA_DISTRICTS } from '../data/mockData';

export default function ProduceMarket({ listings = [], selectedCategory, setSelectedCategory, onOrderClick, searchQuery = '', setSearchQuery, selectedDistrict = 'All Rwanda', setSelectedDistrict, onOpenDisease, onManageAccount }) {
  const [activeSort, setActiveSort] = useState('latest');
  const sortedListings = useMemo(() => listings.filter((item) => {
    const term = searchQuery.trim().toLowerCase();
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const districtMatch = selectedDistrict === 'All Rwanda' || item.district.toLowerCase().includes(selectedDistrict.split(' (')[0].toLowerCase());
    const searchMatch = !term || [item.name, item.kinyarwandaName, item.district, item.cooperative].some((value) => value?.toLowerCase().includes(term));
    return categoryMatch && districtMatch && searchMatch;
  }).sort((a, b) => {
    if (activeSort === 'price-low') return a.pricePerKg - b.pricePerKg;
    if (activeSort === 'price-high') return b.pricePerKg - a.pricePerKg;
    if (activeSort === 'volume') return b.quantityAvailable - a.quantityAvailable;
    return 0;
  }), [listings, searchQuery, selectedCategory, selectedDistrict, activeSort]);

  return (
    <div className="mx-auto max-w-[1000px] space-y-7">
      <section className="overflow-hidden rounded-3xl bg-[#17291e] text-white">
        <div className="grid gap-8 px-6 py-8 sm:px-9 sm:py-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#c2d19e]"><Sprout size={15} /> Rwanda produce exchange</span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">The harvest market</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70 sm:text-base">Browse available harvests, compare farm-gate prices, and request a quote directly from local producers and cooperatives.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <button type="button" onClick={onManageAccount} className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white transition hover:border-[#c2d19e]/50 hover:bg-white/10"><UserRound size={16} className="text-[#c2d19e]" /> Manage account</button>
            <div className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3"><div className="text-lg font-semibold">{listings.length}</div><div className="mt-0.5 text-xs text-white/60">Listings</div></div>
            <div className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3"><div className="text-lg font-semibold">30</div><div className="mt-0.5 text-xs text-white/60">Districts</div></div>
          </div>
        </div>
      </section>

      <section aria-labelledby="market-pulse-heading">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B8E23]">Market pulse</p><h2 id="market-pulse-heading" className="mt-1 text-xl font-semibold tracking-tight">Trending crop prices</h2></div>
          <span className="text-xs text-black/45">Indicative sample prices</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MARKET_TICKER_ITEMS.slice(0, 4).map((item) => (
            <article key={item.crop} className="rounded-2xl border border-black/8 bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#6B8E23]/40 hover:shadow-md">
              <div className="flex items-start justify-between gap-2"><p className="text-sm font-semibold leading-5">{item.crop.split(' (')[0]}</p>{item.up ? <ArrowUpRight size={17} className="shrink-0 text-[#228B22]" /> : <ArrowDownRight size={17} className="shrink-0 text-amber-700" />}</div>
              <div className="mt-3 flex items-baseline gap-2"><span className="text-lg font-semibold">{item.price}</span><span className={`text-xs font-semibold ${item.up ? 'text-[#228B22]' : 'text-amber-700'}`}>{item.change}</span></div>
              <p className="mt-1 text-xs text-black/50">{item.crop.match(/\((.*?)\)/)?.[1] || 'Rwanda'}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[#6B8E23]/20 bg-[#f4f6ee] p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B8E23]">Plant health</p><h2 className="mt-1 text-xl font-semibold">Protect your next harvest</h2><p className="mt-1 text-sm text-black/60">Find prevention supplies or get help identifying crop symptoms.</p></div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={onOpenDisease} className="inline-flex items-center gap-2 rounded-lg bg-[#556B2F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3f5221]"><ShieldPlus size={16} /> Disease prevention hub <ArrowRight size={15} /></button>
          </div>
        </div>
      </section>

      <section aria-labelledby="available-produce-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B8E23]">From farms across Rwanda</p><h2 id="available-produce-heading" className="mt-1 text-2xl font-semibold tracking-tight">Available produce</h2><p className="mt-1 text-sm text-black/60">Compare supply, farm location, and price before requesting a quote.</p></div>
          <div className="flex flex-wrap gap-2">
            <label className="relative block min-w-[220px] flex-1 sm:flex-none"><span className="sr-only">Search produce</span><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" /><input value={searchQuery} onChange={(event) => setSearchQuery?.(event.target.value)} placeholder="Search produce or location" className="w-full rounded-lg border border-black/12 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#6B8E23] focus:ring-2 focus:ring-[#6B8E23]/15" /></label>
            <label className="relative"><span className="sr-only">Filter by district</span><MapPin size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/40" /><select value={selectedDistrict} onChange={(event) => setSelectedDistrict?.(event.target.value)} className="max-w-[180px] appearance-none rounded-lg border border-black/12 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#6B8E23]">{RWANDA_DISTRICTS.map((district) => <option key={district}>{district}</option>)}</select></label>
            <label className="relative"><span className="sr-only">Sort listings</span><SlidersHorizontal size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/40" /><select value={activeSort} onChange={(event) => setActiveSort(event.target.value)} className="appearance-none rounded-lg border border-black/12 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#6B8E23]"><option value="latest">Newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="volume">Most available</option></select></label>
          </div>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {PRODUCE_CATEGORIES.map((category) => <button key={category.id} type="button" onClick={() => setSelectedCategory(category.id)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${selectedCategory === category.id ? 'border-[#556B2F] bg-[#556B2F] text-white' : 'border-black/12 bg-white text-black/70 hover:border-[#6B8E23] hover:text-[#556B2F]'}`}>{category.icon} <span className="ml-1">{category.label}</span></button>)}
        </div>

        {sortedListings.length === 0 ? <div className="mt-6 rounded-2xl border border-dashed border-black/20 bg-white px-5 py-14 text-center"><h3 className="font-semibold">No listings match these filters</h3><p className="mt-2 text-sm text-black/55">Try another search or district.</p></div> : <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{sortedListings.map((produce) => (
          <article key={produce.id} className="group overflow-hidden rounded-2xl border border-black/8 bg-white transition duration-200 hover:-translate-y-1 hover:border-[#6B8E23]/35 hover:shadow-lg">
            <div className="relative h-44 overflow-hidden bg-[#edf0e6]"><img src={produce.image} alt={produce.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" /><span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-medium text-black"><MapPin size={12} />{produce.district}</span><span className="absolute bottom-3 right-3 rounded-full bg-[#17291e]/90 px-2.5 py-1.5 text-xs font-semibold text-white">{produce.quantityAvailable} {produce.unit} available</span></div>
            <div className="p-5"><div className="flex items-start justify-between gap-2"><div><h3 className="font-semibold leading-5">{produce.name}</h3><p className="mt-1 text-xs text-black/50">{produce.kinyarwandaName}</p></div>{produce.verified && <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#228B22]/10 px-2 py-1 text-[10px] font-semibold text-[#246d22]"><BadgeCheck size={13} /> Verified</span>}</div>
              <p className="mt-4 truncate text-xs text-black/55">{produce.cooperative}</p><div className="mt-4 flex items-end justify-between border-t border-black/8 pt-4"><div><div className="text-lg font-semibold">{produce.pricePerKg.toLocaleString()} <span className="text-sm font-medium">RWF</span></div><div className="text-xs text-black/50">per kg · Min. {produce.minOrder}</div></div><button type="button" onClick={() => onOrderClick(produce)} className="rounded-lg bg-[#6B8E23] px-3.5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#556B2F]">View details</button></div>
            </div>
          </article>
        ))}</div>}
      </section>
    </div>
  );
}
