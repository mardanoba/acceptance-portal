require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const multer = require('multer');
const fetch = require('node-fetch');

const app = express();

process.on('unhandledRejection', (reason) => {
  console.error('UNHANDLED REJECTION:', reason);
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || '',
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('localhost')
    ? false
    : { rejectUnauthorized: false }
});

const upload = multer({ storage: multer.memoryStorage() });

app.use(cors({ origin: '*' }));
app.use(express.json());

// POST /api/employees — Admin creates employee
app.post('/api/employees', upload.single('photo'), async (req, res) => {
  console.log('ENV CHECK:', {
    db: process.env.DATABASE_URL ? 'SET' : 'MISSING',
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'MISSING',
    preset: process.env.CLOUDINARY_UPLOAD_PRESET ? 'SET' : 'MISSING',
    frontend: process.env.FRONTEND_URL ? 'SET' : 'MISSING',
  });
  try {
    const { passport_id, full_name, work_id } = req.body;

    // Upload photo to Cloudinary using unsigned upload
    let photo_url = null;
    if (req.file) {
      try {
        const base64Image = req.file.buffer.toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;

        const formData = new URLSearchParams();
        formData.append('file', dataURI);
        formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
        formData.append('folder', 'acceptance-portal');

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData
          }
        );

        const data = await response.json();
        console.log('Cloudinary response:', JSON.stringify(data));

        if (data.secure_url) {
          photo_url = data.secure_url;
          console.log('Photo uploaded:', photo_url);
        } else {
          console.error('Cloudinary upload failed:', JSON.stringify(data));
        }
      } catch (imgErr) {
        console.error('Photo upload error:', imgErr.message);
      }
    }

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
    console.error('ERROR MESSAGE:', err.message);
    console.error('ERROR STACK:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

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
    console.error('ERROR MESSAGE:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));