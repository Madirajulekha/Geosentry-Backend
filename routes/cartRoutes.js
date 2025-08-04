const express = require('express');
const {
  addToCart,
  getCart,
  updateCart,
  deleteFromCart,
} = require('../controllers/cartController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, getCart);
router.post('/', authenticate, addToCart);
router.put('/:itemId', authenticate, updateCart);
router.delete('/:itemId', authenticate, deleteFromCart);

module.exports = router;
