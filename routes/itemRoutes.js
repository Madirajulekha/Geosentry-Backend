const express = require('express');
const { getItems, createItem } = require('../controllers/itemController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getItems);
router.post('/', authenticate, createItem);

module.exports = router;
