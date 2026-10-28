import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Sprout, Store } from 'lucide-react';
import { apiFetch } from '../lib/api';

export default function AuthPage({ mode = 'login', role: initialRole, onAuthSuccess, onNavigate }) {
  const [role, setRole] = useState(initialRole === 'buyer' ? 'buyer' : 'farmer');
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '', phone: '', district: '', farmName: '', mainProduce: '', organization: '', buyerType: '', monthlyVolume: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isRegister = mode === 'register';

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const switchRole = (nextRole) => {
    setRole(nextRole);
    onNavigate(isRegister ? 'register' : 'login', { role: nextRole });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (isRegister && form.password !== form.confirmPassword) return setError('Passwords do not match.');
    setSubmitting(true);
    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const registration = { ...form };
      delete registration.confirmPassword;
      const payload = isRegister ? { ...registration, role } : { role, email: form.email, password: form.password };
      const response = await apiFetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Authentication failed. Please try again.');
      onAuthSuccess(data.user);
    } catch (submitError) {
      setError(submitError.message || 'Could not connect to IsokoLink. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = 'mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-[#6B8E23] focus:ring-2 focus:ring-[#6B8E23]/10';

  return (
    <main className="page-gutter flex min-h-[75vh] items-center justify-center bg-[#f7f8f4] py-10 text-[#17291e] sm:py-14">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-black/8 bg-white shadow-xl lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="flex flex-col justify-between bg-[#17291e] p-7 text-white sm:p-9">
          <div><span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6B8E23]">{role === 'farmer' ? <Sprout size={23} /> : <Store size={22} />}</span><p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-[#c2d19e]">IsokoLink Rwanda</p><h1 className="mt-3 text-3xl font-semibold tracking-tight">{isRegister ? 'Join the marketplace' : 'Welcome back'}</h1><p className="mt-3 max-w-sm text-sm leading-6 text-white/65">{isRegister ? 'Create a secure account to manage your farm or source produce across Rwanda.' : 'Sign in to your account to manage your produce, orders, and profile.'}</p></div>
          <div className="mt-8 hidden rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-sm leading-6 text-white/70 lg:block">Your account is tied to one role. Farmer and buyer workspaces keep their tools and order information separate.</div>
        </aside>
        <div className="p-6 sm:p-9">
          <div className="mb-6"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6B8E23]">{isRegister ? 'Create an account' : 'Secure sign in'}</p><h2 className="mt-1 text-2xl font-semibold">{isRegister ? `Register as a ${role}` : 'Log in to IsokoLink'}</h2></div>
          <div className="mb-6 grid grid-cols-2 rounded-xl bg-[#f1f4ec] p-1" aria-label="Account role">
            {[['farmer', 'Farmer'], ['buyer', 'Buyer']].map(([value, label]) => <button type="button" key={value} onClick={() => switchRole(value)} aria-pressed={role === value} className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${role === value ? 'bg-white text-[#344638] shadow-sm' : 'text-black/50 hover:text-black/75'}`}>{value === 'farmer' ? <Sprout size={16} /> : <Store size={16} />}{label}</button>)}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            {isRegister && <label className="grid gap-1 text-xs font-semibold text-black/65 sm:col-span-2">Full name<input className={fieldClass} value={form.fullName} onChange={update('fullName')} autoComplete="name" placeholder="Your full name" required /></label>}
            <label className={`grid gap-1 text-xs font-semibold text-black/65 ${isRegister ? 'sm:col-span-2' : 'sm:col-span-2'}`}>Email address<input className={fieldClass} type="email" value={form.email} onChange={update('email')} autoComplete="email" placeholder="you@example.com" required /></label>
            {isRegister && <>
              <label className="grid gap-1 text-xs font-semibold text-black/65">Phone number<input className={fieldClass} type="tel" value={form.phone} onChange={update('phone')} autoComplete="tel" placeholder="+250 7XX XXX XXX" required /></label>
              <label className="grid gap-1 text-xs font-semibold text-black/65">District<input className={fieldClass} value={form.district} onChange={update('district')} placeholder="e.g. Musanze" required /></label>
              {role === 'farmer' ? <>
                <label className="grid gap-1 text-xs font-semibold text-black/65 sm:col-span-2">Farm or cooperative name<input className={fieldClass} value={form.farmName} onChange={update('farmName')} placeholder="Farm or cooperative" required /></label>
                <label className="grid gap-1 text-xs font-semibold text-black/65 sm:col-span-2">Main produce<input className={fieldClass} value={form.mainProduce} onChange={update('mainProduce')} placeholder="Potatoes, beans, maize…" required /></label>
              </> : <>
                <label className="grid gap-1 text-xs font-semibold text-black/65">Business or organization<input className={fieldClass} value={form.organization} onChange={update('organization')} placeholder="Company, shop, institution" required /></label>
                <label className="grid gap-1 text-xs font-semibold text-black/65">Buyer type<select className={fieldClass} value={form.buyerType} onChange={update('buyerType')} required><option value="">Choose buyer type</option><option>Wholesaler</option><option>Retailer</option><option>Hotel or restaurant</option><option>Institution</option><option>Processor</option><option>Other</option></select></label>
                <label className="grid gap-1 text-xs font-semibold text-black/65 sm:col-span-2">Typical monthly volume<input className={fieldClass} value={form.monthlyVolume} onChange={update('monthlyVolume')} placeholder="e.g. 5 tonnes" required /></label>
              </>}
            </>}
            <label className="grid gap-1 text-xs font-semibold text-black/65 sm:col-span-2">Password<div className="relative"><LockKeyhole size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/35" /><input className={`${fieldClass} pr-11 pl-10`} type={showPassword ? 'text' : 'password'} value={form.password} onChange={update('password')} autoComplete={isRegister ? 'new-password' : 'current-password'} minLength={isRegister ? 10 : undefined} maxLength={72} placeholder={isRegister ? 'At least 10 characters' : 'Your password'} required /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-black/45 hover:bg-black/5">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>{isRegister && <span className="font-normal text-black/45">Use 10–72 characters. Your password is stored as a secure hash.</span>}</label>
            {isRegister && <label className="grid gap-1 text-xs font-semibold text-black/65 sm:col-span-2">Confirm password<input className={fieldClass} type="password" value={form.confirmPassword} onChange={update('confirmPassword')} autoComplete="new-password" maxLength={72} required /></label>}
            {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800 sm:col-span-2">{error}</p>}
            <button type="submit" disabled={submitting} className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#556B2F] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#3f5221] disabled:cursor-wait disabled:opacity-60 sm:col-span-2">{submitting ? 'Please wait…' : isRegister ? `Create ${role} account` : `Log in as ${role}`}<ArrowRight size={16} /></button>
          </form>
          <p className="mt-5 text-sm text-black/55">{isRegister ? 'Already registered?' : 'New to IsokoLink?'} <button type="button" onClick={() => onNavigate(isRegister ? 'login' : 'register', { role })} className="font-semibold text-[#556B2F] hover:underline">{isRegister ? 'Log in' : `Create a ${role} account`}</button></p>
        </div>
      </section>
    </main>
  );
}
