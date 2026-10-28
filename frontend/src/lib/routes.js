const TAB_PATHS = {
  home: '/',
  market: '/market',
  defense: '/plant-health',
  doctor: '/crop-doctor',
  agencies: '/agencies',
  feed: '/community',
  profile: '/profile',
  'farmer-dashboard': '/farmer-dashboard',
  'buyer-dashboard': '/buyer-dashboard',
  about: '/about',
  contact: '/contact',
  login: '/login',
  'register-farmer': '/register/farmer',
  'register-buyer': '/register/buyer',
};

export function routePathForTab(tab, { productId, role } = {}) {
  if (tab === 'product-details' && productId != null) return `/products/${encodeURIComponent(productId)}`;
  if (tab === 'payment') return productId != null ? `/checkout?product=${encodeURIComponent(productId)}` : '/checkout';
  if (tab === 'login' && role) return `/login?role=${encodeURIComponent(role)}`;
  if (tab === 'register') return role === 'buyer' ? '/register/buyer' : '/register/farmer';
  return TAB_PATHS[tab] || '/';
}

export function readRouteFromLocation() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const productMatch = pathname.match(/^\/products\/([^/]+)$/);
  if (productMatch) {
    let productId = productMatch[1];
    try { productId = decodeURIComponent(productId); } catch { /* Keep the raw path segment. */ }
    return { tab: 'product-details', productId };
  }
  if (pathname === '/checkout') return { tab: 'payment', productId: new URLSearchParams(window.location.search).get('product') || null };
  if (pathname === '/login') return { tab: 'login', role: new URLSearchParams(window.location.search).get('role') || null };
  if (pathname === '/register/farmer') return { tab: 'register', role: 'farmer' };
  if (pathname === '/register/buyer') return { tab: 'register', role: 'buyer' };
  const tab = Object.entries(TAB_PATHS).find(([, path]) => path === pathname)?.[0] || 'home';
  return { tab, productId: null };
}
