import React, { useEffect, useState } from 'react';
import FarmiqNavbar from './components/FarmiqNavbar';
import SocialNewsFeed from './components/SocialNewsFeed';
import ProduceMarket from './components/ProduceMarket';
import DiseasePreventionHub from './components/DiseasePreventionHub';
import CropDoctor from './components/CropDoctor';
import AgencyServices from './components/AgencyServices';
import AddProduceModal from './components/AddProduceModal';
import OrderModal from './components/OrderModal';
import BookAgencyModal from './components/BookAgencyModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import SustainableAgriLanding from './components/SustainableAgriLanding';
import AccountManagement from './components/AccountManagement';
import FarmerDashboard from './components/FarmerDashboard';
import ProductDetails from './components/ProductDetails';
import { INITIAL_PRODUCE_LISTINGS } from './data/mockData';
import { ArrowRight, Sprout, Store, Users } from 'lucide-react';

export default function App() {
  // Navigation tabs: 'home' | 'market' | 'defense' | 'doctor' | 'agencies' | 'feed' | 'about' | 'contact'
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All Rwanda');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Produce listings state
  const [produceListings, setProduceListings] = useState(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem('isokolink-local-listings') || '[]');
      return [...saved, ...INITIAL_PRODUCE_LISTINGS.filter((item) => !saved.some((savedItem) => savedItem.id === item.id))];
    } catch { return INITIAL_PRODUCE_LISTINGS; }
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('mtn-momo');
  const [orderSaved, setOrderSaved] = useState(false);
  const [accountProfile, setAccountProfile] = useState({});
  const [contactStatus, setContactStatus] = useState('');

  useEffect(() => {
    fetch('/api/products').then((r) => r.ok ? r.json() : null).then((items) => { if (Array.isArray(items) && items.length) setProduceListings((current) => [...items, ...current.filter((entry) => !items.some((item) => item.id === entry.id))]); }).catch(() => {});
    try {
      const profiles = JSON.parse(window.localStorage.getItem('isokolink-account-profiles') || '{}');
      const role = window.localStorage.getItem('isokolink-active-account') || 'farmer';
      setAccountProfile(profiles[role] || {});
    } catch { /* Profile is optional until saved. */ }
  }, [activeTab]);

  useEffect(() => {
    try { window.localStorage.setItem('isokolink-local-listings', JSON.stringify(produceListings)); } catch { /* Browser storage may be unavailable or full. */ }
  }, [produceListings]);

  // Cart state
  const [cartItems, setCartItems] = useState([]);

  // Modals & Drawers
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduceForOrder, setSelectedProduceForOrder] = useState(null);
  const [isAgencyModalOpen, setIsAgencyModalOpen] = useState(false);
  const [selectedAgencyForBooking, setSelectedAgencyForBooking] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Add to cart handler
  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`Added "${item.title}" to cart!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from cart.');
  };

  // Farmer listing produce handler
  const handleAddProduce = async (newProduce) => {
    const product = { ...newProduce, farmerEmail: accountProfile.email || '' };
    let savedToServer = false;
    try {
      const response = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product) });
      if (response.ok) { Object.assign(product, await response.json()); savedToServer = true; }
    } catch { /* Keep this session usable if the API is offline. */ }
    setProduceListings((current) => [product, ...current]);
    showToast(savedToServer ? `Harvest "${newProduce.name}" published to the marketplace.` : `Harvest "${newProduce.name}" saved on this device. It will sync when the marketplace API is available.`);
  };

  // Wholesale Buyer placing order
  const handleOpenOrderModal = (produce) => {
    setSelectedProduceForOrder(produce);
    setSelectedProduct(produce);
    setActiveTab('product-details');
  };

  const handleSubmitOrder = (order) => {
    setPendingOrder(order);
    setOrderSaved(false);
    setIsOrderModalOpen(false);
    setActiveTab('payment');
  };

  // Farmer booking agency
  const handleOpenAgencyModal = (agency) => {
    setSelectedAgencyForBooking(agency);
    setIsAgencyModalOpen(true);
  };

  const handleConfirmAgencyBooking = (booking) => {
    showToast(
      `Field spraying visit booked with ${booking.agencyName} in ${booking.district}!`
    );
  };

  const handleCheckoutComplete = () => {
    setCartItems([]);
    showToast('Order confirmed via MTN Mobile Money! Products will be dispatched.');
  };

  const confirmPayment = async () => {
    try {
      const response = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...pendingOrder, paymentMethod }) });
      if (!response.ok) throw new Error('Order could not be saved');
      setOrderSaved(true);
      showToast('Order request saved. The selected payment method is ready for confirmation.');
    } catch {
      showToast('Could not save the order. Check that the backend is running.');
    }
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setContactStatus('Sending your message…');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.get('name'), email: form.get('email'), message: form.get('message') }) });
      if (!response.ok) throw new Error('Message could not be sent');
      formElement.reset();
      setContactStatus('Thanks — your message has been sent to the IsokoLink team.');
    } catch {
      setContactStatus('We could not send your message right now. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a3721] text-white flex flex-col font-sans selection:bg-[#d1fae5] selection:text-slate-900">
      {/* 
        NO CHAOTIC TICKER HERE!
        Removed completely as requested by the user to prevent chaos.
      */}

      {/* Perfectly aligned Farmiq Navbar matching the image */}
      <FarmiqNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        cartCount={cartItems.reduce((acc, curr) => acc + (curr.quantity || 1), 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {/* ================= 1. HOME TAB (Exact Sustainable Agriculture layout from user's image with low font size) ================= */}
        {activeTab === 'home' && (
          <div>
            {/* The exact landing page from user's image (page 1.jpg) with low font size */}
            <SustainableAgriLanding
              onExploreFarms={() => setActiveTab('market')}
              onOpenMarket={() => setActiveTab('market')}
              onOpenDiseaseHub={() => setActiveTab('defense')}
              onOpenSocialFeed={() => setActiveTab('feed')}
            />
          </div>
        )}

        {/* ================= 2. PRODUCE MARKET TAB ================= */}
        {activeTab === 'market' && (
          <div className="page-gutter min-h-[75vh] bg-[#f7f8f4] py-8 text-black">
            <div className="max-w-[1000px] mx-auto">
              <ProduceMarket
                listings={produceListings}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onOrderClick={handleOpenOrderModal}
                onAddToCart={handleAddToCart}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
                onOpenDisease={() => setActiveTab('defense')}
                onManageAccount={() => setActiveTab('profile')}
              />
            </div>
          </div>
        )}

        {/* ================= 3. DISEASE DEFENSE HUB TAB ================= */}
        {activeTab === 'defense' && (
          <div className="page-gutter min-h-[75vh] bg-[#f7f8f4] py-8 text-black">
            <div className="max-w-[1000px] mx-auto">
              <DiseasePreventionHub
                onAddToCart={handleAddToCart}
                onConsultDoctor={() => setActiveTab('doctor')}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </div>
        )}

        {/* ================= 4. AI CROP DOCTOR TAB ================= */}
        {activeTab === 'doctor' && (
          <div className="page-gutter min-h-[75vh] bg-[#f7f8f4] py-8 text-black">
            <div className="max-w-[1000px] mx-auto space-y-8">
              <CropDoctor onAddToCart={handleAddToCart} />
            </div>
          </div>
        )}

        {/* ================= 5. FIELD AGENCIES TAB ================= */}
        {activeTab === 'agencies' && (
          <div className="page-gutter min-h-[75vh] bg-[#f7f8f4] py-8 text-black">
            <div className="max-w-[1000px] mx-auto">
              <AgencyServices onBookAgency={handleOpenAgencyModal} />
            </div>
          </div>
        )}

        {/* ================= 6. COMMUNITY FARMING FEED & NEWS TAB ================= */}
        {activeTab === 'feed' && (
          <div className="page-gutter min-h-[75vh] bg-[#f4f6f1] py-6 text-black">
            <SocialNewsFeed
              onNavigateTab={setActiveTab}
            />
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="page-gutter min-h-[75vh] bg-[#f7f8f4] py-8 text-black">
            <AccountManagement />
          </div>
        )}

        {activeTab === 'farmer-dashboard' && <div className="page-gutter min-h-[75vh] bg-[#f7f8f4] py-8"><FarmerDashboard listings={produceListings} profile={accountProfile} onBrowseMarket={() => setActiveTab('market')} onAddProduce={() => setIsSellModalOpen(true)} /></div>}

        {activeTab === 'product-details' && <div className="page-gutter min-h-[75vh] bg-[#f7f8f4] py-4"><ProductDetails product={selectedProduct} onBack={() => setActiveTab('market')} onBuy={() => { setSelectedProduceForOrder(selectedProduct); setIsOrderModalOpen(true); }} /></div>}

        {activeTab === 'payment' && <div className="page-gutter min-h-[75vh] bg-[#f7f8f4] py-8 text-[#17291e]"><section className="mx-auto max-w-2xl rounded-3xl border border-black/8 bg-white p-6 shadow-sm sm:p-8"><p className="text-xs font-semibold uppercase tracking-widest text-[#6B8E23]">Checkout</p><h1 className="mt-2 text-2xl font-semibold">Choose a payment option</h1><p className="mt-2 text-sm text-black/55">Your order request will be recorded as pending. Payment collection must be confirmed with the selected provider.</p>{pendingOrder && <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#f4f6ee] p-4"><img src={selectedProduct?.image} alt="" className="h-14 w-14 rounded-lg object-cover"/><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{pendingOrder.produceName}</p><p className="mt-1 text-xs text-black/55">{pendingOrder.quantityKg} kg · {pendingOrder.buyerName}</p></div><strong className="text-sm">{Number(pendingOrder.totalAmount).toLocaleString()} RWF</strong></div>}<div className="mt-5 grid gap-3 sm:grid-cols-2">{[{id:'mtn-momo',name:'MTN Mobile Money',hint:'Pay with MTN MoMo'},{id:'airtel-money',name:'Airtel Money',hint:'Pay with Airtel Money'},{id:'bank-transfer',name:'Bank transfer',hint:'Transfer to supplier account'},{id:'pay-on-delivery',name:'Pay on delivery',hint:'Confirm payment at delivery'}].map((option)=><label key={option.id} className={`cursor-pointer rounded-xl border p-4 transition ${paymentMethod===option.id?'border-[#6B8E23] bg-[#f4f6ee]':'border-black/10 hover:border-[#6B8E23]/50'}`}><span className="flex items-start gap-3"><input type="radio" name="payment" value={option.id} checked={paymentMethod===option.id} onChange={()=>setPaymentMethod(option.id)} className="mt-1 accent-[#6B8E23]"/><span><span className="block text-sm font-semibold">{option.name}</span><span className="mt-1 block text-xs text-black/50">{option.hint}</span></span></span></label>)}</div>{orderSaved && <p role="status" className="mt-5 rounded-xl bg-green-50 p-3 text-sm font-medium text-green-800">Order saved as pending. The farmer can now review your request.</p>}<div className="mt-6 flex flex-wrap gap-3"><button disabled={!pendingOrder || orderSaved} onClick={confirmPayment} className="rounded-xl bg-[#556B2F] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{orderSaved?'Order submitted':'Continue with selected option'}</button><button onClick={()=>setActiveTab('market')} className="rounded-xl border border-black/10 px-5 py-3 text-sm font-semibold">Back to market</button></div><p className="mt-4 text-[11px] leading-5 text-black/45">Payments are not charged by this demo. A payment provider integration is required to collect money securely.</p></section></div>}

        {/* ================= 7. ABOUT US TAB ================= */}
        {activeTab === 'about' && (
          <div className="page-gutter min-h-[75vh] bg-[#f7f8f4] py-12 text-black sm:py-16">
            <div className="mx-auto max-w-[1000px]">
              <section className="rounded-3xl bg-[#17291e] px-6 py-10 text-white sm:px-10 sm:py-14"><span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#c2d19e]">About Farm Africa · IsokoLink Rwanda</span><h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">A more connected home for Rwanda’s agriculture.</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/70">IsokoLink brings farmers, cooperatives, buyers, and agricultural supporters together around practical tools for local trade and shared knowledge.</p></section>
              <div className="mt-8 grid gap-4 md:grid-cols-3">{[{ icon: Sprout, title: 'For growers', text: 'Share harvest availability, introduce new produce, and connect with interested buyers.' }, { icon: Store, title: 'For buyers', text: 'Explore current listings, compare locations and volumes, and request a supplier quote.' }, { icon: Users, title: 'For the community', text: 'Exchange ideas, discuss new farming technologies, and learn from local experience.' }].map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-black/8 bg-white p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6B8E23]/10 text-[#556B2F]"><Icon size={21} /></span><h2 className="mt-5 text-lg font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-black/60">{text}</p></article>)}</div>
              <button type="button" onClick={() => setActiveTab('market')} className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#6B8E23] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#556B2F]">Explore the market <ArrowRight size={16} /></button>
            </div>
          </div>
        )}

        {/* ================= 8. CONTACT TAB ================= */}
        {activeTab === 'contact' && (
          <div className="page-gutter min-h-[75vh] bg-[#f7f8f4] py-12 text-black sm:py-16">
            <div className="mx-auto max-w-5xl"><span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B8E23]">Contact & support</span><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">How can we help?</h1><p className="mt-4 max-w-2xl text-base leading-7 text-black/60">Choose the part of IsokoLink you need, or send a message to our team.</p><div className="mt-9 grid gap-4 md:grid-cols-3">{[{ icon: Store, title: 'Buying or selling', text: 'Explore listings or publish your harvest.', tab: 'market', action: 'Open the market' }, { icon: Users, title: 'Community questions', text: 'Share an idea or ask local growers and buyers.', tab: 'feed', action: 'Visit community' }, { icon: Sprout, title: 'Crop health', text: 'Browse prevention supplies and crop advice.', tab: 'defense', action: 'Open plant health' }].map(({ icon: Icon, title, text, tab, action }) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className="group rounded-2xl border border-black/8 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-[#6B8E23]/40 hover:shadow-md"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6B8E23]/10 text-[#556B2F]"><Icon size={21} /></span><span className="mt-5 block text-lg font-semibold">{title}</span><span className="mt-2 block text-sm leading-6 text-black/60">{text}</span><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#556B2F]">{action} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span></button>)}</div><form onSubmit={handleContactSubmit} className="mt-8 grid gap-4 rounded-2xl border border-black/8 bg-white p-5 sm:grid-cols-2 sm:p-7"><div className="sm:col-span-2"><h2 className="text-xl font-semibold">Send us a message</h2><p className="mt-1 text-sm text-black/55">We’ll use your email to reply.</p></div><label className="grid gap-1.5 text-sm font-medium">Your name<input name="name" required autoComplete="name" className="rounded-lg border border-black/15 px-3 py-2.5 font-normal outline-none focus:border-[#6B8E23]" /></label><label className="grid gap-1.5 text-sm font-medium">Email address<input name="email" type="email" required autoComplete="email" className="rounded-lg border border-black/15 px-3 py-2.5 font-normal outline-none focus:border-[#6B8E23]" /></label><label className="grid gap-1.5 text-sm font-medium sm:col-span-2">Message<textarea name="message" required rows="4" className="resize-y rounded-lg border border-black/15 px-3 py-2.5 font-normal outline-none focus:border-[#6B8E23]" /></label><div className="flex flex-wrap items-center gap-3 sm:col-span-2"><button type="submit" className="rounded-lg bg-[#6B8E23] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#556B2F]">Send message</button><p role="status" className="text-sm text-black/60">{contactStatus}</p></div></form></div>
          </div>
        )}
      </main>

      {/* Modals & Slide-over Drawers */}
      <AddProduceModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        onAddProduce={handleAddProduce}
      />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        produce={selectedProduceForOrder}
        onSubmitOrder={handleSubmitOrder}
      />

      <BookAgencyModal
        isOpen={isAgencyModalOpen}
        onClose={() => setIsAgencyModalOpen(false)}
        agency={selectedAgencyForBooking}
        onConfirmBooking={handleConfirmAgencyBooking}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckoutComplete={handleCheckoutComplete}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border-l-4 border-[#9eb65b] bg-[#17291e] px-5 py-3 text-white shadow-2xl">
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer
        onSwitchTab={setActiveTab}
        onOpenSellModal={() => setIsSellModalOpen(true)}
      />
    </div>
  );
}
