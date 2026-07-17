const express = require('express');
const coldRoomRoutes = require('./routes/coldRoomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const bookingHistoryRoutes = require('./routes/bookingHistoryRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

app.use(express.json());

app.use('/coldrooms', coldRoomRoutes);
app.use('/bookings', bookingRoutes);
app.use('/bookings', bookingHistoryRoutes);
app.use('/reviews', reviewRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong' });
});

module.exports = app;