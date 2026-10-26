import dotenv from 'dotenv';
import express from 'express';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { INITIAL_PRODUCE_LISTINGS } from './data/mockData.js';

const { Pool } = pg;
const PgSession = connectPgSimple(session);
dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '.env') });
const app = express();
const port = Number(process.env.API_PORT || 3001);
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required in backend/.env');
if (!process.env.SESSION_SECRET) throw new Error('SESSION_SECRET is required in backend/.env');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const allowedOrigins = (process.env.FRONTEND_ORIGIN || '').split(',').map((origin) => origin.trim()).filter(Boolean);
if (process.env.NODE_ENV === 'production' && !allowedOrigins.length) throw new Error('FRONTEND_ORIGIN must list allowed frontend origins in production.');
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && !allowedOrigins.includes(origin)) return res.status(403).json({ error: 'This origin is not allowed.' });
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json({ limit: '8mb' }));
if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1);
app.use(session({
  name: 'isokolink.sid',
  store: new PgSession({ pool, createTableIfMissing: true }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
}));

function requireAuth(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: 'Please log in to continue.' });
  req.auth = req.session.user;
  next();
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.session.user) return res.status(401).json({ error: 'Please log in to continue.' });
    if (req.session.user.role !== role) return res.status(403).json({ error: 'You do not have access to this resource.' });
    req.auth = req.session.user;
    next();
  };
}

function createSession(req, user) {
  return new Promise((resolveSession, rejectSession) => {
    req.session.regenerate((error) => {
      if (error) return rejectSession(error);
      req.session.user = { id: user.id, role: user.role, email: user.email, fullName: user.fullName || user.full_name || '', avatarUrl: user.avatarUrl || user.avatar_url || '' };
      req.session.save((saveError) => saveError ? rejectSession(saveError) : resolveSession());
    });
  });
}

async function getPublicAccount(role, email) {
  const result = await pool.query(`SELECT id, role, email, full_name AS "fullName", phone, district,
    avatar_url AS "avatarUrl", details FROM accounts WHERE role=$1 AND email=$2`, [role, email]);
  return result.rows[0] || null;
}

const loginAttempts = new Map();
function throttleLogin(req, res, next) {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const key = `${req.ip}:${email}`;
  const now = Date.now();
  const attempt = loginAttempts.get(key);
  if (attempt && attempt.expiresAt > now && attempt.count >= 8) return res.status(429).json({ error: 'Too many sign-in attempts. Please wait 15 minutes and try again.' });
  if (loginAttempts.size > 5000) {
    for (const [attemptKey, value] of loginAttempts) if (value.expiresAt <= now) loginAttempts.delete(attemptKey);
  }
  req.loginAttemptKey = key;
  next();
}

function recordFailedLogin(req) {
  const current = loginAttempts.get(req.loginAttemptKey);
  const now = Date.now();
  loginAttempts.set(req.loginAttemptKey, current && current.expiresAt > now
    ? { count: current.count + 1, expiresAt: current.expiresAt }
    : { count: 1, expiresAt: now + 15 * 60 * 1000 });
}

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS accounts (
      id BIGSERIAL PRIMARY KEY, role TEXT NOT NULL CHECK (role IN ('farmer','buyer')),
      email TEXT NOT NULL, full_name TEXT NOT NULL DEFAULT '', phone TEXT NOT NULL DEFAULT '',
      district TEXT NOT NULL DEFAULT '', avatar_url TEXT NOT NULL DEFAULT '', details JSONB NOT NULL DEFAULT '{}'::jsonb,
      password_hash TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(role, email)
    );
    ALTER TABLE accounts ADD COLUMN IF NOT EXISTS password_hash TEXT;
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL DEFAULT '', district TEXT NOT NULL DEFAULT '',
      cooperative TEXT NOT NULL DEFAULT '', farmer_name TEXT NOT NULL DEFAULT '', farmer_phone TEXT NOT NULL DEFAULT '',
      quantity_available NUMERIC NOT NULL DEFAULT 0, unit TEXT NOT NULL DEFAULT 'kg', min_order TEXT NOT NULL DEFAULT '',
      price_per_kg NUMERIC NOT NULL DEFAULT 0, grade TEXT NOT NULL DEFAULT '', description TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT '', data JSONB NOT NULL DEFAULT '{}'::jsonb, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY, product_id TEXT NOT NULL, product_name TEXT NOT NULL, buyer_name TEXT NOT NULL,
      buyer_phone TEXT NOT NULL, quantity_kg NUMERIC NOT NULL, price_per_kg NUMERIC NOT NULL, total_amount NUMERIC NOT NULL,
      delivery_type TEXT NOT NULL DEFAULT '', payment_method TEXT NOT NULL DEFAULT '', status TEXT NOT NULL DEFAULT 'pending',
      details JSONB NOT NULL DEFAULT '{}'::jsonb, buyer_email TEXT NOT NULL DEFAULT '', created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    ALTER TABLE orders ADD COLUMN IF NOT EXISTS buyer_email TEXT NOT NULL DEFAULT '';
    CREATE TABLE IF NOT EXISTS community_posts (
      id TEXT PRIMARY KEY, author_name TEXT NOT NULL DEFAULT '', post_type TEXT NOT NULL DEFAULT '', content TEXT NOT NULL DEFAULT '',
      details JSONB NOT NULL DEFAULT '{}'::jsonb, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS community_post_likes (
      post_id TEXT NOT NULL, user_id BIGINT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      PRIMARY KEY (post_id, user_id)
    );
    CREATE TABLE IF NOT EXISTS community_comments (
      id TEXT PRIMARY KEY, post_id TEXT NOT NULL, user_id BIGINT NOT NULL, user_name TEXT NOT NULL DEFAULT '',
      user_avatar TEXT NOT NULL DEFAULT '', text TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS community_messages (
      id BIGSERIAL PRIMARY KEY, user_id BIGINT NOT NULL, contact_id TEXT NOT NULL, text TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS contact_messages (
      id BIGSERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, message TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  const { rows } = await pool.query('SELECT count(*)::int AS count FROM products');
  if (!rows[0].count) for (const product of INITIAL_PRODUCE_LISTINGS) await saveProduct(product);
}

const toProduct = (row) => row.data;
async function saveProduct(product) {
  const result = await pool.query(`INSERT INTO products (id,name,category,district,cooperative,farmer_name,farmer_phone,quantity_available,unit,min_order,price_per_kg,grade,description,image,data)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15::jsonb)
    ON CONFLICT (id) DO UPDATE SET data=EXCLUDED.data
    WHERE lower(COALESCE(products.data->>'farmerEmail',''))=lower(COALESCE(EXCLUDED.data->>'farmerEmail',''))`,
  [String(product.id), product.name, product.category || '', product.district || '', product.cooperative || '', product.farmerName || '', product.farmerPhone || '', product.quantityAvailable || 0, product.unit || 'kg', product.minOrder || '', product.pricePerKg || 0, product.grade || '', product.description || '', product.image || '', JSON.stringify(product)]);
  return result.rowCount > 0;
}

app.get('/api/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ status: 'ok', database: 'connected' }); }
  catch { res.status(503).json({ status: 'error', database: 'unavailable' }); }
});
app.post('/api/auth/register', async (req, res) => {
  const { role, fullName, email, password, confirmPassword, phone = '', district = '', ...details } = req.body || {};
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (!['farmer', 'buyer'].includes(role)) return res.status(400).json({ error: 'Choose farmer or buyer account type.' });
  if (!String(fullName || '').trim() || !/^\S+@\S+\.\S+$/.test(normalizedEmail)) return res.status(400).json({ error: 'Enter your full name and a valid email address.' });
  if (typeof password !== 'string' || password.length < 10 || Buffer.byteLength(password, 'utf8') > 72) return res.status(400).json({ error: 'Password must be at least 10 characters and no more than 72 UTF-8 bytes.' });
  if (confirmPassword !== undefined && confirmPassword !== password) return res.status(400).json({ error: 'Passwords do not match.' });
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const result = await pool.query(`INSERT INTO accounts(role,email,full_name,phone,district,details,password_hash)
      VALUES($1,$2,$3,$4,$5,$6::jsonb,$7) ON CONFLICT(role,email) DO NOTHING
      RETURNING id,role,email,full_name AS "fullName"`, [role, normalizedEmail, String(fullName).trim(), String(phone).trim(), String(district).trim(), JSON.stringify(details), passwordHash]);
    if (!result.rowCount) {
      const existing = await pool.query('SELECT password_hash FROM accounts WHERE role=$1 AND email=$2', [role, normalizedEmail]);
      const error = existing.rows[0]?.password_hash
        ? 'An account with this email and role already exists. Log in instead.'
        : 'An older passwordless profile uses this email. Contact the IsokoLink administrator to verify and activate it securely.';
      return res.status(409).json({ error });
    }
    await createSession(req, result.rows[0]);
    res.status(201).json({ user: await getPublicAccount(role, normalizedEmail) });
  } catch { res.status(500).json({ error: 'Could not create the account.' }); }
});
app.post('/api/auth/login', throttleLogin, async (req, res) => {
  const role = req.body?.role;
  const email = String(req.body?.email || '').trim().toLowerCase();
  const password = req.body?.password;
  if (!['farmer', 'buyer'].includes(role) || !email || typeof password !== 'string') return res.status(400).json({ error: 'Enter your account type, email, and password.' });
  try {
    const result = await pool.query('SELECT id,role,email,password_hash,full_name AS "fullName",avatar_url AS "avatarUrl" FROM accounts WHERE role=$1 AND email=$2', [role, email]);
    const account = result.rows[0];
    if (!account?.password_hash || !(await bcrypt.compare(password, account.password_hash))) {
      recordFailedLogin(req);
      return res.status(401).json({ error: 'Email, password, or account type is incorrect.' });
    }
    loginAttempts.delete(req.loginAttemptKey);
    await createSession(req, account);
    res.json({ user: await getPublicAccount(account.role, account.email) });
  } catch { res.status(500).json({ error: 'Could not sign in right now.' }); }
});
app.get('/api/auth/me', requireAuth, async (req, res) => {
  try {
    const user = await getPublicAccount(req.auth.role, req.auth.email);
    if (!user) return req.session.destroy(() => res.status(401).json({ error: 'Your account is no longer available.' }));
    res.json({ user });
  } catch { res.status(500).json({ error: 'Could not load your session.' }); }
});
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.status(500).json({ error: 'Could not end the session.' });
    res.clearCookie('isokolink.sid', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' });
    res.status(204).end();
  });
});
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (![name, email, message].every((value) => String(value || '').trim())) return res.status(400).json({ error: 'Name, email, and message are required.' });
  try { await pool.query('INSERT INTO contact_messages(name,email,message) VALUES($1,$2,$3)', [String(name).trim(), String(email).trim(), String(message).trim()]); res.status(201).json({ sent: true }); }
  catch { res.status(500).json({ error: 'Could not send your message.' }); }
});
app.get('/api/products', async (_req, res) => {
  try { const result = await pool.query('SELECT data FROM products ORDER BY created_at DESC'); res.json(result.rows.map(toProduct)); }
  catch { res.status(500).json({ error: 'Could not load produce.' }); }
});
app.post('/api/products', async (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'Log in as a farmer to list produce.' });
  if (req.session.user.role !== 'farmer') return res.status(403).json({ error: 'Only farmer accounts can list produce.' });
  const product = req.body;
  if (!product?.name || !Number(product?.pricePerKg)) return res.status(400).json({ error: 'Product name and price are required.' });
  product.id ||= `prod-${Date.now()}`;
  product.farmerEmail = req.session.user.email;
  try {
    const farmer = await getPublicAccount('farmer', req.session.user.email);
    product.farmerName = farmer?.fullName || product.farmerName || '';
    product.farmerPhone = farmer?.phone || '';
  } catch { return res.status(500).json({ error: 'Could not verify farmer profile.' }); }
  try {
    if (!(await saveProduct(product))) return res.status(403).json({ error: 'You cannot update another farmer’s listing.' });
    res.status(201).json(product);
  }
  catch { res.status(500).json({ error: 'Could not save produce.' }); }
});
app.put('/api/accounts', async (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'Please log in to update your profile.' });
  const p = req.body || {};
  const { fullName = '', phone = '', district = '', avatarUrl = '' } = p;
  const details = Object.fromEntries(Object.entries(p).filter(([key]) => !['role', 'email', 'fullName', 'phone', 'district', 'avatarUrl', 'password', 'passwordHash', 'details'].includes(key)));
  try {
    const result = await pool.query(`UPDATE accounts SET full_name=$1,phone=$2,district=$3,avatar_url=$4,details=$5::jsonb,updated_at=now()
      WHERE role=$6 AND email=$7 RETURNING id,role,email,full_name AS "fullName",phone,district,avatar_url AS "avatarUrl",details`,
    [String(fullName).trim(), String(phone).trim(), String(district).trim(), avatarUrl, JSON.stringify(details), req.session.user.role, req.session.user.email]);
    if (!result.rowCount) return res.status(404).json({ error: 'Account not found.' });
    res.json(result.rows[0]);
  } catch { res.status(500).json({ error: 'Could not save account.' }); }
});
app.get('/api/accounts/:role/:email', async (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'Please log in to view account details.' });
  if (req.session.user.role !== req.params.role || req.session.user.email !== req.params.email.toLowerCase()) return res.status(403).json({ error: 'You can only view your own account.' });
  try {
    const result = await pool.query('SELECT id,role,email,full_name AS "fullName",phone,district,avatar_url AS "avatarUrl",details FROM accounts WHERE role=$1 AND email=$2', [req.params.role, req.params.email.toLowerCase()]);
    if (result.rowCount) return res.json(result.rows[0]);
    return res.status(404).json({ error: 'Account not found.' });
  } catch { res.status(500).json({ error: 'Could not load account.' }); }
});
app.post('/api/orders', async (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'Log in as a buyer to place an order.' });
  if (req.session.user.role !== 'buyer') return res.status(403).json({ error: 'Only buyer accounts can place orders.' });
  const order = req.body;
  if (!order?.produceId || !order?.buyerName || !order?.buyerPhone || !Number(order?.quantityKg) || !order?.paymentMethod) return res.status(400).json({ error: 'Complete the order and select a payment option.' });
  try {
    const result = await pool.query(`INSERT INTO orders(id,product_id,product_name,buyer_name,buyer_phone,quantity_kg,price_per_kg,total_amount,delivery_type,payment_method,details,buyer_email)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb,$12) RETURNING id,status,created_at`,
    [order.id || `ord-${Date.now()}`, String(order.produceId), order.produceName || '', order.buyerName, order.buyerPhone, order.quantityKg, order.pricePerKg || 0, order.totalAmount || 0, order.deliveryType || '', order.paymentMethod, JSON.stringify(order), req.session.user.email]);
    res.status(201).json(result.rows[0]);
  } catch { res.status(500).json({ error: 'Could not save order.' }); }
});
app.get('/api/farmer/dashboard', async (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'Please log in to view your dashboard.' });
  if (req.session.user.role !== 'farmer') return res.status(403).json({ error: 'Farmer dashboard access is for farmers only.' });
  const email = req.session.user.email;
  try {
    const account = await pool.query("SELECT full_name AS \"fullName\",email,phone,district,avatar_url AS \"avatarUrl\",details FROM accounts WHERE role='farmer' AND email=$1", [email]);
    const listings = await pool.query("SELECT data FROM products WHERE lower(COALESCE(data->>'farmerEmail',''))=$1 ORDER BY created_at DESC", [email]);
    const phone = account.rows[0]?.phone || '';
    const orders = phone ? await pool.query(`SELECT count(*)::int AS count, COALESCE(sum(o.total_amount),0)::numeric AS value FROM orders o
      JOIN products p ON p.id=o.product_id WHERE lower(COALESCE(p.data->>'farmerEmail',''))=$1`, [email]) : { rows: [{ count: 0, value: 0 }] };
    res.json({ account: account.rows[0] || null, listings: listings.rows.map(toProduct), orders: orders.rows[0] });
  } catch { res.status(500).json({ error: 'Could not load dashboard.' }); }
});
app.get('/api/buyer/dashboard', requireRole('buyer'), async (req, res) => {
  try {
    const account = await getPublicAccount('buyer', req.auth.email);
    const orders = await pool.query(`SELECT id,product_id AS "productId",product_name AS "productName",quantity_kg AS "quantityKg",
      total_amount AS "totalAmount",status,created_at AS "createdAt" FROM orders WHERE buyer_email=$1 ORDER BY created_at DESC`, [req.auth.email]);
    res.json({ account, orders: orders.rows, orderCount: orders.rowCount });
  } catch { res.status(500).json({ error: 'Could not load buyer dashboard.' }); }
});
app.get('/api/community/posts', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.details,
        (SELECT count(*)::int FROM community_post_likes l WHERE l.post_id=p.id) AS likes,
        (SELECT count(*)::int FROM community_comments c WHERE c.post_id=p.id) AS comments_count,
        EXISTS(SELECT 1 FROM community_post_likes l WHERE l.post_id=p.id AND l.user_id=$1) AS has_liked
      FROM community_posts p ORDER BY p.created_at DESC`, [req.session.user?.id || 0]);
    const postIds = result.rows.map((row) => row.details.id).filter(Boolean);
    const comments = postIds.length ? await pool.query(`
      SELECT id, post_id AS "postId", user_name AS "userName", user_avatar AS "userAvatar", text,
        to_char(created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS time
      FROM community_comments WHERE post_id=ANY($1::text[]) ORDER BY created_at ASC`, [postIds]) : { rows: [] };
    const commentsByPost = new Map();
    for (const comment of comments.rows) {
      const current = commentsByPost.get(comment.postId) || [];
      current.push(comment);
      commentsByPost.set(comment.postId, current);
    }
    res.json(result.rows.map((row) => ({
      ...row.details,
      likes: row.likes,
      commentsCount: row.comments_count,
      hasLiked: row.has_liked,
      comments: commentsByPost.get(row.details.id) || [],
    })));
  }
  catch { res.status(500).json({ error: 'Could not load community posts.' }); }
});
app.post('/api/community/posts', async (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'Please log in to share a community post.' });
  const post = req.body;
  const content = String(post?.content || '').trim();
  const postType = String(post?.postType || 'Idea or quote');
  if (!content) return res.status(400).json({ error: 'Post content is required.' });
  if (content.length > 2000) return res.status(400).json({ error: 'Post content must be 2000 characters or fewer.' });
  if (!['Idea or quote', 'New produce', 'Farm technology'].includes(postType)) return res.status(400).json({ error: 'Invalid post category.' });
  try {
    const savedPost = {
      ...post,
      id: String(post.id || `community-${randomUUID()}`),
      authorName: req.session.user.fullName || post.authorName || 'Community member',
      postType,
      content,
      timeAgo: 'Just now',
      likes: 0,
      commentsCount: 0,
      comments: [],
    };
    await pool.query('INSERT INTO community_posts(id,author_name,post_type,content,details) VALUES($1,$2,$3,$4,$5::jsonb) ON CONFLICT(id) DO NOTHING', [savedPost.id, savedPost.authorName, savedPost.postType, savedPost.content, JSON.stringify(savedPost)]);
    res.status(201).json(savedPost);
  } catch { res.status(500).json({ error: 'Could not save post.' }); }
});
app.post('/api/community/posts/:postId/like', requireAuth, async (req, res) => {
  const postId = String(req.params.postId);
  try {
    const existing = await pool.query('SELECT 1 FROM community_post_likes WHERE post_id=$1 AND user_id=$2', [postId, req.auth.id]);
    if (existing.rowCount) await pool.query('DELETE FROM community_post_likes WHERE post_id=$1 AND user_id=$2', [postId, req.auth.id]);
    else await pool.query('INSERT INTO community_post_likes(post_id,user_id) VALUES($1,$2)', [postId, req.auth.id]);
    const result = await pool.query('SELECT count(*)::int AS likes FROM community_post_likes WHERE post_id=$1', [postId]);
    res.json({ hasLiked: !existing.rowCount, likes: result.rows[0].likes });
  } catch { res.status(500).json({ error: 'Could not update the post reaction.' }); }
});
app.post('/api/community/posts/:postId/comments', requireAuth, async (req, res) => {
  const text = String(req.body?.text || '').trim();
  if (!text) return res.status(400).json({ error: 'Comment text is required.' });
  if (text.length > 1000) return res.status(400).json({ error: 'Comments must be 1000 characters or fewer.' });
  try {
    const comment = {
      id: `comment-${randomUUID()}`,
      postId: String(req.params.postId),
      userName: req.auth.fullName || 'Community member',
      userAvatar: req.auth.avatarUrl || '',
      text,
      time: new Date().toISOString(),
    };
    await pool.query('INSERT INTO community_comments(id,post_id,user_id,user_name,user_avatar,text) VALUES($1,$2,$3,$4,$5,$6)', [comment.id, comment.postId, req.auth.id, comment.userName, comment.userAvatar, comment.text]);
    res.status(201).json(comment);
  } catch { res.status(500).json({ error: 'Could not save the comment.' }); }
});
app.get('/api/community/messages/:contactId', requireAuth, async (req, res) => {
  try {
    const result = await pool.query(`SELECT id, contact_id AS contact, text,
      to_char(created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS "createdAt"
      FROM community_messages WHERE user_id=$1 AND contact_id=$2 ORDER BY created_at ASC`, [req.auth.id, String(req.params.contactId)]);
    res.json(result.rows);
  } catch { res.status(500).json({ error: 'Could not load this conversation.' }); }
});
app.post('/api/community/messages', requireAuth, async (req, res) => {
  const contact = String(req.body?.contact || '').trim();
  const text = String(req.body?.text || '').trim();
  if (!contact || !text) return res.status(400).json({ error: 'A contact and message are required.' });
  if (text.length > 2000) return res.status(400).json({ error: 'Messages must be 2000 characters or fewer.' });
  try {
    const result = await pool.query(`INSERT INTO community_messages(user_id,contact_id,text)
      VALUES($1,$2,$3) RETURNING id, contact_id AS contact, text,
      to_char(created_at, 'YYYY-MM-DD"T"HH24:MI:SS"Z"') AS "createdAt"`, [req.auth.id, contact, text]);
    res.status(201).json(result.rows[0]);
  } catch { res.status(500).json({ error: 'Could not send this message.' }); }
});

initializeDatabase().then(() => app.listen(port, () => console.log(`IsokoLink API listening on ${port}`))).catch((error) => { console.error(`Database initialization failed: ${error.message}`); process.exit(1); });
