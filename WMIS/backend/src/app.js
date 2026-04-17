const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Keep the route paths exactly as requested (no `/api` prefix).
app.use('/', authRoutes);
app.use('/products', productRoutes);
app.use('/warehouses', warehouseRoutes);
app.use('/orders', orderRoutes);
app.use('/', userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

