const bookingHistoryRepository = require('../repositories/bookingHistoryRepository');
const bookingRepository = require('../repositories/bookingRepository');

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