require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

client.connect()
  .then(() => client.query('SELECT NOW()'))
  .then(res => {
    console.log('✅ Connected!', res.rows[0].now);
    client.end();
  })
  .catch(err => {
    console.error('❌ Failed:', err.message);
    client.end();
  });