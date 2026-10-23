import React, { useState } from 'react';
import { BadgeCheck, Save, ShieldCheck, ShoppingBasket, Sprout, UserRound } from 'lucide-react';

const STORAGE_KEY = 'isokolink-account-profiles';
const emptyProfiles = {
  farmer: { fullName: '', email: '', phone: '', district: '', farmName: '', mainProduce: '', avatarUrl: '' },
  buyer: { fullName: '', email: '', phone: '', district: '', organization: '', buyerType: '', monthlyVolume: '', avatarUrl: '' },
};

function readProfiles() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
    return {
      farmer: { ...emptyProfiles.farmer, ...(stored?.farmer || {}) },
      buyer: { ...emptyProfiles.buyer, ...(stored?.buyer || {}) },
    };
  } catch {
    return emptyProfiles;
  }
}

function readActiveRole() {
  try {
    return window.localStorage.getItem('isokolink-active-account') === 'buyer' ? 'buyer' : 'farmer';
  } catch {
    return 'farmer';
  }
}

export default function AccountManagement() {
  const [profiles, setProfiles] = useState(readProfiles);
  const [activeRole, setActiveRole] = useState(readActiveRole);
  const [savedMessage, setSavedMessage] = useState('');
  const profile = profiles[activeRole];
  const isFarmer = activeRole === 'farmer';
  const updateProfile = (field, value) => {
    setProfiles((current) => ({ ...current, [activeRole]: { ...current[activeRole], [field]: value } }));
    setSavedMessage('');
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
      window.localStorage.setItem('isokolink-active-account', activeRole);
      if (profile.email) {
        const response = await fetch('/api/accounts', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...profile, role: activeRole }) });
        if (!response.ok) throw new Error('API unavailable');
        setSavedMessage(`${isFarmer ? 'Farmer' : 'Buyer'} profile saved to IsokoLink.`);
      } else setSavedMessage('Add an email address to sync this profile to the database. Saved on this device for now.');
    } catch {
      setSavedMessage('Saved on this device. Database sync is unavailable right now.');
    }
  };

  const uploadAvatar = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setSavedMessage('Choose an image file.');
    if (file.size > 4 * 1024 * 1024) return setSavedMessage('Choose an image under 4 MB.');
    const reader = new FileReader();
    reader.onload = () => updateProfile('avatarUrl', reader.result);
    reader.readAsDataURL(file);
  };

  const fieldClass = 'mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-[#6B8E23] focus:ring-2 focus:ring-[#6B8E23]/10';

  return (
    <div className="mx-auto max-w-[1000px]">
      <section className="overflow-hidden rounded-3xl bg-[#17291e] text-white">
        <div className="flex flex-col gap-5 px-6 py-8 sm:px-9 sm:py-9 md:flex-row md:items-end md:justify-between">
          <div><span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c2d19e]">IsokoLink account</span><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Account management</h1><p className="mt-3 max-w-xl text-sm leading-6 text-white/65">Keep your farmer and buyer details in separate profiles, and switch between them whenever you need.</p></div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-xs text-white/70"><ShieldCheck size={17} className="text-[#c2d19e]" /> Saved in this browser</div>
        </div>
      </section>

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-3">
          <p className="px-1 text-xs font-bold uppercase tracking-[0.14em] text-black/45">Choose an account</p>
          {[
            { id: 'farmer', title: 'Farmer account', detail: 'Manage your farm and produce details', icon: Sprout },
            { id: 'buyer', title: 'Buyer account', detail: 'Manage your organization and buying needs', icon: ShoppingBasket },
          ].map(({ id, title, detail, icon: Icon }) => {
            const selected = activeRole === id;
            const saved = profiles[id].fullName || profiles[id].email;
            return <button key={id} type="button" onClick={() => { setActiveRole(id); setSavedMessage(''); }} className={`w-full rounded-2xl border p-4 text-left transition ${selected ? 'border-[#6B8E23]/50 bg-[#f1f5e9] shadow-sm' : 'border-black/8 bg-white hover:border-[#6B8E23]/30'}`}>
              <span className="flex items-center gap-3"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${selected ? 'bg-[#6B8E23] text-white' : 'bg-[#6B8E23]/10 text-[#556B2F]'}`}><Icon size={19} /></span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-[#17291e]">{title}</span><span className="mt-0.5 block text-xs leading-5 text-black/50">{detail}</span></span>{saved && <BadgeCheck size={17} className="shrink-0 text-[#6B8E23]" />}</span>
            </button>;
          })}
          <p className="rounded-xl bg-white/70 p-3 text-xs leading-5 text-black/50">Farmer and buyer information is kept separately in this browser. This demo does not connect to a sign-in service.</p>
        </aside>

        <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center gap-4 border-b border-black/6 pb-5"><label className="group relative block h-[70px] w-[70px] shrink-0 cursor-pointer overflow-hidden rounded-full border-2 border-[#dce5cc] bg-[#e9eedf] text-[#556B2F]" title="Upload profile picture">{profile.avatarUrl ? <img src={profile.avatarUrl} alt="Profile preview" className="h-full w-full object-cover"/> : <span className="grid h-full place-items-center">{isFarmer ? <Sprout size={24}/> : <ShoppingBasket size={24}/>}</span>}<input type="file" accept="image/*" onChange={uploadAvatar} className="sr-only" aria-label="Upload circular profile image"/></label><div><h2 className="text-lg font-semibold text-[#17291e]">{isFarmer ? 'Farmer profile' : 'Buyer profile'}</h2><p className="mt-1 text-sm text-black/50">Your account information and contact details</p><p className="mt-1 text-xs font-medium text-[#556B2F]">Tap the circle to add a profile picture</p></div></div>
          <form onSubmit={saveProfile}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold text-black/65">Full name<input className={fieldClass} value={profile.fullName} onChange={(event) => updateProfile('fullName', event.target.value)} placeholder="Your name" autoComplete="name" /></label>
              <label className="text-xs font-semibold text-black/65">Email address<input className={fieldClass} type="email" value={profile.email} onChange={(event) => updateProfile('email', event.target.value)} placeholder="you@example.com" autoComplete="email" /></label>
              <label className="text-xs font-semibold text-black/65">Phone number<input className={fieldClass} type="tel" value={profile.phone} onChange={(event) => updateProfile('phone', event.target.value)} placeholder="+250 7XX XXX XXX" autoComplete="tel" /></label>
              <label className="text-xs font-semibold text-black/65">District<input className={fieldClass} value={profile.district} onChange={(event) => updateProfile('district', event.target.value)} placeholder="e.g. Musanze" /></label>
              {isFarmer ? <>
                <label className="text-xs font-semibold text-black/65 sm:col-span-2">Farm or cooperative name<input className={fieldClass} value={profile.farmName} onChange={(event) => updateProfile('farmName', event.target.value)} placeholder="Farm or cooperative" /></label>
                <label className="text-xs font-semibold text-black/65 sm:col-span-2">Main produce<input className={fieldClass} value={profile.mainProduce} onChange={(event) => updateProfile('mainProduce', event.target.value)} placeholder="e.g. Potatoes, beans, maize" /></label>
              </> : <>
                <label className="text-xs font-semibold text-black/65">Business or organization<input className={fieldClass} value={profile.organization} onChange={(event) => updateProfile('organization', event.target.value)} placeholder="Company, institution, or shop" /></label>
                <label className="text-xs font-semibold text-black/65">Buyer type<select className={fieldClass} value={profile.buyerType} onChange={(event) => updateProfile('buyerType', event.target.value)}><option value="">Select buyer type</option><option>Wholesaler</option><option>Retailer</option><option>Hotel or restaurant</option><option>Institution</option><option>Processor</option><option>Other</option></select></label>
                <label className="text-xs font-semibold text-black/65 sm:col-span-2">Typical monthly volume<input className={fieldClass} value={profile.monthlyVolume} onChange={(event) => updateProfile('monthlyVolume', event.target.value)} placeholder="e.g. 5 tonnes" /></label>
              </>}
            </div>
            <div className="mt-6 flex flex-col gap-3 border-t border-black/6 pt-5 sm:flex-row sm:items-center sm:justify-between"><p aria-live="polite" className="text-sm text-[#556B2F]">{savedMessage || 'Update your details, then save this account.'}</p><button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#556B2F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3f5221]"><Save size={16} /> Save {isFarmer ? 'farmer' : 'buyer'} account</button></div>
          </form>
        </section>
      </div>
      <p className="mt-5 flex items-center gap-2 text-xs text-black/45"><UserRound size={14} /> Both account types can use the marketplace with their own contact and organization details.</p>
    </div>
  );
}
