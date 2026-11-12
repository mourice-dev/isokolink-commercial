import { INITIAL_PRODUCE_LISTINGS } from '../data/mockData';
import { INITIAL_SOCIAL_POSTS } from '../data/socialFeedData';

// Frontend-only mock service. All app data is stored locally in this browser.
const KEYS = {
  session: 'isokolink-demo-session', accounts: 'isokolink-demo-accounts', products: 'isokolink-local-listings',
  orders: 'isokolink-demo-orders', posts: 'isokolink-community-posts', messages: 'isokolink-community-messages',
};
const DEMO_ACCOUNTS = [
  { role: 'farmer', email: 'farmer.demo@isokolink.rw', password: 'FarmDemo2026!', fullName: 'Jean Farmer', phone: '+250 788 000 101', district: 'Musanze', details: { farmName: 'Green Hills Farm', mainProduce: 'Tomatoes, Irish potatoes' } },
  { role: 'buyer', email: 'buyer.demo@isokolink.rw', password: 'BuyerDemo2026!', fullName: 'Aline Buyer', phone: '+250 788 000 202', district: 'Kigali', details: { organization: 'Kigali Fresh Market', buyerType: 'Wholesaler', monthlyVolume: '5 tonnes' } },
];

function read(key, fallback) {
  try { const value = JSON.parse(localStorage.getItem(key) || 'null'); return value ?? fallback; } catch { return fallback; }
}
function write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Local storage may be unavailable or full. */ } }
function publicAccount(account) {
  if (!account) return null;
  const { password, ...safe } = account;
  return safe;
}
function response(data, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: async () => data };
}
function requestBody(options) {
  try { return JSON.parse(options?.body || '{}'); } catch { return {}; }
}
function getAccounts() {
  const saved = read(KEYS.accounts, []);
  return [...DEMO_ACCOUNTS, ...saved.filter((account) => !DEMO_ACCOUNTS.some((demo) => demo.role === account.role && demo.email === account.email))];
}
function getProducts() {
  const saved = read(KEYS.products, []);
  return [...saved, ...INITIAL_PRODUCE_LISTINGS.filter((product) => !saved.some((item) => String(item.id) === String(product.id)))];
}

export async function apiFetch(path, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  const body = requestBody(options);
  const session = read(KEYS.session, null);

  if (path === '/api/auth/me' && method === 'GET') return session ? response({ user: session }) : response({ error: 'Please log in to continue.' }, 401);
  if (path === '/api/auth/login' && method === 'POST') {
    const account = getAccounts().find((item) => item.role === body.role && item.email.toLowerCase() === String(body.email || '').trim().toLowerCase() && item.password === body.password);
    if (!account) return response({ error: 'Email, password, or account type is incorrect.' }, 401);
    const user = publicAccount(account); write(KEYS.session, user); write('isokolink-active-account', user.role);
    return response({ user });
  }
  if (path === '/api/auth/register' && method === 'POST') {
    if (!['farmer', 'buyer'].includes(body.role) || !body.fullName || !/^\S+@\S+\.\S+$/.test(body.email || '') || (body.password || '').length < 10) return response({ error: 'Enter valid account details and a password of at least 10 characters.' }, 400);
    const accounts = getAccounts();
    if (accounts.some((item) => item.role === body.role && item.email.toLowerCase() === body.email.toLowerCase())) return response({ error: 'An account with this email and role already exists. Log in instead.' }, 409);
    const { confirmPassword, ...account } = body;
    if (confirmPassword && confirmPassword !== account.password) return response({ error: 'Passwords do not match.' }, 400);
    const saved = [...read(KEYS.accounts, []), account]; write(KEYS.accounts, saved);
    const user = publicAccount(account); write(KEYS.session, user); write('isokolink-active-account', user.role);
    return response({ user }, 201);
  }
  if (path === '/api/auth/logout' && method === 'POST') { localStorage.removeItem(KEYS.session); return response(null, 204); }

  if (path === '/api/products' && method === 'GET') return response(getProducts());
  if (path === '/api/products' && method === 'POST') {
    if (session?.role !== 'farmer') return response({ error: 'Log in as a farmer to list produce.' }, 401);
    const product = { ...body, id: body.id || `local-${Date.now()}`, farmerEmail: session.email, farmerName: session.fullName };
    write(KEYS.products, [product, ...read(KEYS.products, [])]); return response(product, 201);
  }
  if (path === '/api/farmer/dashboard' && method === 'GET') {
    const own = getProducts().filter((product) => product.farmerEmail === session?.email);
    const demoSales = [
      { id: 'S-2048', name: 'Fresh tomatoes', buyer: 'Kigali Fresh Mart', quantity: '120 kg', total: 96000, status: 'Delivered' },
      { id: 'S-2047', name: 'Irish potatoes', buyer: 'Musanze Market Co.', quantity: '250 kg', total: 175000, status: 'In transit' },
      { id: 'S-2046', name: 'Sweet bananas', buyer: 'Green Basket Ltd.', quantity: '80 kg', total: 56000, status: 'Processing' },
    ];
    return response({ listings: own, orders: { count: 24, revenue: 1284500, items: demoSales } });
  }
  if (path === '/api/buyer/dashboard' && method === 'GET') {
    const orders = read(KEYS.orders, []).filter((order) => !session || order.buyerEmail === session.email);
    const demoOrders = [
      { id: 'ORD-1842', productName: 'Irish potatoes', quantityKg: 120, totalAmount: 84000, status: 'In transit', createdAt: '2026-11-11T09:00:00.000Z' },
      { id: 'ORD-1836', productName: 'Fresh tomatoes', quantityKg: 80, totalAmount: 64000, status: 'Delivered', createdAt: '2026-11-08T11:30:00.000Z' },
    ];
    return response({ orders: orders.length ? orders : demoOrders, orderCount: orders.length ? orders.length : 12 });
  }
  if (path === '/api/orders' && method === 'POST') {
    if (session?.role !== 'buyer') return response({ error: 'Log in as a buyer to place an order.' }, 401);
    const order = { ...body, id: `ORD-${Date.now()}`, productName: body.produceName || body.productName, buyerEmail: session.email, status: 'pending', createdAt: new Date().toISOString() };
    write(KEYS.orders, [order, ...read(KEYS.orders, [])]); return response(order, 201);
  }
  if (path === '/api/accounts' && method === 'PUT') {
    if (!session) return response({ error: 'Please log in to continue.' }, 401);
    const updated = { ...session, ...body, details: { ...(session.details || {}), ...body } };
    write(KEYS.session, updated);
    write(KEYS.accounts, getAccounts().map((account) => account.role === session.role && account.email === session.email ? { ...account, ...body } : account));
    return response(updated);
  }
  if (path.startsWith('/api/accounts/') && method === 'GET') return response(session || {}, session ? 200 : 404);

  if (path === '/api/community/posts' && method === 'GET') return response(read(KEYS.posts, INITIAL_SOCIAL_POSTS));
  if (path === '/api/community/posts' && method === 'POST') {
    const posts = read(KEYS.posts, INITIAL_SOCIAL_POSTS); write(KEYS.posts, [body, ...posts]); return response(body, 201);
  }
  const likeMatch = path.match(/^\/api\/community\/posts\/([^/]+)\/like$/);
  if (likeMatch && method === 'POST') {
    const posts = read(KEYS.posts, INITIAL_SOCIAL_POSTS);
    let result = { hasLiked: true, likes: 1 };
    write(KEYS.posts, posts.map((post) => {
      if (String(post.id) !== decodeURIComponent(likeMatch[1])) return post;
      const hasLiked = !post.hasLiked;
      result = { hasLiked, likes: Math.max(0, (post.likes || 0) + (hasLiked ? 1 : -1)) };
      return { ...post, ...result };
    }));
    return response(result);
  }
  const commentMatch = path.match(/^\/api\/community\/posts\/([^/]+)\/comments$/);
  if (commentMatch && method === 'POST') return response({ id: `comment-${Date.now()}`, postId: commentMatch[1], userName: session?.fullName || 'You', text: body.text, time: 'Just now' }, 201);
  if (path === '/api/community/messages' && method === 'POST') {
    const message = { ...body, contact: body.contact, id: `msg-${Date.now()}`, text: body.text, createdAt: new Date().toISOString() };
    write(KEYS.messages, [...read(KEYS.messages, []), message]); return response(message, 201);
  }
  const chatMatch = path.match(/^\/api\/community\/messages\/(.+)$/);
  if (chatMatch && method === 'GET') return response(read(KEYS.messages, []).filter((message) => message.contact === decodeURIComponent(chatMatch[1])));
  if (path === '/api/contact' && method === 'POST') return response({ sent: true }, 201);
  return response({ error: 'This demo action is not available.' }, 404);
}
