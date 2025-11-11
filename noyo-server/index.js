// index.js ecommerce-backend

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const initializeApp = require('./scripts/init');
const { buildModel, precomputeSimilarities } = require('./controllers/recommendController');
const cron = require('node-cron');

// Load env vars
dotenv.config({
  debug: true
});

// Connect to database
connectDB().then(async () => {
  await initializeApp();
  await buildModel();

  cron.schedule('0 */6 * * *', async () => {
    console.log('♻️ Refreshing TF-IDF cache and recomputing similarities...');
    await precomputeSimilarities();
    console.log('✅ TF-IDF model & similarities refreshed');
  });
})

const app = express();

// Enable CORS
app.use(cors({
  origin: ['https://noyo.vercel.app', 'http://localhost:5173', 'https://noyo.onrender.com'],
  credentials: true,
}));
// Body parser middleware
app.use(express.json());
// Cookie parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is running...');
});
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/recommendation', recommendationRoutes);
app.set('query parser', 'extended');
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));

module.exports = app