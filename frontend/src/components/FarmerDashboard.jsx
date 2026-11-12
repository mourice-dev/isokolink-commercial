import React, { useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../lib/api';
import { Bell, ChevronDown, CircleHelp, LayoutDashboard, Leaf, LogOut, Package, Plus, Search, Settings, ShoppingBag, Sprout } from 'lucide-react';
import './Dashboard.css';

const money = (value) => `${Number(value || 0).toLocaleString()} RWF`;
const exampleListings = [
  { id: 'sample-tomatoes', name: 'Fresh tomatoes', quantityAvailable: 180, unit: 'kg', pricePerKg: 800, image: '/images/page 1.jpg', sample: true },
  { id: 'sample-potatoes', name: 'Irish potatoes', quantityAvailable: 320, unit: 'kg', pricePerKg: 700, image: '/images/page 2.jpg', sample: true },
  { id: 'sample-bananas', name: 'Sweet bananas', quantityAvailable: 95, unit: 'kg', pricePerKg: 1200, image: '/images/page 3.jpg', sample: true },
];
const sampleRevenue = [320000, 410000, 365000, 520000, 475000, 640000];
const chartMonths = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

function RevenueChart({ values }) {
  const max = Math.max(...values, 1);
  const points = values.map((value, index) => {
    const x = 32 + (index * 536) / Math.max(values.length - 1, 1);
    const y = 142 - (value / max) * 112;
    return `${x},${y}`;
  }).join(' ');

  return <div className="farmer-chart" aria-label="Monthly revenue chart">
    <svg viewBox="0 0 600 180" role="img" aria-labelledby="revenue-chart-title">
      <title id="revenue-chart-title">Monthly revenue trend</title>
      {[30, 67, 104, 142].map((y) => <line key={y} x1="30" y1={y} x2="570" y2={y} stroke="#e7e4d9" strokeWidth="1" />)}
      <polyline points={points} fill="none" stroke="#65754a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {points.split(' ').map((point, index) => {
        const [cx, cy] = point.split(',');
        return <circle key={chartMonths[index]} cx={cx} cy={cy} r="5" fill="#fffdf8" stroke="#65754a" strokeWidth="3" />;
      })}
    </svg>
    <div className="farmer-chart-months">{chartMonths.map((month) => <span key={month}>{month}</span>)}</div>
  </div>;
}

export default function FarmerDashboard({ listings = [], profile, onAddProduce, onBrowseMarket, onLogout }) {
  const [dashboard, setDashboard] = useState(null);
  const [section, setSection] = useState('Overview');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [listingVisibility, setListingVisibility] = useState(true);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    if (!profile?.email) return;
    apiFetch('/api/farmer/dashboard')
      .then((response) => response.ok ? response.json() : null)
      .then((data) => { if (data) setDashboard(data); })
      .catch(() => {});
  }, [profile?.email]);

  const farmerListings = useMemo(() => {
    const apiListings = [dashboard?.listings, dashboard?.products].find(Array.isArray) || [];
    const ownerEmail = String(profile?.email || '').trim().toLowerCase();
    const ownerNames = [profile?.fullName, profile?.cooperative, profile?.organization]
      .filter(Boolean).map((name) => String(name).trim().toLowerCase());
    const mine = listings.filter((item) => {
      const email = String(item.farmerEmail || item.farmer?.email || '').trim().toLowerCase();
      if (email && email === ownerEmail) return true;
      if (!email) {
        const names = [item.farmerName, item.cooperative, item.farmer?.fullName]
          .filter(Boolean).map((name) => String(name).trim().toLowerCase());
        return names.some((name) => ownerNames.includes(name));
      }
      return false;
    });
    return [...apiListings, ...mine.filter((item) => !apiListings.some((entry) => String(entry.id) === String(item.id)))];
  }, [dashboard, listings, profile]);

  const sales = dashboard?.orders?.items || [
    { id: 'S-2048', name: 'Fresh tomatoes', buyer: 'Kigali Fresh Mart', quantity: '120 kg', total: 96000, status: 'Delivered', date: 'Today' },
    { id: 'S-2047', name: 'Irish potatoes', buyer: 'Musanze Market Co.', quantity: '250 kg', total: 175000, status: 'In transit', date: 'Yesterday' },
    { id: 'S-2046', name: 'Sweet bananas', buyer: 'Green Basket Ltd.', quantity: '80 kg', total: 56000, status: 'Processing', date: 'This week' },
  ];
  const revenue = dashboard?.orders?.revenue ?? sales.reduce((sum, order) => sum + Number(order.total ?? order.totalAmount ?? 0), 0);
  const suppliedRevenueSeries = dashboard?.monthlyRevenue || dashboard?.orders?.monthlyRevenue;
  const revenueSeries = Array.isArray(suppliedRevenueSeries) && suppliedRevenueSeries.length >= 6
    ? suppliedRevenueSeries.slice(-6).map((item) => Number(item.value ?? item))
    : sampleRevenue;
  const nav = [{ label: 'Overview', icon: LayoutDashboard }, { label: 'My products', icon: Package }, { label: 'Sales & orders', icon: ShoppingBag }];
  const pageTitle = section === 'Overview' ? `Good morning, ${(profile?.fullName || 'Farmer').split(' ')[0]}` : section;

  return <div className="dash-shell">
    <aside className="dash-sidebar">
      <a className="dash-brand" href="#" onClick={(event) => event.preventDefault()}><span className="dash-brand-mark"><Sprout size={21}/></span><span>Isoko<span className="dash-brand-light">Link</span><small>RWANDA AGRI MARKET</small></span></a>
      <p className="dash-nav-caption">WORKSPACE</p>
      <nav>{nav.map(({ label, icon: Icon }) => <button key={label} className={`dash-nav-item ${section === label ? 'active' : ''}`} onClick={() => setSection(label)}><Icon size={18}/>{label}{label === 'Sales & orders' && <span className="dash-nav-count">{sales.length}</span>}</button>)}</nav>
      <p className="dash-nav-caption dash-nav-caption-spaced">PREFERENCES</p>
      <button className={`dash-nav-item ${section === 'Settings' ? 'active' : ''}`} onClick={() => setSection('Settings')}><Settings size={18}/>Settings</button>
      <button className={`dash-nav-item ${section === 'Help center' ? 'active' : ''}`} onClick={() => setSection('Help center')}><CircleHelp size={18}/>Help center</button>
      <div className="dash-sidebar-bottom"><div className="dash-plan"><span className="dash-plan-icon"><Leaf size={16}/></span><strong>Growing together</strong><p>Supporting Rwanda’s farmers, one harvest at a time.</p><button onClick={onBrowseMarket}>Explore marketplace →</button></div><button className="dash-nav-item" onClick={onLogout}><LogOut size={18}/>Sign out</button></div>
    </aside>

    <main className="dash-main">
      <header className="dash-topbar"><div className="dash-breadcrumb">Workspace <span>/</span> <strong>{section}</strong></div><div className="dash-top-actions"><label className="dash-search"><Search size={16}/><input aria-label="Search dashboard" placeholder="Search anything..."/></label><button className="dash-icon-button" aria-label="Notifications"><Bell size={18}/><i/></button><button className="dash-user"><span className="dash-avatar">{(profile?.fullName || 'F').charAt(0).toUpperCase()}</span><span><strong>{profile?.fullName || 'Farmer'}</strong><small>Farmer account</small></span><ChevronDown size={15}/></button></div></header>

      <div className="dash-content">
        <div className="dash-welcome"><div><p className="dash-eyebrow">FARMER WORKSPACE</p><h1>{pageTitle}</h1><p>Here’s what’s happening with your farm today.</p></div>{section !== 'Settings' && <button className="dash-primary" onClick={onAddProduce}><Plus size={17}/> Add new product</button>}</div>

        {section === 'Overview' && <>
          <div className="farmer-summary-grid">
            <article className="farmer-summary"><span>Active products</span><strong>{farmerListings.length}</strong><small>Harvests currently listed</small></article>
            <article className="farmer-summary"><span>Revenue to date</span><strong>{money(revenue)}</strong><small>From recent marketplace orders</small></article>
          </div>
          <section className="dash-panel farmer-chart-panel"><div className="dash-panel-head"><div><h2>Revenue over time</h2><p>A simple view of your recent monthly sales.</p></div><span className="farmer-chart-period">Last 6 months</span></div><RevenueChart values={revenueSeries}/></section>
          <section className="dash-panel"><div className="dash-panel-head"><div><h2>Recent sales</h2><p>Keep track of your latest orders and deliveries.</p></div><button className="dash-text-button" onClick={() => setSection('Sales & orders')}>View all sales <span>→</span></button></div><div className="dash-table-wrap"><table className="dash-table"><thead><tr><th>ORDER</th><th>PRODUCT</th><th>BUYER</th><th>QUANTITY</th><th>TOTAL</th><th>STATUS</th></tr></thead><tbody>{sales.slice(0, 4).map((sale) => <tr key={sale.id}><td className="dash-order-id">#{sale.id}</td><td>{sale.name || sale.productName}</td><td>{sale.buyer || sale.buyerName || 'Local buyer'}</td><td>{sale.quantity || `${sale.quantityKg || 0} kg`}</td><td className="dash-money">{money(sale.total ?? sale.totalAmount)}</td><td><span className={`dash-status ${(sale.status || 'Processing').toLowerCase().replace(' ', '-')}`}>{sale.status || 'Processing'}</span></td></tr>)}</tbody></table></div></section>
          <section className="dash-panel dash-products-panel"><div className="dash-panel-head"><div><h2>Your products</h2><p>A quick look at what you’re selling right now.</p></div><button className="dash-text-button" onClick={() => setSection('My products')}>Manage products <span>→</span></button></div><div className="dash-product-grid">{(farmerListings.length ? farmerListings : exampleListings).slice(0, 3).map((product) => <article className="dash-product-card" key={product.id}><img src={product.image || '/images/page 1.jpg'} alt={product.name || product.title}/><div>{product.sample && <span className="dash-status">Example</span>}<h3>{product.name || product.title}</h3><p>{product.quantityAvailable || product.quantity || 0} {product.unit || 'kg'} in stock</p><strong>{money(product.pricePerKg || product.price)}<small> / kg</small></strong></div></article>)}</div></section>
        </>}

        {section === 'My products' && <section className="dash-panel"><div className="dash-panel-head"><div><h2>Your product listings</h2><p>Manage your current harvest and pricing.</p></div><button className="dash-primary" onClick={onAddProduce}><Plus size={16}/> Add product</button></div><div className="dash-table-wrap"><table className="dash-table"><thead><tr><th>PRODUCT</th><th>QUANTITY AVAILABLE</th><th>PRICE / KG</th><th>DISTRICT</th><th>STATUS</th></tr></thead><tbody>{farmerListings.map((product) => <tr key={product.id}><td>{product.name || product.title}</td><td>{product.quantityAvailable || product.quantity || 0} {product.unit || 'kg'}</td><td>{money(product.pricePerKg || product.price)}</td><td>{product.district || '—'}</td><td><span className="dash-status available">Available</span></td></tr>)}</tbody></table></div>{farmerListings.length === 0 && <div className="dash-empty"><p>No products are linked to this farmer account yet.</p><button className="dash-text-button" onClick={onAddProduce}>Add your first product →</button></div>}</section>}

        {section === 'Sales & orders' && <section className="dash-panel"><div className="dash-panel-head"><div><h2>Sales and orders</h2><p>Your latest marketplace activity.</p></div></div><div className="dash-table-wrap"><table className="dash-table"><thead><tr><th>ORDER</th><th>PRODUCT</th><th>BUYER</th><th>QUANTITY</th><th>TOTAL</th><th>STATUS</th></tr></thead><tbody>{sales.map((sale) => <tr key={sale.id}><td className="dash-order-id">#{sale.id}</td><td>{sale.name || sale.productName}</td><td>{sale.buyer || sale.buyerName || 'Local buyer'}</td><td>{sale.quantity || `${sale.quantityKg || 0} kg`}</td><td className="dash-money">{money(sale.total ?? sale.totalAmount)}</td><td><span className={`dash-status ${(sale.status || 'Processing').toLowerCase().replace(' ', '-')}`}>{sale.status || 'Processing'}</span></td></tr>)}</tbody></table></div></section>}

        {section === 'Settings' && <section className="dash-panel farmer-settings"><div className="dash-panel-head"><div><h2>Farm settings</h2><p>Manage basic account and listing preferences.</p></div></div><div className="farmer-settings-grid"><label>Farmer or business name<input defaultValue={profile?.fullName || profile?.cooperative || ''} placeholder="Your name or cooperative"/></label><label>Email address<input type="email" defaultValue={profile?.email || ''} placeholder="name@example.com"/></label><label>Phone number<input type="tel" defaultValue={profile?.phone || ''} placeholder="+250 78..."/></label><label>Primary district<input defaultValue={profile?.district || ''} placeholder="Select your district"/></label></div><label className="farmer-setting-toggle"><span><strong>Show my listings in the marketplace</strong><small>Buyers can discover your available harvests.</small></span><input type="checkbox" checked={listingVisibility} onChange={(event) => setListingVisibility(event.target.checked)}/></label><label className="farmer-setting-toggle"><span><strong>Email order updates</strong><small>Receive a note when a buyer requests your produce.</small></span><input type="checkbox" checked={emailAlerts} onChange={(event) => setEmailAlerts(event.target.checked)}/></label><div className="farmer-settings-actions"><button className="dash-primary" onClick={() => { setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 2500); }}>Save settings</button>{settingsSaved && <p role="status">Settings saved for this session.</p>}</div></section>}

        {section === 'Help center' && <section className="dash-panel"><h2>Help for farmers</h2><p className="dash-section-hint">For listing or order support, contact the IsokoLink team. You can also browse the marketplace to see how other harvests are presented.</p><button className="dash-primary" onClick={onBrowseMarket}>Explore marketplace</button></section>}
      </div>
    </main>
  </div>;
}
