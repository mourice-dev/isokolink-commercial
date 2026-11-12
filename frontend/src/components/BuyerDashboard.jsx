import React, { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import { PackageCheck, Search, ShoppingCart, Store } from 'lucide-react';
import './Dashboard.css';

const money = (value) => `${Number(value || 0).toLocaleString()} RWF`;
const exampleProducts = [
  { id: 'b1', name: 'Fresh tomatoes', category: 'Vegetables', pricePerKg: 800, quantityAvailable: 180, unit: 'kg', district: 'Kigali', farmerName: 'Jean Claude', image: '/images/page 1.jpg', rating: '4.9' },
  { id: 'b2', name: 'Irish potatoes', category: 'Vegetables', pricePerKg: 700, quantityAvailable: 320, unit: 'kg', district: 'Musanze', farmerName: 'Marie Uwase', image: '/images/page 2.jpg', rating: '4.8' },
  { id: 'b3', name: 'Sweet bananas', category: 'Fruits', pricePerKg: 1200, quantityAvailable: 95, unit: 'kg', district: 'Huye', farmerName: 'Eric Niyonzima', image: '/images/page 3.jpg', rating: '4.9' },
  { id: 'b4', name: 'Green peppers', category: 'Vegetables', pricePerKg: 1500, quantityAvailable: 70, unit: 'kg', district: 'Rwamagana', farmerName: 'Aline Mukamana', image: '/images/page 4.jpg', rating: '4.7' },
];

export default function BuyerDashboard({ user, listings = [], cartItems = [], onBrowseMarket, onAddToCart, onOpenCart }) {
  const [orders, setOrders] = useState([]);
  const [section, setSection] = useState('Overview');
  const [query, setQuery] = useState('');
  useEffect(() => {
    apiFetch('/api/buyer/dashboard').then((response) => response.ok ? response.json() : null)
      .then((data) => setOrders(data?.orders || [])).catch(() => {});
  }, []);

  const products = (listings.length ? listings : exampleProducts).filter((product) =>
    (product.name || product.title || '').toLowerCase().includes(query.trim().toLowerCase())
  );
  const itemCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  const sections = ['Overview', 'Browse products', 'My orders'];

  return <div className="buyer-page page-gutter">
    <div className="buyer-page-inner">
      <header className="buyer-page-heading">
        <div><p className="buyer-page-eyebrow">ISOKOLINK · BUYER</p><h1>{section === 'Overview' ? `Welcome, ${(user?.fullName || 'buyer').split(' ')[0]}` : section}</h1><p>Find local harvests and keep an eye on your orders.</p></div>
        <div className="buyer-page-actions"><button type="button" onClick={onOpenCart} className="buyer-secondary-button"><ShoppingCart size={16}/> Basket <span>{itemCount}</span></button><button type="button" onClick={onBrowseMarket} className="buyer-primary-button"><Store size={16}/> Open marketplace</button></div>
      </header>

      <nav className="buyer-page-tabs" aria-label="Buyer pages">{sections.map((item) => <button key={item} type="button" className={section === item ? 'active' : ''} onClick={() => setSection(item)}>{item}</button>)}</nav>

      {section === 'Overview' && <>
        <div className="buyer-quick-stats"><article><span>Orders placed</span><strong>{orders.length}</strong></article><article><span>Items in basket</span><strong>{itemCount}</strong></article></div>
        <section className="buyer-page-section"><div className="buyer-section-heading"><div><h2>Fresh from nearby farms</h2><p>Harvests listed by farmers and cooperatives.</p></div><button type="button" onClick={() => setSection('Browse products')}>Browse all</button></div><ProductGrid products={products.slice(0, 4)} onAddToCart={onAddToCart}/></section>
        <section className="buyer-page-section"><div className="buyer-section-heading"><div><h2>Recent orders</h2><p>Check the status of your latest requests.</p></div><button type="button" onClick={() => setSection('My orders')}>View orders</button></div><OrderList orders={orders.slice(0, 3)}/></section>
      </>}

      {section === 'Browse products' && <section className="buyer-page-section"><label className="buyer-search"><Search size={17}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search produce" aria-label="Search produce"/></label><ProductGrid products={products} onAddToCart={onAddToCart}/>{products.length === 0 && <p className="dash-empty">No produce matches “{query}”.</p>}</section>}

      {section === 'My orders' && <section className="buyer-page-section"><div className="buyer-section-heading"><div><h2>Your orders</h2><p>Order history and fulfillment updates.</p></div></div><OrderList orders={orders}/></section>}
    </div>
  </div>;
}

function ProductGrid({ products, onAddToCart }) {
  if (!products.length) return <div className="buyer-empty"><Store size={22}/><p>No listings are available yet.</p></div>;
  return <div className="dash-product-grid buyer-products buyer-page-products">{products.map((product) => <article className="dash-product-card" key={product.id}>
    <div className="buyer-product-image"><img src={product.image || '/images/page 1.jpg'} alt={product.name || product.title}/><span className="buyer-rating">★ {product.rating || '4.8'}</span></div>
    <div><span className="buyer-category">{product.category || 'Fresh produce'} · {product.district || product.location || 'Rwanda'}</span><h3>{product.name || product.title}</h3><p>By {product.farmerName || product.farmer || product.cooperative || 'Local farmer'}</p><div className="buyer-product-bottom"><strong>{money(product.pricePerKg || product.price)}<small> / kg</small></strong><button type="button" aria-label={`Add ${product.name || product.title} to basket`} onClick={() => onAddToCart?.(product)}>+</button></div></div>
  </article>)}</div>;
}

function OrderList({ orders }) {
  if (!orders.length) return <div className="buyer-empty"><PackageCheck size={22}/><p>You don’t have any orders yet.</p></div>;
  return <div className="dash-table-wrap"><table className="dash-table"><thead><tr><th>ORDER</th><th>PRODUCT</th><th>QUANTITY</th><th>TOTAL</th><th>STATUS</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td className="dash-order-id">#{order.id}</td><td>{order.productName || order.name}</td><td>{order.quantityKg || order.quantity || 0} kg</td><td className="dash-money">{money(order.totalAmount ?? order.total)}</td><td><span className="dash-status processing">{order.status || 'Processing'}</span></td></tr>)}</tbody></table></div>;
}
