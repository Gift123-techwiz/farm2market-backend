const bookingHistoryRepository = require('../repositories/booking.history.repository');
const bookingRepository = require('../repositories/booking.repository');

class BookingHistoryService {
  async getBookingHistory(bookingId) {
    const booking = await bookingRepository.findById(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }
    return await bookingHistoryRepository.findByBookingId(bookingId);
  }
}

module.exports = new BookingHistoryService();