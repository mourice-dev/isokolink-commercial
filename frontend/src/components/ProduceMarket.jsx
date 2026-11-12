import React, { useMemo, useState } from 'react';
import { BadgeCheck, MapPin, Search, ShoppingCart, SlidersHorizontal } from 'lucide-react';
import { PRODUCE_CATEGORIES, RWANDA_DISTRICTS } from '../data/mockData';

export default function ProduceMarket({ listings = [], selectedCategory, setSelectedCategory, onOrderClick, onAddToCart, searchQuery = '', setSearchQuery, selectedDistrict = 'All Rwanda', setSelectedDistrict }) {
  const [activeSort, setActiveSort] = useState('latest');
  const [priceBand, setPriceBand] = useState('all');
  const sortedListings = useMemo(() => listings.filter((item) => {
    const term = searchQuery.trim().toLowerCase();
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const districtMatch = selectedDistrict === 'All Rwanda' || String(item.district || '').toLowerCase().includes(selectedDistrict.split(' (')[0].toLowerCase());
    const searchMatch = !term || [item.name, item.kinyarwandaName, item.district, item.cooperative].some((value) => value?.toLowerCase().includes(term));
    const price = Number(item.pricePerKg || 0);
    const priceMatch = priceBand === 'all' || (priceBand === 'under-1000' && price < 1000) || (priceBand === '1000-2000' && price >= 1000 && price <= 2000) || (priceBand === 'over-2000' && price > 2000);
    return categoryMatch && districtMatch && searchMatch && priceMatch;
  }).sort((a, b) => {
    if (activeSort === 'price-low') return Number(a.pricePerKg || 0) - Number(b.pricePerKg || 0);
    if (activeSort === 'price-high') return Number(b.pricePerKg || 0) - Number(a.pricePerKg || 0);
    if (activeSort === 'volume') return Number(b.quantityAvailable || 0) - Number(a.quantityAvailable || 0);
    return 0;
  }), [listings, searchQuery, selectedCategory, selectedDistrict, priceBand, activeSort]);
  const hasActiveFilters = Boolean(searchQuery.trim()) || selectedCategory !== 'all' || selectedDistrict !== 'All Rwanda' || priceBand !== 'all' || activeSort !== 'latest';
  const clearFilters = () => {
    setSearchQuery?.('');
    setSelectedCategory?.('all');
    setSelectedDistrict?.('All Rwanda');
    setPriceBand('all');
    setActiveSort('latest');
  };

  return <div className="marketplace-page">
    <div className="marketplace-heading"><div><p className="marketplace-eyebrow">ISOKOLINK MARKETPLACE</p><h1>Shop fresh produce</h1><p>Compare harvests from farmers and cooperatives across Rwanda.</p></div><span className="marketplace-count">{sortedListings.length} products</span></div>
    <div className="marketplace-layout">
      <aside className="marketplace-sidebar" aria-label="Product filters">
        <div className="marketplace-filter-title"><SlidersHorizontal size={16}/><h2>Filters</h2>{hasActiveFilters && <button type="button" onClick={clearFilters}>Clear</button>}</div>
        <fieldset className="marketplace-filter-group"><legend>Category</legend>{PRODUCE_CATEGORIES.map((category) => <label key={category.id}><input type="radio" name="market-category" checked={selectedCategory === category.id} onChange={() => setSelectedCategory(category.id)}/><span>{category.icon} {category.label}</span></label>)}</fieldset>
        <label className="marketplace-filter-group marketplace-select-label">District<select value={selectedDistrict} onChange={(event) => setSelectedDistrict?.(event.target.value)}>{RWANDA_DISTRICTS.map((district) => <option key={district}>{district}</option>)}</select></label>
        <fieldset className="marketplace-filter-group"><legend>Price per kg</legend>{[['all', 'Any price'], ['under-1000', 'Under 1,000 RWF'], ['1000-2000', '1,000–2,000 RWF'], ['over-2000', 'Over 2,000 RWF']].map(([value, label]) => <label key={value}><input type="radio" name="market-price" checked={priceBand === value} onChange={() => setPriceBand(value)}/><span>{label}</span></label>)}</fieldset>
        <label className="marketplace-filter-group marketplace-select-label">Sort by<select value={activeSort} onChange={(event) => setActiveSort(event.target.value)}><option value="latest">Recently added</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="volume">Most available</option></select></label>
      </aside>

      <section className="marketplace-results" aria-label="Produce listings">
        <div className="marketplace-toolbar"><label className="marketplace-search"><Search size={18}/><input value={searchQuery} onChange={(event) => setSearchQuery?.(event.target.value)} placeholder="Search produce, farmer, or district" aria-label="Search produce, farmer, or district"/></label><span>{sortedListings.length} {sortedListings.length === 1 ? 'result' : 'results'}</span></div>
        {sortedListings.length === 0 ? <div className="marketplace-empty"><h2>No products match those filters</h2><p>Try a different search or clear your filters to see all available produce.</p>{hasActiveFilters && <button type="button" onClick={clearFilters}>Clear filters</button>}</div> : <div className="marketplace-products">{sortedListings.map((produce) => <article key={produce.id} className="marketplace-product">
          <div className="marketplace-product-image"><img src={produce.image || '/images/page 1.jpg'} alt={produce.name}/><span className="marketplace-location"><MapPin size={12}/>{produce.district || 'Rwanda'}</span></div>
          <div className="marketplace-product-info"><div className="marketplace-product-category">{produce.category || 'Fresh produce'}{produce.verified && <span><BadgeCheck size={13}/> Verified</span>}</div><h2>{produce.name}</h2><p className="marketplace-seller">{produce.cooperative || produce.farmerName || 'Local farmer'}</p><p className="marketplace-stock">{produce.quantityAvailable || 0} {produce.unit || 'kg'} available · Min. {produce.minOrder || '1 kg'}</p><div className="marketplace-product-bottom"><strong>{Number(produce.pricePerKg || 0).toLocaleString()} <small>RWF / kg</small></strong><div><button type="button" className="marketplace-details" onClick={() => onOrderClick(produce)}>Details</button><button type="button" className="marketplace-add" aria-label={`Add ${produce.name} to basket`} onClick={() => onAddToCart?.({ id: produce.id, title: produce.name, price: Number(produce.pricePerKg), unit: 'kg', type: 'produce', supplier: produce.cooperative || produce.farmerName })}><ShoppingCart size={15}/> Add</button></div></div></div>
        </article>)}</div>}
      </section>
    </div>
  </div>;
}
