const bookingService = require('../services/bookingService');

exports.createBooking = async (req, res) => {
  try {
    const farmerId = req.user.id;
    const booking = await bookingService.createBooking({ ...req.body, farmer_id: farmerId });
    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const filters = req.user.role === 'farmer' ? { farmer_id: req.user.id } : {};
    const bookings = await bookingService.getAllBookings({ ...filters, ...req.query });
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    const status = error.message === 'Booking not found' ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const updated = await bookingService.updateBooking(req.params.id, req.body, req.user.id);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    const status = error.message === 'Booking not found' ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await bookingService.deleteBooking(req.params.id, req.user.id);
    res.status(200).json({ success: true, message: 'Booking deleted' });
  } catch (error) {
    const status = error.message === 'Booking not found' ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

const bookingHistoryService = require('../services/bookingHistoryService');

exports.getBookingHistory = async (req, res) => {
  try {
    const history = await bookingHistoryService.getBookingHistory(req.params.id);
    res.status(200).json({ success: true, count: history.length, data: history });
  } catch (error) {
    const status = error.message === 'Booking not found' ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};