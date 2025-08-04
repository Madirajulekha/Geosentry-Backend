
const { pool } = require('../config/db');

// ➕ Add to Cart
const addToCart = async (req, res) => {
  
  try {
    const { itemId, quantity } = req.body;
    const userId = req.user.userId;

    // Check if item exists
    const itemCheck = await pool.query('SELECT * FROM items WHERE id = $1', [itemId]);
    if (itemCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if item is already in cart for this user
    const existing = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1 AND item_id = $2',
      [userId, itemId]
    );

    if (existing.rows.length > 0) {
      // Update quantity if exists
      const newQty = existing.rows[0].quantity + quantity;
      await pool.query(
        'UPDATE cart SET quantity = $1 WHERE user_id = $2 AND item_id = $3',
        [newQty, userId, itemId]
      );
    } else {
      // Insert new item to cart
      await pool.query(
        'INSERT INTO cart (user_id, item_id, quantity) VALUES ($1, $2, $3)',
        [userId, itemId, quantity]
      );
    }

    res.status(201).json({ message: 'Item added to cart' });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// 🛒 Get User's Cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(`
      SELECT cart.item_id, cart.quantity, items.name FROM cart JOIN items ON cart.item_id = items.id

      WHERE cart.user_id = $1
      ORDER BY cart.created_at DESC
    `, [userId]);

    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// ✏️ Update Item Quantity in Cart
const updateCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { itemId } = req.params;
    const { quantity } = req.body;

    const update = await pool.query(
      'UPDATE cart SET quantity = $1 WHERE user_id = $2 AND item_id = $3 RETURNING *',
      [quantity, userId, itemId]
    );

    if (update.rows.length === 0) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    res.json({ message: 'Cart updated', cart: update.rows[0] });
  } catch (err) {
    console.error('Error updating cart:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// ❌ Delete Item from Cart
const deleteFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { itemId } = req.params;

    await pool.query(
      'DELETE FROM cart WHERE user_id = $1 AND item_id = $2',
      [userId, itemId]
    );

    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    console.error('Error removing cart item:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  deleteFromCart,
};

