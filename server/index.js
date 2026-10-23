import dotenv from 'dotenv';
import express from 'express';
import pg from 'pg';
import { INITIAL_PRODUCE_LISTINGS } from '../src/data/mockData.js';

const { Pool } = pg;
dotenv.config({ path: '.env.local' });
const app = express();
const port = Number(process.env.API_PORT || 3001);
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required in .env.local');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
app.use(express.json({ limit: '8mb' }));

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS accounts (
      id BIGSERIAL PRIMARY KEY, role TEXT NOT NULL CHECK (role IN ('farmer','buyer')),
      email TEXT NOT NULL, full_name TEXT NOT NULL DEFAULT '', phone TEXT NOT NULL DEFAULT '',
      district TEXT NOT NULL DEFAULT '', avatar_url TEXT NOT NULL DEFAULT '', details JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE(role, email)
    );
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
      details JSONB NOT NULL DEFAULT '{}'::jsonb, created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS community_posts (
      id TEXT PRIMARY KEY, author_name TEXT NOT NULL DEFAULT '', post_type TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '', details JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  const count = await pool.query('SELECT count(*)::int AS count FROM products');
  if (!count.rows[0].count) {
    for (const product of INITIAL_PRODUCE_LISTINGS) await saveProduct(product);
  }
}

function toProduct(row) { return row.data; }
async function saveProduct(p) {
  await pool.query(`INSERT INTO products (id,name,category,district,cooperative,farmer_name,farmer_phone,quantity_available,unit,min_order,price_per_kg,grade,description,image,data)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15::jsonb) ON CONFLICT (id) DO UPDATE SET data=EXCLUDED.data`,
  [String(p.id), p.name, p.category || '', p.district || '', p.cooperative || '', p.farmerName || '', p.farmerPhone || '', p.quantityAvailable || 0, p.unit || 'kg', p.minOrder || '', p.pricePerKg || 0, p.grade || '', p.description || '', p.image || '', JSON.stringify(p)]);
}

app.get('/api/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ status: 'ok', database: 'connected' }); }
  catch { res.status(503).json({ status: 'error', database: 'unavailable' }); }
});
app.get('/api/products', async (_req, res) => {
  try { const result = await pool.query('SELECT data FROM products ORDER BY created_at DESC'); res.json(result.rows.map(toProduct)); }
  catch { res.status(500).json({ error: 'Could not load produce.' }); }
});
app.post('/api/products', async (req, res) => {
  const p = req.body;
  if (!p?.name || !p?.pricePerKg) return res.status(400).json({ error: 'Product name and price are required.' });
  p.id ||= `prod-${Date.now()}`;
  try { await saveProduct(p); res.status(201).json(p); }
  catch { res.status(500).json({ error: 'Could not save produce.' }); }
});
app.put('/api/accounts', async (req, res) => {
  const p = req.body;
  if (!['farmer', 'buyer'].includes(p?.role) || !p?.email) return res.status(400).json({ error: 'A valid account role and email are required.' });
  const { role, email, fullName = '', phone = '', district = '', avatarUrl = '', ...details } = p;
  try {
    const result = await pool.query(`INSERT INTO accounts(role,email,full_name,phone,district,avatar_url,details)
      VALUES($1,$2,$3,$4,$5,$6,$7::jsonb) ON CONFLICT(role,email) DO UPDATE SET full_name=EXCLUDED.full_name,phone=EXCLUDED.phone,district=EXCLUDED.district,avatar_url=EXCLUDED.avatar_url,details=EXCLUDED.details,updated_at=now() RETURNING id,role,email,full_name AS "fullName",phone,district,avatar_url AS "avatarUrl",details`,
    [role, email.toLowerCase(), fullName, phone, district, avatarUrl, JSON.stringify(details)]);
    res.json(result.rows[0]);
  } catch { res.status(500).json({ error: 'Could not save account.' }); }
});
app.get('/api/accounts/:role/:email', async (req, res) => {
  try { const r = await pool.query('SELECT id,role,email,full_name AS "fullName",phone,district,avatar_url AS "avatarUrl",details FROM accounts WHERE role=$1 AND email=$2', [req.params.role, req.params.email.toLowerCase()]); r.rowCount ? res.json(r.rows[0]) : res.status(404).json({ error: 'Account not found.' }); }
  catch { res.status(500).json({ error: 'Could not load account.' }); }
});
app.post('/api/orders', async (req, res) => {
  const o = req.body;
  if (!o?.produceId || !o?.buyerName || !o?.buyerPhone || !Number(o?.quantityKg) || !o?.paymentMethod) return res.status(400).json({ error: 'Complete the order and select a payment option.' });
  try {
    const result = await pool.query(`INSERT INTO orders(id,product_id,product_name,buyer_name,buyer_phone,quantity_kg,price_per_kg,total_amount,delivery_type,payment_method,details)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11::jsonb) RETURNING id,status,created_at`,
    [o.id || `ord-${Date.now()}`, String(o.produceId), o.produceName, o.buyerName, o.buyerPhone, o.quantityKg, o.pricePerKg, o.totalAmount, o.deliveryType || '', o.paymentMethod, JSON.stringify(o)]);
    res.status(201).json(result.rows[0]);
  } catch { res.status(500).json({ error: 'Could not save order.' }); }
});
app.get('/api/farmer/dashboard', async (req, res) => {
  const email = String(req.query.email || '').toLowerCase();
  try {
    const account = email ? await pool.query("SELECT full_name AS \"fullName\",email,phone,district,avatar_url AS \"avatarUrl\",details FROM accounts WHERE role='farmer' AND email=$1", [email]) : { rows: [] };
    const listings = email ? await pool.query("SELECT data FROM products WHERE lower(COALESCE(data->>'farmerEmail',''))=$1 ORDER BY created_at DESC", [email]) : { rows: [] };
    const phone = account.rows[0]?.phone || '';
    const orders = phone ? await pool.query("SELECT count(*)::int AS count, COALESCE(sum(total_amount),0)::numeric AS value FROM orders WHERE details->>'farmerPhone'=$1", [phone]) : { rows: [{ count: 0, value: 0 }] };
    res.json({ account: account.rows[0] || null, listings: listings.rows.map(toProduct), orders: orders.rows[0] });
  } catch { res.status(500).json({ error: 'Could not load dashboard.' }); }
});
app.get('/api/community/posts', async (_req, res) => {
  try { const r = await pool.query('SELECT details FROM community_posts ORDER BY created_at DESC'); res.json(r.rows.map((row) => row.details)); }
  catch { res.status(500).json({ error: 'Could not load community posts.' }); }
});
app.post('/api/community/posts', async (req, res) => {
  const p = req.body;
  if (!p?.id || !p?.content) return res.status(400).json({ error: 'Post content is required.' });
  try { await pool.query('INSERT INTO community_posts(id,author_name,post_type,content,details) VALUES($1,$2,$3,$4,$5::jsonb) ON CONFLICT(id) DO NOTHING', [String(p.id), p.authorName || '', p.postType || '', p.content, JSON.stringify(p)]); res.status(201).json(p); }
  catch { res.status(500).json({ error: 'Could not save post.' }); }
});

initializeDatabase().then(() => app.listen(port, () => console.log(`IsokoLink API listening on ${port}`))).catch((error) => { console.error(`Database initialization failed: ${error.message}`); process.exit(1); });
