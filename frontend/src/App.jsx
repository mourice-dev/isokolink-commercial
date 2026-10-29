import React, { useCallback, useEffect, useState } from 'react';
import { apiFetch } from './lib/api';
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
import BuyerDashboard from './components/BuyerDashboard';
import AuthPage from './components/AuthPage';
import ProductDetails from './components/ProductDetails';
import { INITIAL_PRODUCE_LISTINGS } from './data/mockData';
import { ArrowRight, Sprout, Store, Users } from 'lucide-react';
import { readRouteFromLocation, routePathForTab } from './lib/routes';

const EXPECTED_ROLE_BY_TAB = { 'farmer-dashboard': 'farmer', 'buyer-dashboard': 'buyer', profile: 'any', payment: 'buyer' };

export default function App() {
  // Navigation tabs: 'home' | 'market' | 'defense' | 'doctor' | 'agencies' | 'feed' | 'about' | 'contact'
  const [route, setRoute] = useState(readRouteFromLocation);
  const activeTab = route.tab;
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
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
  const currentProduct = route.productId
    ? produceListings.find((item) => String(item.id) === String(route.productId)) || selectedProduct
    : selectedProduct;
  const [pendingOrder, setPendingOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('mtn-momo');
  const [orderSaved, setOrderSaved] = useState(false);
  const [contactStatus, setContactStatus] = useState('');

  useEffect(() => {
    apiFetch('/api/products').then((r) => r.ok ? r.json() : null).then((items) => { if (Array.isArray(items) && items.length) setProduceListings((current) => [...items, ...current.filter((entry) => !items.some((item) => item.id === entry.id))]); }).catch(() => {});
  }, [activeTab]);

  useEffect(() => {
    let mounted = true;
    apiFetch('/api/auth/me').then(async (response) => response.ok ? response.json() : null)
      .then((data) => { if (mounted) setAuthUser(data?.user || null); })
      .catch(() => { if (mounted) setAuthUser(null); })
      .finally(() => { if (mounted) setAuthLoading(false); });
    return () => { mounted = false; };
  }, []);

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

  const setActiveTab = useCallback((tab, options = {}) => {
    const productId = options.productId ?? (tab === 'payment' ? selectedProduct?.id : null);
    const nextRoute = { tab, productId };
    if (options.role) nextRoute.role = options.role;
    const nextUrl = routePathForTab(tab, { productId, role: options.role });
    if (`${window.location.pathname}${window.location.search}` !== nextUrl) {
      const changeHistory = options.replace ? 'replaceState' : 'pushState';
      window.history[changeHistory]({ isokoLinkRoute: true }, '', nextUrl);
    }
    setRoute(nextRoute);
    if (tab === 'product-details' && options.product) {
      setSelectedProduct(options.product);
      setSelectedProduceForOrder(options.product);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedProduct]);

  const goBack = useCallback((fallbackTab = 'home') => {
    if (window.history.state?.isokoLinkRoute) window.history.back();
    else setActiveTab(fallbackTab);
  }, [setActiveTab]);

  useEffect(() => {
    if (authLoading) return;
    const expectedRole = EXPECTED_ROLE_BY_TAB[activeTab];
    if (expectedRole) {
      if (!authUser) {
        setActiveTab('login', { role: activeTab === 'payment' ? 'buyer' : expectedRole === 'any' ? 'farmer' : expectedRole, replace: true });
        return;
      }
      if (expectedRole !== 'any' && authUser.role !== expectedRole) {
        setActiveTab(`${authUser.role}-dashboard`, { replace: true });
        return;
      }
    }
    if (authUser && (activeTab === 'login' || activeTab === 'register')) setActiveTab(`${authUser.role}-dashboard`, { replace: true });
  }, [activeTab, authLoading, authUser, setActiveTab]);

  useEffect(() => {
    const restoreRoute = () => {
      const nextRoute = readRouteFromLocation();
      setRoute(nextRoute);
      setIsOrderModalOpen(false);
      if (nextRoute.productId) {
        const product = produceListings.find((item) => String(item.id) === String(nextRoute.productId));
        if (product) {
          setSelectedProduct(product);
          setSelectedProduceForOrder(product);
        }
      }
    };
    window.addEventListener('popstate', restoreRoute);
    return () => window.removeEventListener('popstate', restoreRoute);
  }, [produceListings]);

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleAuthSuccess = (user) => {
    setAuthUser(user);
    setActiveTab(`${user.role}-dashboard`, { replace: true });
  };

  const handleLogout = async () => {
    try {
      const response = await apiFetch('/api/auth/logout', { method: 'POST' });
      if (!response.ok) throw new Error('Could not log out. Please try again.');
      setAuthUser(null);
      setPendingOrder(null);
      setOrderSaved(false);
      setIsOrderModalOpen(false);
      setActiveTab('login', { replace: true });
    } catch (error) {
      showToast(error.message || 'Could not log out. Please try again.');
    }
  };

  const handleOpenSell = () => {
    if (!authUser) return setActiveTab('login', { role: 'farmer' });
    if (authUser.role !== 'farmer') return showToast('Only farmer accounts can publish produce.');
    setIsSellModalOpen(true);
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
    const product = { ...newProduce, farmerEmail: authUser?.email || '', farmerPhone: authUser?.phone || '' };
    let savedToServer = false;
    try {
      const response = await apiFetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(product) });
      if (response.ok) { Object.assign(product, await response.json()); savedToServer = true; }
    } catch { /* Keep this session usable if the API is offline. */ }
    setProduceListings((current) => [product, ...current]);
    showToast(savedToServer ? `Harvest "${newProduce.name}" published to the marketplace.` : `Harvest "${newProduce.name}" saved on this device. It will sync when the marketplace API is available.`);
  };

  // Wholesale Buyer placing order
  const handleOpenOrderModal = (produce) => {
    if (!authUser) return setActiveTab('login', { role: 'buyer' });
    if (authUser.role !== 'buyer') return showToast('Sign in with a buyer account to place an order.');
    setActiveTab('product-details', { productId: produce.id, product: produce });
  };

  const handleBuySelectedProduce = () => {
    if (!authUser) return setActiveTab('login', { role: 'buyer' });
    if (authUser.role !== 'buyer') return showToast('Sign in with a buyer account to place an order.');
    if (!currentProduct) return showToast('This produce listing is no longer available.');
    setSelectedProduct(currentProduct);
    setSelectedProduceForOrder(currentProduct);
    setIsOrderModalOpen(true);
  };

  const handleSubmitOrder = (order) => {
    setPendingOrder(order);
    setOrderSaved(false);
    setIsOrderModalOpen(false);
    setActiveTab('payment', { productId: currentProduct?.id });
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
      const response = await apiFetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...pendingOrder, paymentMethod }) });
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
      const response = await apiFetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.get('name'), email: form.get('email'), message: form.get('message') }) });
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
        onOpenSellModal={handleOpenSell}
        cartCount={cartItems.reduce((acc, curr) => acc + (curr.quantity || 1), 0)}
        onOpenCart={() => setIsCartOpen(true)}
        user={authUser}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {(activeTab === 'login' || activeTab === 'register') && authLoading && <div className="grid min-h-[65vh] place-items-center bg-[#f7f8f4] text-sm text-black/55">Checking your secure session…</div>}
        {(activeTab === 'login' || activeTab === 'register') && !authUser && !authLoading && <AuthPage key={`${activeTab}:${route.role || ''}`} mode={activeTab === 'register' ? 'register' : 'login'} role={route.role} onAuthSuccess={handleAuthSuccess} onNavigate={setActiveTab} />}
        {authLoading && ['profile', 'farmer-dashboard', 'buyer-dashboard', 'payment'].includes(activeTab) && <div className="grid min-h-[65vh] place-items-center bg-[#f7f8f4] text-sm text-black/55">Checking your secure session…</div>}
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
              user={authUser}
            />
          </div>
        )}

        {activeTab === 'profile' && authUser && (
          <div className="page-gutter min-h-[75vh] bg-[#f7f8f4] py-8 text-black">
            <AccountManagement user={authUser} onProfileUpdated={(updated) => setAuthUser((current) => ({ ...current, ...updated }))} />
          </div>
        )}

        {activeTab === 'farmer-dashboard' && authUser?.role === 'farmer' && <div className="page-gutter min-h-[75vh] bg-[#f7f8f4] py-8"><FarmerDashboard listings={produceListings} profile={{ ...authUser, ...(authUser.details || {}) }} onBrowseMarket={() => setActiveTab('market')} onAddProduce={handleOpenSell} /></div>}
        {activeTab === 'buyer-dashboard' && authUser?.role === 'buyer' && <div className="page-gutter min-h-[75vh] bg-[#f7f8f4] py-8"><BuyerDashboard user={{ ...authUser, ...(authUser.details || {}) }} onBrowseMarket={() => setActiveTab('market')} /></div>}

        {activeTab === 'product-details' && <div className="page-gutter min-h-[75vh] bg-[#f7f8f4] py-4"><ProductDetails product={currentProduct} onBack={() => goBack('market')} onBuy={handleBuySelectedProduce} /></div>}

        {activeTab === 'payment' && authUser?.role === 'buyer' && <div className="page-gutter min-h-[75vh] bg-[#f7f8f4] py-8 text-[#17291e]"><section className="mx-auto max-w-2xl rounded-3xl border border-black/8 bg-white p-6 shadow-sm sm:p-8"><p className="text-xs font-semibold uppercase tracking-widest text-[#6B8E23]">Checkout</p><h1 className="mt-2 text-2xl font-semibold">Choose a payment option</h1><p className="mt-2 text-sm text-black/55">Your order request will be recorded as pending. Payment collection must be confirmed with the selected provider.</p>{pendingOrder && <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#f4f6ee] p-4"><img src={currentProduct?.image} alt="" className="h-14 w-14 rounded-lg object-cover"/><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{pendingOrder.produceName}</p><p className="mt-1 text-xs text-black/55">{pendingOrder.quantityKg} kg · {pendingOrder.buyerName}</p></div><strong className="text-sm">{Number(pendingOrder.totalAmount).toLocaleString()} RWF</strong></div>}<div className="mt-5 grid gap-3 sm:grid-cols-2">{[{id:'mtn-momo',name:'MTN Mobile Money',hint:'Pay with MTN MoMo'},{id:'airtel-money',name:'Airtel Money',hint:'Pay with Airtel Money'},{id:'bank-transfer',name:'Bank transfer',hint:'Transfer to supplier account'},{id:'pay-on-delivery',name:'Pay on delivery',hint:'Confirm payment at delivery'}].map((option)=><label key={option.id} className={`cursor-pointer rounded-xl border p-4 transition ${paymentMethod===option.id?'border-[#6B8E23] bg-[#f4f6ee]':'border-black/10 hover:border-[#6B8E23]/50'}`}><span className="flex items-start gap-3"><input type="radio" name="payment" value={option.id} checked={paymentMethod===option.id} onChange={()=>setPaymentMethod(option.id)} className="mt-1 accent-[#6B8E23]"/><span><span className="block text-sm font-semibold">{option.name}</span><span className="mt-1 block text-xs text-black/50">{option.hint}</span></span></span></label>)}</div>{orderSaved && <p role="status" className="mt-5 rounded-xl bg-green-50 p-3 text-sm font-medium text-green-800">Order saved as pending. The farmer can now review your request.</p>}<div className="mt-6 flex flex-wrap gap-3"><button disabled={!pendingOrder || orderSaved} onClick={confirmPayment} className="rounded-xl bg-[#556B2F] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{orderSaved?'Order submitted':'Continue with selected option'}</button><button onClick={()=>goBack('market')} className="rounded-xl border border-black/10 px-5 py-3 text-sm font-semibold">Back to produce</button></div><p className="mt-4 text-[11px] leading-5 text-black/45">Payments are not charged by this demo. A payment provider integration is required to collect money securely.</p></section></div>}

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
        onOpenSellModal={handleOpenSell}
        onContactSubmit={handleContactSubmit}
        contactStatus={contactStatus}
      />
    </div>
  );
}
