const bookingRepository = require('../repositories/bookingRepository');
const bookingHistoryRepository = require('../repositories/bookingHistoryRepository');

class BookingService {
  async createBooking(data) {
    const booking = await bookingRepository.create(data);

    await bookingHistoryRepository.create({
      booking_id: booking.id,
      action: 'created',
      performed_by: data.farmer_id,
      notes: 'Booking created by farmer',
    });

    return booking;
  }

  async getAllBookings(filters) {
    return await bookingRepository.findAll(filters);
  }

  async getBookingById(id) {
    const booking = await bookingRepository.findById(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    return booking;
  }

  async updateBooking(id, data, userId) {
    const booking = await bookingRepository.findById(id);
    if (!booking) {
      throw new Error('Booking not found');
    }

    const oldStatus = booking.status;
    const updated = await bookingRepository.update(id, data);

    if (data.status && data.status !== oldStatus) {
      await bookingHistoryRepository.create({
        booking_id: id,
        action: 'status_changed',
        performed_by: userId,
        notes: `Status changed from ${oldStatus} to ${data.status}`,
      });
    }

    return updated;
  }

  async deleteBooking(id, userId) {
    const booking = await bookingRepository.findById(id);
    if (!booking) {
      throw new Error('Booking not found');
    }

    await bookingHistoryRepository.create({
      booking_id: id,
      action: 'deleted',
      performed_by: userId,
      notes: 'Booking deleted',
    });

    return await bookingRepository.delete(id);
  }
}

module.exports = new BookingService();