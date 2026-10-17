import React, { useState } from 'react';
import FarmiqNavbar from './components/FarmiqNavbar';
import FarmiqHero from './components/FarmiqHero';
import HierarchicalFloorTree from './components/HierarchicalFloorTree';
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
import { CheckCircle2, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function App() {
  // Navigation tabs: 'home' | 'market' | 'defense' | 'doctor' | 'agencies' | 'feed' | 'about' | 'contact'
  const [activeTab, setActiveTab] = useState('home');
  // For hierarchical tree floor selection
  const [activeFloor, setActiveFloor] = useState('market');

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
          <div className="bg-[#f8faf9] text-slate-900 min-h-[90vh] py-10 px-6 sm:px-12 md:px-16">
            <div className="max-w-[1400px] mx-auto">
              <ProduceMarket
                listings={produceListings}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onOrderClick={handleOpenOrderModal}
                onAddToCart={handleAddToCart}
                searchQuery={searchQuery}
                selectedDistrict={selectedDistrict}
              />
            </div>
          </div>
        )}

        {/* ================= 3. DISEASE DEFENSE HUB TAB ================= */}
        {activeTab === 'defense' && (
          <div className="bg-[#f8faf9] text-slate-900 min-h-[90vh] py-10 px-6 sm:px-12 md:px-16">
            <div className="max-w-[1400px] mx-auto">
              <DiseasePreventionHub
                onAddToCart={handleAddToCart}
                onConsultDoctor={() => setActiveTab('doctor')}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        )}

        {/* ================= 4. AI CROP DOCTOR TAB ================= */}
        {activeTab === 'doctor' && (
          <div className="bg-[#f8faf9] text-slate-900 min-h-[90vh] py-10 px-6 sm:px-12 md:px-16">
            <div className="max-w-[1400px] mx-auto space-y-8">
              <CropDoctor onAddToCart={handleAddToCart} />
            </div>
          </div>
        )}

        {/* ================= 5. FIELD AGENCIES TAB ================= */}
        {activeTab === 'agencies' && (
          <div className="bg-[#f8faf9] text-slate-900 min-h-[90vh] py-10 px-6 sm:px-12 md:px-16">
            <div className="max-w-[1400px] mx-auto">
              <AgencyServices onBookAgency={handleOpenAgencyModal} />
            </div>
          </div>
        )}

        {/* ================= 6. COMMUNITY FARMING FEED & NEWS TAB ================= */}
        {activeTab === 'feed' && (
          <div className="bg-[#f0f2f5] text-slate-900 min-h-[90vh] py-6">
            <SocialNewsFeed
              onNavigateTab={setActiveTab}
              onAddToCart={handleAddToCart}
            />
          </div>
        )}

        {/* ================= 7. ABOUT US TAB ================= */}
        {activeTab === 'about' && (
          <div className="bg-[#0a3721] text-white min-h-[80vh] py-16 px-6 sm:px-12 md:px-20">
            <div className="max-w-4xl mx-auto space-y-8">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#d1fae5] bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                Our Mission & Standards
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-sans">
                Connecting Rwanda's Smallholders to Markets & Certified Crop Health
              </h2>
              <p className="text-emerald-100/80 text-lg leading-relaxed">
                Farmiq (IsokoLink Rwanda) was established to resolve the twin crises faced by smallholder farmers:
                unfair price-gouging by exploitative middlemen, and destructive crop diseases like Late Blight and Fall Armyworm.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                <div className="p-6 rounded-2xl bg-emerald-950/70 border border-emerald-800/60 space-y-2">
                  <h3 className="font-bold text-lg text-white">450+ Cooperatives</h3>
                  <p className="text-xs text-emerald-200/70">Verified agricultural unions in all 30 districts.</p>
                </div>
                <div className="p-6 rounded-2xl bg-emerald-950/70 border border-emerald-800/60 space-y-2">
                  <h3 className="font-bold text-lg text-amber-300">RAB Accreditation</h3>
                  <p className="text-xs text-emerald-200/70">100% compliant agrochemicals and disease antidotes.</p>
                </div>
                <div className="p-6 rounded-2xl bg-emerald-950/70 border border-emerald-800/60 space-y-2">
                  <h3 className="font-bold text-lg text-[#d1fae5]">0% Middlemen Cut</h3>
                  <p className="text-xs text-emerald-200/70">Escrow-backed direct farm-gate to wholesale buyer transactions.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 8. CONTACT TAB ================= */}
        {activeTab === 'contact' && (
          <div className="bg-[#0a3721] text-white min-h-[80vh] py-16 px-6 sm:px-12 md:px-20">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl font-extrabold tracking-tight font-sans">
                Get In Touch With Farmiq Rwanda
              </h2>
              <p className="text-emerald-200/80">
                Have questions about bulk produce purchase, disease prevention kits, or joining as a certified agro-dealer?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center gap-3">
                  <Phone className="text-emerald-400" size={24} />
                  <div>
                    <div className="text-xs text-emerald-300">Hotline & MoMo Support:</div>
                    <div className="font-bold text-white">+250 788 412 901 / 4127</div>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center gap-3">
                  <MapPin className="text-emerald-400" size={24} />
                  <div>
                    <div className="text-xs text-emerald-300">Headquarters:</div>
                    <div className="font-bold text-white">Kigali & Musanze Agro Hub</div>
                  </div>
                </div>
              </div>
            </div>
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
        <div className="fixed bottom-6 right-6 bg-[#072618] text-white py-3 px-5 rounded-xl shadow-2xl flex items-center gap-3 z-50 border-l-4 border-emerald-400">
          <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
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
