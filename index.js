const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const cartRoutes = require('./routes/cartRoutes');
const { connectDB } = require('./config/db');

connectDB(); // test DB connection

// const { createUserTable } = require('./models/userModel');
// const { createItemTable } = require('./models/itemModel');
// const { createCartTable } = require('./models/cartModel');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(cors({
  origin: '*',
  credentials: true, // if you're sending cookies or Authorization headers
}));

// connectDB().then(() => {
//   createUserTable();
//   createItemTable();
//   createCartTable();
// });

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
