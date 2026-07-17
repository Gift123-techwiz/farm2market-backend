const express = require('express');
const coldRoomRoutes = require('./routes/coldRoom.Routes');
const bookingRoutes = require('./routes/booking.routes');
const bookingHistoryRoutes = require('./routes/booking.routes');
const reviewRoutes = require('./routes/review.routes');

const app = express();

app.use(express.json());

app.use('/coldroom.', coldRoomRoutes);
app.use('/booking.', bookingRoutes);
app.use('/booking.', bookingHistoryRoutes);
app.use('/review.', reviewRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong' });
});

module.exports = app;