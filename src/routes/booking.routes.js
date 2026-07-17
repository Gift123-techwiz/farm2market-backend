const express = require('express');
const router = express.Router();
// const { protect } = require('../middleware/auth');
// const { verifiedFarmerOnly } = require('../middleware/verifiedFarmer');
const {
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/booking.controller');

router.post('/',  createBooking);
router.get('/',  getAllBookings);
router.get('/:id',  getBooking);
router.patch('/:id',  updateBooking);
router.delete('/:id', deleteBooking);


const { getBookingHistory } = require('../controllers/booking.controller');

router.get('/:id/history',  getBookingHistory);

module.exports = router;