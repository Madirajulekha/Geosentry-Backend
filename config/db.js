const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME || 'geosentrydb',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const connectDB = async () => {
  try {
    const result = await pool.query('SELECT current_database()');
    console.log('Connected to DB:', result.rows[0].current_database);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};


module.exports = { pool, connectDB };
