require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('localhost')
    ? false
    : { rejectUnauthorized: false }
});

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'acceptance-portal', allowed_formats: ['jpg', 'jpeg', 'png'] }
});
const upload = multer({ storage });

app.use(cors({ origin: '*' }));
app.use(express.json());

// POST /api/employees — Admin creates employee
app.post('/api/employees', upload.single('photo'), async (req, res) => {
   console.log('ENV CHECK:', {
    db: process.env.DATABASE_URL ? 'SET' : 'MISSING',
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'MISSING',
    cloud_key: process.env.CLOUDINARY_API_KEY ? 'SET' : 'MISSING',
    cloud_secret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'MISSING',
    frontend: process.env.FRONTEND_URL ? 'SET' : 'MISSING',
  });
  try {
    try {
    console.log('--- New request ---');
    console.log('Body:', req.body);
    console.log('File:', req.file);

    const { passport_id, full_name, work_id } = req.body;
    const photo_url = req.file ? req.file.path : null;

    console.log('Inserting into DB:', { passport_id, full_name, work_id, photo_url });

    const result = await pool.query(
      `INSERT INTO employees (passport_id, full_name, photo_url, work_id)
       VALUES ($1, $2, $3, $4) RETURNING token`,
      [passport_id, full_name, photo_url, work_id]
    );

    const token = result.rows[0].token;
    const link = `${process.env.FRONTEND_URL}/welcome/${token}`;

    console.log('Success! Link:', link);
    res.json({ success: true, link, token });
  } catch (err) {
    console.error('FULL ERROR:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
    res.status(500).json({ error: err.message });
  }
}); // ← THIS WAS MISSING

// GET /api/employees/:token — User views their info
app.get('/api/employees/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const result = await pool.query(
      'SELECT * FROM employees WHERE token = $1',
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('FULL ERROR:', JSON.stringify(err, Object.getOwnPropertyNames(err)));
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));