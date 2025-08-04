const { pool } = require('../config/db');

// GET all items
const getItems = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching items:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST a new item
const createItem = async (req, res) => {
  const { name, model, price, quantity } = req.body;

  if (!name || !model || price == null || quantity == null) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO items (name, model, price, quantity)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, model, price, quantity]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating item:', err.message);
    res.status(500).json({ error: 'Failed to create item' });
  }
};

module.exports = {
  getItems,
  createItem
};
