const { AppDataSource } = require('../config/database');

class BookingHistoryRepository {
  constructor() {
    this.repository = AppDataSource.getRepository('BookingHistory');
  }

  async create(data) {
    const history = this.repository.create(data);
    return await this.repository.save(history);
  }

  async findByBookingId(bookingId) {
    return await this.repository.find({
      where: { booking_id: bookingId },
      relations: ['performer'],
      order: { created_at: 'DESC' },
    });
  }
}

module.exports = new BookingHistoryRepository();