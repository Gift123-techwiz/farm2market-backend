const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { verifiedFarmerOnly } = require('../middleware/verifiedFarmer');
const {
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookingController');

router.post('/', protect, verifiedFarmerOnly, createBooking);
router.get('/', protect, getAllBookings);
router.get('/:id', protect, getBooking);
router.patch('/:id', protect, updateBooking);
router.delete('/:id', protect, deleteBooking);


const { getBookingHistory } = require('../controllers/bookingHistoryController');

router.get('/:id/history', protect, getBookingHistory);

module.exports = router;