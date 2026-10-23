import React, { useState } from 'react';
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
import { INITIAL_PRODUCE_LISTINGS } from './data/mockData';
import { ArrowRight, Sprout, Store, Users } from 'lucide-react';

export default function App() {
  // Navigation tabs: 'home' | 'market' | 'defense' | 'doctor' | 'agencies' | 'feed' | 'about' | 'contact'
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All Rwanda');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Produce listings state
  const [produceListings, setProduceListings] = useState(INITIAL_PRODUCE_LISTINGS);

  // Cart state
  const [cartItems, setCartItems] = useState([
    {
      id: 'prev-1',
      title: 'Ridomil Gold MZ 68 WG (Anti-Late Blight)',
      price: 18500,
      unit: '1 kg container',
      quantity: 1,
      type: 'disease-defense',
      supplier: 'AgroPy Rwanda Musanze Hub'
    }
  ]);

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
  const handleAddProduce = (newProduce) => {
    setProduceListings([newProduce, ...produceListings]);
    showToast(`Harvest "${newProduce.name}" successfully published!`);
  };

  // Wholesale Buyer placing order
  const handleOpenOrderModal = (produce) => {
    setSelectedProduceForOrder(produce);
    setIsOrderModalOpen(true);
  };

  const handleSubmitOrder = (order) => {
    showToast(
      `Order confirmed for ${order.quantityKg} kg of ${order.produceName}! Cooperative notified.`
    );
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
          <div className="min-h-[75vh] bg-[#f7f8f4] px-4 py-8 text-black sm:px-8 lg:px-12">
            <div className="max-w-[1400px] mx-auto">
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
              />
            </div>
          </div>
        )}

        {/* ================= 3. DISEASE DEFENSE HUB TAB ================= */}
        {activeTab === 'defense' && (
          <div className="min-h-[75vh] bg-[#f7f8f4] px-4 py-8 text-black sm:px-8 lg:px-12">
            <div className="max-w-[1400px] mx-auto">
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
          <div className="min-h-[75vh] bg-[#f7f8f4] px-4 py-8 text-black sm:px-8 lg:px-12">
            <div className="max-w-[1400px] mx-auto space-y-8">
              <CropDoctor onAddToCart={handleAddToCart} />
            </div>
          </div>
        )}

        {/* ================= 5. FIELD AGENCIES TAB ================= */}
        {activeTab === 'agencies' && (
          <div className="min-h-[75vh] bg-[#f7f8f4] px-4 py-8 text-black sm:px-8 lg:px-12">
            <div className="max-w-[1400px] mx-auto">
              <AgencyServices onBookAgency={handleOpenAgencyModal} />
            </div>
          </div>
        )}

        {/* ================= 6. COMMUNITY FARMING FEED & NEWS TAB ================= */}
        {activeTab === 'feed' && (
          <div className="min-h-[75vh] bg-[#f4f6f1] px-2 py-6 text-black sm:px-4">
            <SocialNewsFeed
              onNavigateTab={setActiveTab}
              onAddToCart={handleAddToCart}
              onOpenSellModal={() => setIsSellModalOpen(true)}
            />
          </div>
        )}

        {/* ================= 7. ABOUT US TAB ================= */}
        {activeTab === 'about' && (
          <div className="min-h-[75vh] bg-[#f7f8f4] px-5 py-14 text-black sm:px-10 sm:py-20">
            <div className="mx-auto max-w-6xl">
              <section className="rounded-3xl bg-[#17291e] px-6 py-10 text-white sm:px-10 sm:py-14"><span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#c2d19e]">About Farm Africa · IsokoLink Rwanda</span><h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">A more connected home for Rwanda’s agriculture.</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/70">IsokoLink brings farmers, cooperatives, buyers, and agricultural supporters together around practical tools for local trade and shared knowledge.</p></section>
              <div className="mt-8 grid gap-4 md:grid-cols-3">{[{ icon: Sprout, title: 'For growers', text: 'Share harvest availability, introduce new produce, and connect with interested buyers.' }, { icon: Store, title: 'For buyers', text: 'Explore current listings, compare locations and volumes, and request a supplier quote.' }, { icon: Users, title: 'For the community', text: 'Exchange ideas, discuss new farming technologies, and learn from local experience.' }].map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-black/8 bg-white p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6B8E23]/10 text-[#556B2F]"><Icon size={21} /></span><h2 className="mt-5 text-lg font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-black/60">{text}</p></article>)}</div>
              <button type="button" onClick={() => setActiveTab('market')} className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#6B8E23] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#556B2F]">Explore the market <ArrowRight size={16} /></button>
            </div>
          </div>
        )}

        {/* ================= 8. CONTACT TAB ================= */}
        {activeTab === 'contact' && (
          <div className="min-h-[75vh] bg-[#f7f8f4] px-5 py-14 text-black sm:px-10 sm:py-20">
            <div className="mx-auto max-w-5xl"><span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B8E23]">Contact & support</span><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">How can we help?</h1><p className="mt-4 max-w-2xl text-base leading-7 text-black/60">Choose the part of IsokoLink you need. You can browse available produce, ask the farming community, or explore crop health resources.</p><div className="mt-9 grid gap-4 md:grid-cols-3">{[{ icon: Store, title: 'Buying or selling', text: 'Explore listings or publish your harvest.', tab: 'market', action: 'Open the market' }, { icon: Users, title: 'Community questions', text: 'Share an idea or ask local growers and buyers.', tab: 'feed', action: 'Visit community' }, { icon: Sprout, title: 'Crop health', text: 'Browse prevention supplies and crop advice.', tab: 'defense', action: 'Open plant health' }].map(({ icon: Icon, title, text, tab, action }) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className="group rounded-2xl border border-black/8 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-[#6B8E23]/40 hover:shadow-md"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6B8E23]/10 text-[#556B2F]"><Icon size={21} /></span><span className="mt-5 block text-lg font-semibold">{title}</span><span className="mt-2 block text-sm leading-6 text-black/60">{text}</span><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#556B2F]">{action} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span></button>)}</div></div>
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
