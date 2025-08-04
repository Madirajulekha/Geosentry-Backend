const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const {
  register,
  login,
  getCurrentUser,
  updateUser,
  updatePassword,
  forgotPassword
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getCurrentUser);
router.put('/update', authenticate, updateUser);
router.put('/update-password', authenticate, updatePassword); 
router.put('/forgot-password', forgotPassword); 
module.exports = router;
